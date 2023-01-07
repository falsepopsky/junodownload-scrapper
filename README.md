# junodownload scrapper

<div align="center">
  	<img src="docs/media/logo.jpg" alt="junodownload Logo"/>
</div>

## :information_source: About

With this scrapper you can get the `new` and `coming soon` releases `information` from junodownload website. Like the following:

| Information   | New Releases       | Coming Soon        |
| ------------- | ------------------ | ------------------ |
| Artist        | :heavy_check_mark: | :heavy_check_mark: |
| Album (title) | :heavy_check_mark: | :heavy_check_mark: |
| Label         | :heavy_check_mark: | :heavy_check_mark: |
| Cover (url)   | :heavy_check_mark: | :heavy_check_mark: |

<div align="center">
    <img src="docs/media/new_releases.png" alt="JunoDownload new releases"/>
  	<img src="docs/media/coming_soon.png" alt="JunoDownload coming soon releases"/>
</div>

## :package: Built with

- [cheerio](https://www.npmjs.com/package/cheerio)
- [fetch](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch)

## :pushpin: Setup

**:computer: System requirements**

- [Node.js](https://nodejs.org/en/download/current/) >=18
- MacOS, Windows (including WSL), and Linux are supported
- [pnpm](https://pnpm.io/)

**:arrows_counterclockwise: Clone repository**

```
git clone git@github.com:falsepopsky/junodownload-scrapper.git
```

**:checkered_flag: Install and start the scrapper**

```
pnpm install
```

```
pnpm build
```

```
pnpm dev
```

or import this package

```JavaScript
import { junoScrapper } from './dist/index.js';

async function start() {
  try {
    const releases = await junoScrapper();
    console.log(releases.get('New releases'));
    console.log(releases.get('Coming soon'));
  } catch (err) {
    console.log(err);
  }
}

start().catch((err) => console.log(err));
```

#### :scroll: License

[MIT](https://github.com/falsepopsky/junodownload-scrapper/blob/main/LICENSE)

#### :open_file_folder: Folder Structure

```
    .
    ├── docs                    # Documentation files
    ├── dev                     # Run the package as a dev
    ├── src                     # Source files
    └── README.md
```
