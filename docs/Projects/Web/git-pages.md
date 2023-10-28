
## Description
Some notes on how to setup a Github Pages website that is hosted on and served
from a public Github repository.

Upsides are that it's pretty effortless to maintain and add new content with
Github CI pipeline ( auto build/deploy site ) and it is free ( if using default
'user.github.io/repo' domain ). 


```bash
# My workflow with this setup if usually something like this:
1. Move to the local repository
2. code .
3. Open a file and 'Open preview to the side'
4. Edit some notes
5. Commit and push

# Occasionally, instead of 'open preview to the side' I use 'mkdocs serve'
# to run a local web page if I need to see how the formatting, table of contents
# and other layout related things look like
```

## Tools needed
- Github account
- Git
- Git LFS ( Needed for images, videos and other binary data )
- Python


## Setup git and git lfs
```bash
# Setup Git
https://git-scm.com/download/win

# Create a common folder where your Git repositories go, for example
C:/work/git/

# Install Git LFS
https://git-lfs.com/

# You should have 'Git Bash' installed in Windows, open it and
cd /c/work/git

# Setup Git LFS
git lfs install

# Add files to LFS separately by filetype
git lfs track "*.png" 
git lfs track "*.jpg" 

# OR add all binary data to same folder and add only that
git lfs track "binary_data_folder/**"
```

## Setup env
```bash
python -m venv venv
source venv/Scripts/activate

# Install dependencies
pip install mkdocs-material

# ( Optional ) Install other dependencies
pip install mkdocs-git-revision-date-localized-plugin
pip install mkdocs-glightbox

# Create new project
mkdocs new .

# Run local page:
mkdocs serve

# Note: If you are hosting images externally, access the website using localhost,
# instead of 127.0.0.1, otherwise the images won't show up for some reason.
```



## Setup build/deploy pipeline
```bash
# Create Git workflow setup
mkdir projects/.github/workflows
touch ci.yml


# Add to ci.yml:
name: ci 
on:
  push:
    branches:
      - master 
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          lfs: true
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - uses: actions/cache@v2
        with:
          key: ${{ github.ref }}
          path: .cache
      - run: git lfs checkout
      - run: pip install mkdocs-git-revision-date-localized-plugin
      - run: pip install mkdocs-glightbox
      - run: pip install mkdocs-material 
      - run: mkdocs gh-deploy --force
```

:zap: Note: `lfs: true` this did not work for me, had to add the `- run: git lfs checkout` step
to make Git Pages load images from Git LFS

## Add content
````bash
# Project structure is as follows:
- .github/
  - workflows/
    - ci.yml
- docs/
  - Projects/ # Name can be whatever
    - Project/ # Name can be whatever
      - git-pages.md # Name can be whatever, this will Show up as 'Git pages' link
  - stylesheets/ # Optional, for custom themes
    - styles.css
  - venv/ # Created by python, add to .gitignore
  - index.md # This is the home page
- .gitignore
- .gitattributes
- mkdocs.yml

# Create the above file structure and keep adding Project/ folders and .md files
# under them. Alternatively, you can create sub folders under the Projects/ to
# add gategories
````

For example, this page is just a markdown file here:

<https://github.com/protoni/projects/blob/main/docs/Projects/Web/git-pages.md>


## Setup custom domain name ( e.g. protoni.fi )
I have added some notes on my notes/ site on how to setup custom domain and
email

<https://protoni.fi/Notes/network/#domains>