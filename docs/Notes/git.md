

##### Config
````bash
git config --global user.name "Firstname Lastname"
git config --global user.email "your_email@example.com"
````

##### Setup SSH keys
````powershell

# TLDR github example:
ssh-keygen -t rsa -C "your_email@example.com"
in github -> settings -> SSH and GPG keys -> new key -> paste public key here

# Another way:
https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html
````

##### Test SSH keys
````bash
ssh -T git@github.com
````

##### Connect to git repo
````bash
git remote add origin git@github.com:user/repo_name.git
git push origin master 
(if it doesn't work, then):
git pull --rebase origin master
git push origin master
````

##### Delete branches
````bash
# Delete remote branch
git push origin -d cleanup

# Delete local branch
git branch -D cleanup
````

##### Rename branches
````powershell
# Rename local and remote branch
# Example: rename master to old-master
git checkout master
git branch -m old-master
git push origin :master old-master
git push origin -u old-master
````

##### Fix 'is unmerged' error
````bash
# ton@ubuntu:~/work/git/test-repo$ git checkout -- .
# error: path 'Dockerfile' is unmerged
# error: path 'Makefile' is unmerged

git reset Makefile
git reset Dockerfile
````

##### Clear all staged files
````bash
git restore --staged .
````

##### Discard local changes for specific file
````bash
git checkout path/to/file.cpp
# This can resolve for example an issue when doing "git pull origin master" to 
# feature branch: "Please commit your changes or stash them before you merge. ( Note: you will lose your changes )"
````

##### Prevent LF -> CLRF ( line breaks ) change on one repo
````bash
git config --local core.autocrlf false
````

##### Undo a merge before pushing
````bash
1. Check the commit hash with git reflog
#Example:
#PS C:\work\git\example-branch> git reflog
#576e60f (HEAD -> master) HEAD@{1}: checkout: moving from feature-usb-support to master
#4fa9e62 (origin/master, origin/HEAD) HEAD@{4}: checkout: moving from feature-usb-led-support to master
#ca1499b (origin/feature-usb-led-support, feature-usb-led-support) HEAD@{5}: pull: Fast-forward
#b1f3ab7 HEAD@{6}: checkout: moving from feature-usb-support to feature-usb-led-support
#ead3f6e (origin/feature-usb-support, feature-usb-support) HEAD@{7}: checkout: moving from feature-usb-led-support to feature-usb-support
#b1f3ab7 HEAD@{8}: pull: Fast-forward
#fc2dced HEAD@{9}: checkout: moving from feature-usb-support to feature-usb-led-support
#ead3f6e (origin/feature-usb-support, feature-usb-support) HEAD@{10}: commit: Set LED on when communicating with devices
#83e438d HEAD@{11}: commit (merge): Merge LED handling changes.
#4fa9e62 (origin/master, origin/HEAD) HEAD@{13}: checkout: moving from feature-usb-led-support to master
#fc2dced HEAD@{14}: checkout: moving from feature-usb-support to feature-usb-led-support

git reset --hard 4fa9e62
````

##### Fix 'Failed to push some refs to..'
````bash
git push -u origin branch-name-here
# Some git providers throw this error for example when trying to push a new branch
````

##### Undo the last commit before pushing
````bash
# To undo and keep the changed made to files:
git reset HEAD^
# more? Error: Add " around HEAD^
Error: git reset "HEAD^"

# To undo and remove changes made to files:
git reset --hard HEAD^

# To remove last two commits and file changes:
git reset --hard HEAD~2
````

##### Discard untracked files
````bash
# List all:
git clean -n

# Delete ( directories and files ):
git clean -fd
````

##### Delete remote file ( keep locally )
````bash
git rm --cached <filename>
git rm --cached -r <dir_name>
git commit -m "Removed folder from repository"
git push origin master
````

##### Discard changes
````bash
git checkout -- .
````

##### Undo last local commit
````bash
# Undo:
git reset HEAD~

# Example:
git commit -m "Something terribly misguided"
git reset HEAD~
<< edit files as necessary >>
git add ...
git commit -c ORIG_HEAD
````

##### Resolve merge conflicts
````bash
# Example: conflict in merging feature branch 'io-sampler-optimizing' to 'develop' branch
1. git checkout develop
2. git pull
3. git checkout io-sampler-optimizing
4. git pull origin develop  # this creates the conflict lines in local files
5. Fix the conflicts
6. git add .
7. git commit -m "Resolved merge conflicts."
8. git push origin io-sampler-optimizing

# Some other tutorial:
https://confluence.atlassian.com/bitbucket/resolve-merge-conflicts-704414003.html

````

##### Change branch name
````bash
# Rename your local branch.

# If you are on the branch you want to rename:
git branch -m new-name

# If you are on a different branch:
git branch -m old-name new-name

# Delete the old-name remote branch and push the new-name local branch.
git push origin :old-name new-name

# Reset the upstream branch for the new-name local branch.
# Switch to the branch and then:
git push origin -u new-name
````

##### Revert to specific commit
````bash
git revert a66b89f
````

##### Delete last pushed commit
````bash
git push -f origin last_known_good_commit:branch_name
````

##### Start SSH agent on Linux
````bash
eval $(ssh-agent)
ssh-add ~/.ssh/github/github-key
````

##### Fix issue where git keeps asking for user credentials
````bash
# Change this:
ton@mx-5:~/beaglebone-os$ git config remote.origin.url
https://github.com/protoni/beaglebone-os

# To this:
git config remote.origin.url "git@github.com:protoni/beaglebone-os"
````


##### Fix issue with Changes not staged for commit
````bash
# I running this:
git checkout -- .

# Results in this:
Encountered 28 files that should have been pointers, but weren't:'

# Try this:
git rm --cached -r .
git reset --hard
git rm .gitattributes
git reset .
git checkout .
````

##### Emojis in commits
````bash
# Github commits support emojis, for example :wrench: is converted to:
🔧

# Example:
git commit -m ":wrench: Fixed a bug"

# Here are some more emojis
# Just add the ':' to start and end
🚀 (rocket) - Deploying or releasing new features
🐛 (bug) - Fixing a bug
✨ (sparkles) - Introducing new features
🧹 (broom) - Refactoring or cleaning up code
📦 (package) - Updating or adding dependencies
📝 (memo) - Updating documentation
🚧 (construction) - Work in progress
🔧 (wrench) - Changing configuration files or tooling
🛠 (hammer and wrench) - Making changes to the build process ortooling
⬆️ (arrow up) - Upgrading dependencies
⬇️ (arrow down) - Downgrading dependencies
🐎 (horse) - Improving performance
🎨 (art) - Improving UI/CSS styling
🚒 (fire engine) - Addressing a critical issue or hotfix
✅ (white_check_mark) - Adding tests
🔒 (lock) - Fixing security issues or improving security
💚 (green_heart) - Fixing CI/CD build
💄 (lipstick) - Improving UI/CSS styling
🌐 (globe_with_meridians) - Internationalization and localization
➖ (heavy_minus_sign) - Removing code or files
➕ (heavy_plus_sign) - Adding code or files
🎉 (tada) - Initial commit or major release
💡 (bulb) - Adding comments or documenting source code
🐧 (penguin) - Fixing something on Linux
🍏 (green_apple) - Fixing something on macOS
🏁 (checkered_flag) - Fixing something on Windows
👥 (busts in silhouette) - Adding contributor(s)
🔖 (bookmark) - Releasing / versioning tags
🚨 (rotating_light) - Fixing compiler/linter warnings
````