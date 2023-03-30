# Git Pages

:exclamation: Work in progress! :exclamation:

## Description

---

## Tools needed
- Git
- Git LFS
- Python

---

## Setup git


---

## Setup env

```
python -m venv venv
source venv/Scripts/activate
pip install mkdocs-material
mkdocs new .
```
Run local page:
```
mkdocs serve
```

---

## Setup build/deploy pipeline

```
mkdir projects/.github/workflows
touch ci.yml
```

Add to ci.yml:
```
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
      - run: pip install mkdocs-material 
      - run: mkdocs gh-deploy --force
```

:zap: Note: `lfs: true` this did not work for me, had to add the `- run: git lfs checkout` step
to make Git Pages load images from Git LFS

