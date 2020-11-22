# JunoDownload Scrapper

<div align="center">
  	<img style="margin: 2em 0 2em 0" src="docs/media/logo.jpg" alt="JunoDownload Logo"/>
</div>

In this project you can get the new and coming soon releases information and covers from JunoDownload website, not music.

Just like:

- Artist
- Album Name
- Label
- Cover

This is just a test to show you, what you can do with web scrapping working with cheerio.

<div align="center" style="margin: 2em 0 2em 0">
    <img src="docs/media/new_releases.png" alt="JunoDownload new releases"/>
  	<img src="docs/media/coming_soon.png" alt="JunoDownload coming soon releases"/>
</div>

## Build with

```
cheerio, node-cron, node-fetch
```

<div style="margin: 4em 0 2em 0">

## How to start the Project

</div>

### What you need

- node.js

### Clone repository

```
$ git clone git@github.com:falsepopsky/web-scraping-cheerio.git
```

### Install the project and run

```
# install dependencies
npm install

# run the project
npm run dev
```

<div style="margin: 4em 0 2em 0">

## Folder Structure

</div>

    .
    ├── docs                    # Documentation files
    ├── src                     # Source files
    │   ├── data          		# Contains .json files about the scrapped website
    │   ├── images
    │   │   ├── releases        # Covers of the releases
    │   ├── services            # services like scrapping, download the images and writing JSON Files
    ├── index.js                # To run the project in production mode
    ├── dev.js                  # To run the project in dev mode
    └── README.md

<div style="margin: 4em 0 2em 0">

## Things to do

</div>

Like i said, this is a test, i would like to improve more the code and other things, but i spend a lot of my time learning new stuff.

So things to do would be:

- Just scrap the website if the response it's okay (res.status = 'ok'), also if you get an error start maybe in the next hour.
- set the new url of my identities from the releases object with the actual route `./src/images/releases`... .
- thinking...
