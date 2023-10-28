
# Yocto

### Run the image inside a emulator
````bash
devtool build-image
runqemu beaglebone-yocto
````

### Edit recipe sources
````bash
bitbake -c devshell <recipe>
````

### Add new local recipe to sdk
````bash
devtool add hello-world /home/ton/beaglebone_os/hello_world
````

### Run qemu in same window
````bash
runqemu beaglebone-yocto nographic
````

### Remove packages from target
````bash
devtool undeploy-target htop root@192.168.7.4
````

### Remove recipe from workdir
````bash
ton@mx-5:~/beaglebone_os/sdk/iftop$ devtool reset iftop
NOTE: Starting bitbake server...
INFO: Cleaning sysroot for recipe iftop...
INFO: Leaving source tree /home/ton/beaglebone_os/sdk/test_sdk_full/workspace/sources/iftop as-is; if you no longer need it then please delete it manually
ton@mx-5:~/beaglebone_os/sdk/iftop$
sudo rm -r /home/ton/beaglebone_os/sdk/test_sdk_full/workspace/sources/iftop
````

### Debug recipe build errors in SDK workdir
````bash
cd sdk_path/workspace/sources/bwm-ng
C=arm-poky-linux-gnueabi ./configure --host=arm-poky-linux-gnueabi # or CC=..
````

### Publish new SDK update
````bash
oe-publish-sdk tmp/deploy/sdk/poky-glibc-x86_64-core-image-full-cmdline-cortexa8hf-neon-beaglebone-yocto-toolchain-ext-4.0.9.sh ~/beaglebone_os/sdk/updated-sdk
````

### Update SDK
````bash
devtool sdk-update URL
````

### Increase rootfs size
````bash
# Before
root@beaglebone-yocto:/# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root       189M  169M  5.6M  97% /

# Expand rootfs by 5GB in conf/local.conf
IMAGE_ROOTFS_EXTRA_SPACE = "5242880"

# After
root@beaglebone-yocto:~# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root       6.5G  122M  6.0G   2% /
````

# Tests

### Enable tests
Add to conf/local.conf:
````bash
# Enable automated tests
INHERIT += "testimage"
TEST_SUITES = "ping ssh df syslog scp vnc date dmesg example " # note example-test case here
BBPATH += " ${TOPDIR}/../sources/meta-bbb/lib/oeqa/runtime/cases"
````

### Autorun tests
See: <https://docs.yoctoproject.org/dev/dev-manual/runtime-testing.html#running-tests>

Edit local.conf and add line:
````bash
TESTIMAGE_AUTO = "1"
````

Edit /etc/sudoers file, and add:
````bash
# Enable qemu wihout sudo
ton ALL = NOPASSWD: /home/ton/beaglebone_os/poky/scripts/runqemu-ifup
````

Configure tap interface:
````bash
sudo /home/ton/beaglebone_os/poky/scripts/runqemu-gen-tapdevs 1000 1000 4 tmp/sysroots-components/x86_64/qemu-helper-native/usr/bin
````

Build qemu-helper package:
````bash
bitbake qemu-helper-native
````

Install dependencies on host:
````bash
sudo apt install sysstat iproute2
````

Run tests:
````bash
bitbake core-image-full-cmdline -c testimage
````

### Add custom tests

Create a folder for test cases. Test cases has to be under **< layer >/lib/oeqa/runtime/cases**
because they extend core's test cases
````bash
mkdir -p ~/beaglebone_os/sources/meta-bbb/lib/oeqa/runtime/cases
````

Create empty init file
````bash
touch ~/beaglebone_os/sources/meta-bbb/lib/oeqa/runtime/cases/__init__.py
````

Create test case. Has to be same name than the recipe itself
````bash
touch ~/beaglebone_os/sources/meta-bbb/lib/oeqa/runtime/cases/example.py
````



Make sure that the custom layer is in conf/local.conf BBLAYERS field
````bash
ton@mx-5:~/beaglebone_os$ grep -A 10 "BBLAYERS ?=" build/conf/bblayers.conf 
BBLAYERS ?= " \
  /home/ton/beaglebone_os/poky/meta \
  /home/ton/beaglebone_os/poky/meta-poky \
  /home/ton/beaglebone_os/poky/meta-yocto-bsp \
  /home/ton/beaglebone_os/poky/meta-openembedded/meta-oe \
  /home/ton/beaglebone_os/sources/meta-bbb \ " # <--
ton@mx-5:~/beaglebone_os$
````

Create a test recipe, which will create a few files
````bash
ton@mx-5:~/beaglebone_os$ tree sources/meta-bbb/recipes-example/example/
sources/meta-bbb/recipes-example/example/
├── example_0.1.bb
└── files
    ├── example.cpp
    └── LICENSE

1 directory, 3 files
ton@mx-5:~/beaglebone_os$
````

Example recipe:
````bash
ton@mx-5:~/beaglebone_os/build$ cat /home/ton/beaglebone_os/sources/meta-bbb/recipes-example/example/example_0.1.bb 
SUMMARY = "bitbake-layers recipe"
DESCRIPTION = "Recipe created by bitbake-layers"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://LICENSE;md5=d41d8cd98f00b204e9800998ecf8427e"

SRC_URI += " file://example.cpp "

S = "${WORKDIR}"

TARGET_CC_ARCH += "${LDFLAGS}"

do_compile() {
    ${CXX} -Wall -g example.cpp -o example
}

do_install() {
    # Install example binary
    install -d ${D}${bindir}
    install -m 0755 ${S}/example ${D}${bindir}

    # Install test file
    install -d ${D}/etc
    touch ${D}/etc/test.txt
}


FILES_${PN} += "/etc/test.txt"
ton@mx-5:~/beaglebone_os/build$
````

Example test case:
````bash
ton@mx-5:~$ cat ~/beaglebone_os/sources/meta-bbb/lib/oeqa/runtime/cases/example.py 
from oeqa.runtime.case import OERuntimeTestCase
from oeqa.core.decorator.depends import OETestDepends

class ExampleTest(OERuntimeTestCase):
    def test_files_exists(self):
        (status, output) = self.target.run("ls -lai /etc/test.txt")
        self.assertEqual(status, 0, msg="status and output: %s and %s" % (status,output))

        (status, output) = self.target.run("ls -lai /usr/bin/example")
        self.assertEqual(status, 0, msg="status and output: %s and %s" % (status,output))
ton@mx-5:~$
````

Test results after running
````bash
RESULTS:
RESULTS - date.DateTest.test_date: PASSED (10.40s)
RESULTS - df.DfTest.test_df: PASSED (1.12s)
RESULTS - ping.PingTest.test_ping: PASSED (0.01s)
RESULTS - scp.ScpTest.test_scp_file: PASSED (4.74s)
RESULTS - ssh.SSHTest.test_ssh: PASSED (1.98s)
RESULTS - example.ExampleTest.test_file_exists: PASSED (0.91s) # <- Our test case
SUMMARY:
core-image-full-cmdline () - Ran 6 tests in 19.166s
core-image-full-cmdline - OK - All required tests passed (successes=6, skipped=0, failures=0, errors=0)
NOTE: Tasks Summary: Attempted 768 tasks of which 767 didn't need to be rerun and all succeeded.
ton@mx-5:~/beaglebone_os/build$
````

Intentionally breaking the test case results in a failed test run:
````bash
ton@mx-5:~/beaglebone_os/build$ grep -inr "usr/bin/" /home/ton/beaglebone_os/sources/meta-bbb/lib/oeqa/runtime/cases/example.py
9:        (status, output) = self.target.run("ls -lai /usr/bin/examle") # Looking for file 'examle', instead of 'example'
ton@mx-5:~/beaglebone_os/build$
````

````bash
Traceback (most recent call last):
  File "/home/ton/beaglebone_os/sources/meta-bbb/lib/oeqa/runtime/cases/example.py", line 10, in test_files_exists
    self.assertEqual(status, 0, msg="status and output: %s and %s" % (status,output))
AssertionError: 2 != 0 : status and output: 2 and ls: cannot access '/usr/bin/examle': No such file or directory

...

RESULTS - example.ExampleTest.test_files_exists: FAILED (1.76s)
SUMMARY:
core-image-full-cmdline () - Ran 6 tests in 19.922s
core-image-full-cmdline - FAIL - Required tests failed (successes=5, skipped=0, failures=1, errors=0)
````

# Errors
### Fix 'Exit code 137'
````bash
# Yocto build error stops unexpectedly:
yocto WARNING: exit code 137 from a shell command.

# Running out of memory
Confirm from dmesg

# Reboot PC, buy more RAM
````

### Fix 'NOTE: Reconnecting to bitbake server' error
````bash
rm bitbake.lock
# or kill the other bitbake process
````