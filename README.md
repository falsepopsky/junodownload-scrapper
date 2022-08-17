# junodownload Scrapper

<div align="center">
  	<img src="docs/media/logo.jpg" alt="junodownload Logo"/>
</div>

## :information_source: About

With this scrapper you can get the new and coming soon releases `information` from JunoDownload website.

Like the folowing:

- Artist
- Album name
- Label
- Cover

This is just a test to show you, what you can do with web scrapping working with cheerio.

<div align="center">
    <img src="docs/media/new_releases.png" alt="JunoDownload new releases"/>
  	<img src="docs/media/coming_soon.png" alt="JunoDownload coming soon releases"/>
</div>

## Built with

```
cheerio, node-fetch
```

## How to start the Project

### What you need

- node.js

### Clone repository

```
git clone git@github.com:falsepopsky/junodownload-scrapper.git
```

### Install the project and run

```
# install dependencies
pnpm install

# run the project
npm run dev
```

#### :open_file_folder: Folder Structure

<div style="margin: 4em 0 2em 0">

    .
    ├── docs                    # Documentation files
    ├── src                     # Source files
    │   ├── data          		# Contains .json files about the scrapped website
    │   ├── services            # services like scrapping, download the images and writing JSON Files
    ├── index.js                # To run the project in production mode
    ├── dev.js                  # To run the project in dev mode
    └── README.md

</div>

## Things to do

Like i said, this is a test, i would like to improve more the code and other things, but i spend a lot of my time learning new stuff.

So things to do would be:

- Just scrap the website if the response it's okay (res.status = 'ok'), also if you get an error start maybe in the next hour.
- set the new url of my identities from the releases object with the actual route `./src/images/releases`... .
- thinking...
