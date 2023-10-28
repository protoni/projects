

## Net tools
##### Arp scan
````bash
# Use arp-scan to scan local network for online devices
sudo apt install arp-scan
sudo arp-scan 192.168.1.0/24
````

## Domains
##### Set domain for a website
````bash
# Purchase a domain from a domain registrar ( e.g. protoni.fi )
For example domainhotelli.fi. I'll also use that as an example here'

# If nameserver changes are not needed, for example in git pages,
# then simply add the A records to DNS-settings of the Domain
# registrar
Home -> Services -> Select domain -> Go to settings ( cPanel ) ->
DNS-settings -> Manage 

# For example with Git Pages; add these A records
# Check github link from the bottom of the page to see if the GitHub 
# Pages IPs has changed
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

# Remove any other A record pointing to your Apex domain
( e.g. protoni.fi )

# Make sure that they are in use ( Use WSL or other Linux pc );
# Alternatively, use the domain details tools in 'Links' section
protoni@DESKTOP-6VRBIN5:~$ dig www.protoni.fi +nostats +nocomments +nocmd
;www.protoni.fi.                        IN      A
www.protoni.fi.         0       IN      CNAME   protoni.fi.
protoni.fi.             0       IN      A       185.199.111.153
protoni.fi.             0       IN      A       185.199.109.153
protoni.fi.             0       IN      A       185.199.108.153
protoni.fi.             0       IN      A       185.199.110.153

# Also make sure that there are no other IP addresses, otherwise it will
# not work. For example Domainhotelli has a default A record and if that
# is not deleted first, DNS resolvers can't decide where to point and
# just picks the first one.

# Add your domain to git pages
GitHub -> Repositories/your_repo -> Settings -> Pages -> Custom domain

# Enable SSL
GitHub -> Repositories/your_repo -> Settings -> Pages -> Enforce HTTPS

# Note ( Enfore HTTPS issues ):
I had issues with enabling the SSL since I moved from Netlify to
Git Pages. It kept complaining about 'invalid certificate' or something
along those lines, so I had to remove the domain from GitHub
repository settings 'Custom domain', save, wait for a bit and then add
it again

# Note ( nameserver changes ):
Earlier I was using Netlify and I had to go to Netlify's project'
settings, copy-paste the 4 name servers to Domain registrar
( domainhotelli) and wait for a few hours that DNS points to right
place and then add the A and MX records to Netlify instead

# If nameservers changes are needed Set nameservers
Domains -> Select your domain -> Copy paste the web host's name servers'
here

# Note ( Fix Github domain disappearing on every commit )
Create a file 'CNAME' under docs/ and write your domain in there with no newline
````

#### Custom domain e-mail service
````bash
# I use Zoho as email service. ( can't remember exactly how the email
# service setup went, so just assuming it went something like explained
# below )
1. Create an account there or some other e-mail service
2. Login -> Profile -> Email Address -> Add Email Address with your own
domain

# Setup MX records. This I remember since I just did that
Login to domain registrar ( e.g. Domainhotelli ) -> Go to domain settings
-> DNS settings -> Manage -> Add following MX records:

# Name      TTL     Type    Priority    Destination
protoni.fi  3600    MX      10          mx.zoho.eu
protoni.fi  3600    MX      20          mx2.zoho.eu
protoni.fi  3600    MX      50          mx3.zoho.eu

# Remove any other MX record pointing to your Apex domain
( e.g. protoni.fi )

# Make sure that they are in use ( Use WSL or other Linux pc );
# Alternatively, use the domain details tools in 'Links' section
protoni@DESKTOP-6VRBIN5:~$ dig www.protoni.fi +nostats +nocomments +nocmd MX +short
protoni.fi.
50 mx3.zoho.eu.
10 mx.zoho.eu.
20 mx2.zoho.eu.

# Also make sure that there are no other IP addresses/domains, otherwise
# it will not work. For example Domainhotelli has a default MX record and
# if that is not deleted first, DNS resolvers can't decide where to
# point and just picks the first one.

````

## Links
- Configuring an apex domain
    - <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain>
- Domain tools
    - https://zohomail.tools/#domainDetails/