import { createCheerioInstance, scrapeReleases } from './cheerio.js';

const TEMPLATE = `<html><body id="juno-main">
<div id="juno-app">
  <div class="header">
    <div class="container-fluid header-bar">
      <button
        type="button"
        class="btn btn-nav-mobile touch-toggle d-block d-lg-none"
        aria-label="Menu">
        <span class="glyphicon glyphicon-menu" aria-hidden="true"></span>
      </button>
      <div class="header-logo">
        <a href="https://www.junodownload.com" title="Juno Download"
          ><svg><use xlink:href="#logo-juno" /></svg
        ></a>
      </div>
      <div id="nav" class="nav" data-ua_location="navigation">
        <div class="nav-menu-item touch-hover th-delay" id="genres">
          <div class="nav-menu-btn" aria-haspopup="true">
            <span>GENRES</span>
            <div
              class="glyphicon glyphicon-chevron-right nav-arrow"
              aria-hidden="true"
              onclick="this.parentNode.parentNode.classList.remove('open');"></div>
          </div>
          <div class="nav-menu-dd touch-dd">
            <div class="row">
              <div class="col-12 col-lg-4">
                <a class="nav-item" href="https://www.junodownload.com/all/">All genres</a
                ><a class="nav-item" href="https://www.junodownload.com/downtempo/"
                  >Balearic/Downtempo</a
                ><a class="nav-item" href="https://www.junodownload.com/bass/">Bass</a
                ><a class="nav-item" href="https://www.junodownload.com/breakbeat/">Breakbeat</a
                ><a class="nav-item" href="https://www.junodownload.com/disco/"
                  >Disco/Nu-Disco</a
                ><a class="nav-item" href="https://www.junodownload.com/dj-tools/">DJ Tools</a
                ><a class="nav-item" href="https://www.junodownload.com/drumandbass/"
                  >Drum & Bass / Jungle</a
                ><a class="nav-item" href="https://www.junodownload.com/dubstep/">Dubstep</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/deep-dubstep/"
                  >Deep Dubstep</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dirty-heavy-dubstep/"
                  >Dirty Dubstep/Trap/Grime</a
                ><a class="nav-item" href="https://www.junodownload.com/electro/">Electro</a
                ><a class="nav-item" href="https://www.junodownload.com/dance-pop/"
                  >Euro Dance/Pop Dance</a
                ><a class="nav-item" href="https://www.junodownload.com/footwork-juke/"
                  >Footwork/Juke</a
                >
              </div>
              <div class="col-12 col-lg-4">
                <a class="nav-item" href="https://www.junodownload.com/funk-soul-jazz/"
                  >Funk Soul & Jazz</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/broken-beat/"
                  >Broken Beat/Nu Jazz</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/funk-reissues/"
                  >Funk</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/international/"
                  >International</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/jazz/">Jazz</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/soul/">Soul</a
                ><a class="nav-item" href="https://www.junodownload.com/hardcore/"
                  >Hardcore/style</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/gabba/">Gabba</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/hardstyle/"
                  >Hardstyle</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/uk-hardcore/"
                  >UK Hardcore</a
                ><a class="nav-item" href="https://www.junodownload.com/hip-hop/">Hip Hop/R&B</a
                ><a class="nav-item" href="https://www.junodownload.com/house/">House</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/deep-house/"
                  >Deep House</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/electro-house/"
                  >Electro House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/funky-club-house/"
                  >Funky/Club House</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/hard-house/"
                  >Hard House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/minimal-tech-house/"
                  >Minimal/Tech House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/progressive-house/"
                  >Progressive House</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/scouse-house/"
                  >Scouse House</a
                ><a class="nav-item" href="https://www.junodownload.com/leftfield/">Leftfield</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/ambient-drone/"
                  >Ambient/Drone</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/coldwave-synth/"
                  >Coldwave/Synth</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/experimental-electronic/"
                  >Experimental/Electronic</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/industrial-noise/"
                  >Industrial/Noise</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/soundtrack/"
                  >Soundtracks</a
                >
              </div>
              <div class="col-12 col-lg-4">
                <a class="nav-item" href="https://www.junodownload.com/pop/">Pop</a
                ><a class="nav-item" href="https://www.junodownload.com/reggae/">Reggae</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dancehall-reggae/"
                  >Dancehall/Ragga</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/dub-reggae/"
                  >Dub</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/reggae-classics/"
                  >Reggae Classics/Ska</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/roots-reggae/"
                  >Roots/Lovers Rock</a
                ><a class="nav-item" href="https://www.junodownload.com/sample-packs/"
                  >Sample Packs</a
                ><a class="nav-item" href="https://www.junodownload.com/rock-music/"
                  >Rock (All)</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/50s-60s-rocknroll-rhythmandblues/"
                  >50s/60s</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/indie/"
                  >Indie/Alternative</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/rock/">Rock</a
                ><a class="nav-item" href="https://www.junodownload.com/techno/">Techno (All)</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/hard-techno/"
                  >Hard Techno</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/techno-music/"
                  >Techno</a
                ><a class="nav-item" href="https://www.junodownload.com/trance-music/">Trance</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/hard-trance/"
                  >Hard Trance</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/pop-trance/"
                  >Pop Trance</a
                ><a class="nav-item ni-sub" href="https://www.junodownload.com/psy-goa-trance/"
                  >Psy/Goa Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/uplifting-trance/"
                  >Uplifting Trance</a
                ><a class="nav-item" href="https://www.junodownload.com/4x4-garage/"
                  >UK Garage</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="nav-menu-item touch-hover th-delay" id="new-releases">
          <div class="nav-menu-btn" aria-haspopup="true">
            <a
              href="https://www.junodownload.com/all/this-week/releases/"
              data-ua_action="click main nav tab: new-releases"
              onclick="uaAddEvent(event);"
              >NEW RELEASES</a
            >
            <div
              class="glyphicon glyphicon-chevron-right nav-arrow"
              aria-hidden="true"
              onclick="this.parentNode.parentNode.classList.remove('open');"></div>
          </div>
          <div class="nav-menu-dd touch-dd">
            <div class="row">
              <div class="col-12 col-lg-4">
                <a
                  class="nav-item"
                  href="https://www.junodownload.com/all/this-week/releases/"
                  rel="nofollow"
                  >All genres</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/downtempo/this-week/releases/"
                  rel="nofollow"
                  >Balearic/Downtempo</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/bass/this-week/releases/"
                  rel="nofollow"
                  >Bass</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/breakbeat/this-week/releases/"
                  rel="nofollow"
                  >Breakbeat</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/disco/this-week/releases/"
                  rel="nofollow"
                  >Disco/Nu-Disco</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/dj-tools/this-week/releases/"
                  rel="nofollow"
                  >DJ Tools</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/drumandbass/this-week/releases/"
                  rel="nofollow"
                  >Drum & Bass / Jungle</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/dubstep/this-week/releases/"
                  rel="nofollow"
                  >Dubstep</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/deep-dubstep/this-week/releases/"
                  rel="nofollow"
                  >Deep Dubstep</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dirty-heavy-dubstep/this-week/releases/"
                  rel="nofollow"
                  >Dirty Dubstep/Trap/Grime</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/electro/this-week/releases/"
                  rel="nofollow"
                  >Electro</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/dance-pop/this-week/releases/"
                  rel="nofollow"
                  >Euro Dance/Pop Dance</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/footwork-juke/this-week/releases/"
                  rel="nofollow"
                  >Footwork/Juke</a
                >
              </div>
              <div class="col-12 col-lg-4">
                <a
                  class="nav-item"
                  href="https://www.junodownload.com/funk-soul-jazz/this-week/releases/"
                  rel="nofollow"
                  >Funk Soul & Jazz</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/broken-beat/this-week/releases/"
                  rel="nofollow"
                  >Broken Beat/Nu Jazz</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/funk-reissues/this-week/releases/"
                  rel="nofollow"
                  >Funk</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/international/this-week/releases/"
                  rel="nofollow"
                  >International</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/jazz/this-week/releases/"
                  rel="nofollow"
                  >Jazz</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/soul/this-week/releases/"
                  rel="nofollow"
                  >Soul</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/hardcore/this-week/releases/"
                  rel="nofollow"
                  >Hardcore/style</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/gabba/this-week/releases/"
                  rel="nofollow"
                  >Gabba</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hardstyle/this-week/releases/"
                  rel="nofollow"
                  >Hardstyle</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/uk-hardcore/this-week/releases/"
                  rel="nofollow"
                  >UK Hardcore</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/hip-hop/this-week/releases/"
                  rel="nofollow"
                  >Hip Hop/R&B</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/house/this-week/releases/"
                  rel="nofollow"
                  >House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/deep-house/this-week/releases/"
                  rel="nofollow"
                  >Deep House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/electro-house/this-week/releases/"
                  rel="nofollow"
                  >Electro House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/funky-club-house/this-week/releases/"
                  rel="nofollow"
                  >Funky/Club House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hard-house/this-week/releases/"
                  rel="nofollow"
                  >Hard House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/minimal-tech-house/this-week/releases/"
                  rel="nofollow"
                  >Minimal/Tech House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/progressive-house/this-week/releases/"
                  rel="nofollow"
                  >Progressive House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/scouse-house/this-week/releases/"
                  rel="nofollow"
                  >Scouse House</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/leftfield/this-week/releases/"
                  rel="nofollow"
                  >Leftfield</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/ambient-drone/this-week/releases/"
                  rel="nofollow"
                  >Ambient/Drone</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/coldwave-synth/this-week/releases/"
                  rel="nofollow"
                  >Coldwave/Synth</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/experimental-electronic/this-week/releases/"
                  rel="nofollow"
                  >Experimental/Electronic</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/industrial-noise/this-week/releases/"
                  rel="nofollow"
                  >Industrial/Noise</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/soundtrack/this-week/releases/"
                  rel="nofollow"
                  >Soundtracks</a
                >
              </div>
              <div class="col-12 col-lg-4">
                <a
                  class="nav-item"
                  href="https://www.junodownload.com/pop/this-week/releases/"
                  rel="nofollow"
                  >Pop</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/reggae/this-week/releases/"
                  rel="nofollow"
                  >Reggae</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dancehall-reggae/this-week/releases/"
                  rel="nofollow"
                  >Dancehall/Ragga</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dub-reggae/this-week/releases/"
                  rel="nofollow"
                  >Dub</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/reggae-classics/this-week/releases/"
                  rel="nofollow"
                  >Reggae Classics/Ska</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/roots-reggae/this-week/releases/"
                  rel="nofollow"
                  >Roots/Lovers Rock</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/all/four-weeks/releases/?music_product_type=producer-pack"
                  rel="nofollow"
                  >Sample Packs</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/rock-music/this-week/releases/"
                  rel="nofollow"
                  >Rock (All)</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/50s-60s-rocknroll-rhythmandblues/this-week/releases/"
                  rel="nofollow"
                  >50s/60s</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/indie/this-week/releases/"
                  rel="nofollow"
                  >Indie/Alternative</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/rock/this-week/releases/"
                  rel="nofollow"
                  >Rock</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/techno/this-week/releases/"
                  rel="nofollow"
                  >Techno (All)</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hard-techno/this-week/releases/"
                  rel="nofollow"
                  >Hard Techno</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/techno-music/this-week/releases/"
                  rel="nofollow"
                  >Techno</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/trance-music/this-week/releases/"
                  rel="nofollow"
                  >Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hard-trance/this-week/releases/"
                  rel="nofollow"
                  >Hard Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/pop-trance/this-week/releases/"
                  rel="nofollow"
                  >Pop Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/psy-goa-trance/this-week/releases/"
                  rel="nofollow"
                  >Psy/Goa Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/uplifting-trance/this-week/releases/"
                  rel="nofollow"
                  >Uplifting Trance</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/4x4-garage/this-week/releases/"
                  rel="nofollow"
                  >UK Garage</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="nav-menu-item touch-hover th-delay" id="bestsellers">
          <div class="nav-menu-btn" aria-haspopup="true">
            <a
              href="https://www.junodownload.com/all/charts/bestsellers/this-week/releases/"
              data-ua_action="click main nav tab: bestsellers"
              onclick="uaAddEvent(event);"
              >BESTSELLERS</a
            >
            <div
              class="glyphicon glyphicon-chevron-right nav-arrow"
              aria-hidden="true"
              onclick="this.parentNode.parentNode.classList.remove('open');"></div>
          </div>
          <div class="nav-menu-dd touch-dd">
            <div class="row">
              <div class="col-12 col-lg-4">
                <a
                  class="nav-item"
                  href="https://www.junodownload.com/all/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >All genres</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/downtempo/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Balearic/Downtempo</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/bass/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Bass</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/breakbeat/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Breakbeat</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/disco/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Disco/Nu-Disco</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/dj-tools/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >DJ Tools</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/drumandbass/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Drum & Bass / Jungle</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/dubstep/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Dubstep</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/deep-dubstep/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Deep Dubstep</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dirty-heavy-dubstep/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Dirty Dubstep/Trap/Grime</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/electro/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Electro</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/dance-pop/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Euro Dance/Pop Dance</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/footwork-juke/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Footwork/Juke</a
                >
              </div>
              <div class="col-12 col-lg-4">
                <a
                  class="nav-item"
                  href="https://www.junodownload.com/funk-soul-jazz/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Funk Soul & Jazz</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/broken-beat/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Broken Beat/Nu Jazz</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/funk-reissues/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Funk</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/international/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >International</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/jazz/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Jazz</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/soul/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Soul</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/hardcore/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Hardcore/style</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/gabba/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Gabba</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hardstyle/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Hardstyle</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/uk-hardcore/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >UK Hardcore</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/hip-hop/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Hip Hop/R&B</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/house/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/deep-house/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Deep House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/electro-house/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Electro House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/funky-club-house/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Funky/Club House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hard-house/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Hard House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/minimal-tech-house/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Minimal/Tech House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/progressive-house/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Progressive House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/scouse-house/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Scouse House</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/leftfield/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Leftfield</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/ambient-drone/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Ambient/Drone</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/coldwave-synth/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Coldwave/Synth</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/experimental-electronic/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Experimental/Electronic</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/industrial-noise/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Industrial/Noise</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/soundtrack/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Soundtracks</a
                >
              </div>
              <div class="col-12 col-lg-4">
                <a
                  class="nav-item"
                  href="https://www.junodownload.com/pop/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Pop</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/reggae/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Reggae</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dancehall-reggae/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Dancehall/Ragga</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dub-reggae/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Dub</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/reggae-classics/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Reggae Classics/Ska</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/roots-reggae/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Roots/Lovers Rock</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/all/charts/bestsellers/six-months/releases/?music_product_type=producer-pack"
                  rel="nofollow"
                  >Sample Packs</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/rock-music/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Rock (All)</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/50s-60s-rocknroll-rhythmandblues/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >50s/60s</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/indie/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Indie/Alternative</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/rock/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Rock</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/techno/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Techno (All)</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hard-techno/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Hard Techno</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/techno-music/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Techno</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/trance-music/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hard-trance/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Hard Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/pop-trance/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Pop Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/psy-goa-trance/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Psy/Goa Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/uplifting-trance/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >Uplifting Trance</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/4x4-garage/charts/bestsellers/this-week/releases/"
                  rel="nofollow"
                  >UK Garage</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="nav-menu-item touch-hover th-delay" id="dj-charts">
          <div class="nav-menu-btn" aria-haspopup="true">
            <a
              href="https://www.junodownload.com/all/top_dj_charts/"
              data-ua_action="click main nav tab: dj-charts"
              onclick="uaAddEvent(event);"
              ><span class="d-lg-none d-xl-inline">DJ </span>CHARTS</a
            >
            <div
              class="glyphicon glyphicon-chevron-right nav-arrow"
              aria-hidden="true"
              onclick="this.parentNode.parentNode.classList.remove('open');"></div>
          </div>
          <div class="nav-menu-dd touch-dd">
            <div class="row">
              <div class="col-12 col-lg-4">
                <a
                  class="nav-item"
                  href="https://www.junodownload.com/all/top_dj_charts/"
                  rel="nofollow"
                  >All genres</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/downtempo/top_dj_charts/"
                  rel="nofollow"
                  >Balearic/Downtempo</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/bass/top_dj_charts/"
                  rel="nofollow"
                  >Bass</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/breakbeat/top_dj_charts/"
                  rel="nofollow"
                  >Breakbeat</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/disco/top_dj_charts/"
                  rel="nofollow"
                  >Disco/Nu-Disco</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/dj-tools/top_dj_charts/"
                  rel="nofollow"
                  >DJ Tools</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/drumandbass/top_dj_charts/"
                  rel="nofollow"
                  >Drum & Bass / Jungle</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/dubstep/top_dj_charts/"
                  rel="nofollow"
                  >Dubstep</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/deep-dubstep/top_dj_charts/"
                  rel="nofollow"
                  >Deep Dubstep</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dirty-heavy-dubstep/top_dj_charts/"
                  rel="nofollow"
                  >Dirty Dubstep/Trap/Grime</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/electro/top_dj_charts/"
                  rel="nofollow"
                  >Electro</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/dance-pop/top_dj_charts/"
                  rel="nofollow"
                  >Euro Dance/Pop Dance</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/footwork-juke/top_dj_charts/"
                  rel="nofollow"
                  >Footwork/Juke</a
                >
              </div>
              <div class="col-12 col-lg-4">
                <a
                  class="nav-item"
                  href="https://www.junodownload.com/funk-soul-jazz/top_dj_charts/"
                  rel="nofollow"
                  >Funk Soul & Jazz</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/broken-beat/top_dj_charts/"
                  rel="nofollow"
                  >Broken Beat/Nu Jazz</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/funk-reissues/top_dj_charts/"
                  rel="nofollow"
                  >Funk</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/international/top_dj_charts/"
                  rel="nofollow"
                  >International</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/jazz/top_dj_charts/"
                  rel="nofollow"
                  >Jazz</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/soul/top_dj_charts/"
                  rel="nofollow"
                  >Soul</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/hardcore/top_dj_charts/"
                  rel="nofollow"
                  >Hardcore/style</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/gabba/top_dj_charts/"
                  rel="nofollow"
                  >Gabba</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hardstyle/top_dj_charts/"
                  rel="nofollow"
                  >Hardstyle</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/uk-hardcore/top_dj_charts/"
                  rel="nofollow"
                  >UK Hardcore</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/hip-hop/top_dj_charts/"
                  rel="nofollow"
                  >Hip Hop/R&B</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/house/top_dj_charts/"
                  rel="nofollow"
                  >House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/deep-house/top_dj_charts/"
                  rel="nofollow"
                  >Deep House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/electro-house/top_dj_charts/"
                  rel="nofollow"
                  >Electro House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/funky-club-house/top_dj_charts/"
                  rel="nofollow"
                  >Funky/Club House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hard-house/top_dj_charts/"
                  rel="nofollow"
                  >Hard House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/minimal-tech-house/top_dj_charts/"
                  rel="nofollow"
                  >Minimal/Tech House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/progressive-house/top_dj_charts/"
                  rel="nofollow"
                  >Progressive House</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/scouse-house/top_dj_charts/"
                  rel="nofollow"
                  >Scouse House</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/leftfield/top_dj_charts/"
                  rel="nofollow"
                  >Leftfield</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/ambient-drone/top_dj_charts/"
                  rel="nofollow"
                  >Ambient/Drone</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/coldwave-synth/top_dj_charts/"
                  rel="nofollow"
                  >Coldwave/Synth</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/experimental-electronic/top_dj_charts/"
                  rel="nofollow"
                  >Experimental/Electronic</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/industrial-noise/top_dj_charts/"
                  rel="nofollow"
                  >Industrial/Noise</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/soundtrack/top_dj_charts/"
                  rel="nofollow"
                  >Soundtracks</a
                >
              </div>
              <div class="col-12 col-lg-4">
                <a
                  class="nav-item"
                  href="https://www.junodownload.com/pop/top_dj_charts/"
                  rel="nofollow"
                  >Pop</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/reggae/top_dj_charts/"
                  rel="nofollow"
                  >Reggae</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dancehall-reggae/top_dj_charts/"
                  rel="nofollow"
                  >Dancehall/Ragga</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/dub-reggae/top_dj_charts/"
                  rel="nofollow"
                  >Dub</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/reggae-classics/top_dj_charts/"
                  rel="nofollow"
                  >Reggae Classics/Ska</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/roots-reggae/top_dj_charts/"
                  rel="nofollow"
                  >Roots/Lovers Rock</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/rock-music/top_dj_charts/"
                  rel="nofollow"
                  >Rock (All)</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/50s-60s-rocknroll-rhythmandblues/top_dj_charts/"
                  rel="nofollow"
                  >50s/60s</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/indie/top_dj_charts/"
                  rel="nofollow"
                  >Indie/Alternative</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/rock/top_dj_charts/"
                  rel="nofollow"
                  >Rock</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/techno/top_dj_charts/"
                  rel="nofollow"
                  >Techno (All)</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hard-techno/top_dj_charts/"
                  rel="nofollow"
                  >Hard Techno</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/techno-music/top_dj_charts/"
                  rel="nofollow"
                  >Techno</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/trance-music/top_dj_charts/"
                  rel="nofollow"
                  >Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/hard-trance/top_dj_charts/"
                  rel="nofollow"
                  >Hard Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/pop-trance/top_dj_charts/"
                  rel="nofollow"
                  >Pop Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/psy-goa-trance/top_dj_charts/"
                  rel="nofollow"
                  >Psy/Goa Trance</a
                ><a
                  class="nav-item ni-sub"
                  href="https://www.junodownload.com/uplifting-trance/top_dj_charts/"
                  rel="nofollow"
                  >Uplifting Trance</a
                ><a
                  class="nav-item"
                  href="https://www.junodownload.com/4x4-garage/top_dj_charts/"
                  rel="nofollow"
                  >UK Garage</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="nav-menu-item touch-hover th-delay" id="more">
          <div class="nav-menu-btn" aria-haspopup="true">
            <span>MORE</span>
            <div
              class="glyphicon glyphicon-chevron-right nav-arrow"
              aria-hidden="true"
              onclick="this.parentNode.parentNode.classList.remove('open');"></div>
          </div>
          <div class="nav-menu-dd touch-dd">
            <div class="row">
              <div class="col-12">
                <a class="nav-item" href="/news/" rel="nofollow">News</a
                ><a class="nav-item" href="/all/juno-recommends/" rel="nofollow"
                  >Juno Recommends</a
                ><a class="nav-item" href="/all/preorders/" rel="nofollow">Preorders</a
                ><a class="nav-item" href="/all/sample-packs/" rel="nofollow">Sample Packs</a
                ><a class="nav-item" href="/all/stems/releases/" rel="nofollow">Stems</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-search d-none d-sm-block">
        <form action="/search/" id="search-term-main" class="juno-search">
          <div id="query-main-container">
            <input
              type="text"
              id="query-main"
              name="q[all][]"
              class="form-control search-input"
              placeholder="Search Juno..."
              autocomplete="off" />
          </div>
          <button type="submit" id="search-submit" title="Search">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </form>
      </div>
      <div class="header-toolbar">
        <div class="ht-item ht-mobile-search touch-toggle th-delay d-block d-md-none">
          <a class="ht-btn" aria-haspopup="true"
            ><span class="glyphicon glyphicon-search" aria-hidden="true" title="Search"></span
          ></a>
          <div class="ht-dd touch-dd mobile-search"></div>
        </div>
        <div class="ht-item ht-help touch-toggle th-delay d-none d-md-block">
          <a
            class="ht-btn"
            onclick="ga('send', 'event','Masthead', 'Click', 'Help');"
            href="https://www.junodownload.com/help/"
            aria-haspopup="true"
            ><span class="glyphicon glyphicon-help" aria-hidden="true" title="Help"></span
          ></a>
          <div class="ht-dd touch-dd help">
            <a class="ht-dd-item" href="https://www.junodownload.com/help/ordering/">Ordering</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/help/ordering-problems/"
              >Ordering Problems</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/help/faq/">FAQ</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/contact-juno/"
              >Contact Us (Customers)</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/supplier-contact-form/"
              >Contact Us (Suppliers)</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/gift/"
              >Gift certificates</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/help/about/">About Juno</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/account/"
              >Manage account</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/help/my-charts/"
              >My Charts</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/feedback/">Feedback</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/help/privacy-policy/"
              >Privacy Policy</a
            ><a
              class="ht-dd-item"
              href="https://www.junodownload.com/help/terms-and-conditions/"
              >Terms and Conditions</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/help/marketing/"
              >Juno Marketing and PR department</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/profile-form/"
              >Artist / Label Profile Submission</a
            ><a class="ht-dd-item" href="https://www.junodownload.com/promote/"
              >Promote your label / releases</a
            ><a
              class="ht-dd-item"
              href="https://www.junodownload.com/help/download-via-dropbox/"
              >How do I download via Dropbox?</a
            >
          </div>
        </div>
        <div class="ht-item ht-my-juno touch-toggle th-delay">
          <a
            class="ht-btn login-soft"
            onclick="ga('send', 'event','Masthead', 'Click', 'Login');"
            href="https://www.junodownload.com/login/"
            data-redir="https%3A%2F%2Fwww.junodownload.com%2F"
            rel="nofollow"
            aria-haspopup="true"
            ><span class="glyphicon glyphicon-person" aria-hidden="true" title="My Juno"></span
          ></a>
          <div class="ht-dd touch-dd my-juno">
            <div class="ht-login">
              <a
                class="btn btn-block btn-primary login-soft"
                onclick="ga('send', 'event','Masthead', 'Click', 'Login');"
                href="https://www.junodownload.com/login/"
                data-redir="https%3A%2F%2Fwww.junodownload.com%2F"
                rel="nofollow"
                >Log In/Register</a
              >
            </div>
            <a
              onclick="ga('send', 'event','Masthead', 'Click', 'MyJuno - My artists and labels');"
              class="ht-dd-item login-soft"
              href="https://www.junodownload.com/account/subscriptions/#subs-artist-label"
              data-redir="https://www.junodownload.com/account/subscriptions/#subs-artist-label"
              >My artists and labels</a
            ><a
              onclick="ga('send', 'event','Masthead', 'Click', 'MyJuno - My Wishlist');"
              class="ht-dd-item login-soft"
              href="https://www.junodownload.com/wishlist/"
              data-redir="https://www.junodownload.com/wishlist/"
              >My Wishlist</a
            ><a
              onclick="ga('send', 'event','Masthead', 'Click', 'MyJuno - My New Release E-mails');"
              class="ht-dd-item login-soft"
              href="https://www.junodownload.com/account/subscriptions/"
              data-redir="https://www.junodownload.com/account/subscriptions/"
              >My New Release E-mails</a
            ><a
              onclick="ga('send', 'event','Masthead', 'Click', 'MyJuno - My Coming Soon Alerts');"
              class="ht-dd-item login-soft"
              href="https://www.junodownload.com/account/subscriptions/#subs-coming-soon"
              data-redir="https://www.junodownload.com/account/subscriptions/#subs-coming-soon"
              >My Coming Soon Alerts</a
            ><a
              onclick="ga('send', 'event','Masthead', 'Click', 'MyJuno - My Charts');"
              class="ht-dd-item login-soft ip5-hide"
              href="https://www.junodownload.com/charts/charteditor/"
              data-redir="https://www.junodownload.com/charts/charteditor/"
              >My Charts</a
            ><a
              onclick="ga('send', 'event','Masthead', 'Click', 'MyJuno - My Account');"
              class="ht-dd-item login-soft"
              href="https://www.junodownload.com/account/"
              data-redir="https://www.junodownload.com/account/"
              >My Account</a
            ><a
              onclick="ga('send', 'event','Masthead', 'Click', 'MyJuno - My Downloads');"
              class="ht-dd-item login-soft"
              href="https://www.junodownload.com/account/downloads/"
              data-redir="https://www.junodownload.com/account/downloads/"
              >My Downloads</a
            ><a
              onclick="ga('send', 'event','Masthead', 'Click', 'MyJuno - My Order History');"
              class="ht-dd-item login-soft"
              href="https://www.junodownload.com/account/order-history/"
              data-redir="https://www.junodownload.com/account/order-history/"
              >My Order History</a
            >
            <div class="ht-help-mobile d-block d-md-none">
              <a
                class="ht-dd-item"
                href="https://www.junodownload.com/help/"
                onclick="ga('send', 'event','Masthead', 'Click', 'Help');"
                >Help</a
              >
            </div>
            <div class="ht-currency-mobile">
              <div class="dropdown">
                <button
                  type="button"
                  class="btn btn-block btn-outline-light dropdown-toggle"
                  id="ht-dd-currency"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  My Currency: ARS
                </button>
                <div class="dropdown-menu" aria-labelledby="ht-dd-currency">
                  <button type="button" class="dropdown-item">AED</button
                  ><button type="button" class="dropdown-item">AUD</button
                  ><button type="button" class="dropdown-item">BRL</button
                  ><button type="button" class="dropdown-item">BYN</button
                  ><button type="button" class="dropdown-item">CAD</button
                  ><button type="button" class="dropdown-item">CHF</button
                  ><button type="button" class="dropdown-item">CLP</button
                  ><button type="button" class="dropdown-item">CNY</button
                  ><button type="button" class="dropdown-item">CZK</button
                  ><button type="button" class="dropdown-item">DKK</button
                  ><button type="button" class="dropdown-item">EUR</button
                  ><button type="button" class="dropdown-item">GBP</button
                  ><button type="button" class="dropdown-item">GEL</button
                  ><button type="button" class="dropdown-item">HKD</button
                  ><button type="button" class="dropdown-item">IDR</button
                  ><button type="button" class="dropdown-item">ILS</button
                  ><button type="button" class="dropdown-item">INR</button
                  ><button type="button" class="dropdown-item">ISK</button
                  ><button type="button" class="dropdown-item">JPY</button
                  ><button type="button" class="dropdown-item">KRW</button
                  ><button type="button" class="dropdown-item">KZT</button
                  ><button type="button" class="dropdown-item">LBP</button
                  ><button type="button" class="dropdown-item">MKD</button
                  ><button type="button" class="dropdown-item">MXN</button
                  ><button type="button" class="dropdown-item">MYR</button
                  ><button type="button" class="dropdown-item">NOK</button
                  ><button type="button" class="dropdown-item">NZD</button
                  ><button type="button" class="dropdown-item">PEN</button
                  ><button type="button" class="dropdown-item">PHP</button
                  ><button type="button" class="dropdown-item">PLN</button
                  ><button type="button" class="dropdown-item">RSD</button
                  ><button type="button" class="dropdown-item">RUB</button
                  ><button type="button" class="dropdown-item">SEK</button
                  ><button type="button" class="dropdown-item">SGD</button
                  ><button type="button" class="dropdown-item">THB</button
                  ><button type="button" class="dropdown-item">TRY</button
                  ><button type="button" class="dropdown-item">TWD</button
                  ><button type="button" class="dropdown-item">USD</button
                  ><button type="button" class="dropdown-item">UYU</button
                  ><button type="button" class="dropdown-item">ZAR</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ht-item ht-wishlist touch-toggle th-delay">
          <a
            class="ht-btn login-soft"
            onclick="ga('send', 'event','Masthead', 'Click', 'Wishlist');"
            href="https://www.junodownload.com/wishlist/"
            data-redir="/wishlist/"
            rel="nofollow"
            aria-haspopup="true"
            ><span class="glyphicon glyphicon-w" aria-hidden="true" title="Wishlist"></span
          ></a>
          <div class="ht-dd touch-dd wishlist">
            <div class="wishlist-login mb-md">Log in to view your wishlist</div>
            <div class="wishlist-empty mb-md">Your wishlist is empty</div>
            <div class="wishlist-status mb-md" data-ua_location="quick_wishlist">
              <div class="mb-sm">
                Items in wishlist: <span class="ws-item-count text-white"></span>
              </div>
              <div class="mb-sm">Recently added:</div>
              <div class="ws-recent-items"></div>
            </div>
            <div class="quick-loading">
              <img
                src="https://wwwcdn.junodownload.com/13010300/images/progress-med-header-jd.gif"
                alt="Loading..." />
            </div>
            <a
              class="btn btn-block btn-primary login-soft"
              onclick="ga('send', 'event','Masthead', 'Click', 'Wishlist');"
              href="https://www.junodownload.com/wishlist/"
              data-redir="/wishlist/"
              rel="nofollow"
              >View wishlist</a
            >
          </div>
        </div>
        <div class="ht-item ht-cart touch-toggle th-delay">
          <a
            onclick="ga('send', 'event','Masthead', 'Click', 'Cart');"
            href="https://www.junodownload.com/cart/"
            rel="nofollow"
            class="ht-btn"
            aria-haspopup="true"
            ><div class="glyphicon glyphicon-cart" aria-hidden="true" title="Cart">
              <span class="ht-cart-count">0</span>
            </div></a
          >
          <div class="ht-dd touch-dd cart">
            <div class="cart-empty mb-md">Your cart is empty</div>
            <div class="cart-status mb-md" data-ua_location="quick_cart">
              <div class="mb-sm">
                Items in cart: <span class="cs-item-count text-white"></span>
              </div>
              <div class="mb-md">Subtotal: <span class="cs-subtotal text-white"></span></div>
              <div class="mb-sm">Recently added:</div>
              <div class="cs-recent-items"></div>
            </div>
            <div class="quick-loading">
              <img
                src="https://wwwcdn.junodownload.com/13010300/images/progress-med-header-jd.gif"
                alt="Loading..." />
            </div>
            <a
              class="btn btn-block btn-primary"
              onclick="ga('send', 'event','Masthead', 'Click', 'Cart');"
              href="https://www.junodownload.com/cart/"
              rel="nofollow"
              >View cart</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="header-ph"></div>
  <div class="home-top pb-1 pt-3 pb-xl-3 pt-md-4 pt-xl-5" data-ua_location="home-top">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-9">
          <div class="row gutters-sm mb-4">
            <div class="col">
              <div class="home-carousel mb-3">
                <div class="juno-widget" id="top-carousel">
                  <div class="jw-container">
                    <div class="jw-scroller jws-transform">
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/products/5977522-02/"
                            data-ua_action="click carousel banner -1 Felipe Gordon - For Martha (Clone Royal Oak)"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="https://cmscdn.junodownload.com/cms/1524/13533/1_204.jpg"
                              data-src="https://cmscdn.junodownload.com/cms/1524/13533/1_204.jpg"
                              data-lazy-done="true"
                              alt="Felipe Gordon - For Martha (Clone Royal Oak)"
                              fetchpriority="high"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/products/5949045-02/"
                            data-ua_action="click carousel banner -2 Philip D Kick - Off World Tales (Astrophonica)"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="https://cmscdn.junodownload.com/cms/1524/13534/1_204.jpg"
                              data-src="https://cmscdn.junodownload.com/cms/1524/13534/1_204.jpg"
                              data-lazy-done="true"
                              alt="Philip D Kick - Off World Tales (Astrophonica)"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/products/6007319-02/"
                            data-ua_action="click carousel banner -3 Various - Heist Presents - Proteges Volume 02 (Co-Lab Recordings)"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://cmscdn.junodownload.com/cms/1524/13535/1_140.jpg"
                              data-lazy-done="false"
                              alt="Various - Heist Presents - Proteges Volume 02 (Co-Lab Recordings)"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/products/6014503-02/"
                            data-ua_action="click carousel banner -4 The Phenomenal Handclap Band - Burning Bridges EP (Razor-N-Tape)"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://cmscdn.junodownload.com/cms/1524/13536/1_190.jpg"
                              data-lazy-done="false"
                              alt="The Phenomenal Handclap Band - Burning Bridges EP (Razor-N-Tape)"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/products/5981652-02/"
                            data-ua_action="click carousel banner -5 StillZ - Battlefield EP (Pick The Lock)"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://cmscdn.junodownload.com/cms/1524/13876/1_187.jpg"
                              data-lazy-done="false"
                              alt="StillZ - Battlefield EP (Pick The Lock)"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/products/5986019-02/"
                            data-ua_action="click carousel banner -6 Radio Slave - Strobe Queen (Rekids)"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://cmscdn.junodownload.com/cms/1524/14257/1_182.jpg"
                              data-lazy-done="false"
                              alt="Radio Slave - Strobe Queen (Rekids)"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/products/6014747-02/"
                            data-ua_action="click carousel banner -7 Soul Capsule - Law Of Grace (Trelik)"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://cmscdn.junodownload.com/cms/1524/14258/1_170.jpg"
                              data-lazy-done="false"
                              alt="Soul Capsule - Law Of Grace (Trelik)"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/products/5976503-02/"
                            data-ua_action="click carousel banner -8 Andromeda Orchestra - Mozambique EP (FAR (Faze Action))"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://cmscdn.junodownload.com/cms/1524/14259/1_147.jpg"
                              data-lazy-done="false"
                              alt="Andromeda Orchestra - Mozambique EP (FAR (Faze Action))"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/products/5988768-02/"
                            data-ua_action="click carousel banner -9 Oxossi - Cranky / Deadlocked (Hotplates Recordings)"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://cmscdn.junodownload.com/cms/1524/14260/1_119.jpg"
                              data-lazy-done="false"
                              alt="Oxossi - Cranky / Deadlocked (Hotplates Recordings)"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/funk-n-beats-vol-10-bomb-strikes-takeover/"
                            data-ua_action="click carousel banner -10 Funk N&#039; Beats Vol 10 on Bomb Strikes Takeover"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://cmscdn.junodownload.com/cms/1524/14261/1_86.jpg"
                              data-lazy-done="false"
                              alt="Funk N' Beats Vol 10 on Bomb Strikes Takeover"
                          /></a>
                        </div>
                      </div>
                      <div class="jw-page">
                        <div class="img-home-banner">
                          <a
                            href="/all/juno-recommends/"
                            data-ua_action="click carousel banner -11 Juno Recommends"
                            onclick="uaAddEvent(event);"
                            ><img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://cmscdn.junodownload.com/cms/1524/15190/1_29.jpg"
                              data-lazy-done="false"
                              alt="Juno Recommends"
                          /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="jw-back">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                  </div>
                  <div class="jw-forward">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                  </div>
                  <div class="jw-pagination d-none d-lg-block">
                    <div class="jw-p-page current" data-index="1">
                      <div class="jw-p-dot"></div>
                    </div>
                    <div class="jw-p-page" data-index="2"><div class="jw-p-dot"></div></div>
                    <div class="jw-p-page" data-index="3"><div class="jw-p-dot"></div></div>
                    <div class="jw-p-page" data-index="4"><div class="jw-p-dot"></div></div>
                    <div class="jw-p-page" data-index="5"><div class="jw-p-dot"></div></div>
                    <div class="jw-p-page" data-index="6"><div class="jw-p-dot"></div></div>
                    <div class="jw-p-page" data-index="7"><div class="jw-p-dot"></div></div>
                    <div class="jw-p-page" data-index="8"><div class="jw-p-dot"></div></div>
                    <div class="jw-p-page" data-index="9"><div class="jw-p-dot"></div></div>
                    <div class="jw-p-page" data-index="10"><div class="jw-p-dot"></div></div>
                    <div class="jw-p-page" data-index="11"><div class="jw-p-dot"></div></div>
                  </div>
                  <div class="home-carousel-helper"></div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2p5">
              <div class="row gutters-sm mt-3 mt-md-0">
                <div class="col-4 col-md-12 home-featured hf-mb">
                  <a href="/charts/dj/1849487-Tik_Borrow/8227529-Chart/"
                    ><img
                      class="img-fluid-fill"
                      src="https://cmscdn.junodownload.com/cms/1525/13537/1_174.jpg"
                      alt="Tik&Borrow DJ Chart"
                  /></a>
                </div>
                <div class="col-4 col-md-12 home-featured">
                  <a href="/charts/dj/2670491-Saint_Loup_en_Bray/8225025-Chart/"
                    ><img
                      class="img-fluid-fill"
                      src="https://cmscdn.junodownload.com/cms/1525/13538/1_178.jpg"
                      alt="Saint-Loup-en-Bray DJ Chart"
                  /></a>
                </div>
                <div class="col-4 col-md-12 home-featured d-block d-md-none">
                  <a href="/charts/dj/36376-DJ_Mau_Mau/8228063-Chart/"
                    ><img
                      class="img-fluid-fill"
                      src="https://cmscdn.junodownload.com/cms/1525/13539/1_174.jpg"
                      alt="DJ Mau Mau DJ Chart"
                  /></a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="juno-widget juno-widget-home juno-widget-product mt-3"
            id="widget-home_top-1-">
            <div class="row gutters-sm">
              <div class="col">
                <a
                  class="link-td-none"
                  href="/all/two-weeks/releases/"
                  data-ua_action="click widget title"
                  onclick="uaAddEvent(event);">
                  <h2>NEW RELEASES</h2>
                </a>
              </div>
              <div class="col-auto">
                <div class="btn btn-outline-dark jw-back mr-1">
                  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                </div>
                <div class="btn btn-outline-dark jw-forward mr-1">
                  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                </div>
                <a
                  class="btn btn-primary btn-view"
                  href="/all/two-weeks/releases/"
                  data-ua_action="click widget view all"
                  onclick="uaAddEvent(event);">
                  View all
                  <span
                    class="glyphicon glyphicon-chevron-right d-none d-lg-inline"
                    aria-hidden="true"></span>
                </a>
              </div>
            </div>
            <div class="jw-body">
              <div class="jw-container">
                <div class="jw-row jw-row-5 jw-scroller jws-transform">
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/euphonique-bam-bam-badder/5988992-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5988992-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="0"
                          alt="Euphonique / Bam Bam - Badder"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5988992-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5988992-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5988992, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Euphonique / Bam Bam">
                        <a
                          href="/artists/Euphonique/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Euphonique</a
                        >
                        /
                        <a
                          href="/artists/Bam+Bam/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Bam Bam</a
                        >
                      </div>
                      <div class="jw-title" title="Badder">
                        <a
                          href="/products/euphonique-bam-bam-badder/5988992-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Badder</a
                        >
                      </div>
                      <div class="jw-label" title="Ruffneck Ting">
                        <a
                          href="/labels/Ruffneck+Ting/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Ruffneck Ting</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/insider-something-flash/5807345-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5807345-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="1"
                          alt="Insider - Something Flash"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5807345-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5807345-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5807345, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Insider">
                        <a
                          href="/artists/Insider/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Insider</a
                        >
                      </div>
                      <div class="jw-title" title="Something Flash">
                        <a
                          href="/products/insider-something-flash/5807345-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Something Flash</a
                        >
                      </div>
                      <div class="jw-label" title="R&S">
                        <a
                          href="/labels/R%2526S/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >R&S</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/robbie-doherty-its-my-beat/5976557-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5976557-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="2"
                          alt="Robbie Doherty - It's My Beat"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5976557-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5976557-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5976557, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Robbie Doherty">
                        <a
                          href="/artists/Robbie+Doherty/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Robbie Doherty</a
                        >
                      </div>
                      <div class="jw-title" title="It's My Beat">
                        <a
                          href="/products/robbie-doherty-its-my-beat/5976557-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >It's My Beat</a
                        >
                      </div>
                      <div class="jw-label" title="PIV">
                        <a
                          href="/labels/PIV/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >PIV</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/kapote-what-it-is-2-0/5934293-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5934293-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="3"
                          alt="Kapote - What It Is (2.0)"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5934293-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5934293-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5934293, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Kapote">
                        <a
                          href="/artists/Kapote/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Kapote</a
                        >
                      </div>
                      <div class="jw-title" title="What It Is (2.0)">
                        <a
                          href="/products/kapote-what-it-is-2-0/5934293-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >What It Is (2.0)</a
                        >
                      </div>
                      <div class="jw-label" title="Toy Tonics">
                        <a
                          href="/labels/Toy+Tonics/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Toy Tonics</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/voice-of-art-kenneth-losing-my-leaves/5641457-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5641457-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="4"
                          alt="Voice Of Art / Kenneth Bager / Troels Hammer / Dj Divo / Olio / Claus Hojensgard - Losing My Leaves"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5641457-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5641457-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5641457, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div
                        class="jw-artist"
                        title="Voice Of Art / Kenneth Bager / Troels Hammer / Dj Divo / Olio / Claus Hojensgard">
                        <a
                          href="/artists/Voice+Of+Art/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Voice Of Art</a
                        >
                        /
                        <a
                          href="/artists/Kenneth+Bager/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Kenneth Bager</a
                        >
                        /
                        <a
                          href="/artists/Troels+Hammer/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Troels Hammer</a
                        >
                        /
                        <a
                          href="/artists/DJ+Divo/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Dj Divo</a
                        >
                        /
                        <a
                          href="/artists/Olio/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Olio</a
                        >
                        /
                        <a
                          href="/artists/Claus+Hojensgard/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Claus Hojensgard</a
                        >
                      </div>
                      <div class="jw-title" title="Losing My Leaves">
                        <a
                          href="/products/voice-of-art-kenneth-losing-my-leaves/5641457-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Losing My Leaves</a
                        >
                      </div>
                      <div class="jw-label" title="Music For Dreams">
                        <a
                          href="/labels/Music+For+Dreams/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Music For Dreams</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/gratts-nathan-sun-circles-for-leo-ziggy/6000492-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6000492-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="10"
                          alt="Gratts / Nathan Haines / Mr Beale - Sun Circles (For Leo & Ziggy)"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6000492-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6000492-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6000492, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Gratts / Nathan Haines / Mr Beale">
                        <a
                          href="/artists/Gratts/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Gratts</a
                        >
                        /
                        <a
                          href="/artists/Nathan+Haines/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Nathan Haines</a
                        >
                        /
                        <a
                          href="/artists/Mr+Beale/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Mr Beale</a
                        >
                      </div>
                      <div class="jw-title" title="Sun Circles (For Leo & Ziggy)">
                        <a
                          href="/products/gratts-nathan-sun-circles-for-leo-ziggy/6000492-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Sun Circles (For Leo & Ziggy)</a
                        >
                      </div>
                      <div class="jw-label" title="Be Strong Be Free">
                        <a
                          href="/labels/Be+Strong+Be+Free/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Be Strong Be Free</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/heist-presents-proteges-volume-02/6007319-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6007319-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="11"
                          alt="Various - Heist Presents - Proteges Volume 02"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6007319-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6007319-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6007319, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Various">
                        <a
                          href="/artists/Various/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Various</a
                        >
                      </div>
                      <div class="jw-title" title="Heist Presents - Proteges Volume 02">
                        <a
                          href="/products/heist-presents-proteges-volume-02/6007319-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Heist Presents - Proteges Volume 02</a
                        >
                      </div>
                      <div class="jw-label" title="Co-Lab Recordings">
                        <a
                          href="/labels/Co-Lab+Recordings/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Co-Lab Recordings</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/jovonn-make-it-raw/5974363-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5974363-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="12"
                          alt="Jovonn - Make It Raw"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5974363-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5974363-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5974363, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Jovonn">
                        <a
                          href="/artists/Jovonn/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Jovonn</a
                        >
                      </div>
                      <div class="jw-title" title="Make It Raw">
                        <a
                          href="/products/jovonn-make-it-raw/5974363-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Make It Raw</a
                        >
                      </div>
                      <div class="jw-label" title="Body N Deep">
                        <a
                          href="/labels/Body+N+Deep/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Body N Deep</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/enigma-dubz-dungeon-ep/5992131-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5992131-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="13"
                          alt="Enigma Dubz - Dungeon EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5992131-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5992131-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5992131, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Enigma Dubz">
                        <a
                          href="/artists/Enigma+Dubz/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Enigma Dubz</a
                        >
                      </div>
                      <div class="jw-title" title="Dungeon EP">
                        <a
                          href="/products/enigma-dubz-dungeon-ep/5992131-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Dungeon EP</a
                        >
                      </div>
                      <div class="jw-label" title="Deep Dark & Dangerous">
                        <a
                          href="/labels/Deep+Dark+%2526+Dangerous/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Deep Dark & Dangerous</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/mantra-damaged-ep/5992103-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5992103-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="14"
                          alt="Mantra - Damaged EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5992103-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5992103-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5992103, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Mantra">
                        <a
                          href="/artists/Mantra/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Mantra</a
                        >
                      </div>
                      <div class="jw-title" title="Damaged EP">
                        <a
                          href="/products/mantra-damaged-ep/5992103-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Damaged EP</a
                        >
                      </div>
                      <div class="jw-label" title="Sneaker Social Club">
                        <a
                          href="/labels/Sneaker+Social+Club/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Sneaker Social Club</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/vigi-kousto-sauco-disco-selections-vol-2/5963347-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5963347-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="20"
                          alt="Vigi / Kousto / Sauco / Donny Rotten - Disco Selections, Vol 2"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5963347-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5963347-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5963347, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Vigi / Kousto / Sauco / Donny Rotten">
                        <a
                          href="/artists/Vigi/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Vigi</a
                        >
                        /
                        <a
                          href="/artists/Kousto/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Kousto</a
                        >
                        /
                        <a
                          href="/artists/Sauco/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Sauco</a
                        >
                        /
                        <a
                          href="/artists/Donny+Rotten/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Donny Rotten</a
                        >
                      </div>
                      <div class="jw-title" title="Disco Selections, Vol 2">
                        <a
                          href="/products/vigi-kousto-sauco-disco-selections-vol-2/5963347-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Disco Selections, Vol 2</a
                        >
                      </div>
                      <div class="jw-label" title="Ravanelli Disco Club">
                        <a
                          href="/labels/Ravanelli+Disco+Club/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Ravanelli Disco Club</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/ferry-ultra-roy-ayers-dangerous-vibes/5950366-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5950366-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="21"
                          alt="Ferry Ultra / Roy Ayers - Dangerous Vibes"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5950366-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5950366-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5950366, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Ferry Ultra / Roy Ayers">
                        <a
                          href="/artists/Ferry+Ultra/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Ferry Ultra</a
                        >
                        /
                        <a
                          href="/artists/Roy+Ayers/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Roy Ayers</a
                        >
                      </div>
                      <div class="jw-title" title="Dangerous Vibes">
                        <a
                          href="/products/ferry-ultra-roy-ayers-dangerous-vibes/5950366-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Dangerous Vibes</a
                        >
                      </div>
                      <div class="jw-label" title="Peppermint Jam Germany">
                        <a
                          href="/labels/Peppermint+Jam+Germany/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Peppermint Jam Germany</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/marsolo-passion-seeker-ep/5991609-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5991609-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="22"
                          alt="Marsolo - Passion Seeker EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5991609-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5991609-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5991609, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Marsolo">
                        <a
                          href="/artists/Marsolo/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Marsolo</a
                        >
                      </div>
                      <div class="jw-title" title="Passion Seeker EP">
                        <a
                          href="/products/marsolo-passion-seeker-ep/5991609-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Passion Seeker EP</a
                        >
                      </div>
                      <div class="jw-label" title="House Puff">
                        <a
                          href="/labels/House+Puff/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >House Puff</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/anoesis-heavy-water/5961804-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5961804-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="23"
                          alt="Anoesis - Heavy Water"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5961804-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5961804-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5961804, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Anoesis">
                        <a
                          href="/artists/Anoesis/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Anoesis</a
                        >
                      </div>
                      <div class="jw-title" title="Heavy Water">
                        <a
                          href="/products/anoesis-heavy-water/5961804-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Heavy Water</a
                        >
                      </div>
                      <div class="jw-label" title="Spray">
                        <a
                          href="/labels/Spray/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Spray</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/andy-bach-oh-baby-pete-herbert-remix/5952223-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5952223-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="24"
                          alt="Andy Bach - Oh Baby (Pete Herbert Remix)"
                      /></a>
                      <div class="jw-special">exclusive</div>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5952223-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5952223-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5952223, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Andy Bach">
                        <a
                          href="/artists/Andy+Bach/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Andy Bach</a
                        >
                      </div>
                      <div class="jw-title" title="Oh Baby (Pete Herbert Remix)">
                        <a
                          href="/products/andy-bach-oh-baby-pete-herbert-remix/5952223-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Oh Baby (Pete Herbert Remix)</a
                        >
                      </div>
                      <div class="jw-label" title="Disco Machine">
                        <a
                          href="/labels/Disco+Machine/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Disco Machine</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/3-warriors-prepare-to-die/5999026-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5999026-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="30"
                          alt="3 Warriors - Prepare To Die"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5999026-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5999026-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5999026, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="3 Warriors">
                        <a
                          href="/artists/3+Warriors/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >3 Warriors</a
                        >
                      </div>
                      <div class="jw-title" title="Prepare To Die">
                        <a
                          href="/products/3-warriors-prepare-to-die/5999026-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Prepare To Die</a
                        >
                      </div>
                      <div class="jw-label" title="Newmember">
                        <a
                          href="/labels/Newmember/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Newmember</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/skeptical-initiate-ep/5991566-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5991566-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="31"
                          alt="Skeptical - Initiate EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5991566-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5991566-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5991566, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Skeptical">
                        <a
                          href="/artists/Skeptical/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Skeptical</a
                        >
                      </div>
                      <div class="jw-title" title="Initiate EP">
                        <a
                          href="/products/skeptical-initiate-ep/5991566-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Initiate EP</a
                        >
                      </div>
                      <div class="jw-label" title="Rubi">
                        <a
                          href="/labels/Rubi/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Rubi</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/bibio-olivier-st-s-o-l-ep/5956168-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5956168-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="32"
                          alt="Bibio / Olivier St.louis - S.O.L. EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5956168-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5956168-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5956168, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Bibio / Olivier St.louis">
                        <a
                          href="/artists/Bibio/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Bibio</a
                        >
                        /
                        <a
                          href="/artists/Olivier+St.louis/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Olivier St.louis</a
                        >
                      </div>
                      <div class="jw-title" title="S.O.L. EP">
                        <a
                          href="/products/bibio-olivier-st-s-o-l-ep/5956168-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >S.O.L. EP</a
                        >
                      </div>
                      <div class="jw-label" title="Warp">
                        <a
                          href="/labels/Warp/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Warp</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/post-whatstep-hotflush-20/5989474-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5989474-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="33"
                          alt="Various - Post Whatstep? - Hotflush 20"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5989474-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5989474-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5989474, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Various">
                        <a
                          href="/artists/Various/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Various</a
                        >
                      </div>
                      <div class="jw-title" title="Post Whatstep? - Hotflush 20">
                        <a
                          href="/products/post-whatstep-hotflush-20/5989474-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Post Whatstep? - Hotflush 20</a
                        >
                      </div>
                      <div class="jw-label" title="Hotflush Recordings">
                        <a
                          href="/labels/Hotflush+Recordings/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Hotflush Recordings</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/smoove-turrell-igotcha/5983853-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5983853-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="34"
                          alt="Smoove & Turrell - IGOTCHA"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5983853-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5983853-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5983853, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Smoove & Turrell">
                        <a
                          href="/artists/Smoove+%2526+Turrell/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Smoove & Turrell</a
                        >
                      </div>
                      <div class="jw-title" title="IGOTCHA">
                        <a
                          href="/products/smoove-turrell-igotcha/5983853-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >IGOTCHA</a
                        >
                      </div>
                      <div class="jw-label" title="Jalapeno">
                        <a
                          href="/labels/Jalapeno/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Jalapeno</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/nick-the-lot-unknown-creatures-ep/5981606-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5981606-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="40"
                          alt="Nick The Lot - Unknown Creatures EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5981606-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5981606-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5981606, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Nick The Lot">
                        <a
                          href="/artists/Nick+The+Lot/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Nick The Lot</a
                        >
                      </div>
                      <div class="jw-title" title="Unknown Creatures EP">
                        <a
                          href="/products/nick-the-lot-unknown-creatures-ep/5981606-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Unknown Creatures EP</a
                        >
                      </div>
                      <div class="jw-label" title="Gradient">
                        <a
                          href="/labels/Gradient/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Gradient</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/the-phenomenal-handclap-band-burning-bridges-ep/6014503-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6014503-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="41"
                          alt="The Phenomenal Handclap Band - Burning Bridges EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6014503-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6014503-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6014503, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="The Phenomenal Handclap Band">
                        <a
                          href="/artists/The+Phenomenal+Handclap+Band/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >The Phenomenal Handclap Band</a
                        >
                      </div>
                      <div class="jw-title" title="Burning Bridges EP">
                        <a
                          href="/products/the-phenomenal-handclap-band-burning-bridges-ep/6014503-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Burning Bridges EP</a
                        >
                      </div>
                      <div class="jw-label" title="Razor-N-Tape">
                        <a
                          href="/labels/Razor-N-Tape/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Razor-N-Tape</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/jimpster-mavhungu-tribute/6001422-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6001422-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="42"
                          alt="Jimpster / Mavhungu - Tribute"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6001422-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6001422-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6001422, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Jimpster / Mavhungu">
                        <a
                          href="/artists/Jimpster/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Jimpster</a
                        >
                        /
                        <a
                          href="/artists/Mavhungu/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Mavhungu</a
                        >
                      </div>
                      <div class="jw-title" title="Tribute">
                        <a
                          href="/products/jimpster-mavhungu-tribute/6001422-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Tribute</a
                        >
                      </div>
                      <div class="jw-label" title="Freerange">
                        <a
                          href="/labels/Freerange/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Freerange</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/soul-capsule-law-of-grace/6014747-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6014747-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="43"
                          alt="Soul Capsule - Law Of Grace"
                      /></a>
                      <div class="jw-special">exclusive</div>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6014747-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6014747-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6014747, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Soul Capsule">
                        <a
                          href="/artists/Soul+Capsule/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Soul Capsule</a
                        >
                      </div>
                      <div class="jw-title" title="Law Of Grace">
                        <a
                          href="/products/soul-capsule-law-of-grace/6014747-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Law Of Grace</a
                        >
                      </div>
                      <div class="jw-label" title="Trelik">
                        <a
                          href="/labels/Trelik/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Trelik</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/luigi-tozzi-spiral-ep/6000695-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6000695-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="44"
                          alt="Luigi Tozzi - Spiral EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6000695-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6000695-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6000695, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Luigi Tozzi">
                        <a
                          href="/artists/Luigi+Tozzi/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Luigi Tozzi</a
                        >
                      </div>
                      <div class="jw-title" title="Spiral EP">
                        <a
                          href="/products/luigi-tozzi-spiral-ep/6000695-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Spiral EP</a
                        >
                      </div>
                      <div class="jw-label" title="Non Series">
                        <a
                          href="/labels/Non+Series/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Non Series</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="jw-row jw-row-5 jw-scroller jws-transform">
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/silvestre-osga/5991921-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5991921-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="5"
                          alt="Silvestre - Osga"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5991921-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5991921-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5991921, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Silvestre">
                        <a
                          href="/artists/Silvestre/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Silvestre</a
                        >
                      </div>
                      <div class="jw-title" title="Osga">
                        <a
                          href="/products/silvestre-osga/5991921-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Osga</a
                        >
                      </div>
                      <div class="jw-label" title="On Loop">
                        <a
                          href="/labels/On+Loop/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >On Loop</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/veak-real-soldier-ep/5973602-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5973602-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="6"
                          alt="Veak - Real Soldier EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5973602-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5973602-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5973602, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Veak">
                        <a
                          href="/artists/Veak/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Veak</a
                        >
                      </div>
                      <div class="jw-title" title="Real Soldier EP">
                        <a
                          href="/products/veak-real-soldier-ep/5973602-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Real Soldier EP</a
                        >
                      </div>
                      <div class="jw-label" title="Dubplate Dread">
                        <a
                          href="/labels/Dubplate+Dread/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Dubplate Dread</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/x-ray-ted-talkin/5985162-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5985162-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="7"
                          alt="X-ray Ted - Talkin'"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5985162-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5985162-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5985162, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="X-ray Ted">
                        <a
                          href="/artists/X-ray+Ted/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >X-ray Ted</a
                        >
                      </div>
                      <div class="jw-title" title="Talkin'">
                        <a
                          href="/products/x-ray-ted-talkin/5985162-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Talkin'</a
                        >
                      </div>
                      <div class="jw-label" title="Bomb Strikes">
                        <a
                          href="/labels/Bomb+Strikes/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Bomb Strikes</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/trance-100-2023/5999887-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5999887-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="8"
                          alt="Various - Trance 100 - 2023"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5999887-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5999887-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5999887, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Various">
                        <a
                          href="/artists/Various/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Various</a
                        >
                      </div>
                      <div class="jw-title" title="Trance 100 - 2023">
                        <a
                          href="/products/trance-100-2023/5999887-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Trance 100 - 2023</a
                        >
                      </div>
                      <div class="jw-label" title="Armada Music Holland">
                        <a
                          href="/labels/Armada+Music+Holland/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Armada Music Holland</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/parly-b-hot-like-fire-chapter-3/5994563-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5994563-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="9"
                          alt="Parly B / Various - Hot Like Fire - Chapter 3"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5994563-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5994563-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5994563, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Parly B / Various">
                        <a
                          href="/artists/Parly+B/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Parly B</a
                        >
                        /
                        <a
                          href="/artists/Various/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Various</a
                        >
                      </div>
                      <div class="jw-title" title="Hot Like Fire - Chapter 3">
                        <a
                          href="/products/parly-b-hot-like-fire-chapter-3/5994563-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Hot Like Fire - Chapter 3</a
                        >
                      </div>
                      <div class="jw-label" title="Liondub International">
                        <a
                          href="/labels/Liondub+International/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Liondub International</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/distant-soundz-memories-the-klass-kutz-ep/5992063-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5992063-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="15"
                          alt="Distant Soundz - Memories (The Klass Kutz EP)"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5992063-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5992063-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5992063, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Distant Soundz">
                        <a
                          href="/artists/Distant+Soundz/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Distant Soundz</a
                        >
                      </div>
                      <div class="jw-title" title="Memories (The Klass Kutz EP)">
                        <a
                          href="/products/distant-soundz-memories-the-klass-kutz-ep/5992063-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Memories (The Klass Kutz EP)</a
                        >
                      </div>
                      <div class="jw-label" title="Distant Soundz Recordings">
                        <a
                          href="/labels/Distant+Soundz+Recordings/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Distant Soundz Recordings</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/40-thieves-dont-turn-it-off-session/5976508-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5976508-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="16"
                          alt="40 Thieves / Qzen - Don't Turn It Off (Session Victim & Bella Boo Remixes)"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5976508-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5976508-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5976508, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="40 Thieves / Qzen">
                        <a
                          href="/artists/40+Thieves/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >40 Thieves</a
                        >
                        /
                        <a
                          href="/artists/Qzen/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Qzen</a
                        >
                      </div>
                      <div
                        class="jw-title"
                        title="Don't Turn It Off (Session Victim & Bella Boo Remixes)">
                        <a
                          href="/products/40-thieves-dont-turn-it-off-session/5976508-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Don't Turn It Off (Session Victim & Bella Boo Remixes)</a
                        >
                      </div>
                      <div class="jw-label" title="Permanent Vacation">
                        <a
                          href="/labels/Permanent+Vacation/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Permanent Vacation</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/toolroom-miami-2023/5988743-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5988743-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="17"
                          alt="Various - Toolroom Miami 2023"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5988743-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5988743-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5988743, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Various">
                        <a
                          href="/artists/Various/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Various</a
                        >
                      </div>
                      <div class="jw-title" title="Toolroom Miami 2023">
                        <a
                          href="/products/toolroom-miami-2023/5988743-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Toolroom Miami 2023</a
                        >
                      </div>
                      <div class="jw-label" title="Toolroom">
                        <a
                          href="/labels/Toolroom/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Toolroom</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/rayko-last-train-to-80s-vol-5/5978849-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5978849-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="18"
                          alt="Rayko - Last Train To 80's Vol 5"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5978849-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5978849-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5978849, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Rayko">
                        <a
                          href="/artists/Rayko/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Rayko</a
                        >
                      </div>
                      <div class="jw-title" title="Last Train To 80's Vol 5">
                        <a
                          href="/products/rayko-last-train-to-80s-vol-5/5978849-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Last Train To 80's Vol 5</a
                        >
                      </div>
                      <div class="jw-label" title="Rare Wiri Spain">
                        <a
                          href="/labels/Rare+Wiri+Spain/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Rare Wiri Spain</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/dipzy-chris-clark-stay-fresh/5992137-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="lazy"
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5992137-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="19"
                          alt="Dipzy / Chris Clark - Stay Fresh"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5992137-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5992137-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5992137, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Dipzy / Chris Clark">
                        <a
                          href="/artists/Dipzy/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Dipzy</a
                        >
                        /
                        <a
                          href="/artists/Chris+Clark/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Chris Clark</a
                        >
                      </div>
                      <div class="jw-title" title="Stay Fresh">
                        <a
                          href="/products/dipzy-chris-clark-stay-fresh/5992137-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Stay Fresh</a
                        >
                      </div>
                      <div class="jw-label" title="Dirtybird US">
                        <a
                          href="/labels/Dirtybird+US/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Dirtybird US</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/fiorious-bawrut-every-morning/5991593-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5991593-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="25"
                          alt="Fiorious / Bawrut - Every Morning"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5991593-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5991593-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5991593, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Fiorious / Bawrut">
                        <a
                          href="/artists/Fiorious/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Fiorious</a
                        >
                        /
                        <a
                          href="/artists/Bawrut/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Bawrut</a
                        >
                      </div>
                      <div class="jw-title" title="Every Morning">
                        <a
                          href="/products/fiorious-bawrut-every-morning/5991593-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Every Morning</a
                        >
                      </div>
                      <div class="jw-label" title="CHSN FMLY">
                        <a
                          href="/labels/CHSN+FMLY/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >CHSN FMLY</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/zero-t-onj-kilburn-park/5991532-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5991532-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="26"
                          alt="Zero T / Onj - Kilburn Park"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5991532-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5991532-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5991532, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Zero T / Onj">
                        <a
                          href="/artists/Zero+T/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Zero T</a
                        >
                        /
                        <a
                          href="/artists/Onj/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Onj</a
                        >
                      </div>
                      <div class="jw-title" title="Kilburn Park">
                        <a
                          href="/products/zero-t-onj-kilburn-park/5991532-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Kilburn Park</a
                        >
                      </div>
                      <div class="jw-label" title="The North Quarter">
                        <a
                          href="/labels/The+North+Quarter/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >The North Quarter</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/pergola-zed/5987251-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5987251-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="27"
                          alt="Pergola - ZED"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5987251-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5987251-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5987251, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Pergola">
                        <a
                          href="/artists/Pergola/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Pergola</a
                        >
                      </div>
                      <div class="jw-title" title="ZED">
                        <a
                          href="/products/pergola-zed/5987251-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >ZED</a
                        >
                      </div>
                      <div class="jw-label" title="Stolen Goods">
                        <a
                          href="/labels/Stolen+Goods/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Stolen Goods</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/muui-the-layers-of-reality/5844490-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5844490-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="28"
                          alt="Muui - The Layers Of Reality"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5844490-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5844490-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5844490, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Muui">
                        <a
                          href="/artists/Muui/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Muui</a
                        >
                      </div>
                      <div class="jw-title" title="The Layers Of Reality">
                        <a
                          href="/products/muui-the-layers-of-reality/5844490-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >The Layers Of Reality</a
                        >
                      </div>
                      <div class="jw-label" title="Here Now">
                        <a
                          href="/labels/Here+Now/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Here Now</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/nico-lahs-ancestors-call-part-2/5991509-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5991509-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="29"
                          alt="Nico Lahs - Ancestors Call (Part 2)"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5991509-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5991509-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5991509, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Nico Lahs">
                        <a
                          href="/artists/Nico+Lahs/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Nico Lahs</a
                        >
                      </div>
                      <div class="jw-title" title="Ancestors Call (Part 2)">
                        <a
                          href="/products/nico-lahs-ancestors-call-part-2/5991509-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Ancestors Call (Part 2)</a
                        >
                      </div>
                      <div class="jw-label" title="Omena">
                        <a
                          href="/labels/Omena/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Omena</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/oxygeno-shocked-by-reality/6001420-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6001420-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="35"
                          alt="Oxygeno - Shocked By Reality"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6001420-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6001420-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6001420, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Oxygeno">
                        <a
                          href="/artists/Oxygeno/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Oxygeno</a
                        >
                      </div>
                      <div class="jw-title" title="Shocked By Reality">
                        <a
                          href="/products/oxygeno-shocked-by-reality/6001420-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Shocked By Reality</a
                        >
                      </div>
                      <div class="jw-label" title="Soma">
                        <a
                          href="/labels/Soma/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Soma</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/pete-whiteley-feels-so-good-ep/5995815-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5995815-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="36"
                          alt="Pete Whiteley - Feels So Good EP"
                      /></a>
                      <div class="jw-special">exclusive</div>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5995815-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5995815-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5995815, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Pete Whiteley">
                        <a
                          href="/artists/Pete+Whiteley/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Pete Whiteley</a
                        >
                      </div>
                      <div class="jw-title" title="Feels So Good EP">
                        <a
                          href="/products/pete-whiteley-feels-so-good-ep/5995815-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Feels So Good EP</a
                        >
                      </div>
                      <div class="jw-label" title="Hot Gorilla">
                        <a
                          href="/labels/Hot+Gorilla/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Hot Gorilla</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/screama-sg-too-deep/5962314-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5962314-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="37"
                          alt="Screama / Sg - Too Deep"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5962314-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5962314-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5962314, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Screama / Sg">
                        <a
                          href="/artists/Screama/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Screama</a
                        >
                        /
                        <a
                          href="/artists/Sg/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Sg</a
                        >
                      </div>
                      <div class="jw-title" title="Too Deep">
                        <a
                          href="/products/screama-sg-too-deep/5962314-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Too Deep</a
                        >
                      </div>
                      <div class="jw-label" title="ClubFriendly">
                        <a
                          href="/labels/ClubFriendly/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >ClubFriendly</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/dj-zinc-super-sharp-shooter-chris-gialanze/6009947-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6009947-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="38"
                          alt="Dj Zinc - Super Sharp Shooter (Chris Gialanze Remix)"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6009947-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6009947-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6009947, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Dj Zinc">
                        <a
                          href="/artists/DJ+Zinc/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Dj Zinc</a
                        >
                      </div>
                      <div class="jw-title" title="Super Sharp Shooter (Chris Gialanze Remix)">
                        <a
                          href="/products/dj-zinc-super-sharp-shooter-chris-gialanze/6009947-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Super Sharp Shooter (Chris Gialanze Remix)</a
                        >
                      </div>
                      <div class="jw-label" title="Bingo Bass">
                        <a
                          href="/labels/Bingo+Bass/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Bingo Bass</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/lego-boy-back-in-time-ii/6001902-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6001902-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="39"
                          alt="Lego Boy - Back In Time II"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6001902-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6001902-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6001902, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Lego Boy">
                        <a
                          href="/artists/Lego+Boy/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Lego Boy</a
                        >
                      </div>
                      <div class="jw-title" title="Back In Time II">
                        <a
                          href="/products/lego-boy-back-in-time-ii/6001902-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Back In Time II</a
                        >
                      </div>
                      <div class="jw-label" title="Kraak">
                        <a
                          href="/labels/Kraak/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Kraak</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/ministry-of-funk-disco-glory-vol-ii/6003613-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6003613-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="45"
                          alt="Ministry Of Funk / Disco Incorporated - Disco Glory Vol II"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6003613-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6003613-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6003613, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Ministry Of Funk / Disco Incorporated">
                        <a
                          href="/artists/Ministry+Of+Funk/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Ministry Of Funk</a
                        >
                        /
                        <a
                          href="/artists/Disco+Incorporated/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Disco Incorporated</a
                        >
                      </div>
                      <div class="jw-title" title="Disco Glory Vol II">
                        <a
                          href="/products/ministry-of-funk-disco-glory-vol-ii/6003613-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Disco Glory Vol II</a
                        >
                      </div>
                      <div class="jw-label" title="Muzik Xpress">
                        <a
                          href="/labels/Muzik+Xpress/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Muzik Xpress</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/sota-wait-for-me/6012756-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6012756-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="46"
                          alt="Sota - Wait For Me"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6012756-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6012756-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6012756, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Sota">
                        <a
                          href="/artists/Sota/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Sota</a
                        >
                      </div>
                      <div class="jw-title" title="Wait For Me">
                        <a
                          href="/products/sota-wait-for-me/6012756-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Wait For Me</a
                        >
                      </div>
                      <div class="jw-label" title="Crucast">
                        <a
                          href="/labels/Crucast/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Crucast</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/andromeda-orchestra-mozambique-ep/5976503-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS5976503-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="47"
                          alt="Andromeda Orchestra - Mozambique EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/5976503-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/5976503-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(5976503, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Andromeda Orchestra">
                        <a
                          href="/artists/Andromeda+Orchestra/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Andromeda Orchestra</a
                        >
                      </div>
                      <div class="jw-title" title="Mozambique EP">
                        <a
                          href="/products/andromeda-orchestra-mozambique-ep/5976503-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Mozambique EP</a
                        >
                      </div>
                      <div class="jw-label" title="FAR (Faze Action)">
                        <a
                          href="/labels/FAR+%28Faze+Action%29/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >FAR (Faze Action)</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/matt-kenny-second-wind-ep/6012322-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6012322-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="48"
                          alt="Matt Kenny - Second Wind EP"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6012322-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6012322-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6012322, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="Matt Kenny">
                        <a
                          href="/artists/Matt+Kenny/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >Matt Kenny</a
                        >
                      </div>
                      <div class="jw-title" title="Second Wind EP">
                        <a
                          href="/products/matt-kenny-second-wind-ep/6012322-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Second Wind EP</a
                        >
                      </div>
                      <div class="jw-label" title="Vague Music">
                        <a
                          href="/labels/Vague+Music/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Vague Music</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                    <div class="jw-image">
                      <a
                        class="img-square img-release"
                        href="/products/david-bowie-lets-dance-40th-anniversary-remix/6024697-02/"
                        data-ua_action="ln_product"
                        onclick="uaAddEvent(event);"
                        ><img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="https://imagescdn.junodownload.com/300/CS6024697-02A-MED.jpg"
                          data-lazy-done="false"
                          data-index="49"
                          alt="David Bowie - Let's Dance (40th Anniversary Remix E.P.)"
                      /></a>
                      <div class="jw-actions">
                        <a
                          class="btn btn-secondary btn-xs ultraplayer_play"
                          href="/playlists/builder/6024697-2.m3u"
                          title="Listen"
                          data-ua_action="play"
                          ><span
                            class="glyphicon glyphicon-listen"
                            aria-hidden="true"></span></a
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                          data-href="/playlists/builder/6024697-2.m3u"
                          title="Cue"
                          data-ua_action="cue">
                          <span
                            class="glyphicon glyphicon-cue"
                            aria-hidden="true"></span></button
                        ><button
                          type="button"
                          class="btn btn-secondary btn-xs ml-1"
                          onclick="uaAddCartEvent(event); addToCartPopup(6024697, 2);"
                          title="Add to cart"
                          data-ua_action="add to cart">
                          <span
                            class="glyphicon glyphicon-cart-add text-cta"
                            aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                    <div class="jw-info">
                      <div class="jw-artist" title="David Bowie">
                        <a
                          href="/artists/David+Bowie/"
                          data-ua_action="ln_artist"
                          onclick="uaAddEvent(event);"
                          >David Bowie</a
                        >
                      </div>
                      <div class="jw-title" title="Let's Dance (40th Anniversary Remix E.P.)">
                        <a
                          href="/products/david-bowie-lets-dance-40th-anniversary-remix/6024697-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          >Let's Dance (40th Anniversary Remix E.P.)</a
                        >
                      </div>
                      <div class="jw-label" title="Rhino">
                        <a
                          href="/labels/Rhino/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          >Rhino</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="jw-si-hider"></div>
              <div class="jw-pagination mb-lg-2 d-none d-lg-block">
                <div class="jw-p-page current" data-index="5"><div class="jw-p-dot"></div></div>
                <div class="jw-p-page" data-index="10"><div class="jw-p-dot"></div></div>
                <div class="jw-p-page" data-index="15"><div class="jw-p-dot"></div></div>
                <div class="jw-p-page" data-index="20"><div class="jw-p-dot"></div></div>
                <div class="jw-p-page" data-index="25"><div class="jw-p-dot"></div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3 my-4 my-lg-0">
          <div class="home-bestsellers juno-tab-control">
            <div class="row no-gutters">
              <div class="col-6">
                <div class="juno-tab active" data-index="0" onclick="junoUi.selectTab(this);">
                  <h5>TOP SINGLES</h5>
                </div>
              </div>
              <div class="col-6">
                <div class="juno-tab" data-index="1" onclick="junoUi.selectTab(this);">
                  <h5>TOP ALBUMS</h5>
                </div>
              </div>
            </div>
            <div class="juno-tab-content">
              <div class="juno-tab-slider">
                <div>
                  <div class="row gutters-sm">
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/stillz-battlefield-ep/5981652-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5981652-02A-TN.jpg"
                            alt="Stillz - Battlefield EP" />
                          <div class="jw-iteration">1</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5981652-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5981652-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5981652, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Stillz">
                          <a
                            href="/artists/Stillz/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Stillz</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/stillz-battlefield-ep/5981652-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Battlefield EP"
                          >Battlefield EP</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Pick+The+Lock/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Pick The Lock"
                          >Pick The Lock</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/the-phenomenal-handclap-band-burning-bridges-ep/6014503-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS6014503-02A-TN.jpg"
                            alt="The Phenomenal Handclap Band - Burning Bridges EP" />
                          <div class="jw-iteration">2</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6014503-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/6014503-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(6014503, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="The Phenomenal Handclap Band">
                          <a
                            href="/artists/The+Phenomenal+Handclap+Band/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >The Phenomenal Handclap Band</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/the-phenomenal-handclap-band-burning-bridges-ep/6014503-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Burning Bridges EP"
                          >Burning Bridges EP</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Razor-N-Tape/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Razor-N-Tape"
                          >Razor-N-Tape</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/felipe-gordon-for-martha/5977522-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5977522-02A-TN.jpg"
                            alt="Felipe Gordon - For Martha" />
                          <div class="jw-iteration">3</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5977522-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5977522-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5977522, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Felipe Gordon">
                          <a
                            href="/artists/Felipe+Gordon/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Felipe Gordon</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/felipe-gordon-for-martha/5977522-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="For Martha"
                          >For Martha</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Clone+Royal+Oak/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Clone Royal Oak"
                          >Clone Royal Oak</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/soul-capsule-law-of-grace/6014747-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS6014747-02A-TN.jpg"
                            alt="Soul Capsule - Law Of Grace" />
                          <div class="jw-iteration">4</div>
                          <div class="jw-special">exclusive</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6014747-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/6014747-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(6014747, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Soul Capsule">
                          <a
                            href="/artists/Soul+Capsule/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Soul Capsule</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/soul-capsule-law-of-grace/6014747-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Law Of Grace"
                          >Law Of Grace</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Trelik/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Trelik"
                          >Trelik</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/michael-klein-shizo-ep/5983942-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5983942-02A-TN.jpg"
                            alt="Michael Klein - Shizo EP" />
                          <div class="jw-iteration">5</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5983942-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5983942-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5983942, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Michael Klein">
                          <a
                            href="/artists/Michael+Klein/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Michael Klein</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/michael-klein-shizo-ep/5983942-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Shizo EP"
                          >Shizo EP</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Virgo/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Virgo"
                          >Virgo</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/james-curd-i-am-one-i-am/5902970-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5902970-02A-TN.jpg"
                            alt="James Curd - I Am One, I Am Many" />
                          <div class="jw-iteration">6</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5902970-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5902970-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5902970, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="James Curd">
                          <a
                            href="/artists/James+Curd/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >James Curd</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/james-curd-i-am-one-i-am/5902970-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="I Am One, I Am Many"
                          >I Am One, I Am Many</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Pronto/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Pronto"
                          >Pronto</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/nick-the-lot-unknown-creatures-ep/5981606-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5981606-02A-TN.jpg"
                            alt="Nick The Lot - Unknown Creatures EP" />
                          <div class="jw-iteration">7</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5981606-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5981606-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5981606, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Nick The Lot">
                          <a
                            href="/artists/Nick+The+Lot/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Nick The Lot</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/nick-the-lot-unknown-creatures-ep/5981606-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Unknown Creatures EP"
                          >Unknown Creatures EP</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Gradient/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Gradient"
                          >Gradient</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/the-funk-district-devil-side-blues/5831036-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5831036-02A-TN.jpg"
                            alt="The Funk District - Devil Side Blues" />
                          <div class="jw-iteration">8</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5831036-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5831036-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5831036, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="The Funk District">
                          <a
                            href="/artists/The+Funk+District/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >The Funk District</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/the-funk-district-devil-side-blues/5831036-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Devil Side Blues"
                          >Devil Side Blues</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Kaninchenbau/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Kaninchenbau"
                          >Kaninchenbau</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/tuccillo-sunshine-city/5939530-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5939530-02A-TN.jpg"
                            alt="Tuccillo - Sunshine City" />
                          <div class="jw-iteration">9</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5939530-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5939530-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5939530, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Tuccillo">
                          <a
                            href="/artists/Tuccillo/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Tuccillo</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/tuccillo-sunshine-city/5939530-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Sunshine City"
                          >Sunshine City</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Nu+Groove/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Nu Groove"
                          >Nu Groove</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/david-bowie-lets-dance-40th-anniversary-remix/6024697-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS6024697-02A-TN.jpg"
                            alt="David Bowie - Let's Dance (40th Anniversary Remix E.P.)" />
                          <div class="jw-iteration">10</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6024697-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/6024697-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(6024697, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="David Bowie">
                          <a
                            href="/artists/David+Bowie/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >David Bowie</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/david-bowie-lets-dance-40th-anniversary-remix/6024697-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Let's Dance (40th Anniversary Remix E.P.)"
                          >Let's Dance (40th Anniversary Remix E.P.)</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Rhino/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Rhino"
                          >Rhino</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <a
                      class="btn btn-sm btn-primary"
                      href="/all/charts/bestsellers/this-week/releases/?music_product_type=single"
                      >View all top singles<span
                        class="glyphicon glyphicon-chevron-right"
                        aria-hidden="true"></span
                    ></a>
                  </div>
                </div>
                <div>
                  <div class="row gutters-sm">
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/heist-presents-proteges-volume-02/6007319-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS6007319-02A-TN.jpg"
                            alt="Various - Heist Presents - Proteges Volume 02" />
                          <div class="jw-iteration">1</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6007319-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/6007319-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(6007319, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/heist-presents-proteges-volume-02/6007319-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Heist Presents - Proteges Volume 02"
                          >Heist Presents - Proteges Volume 02</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Co-Lab+Recordings/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Co-Lab Recordings"
                          >Co-Lab Recordings</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/alkalino-eva-gina-edits/6006148-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS6006148-02A-TN.jpg"
                            alt="Alkalino - Eva Gina Edits" />
                          <div class="jw-iteration">2</div>
                          <div class="jw-special">exclusive</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6006148-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/6006148-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(6006148, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Alkalino">
                          <a
                            href="/artists/Alkalino/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Alkalino</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/alkalino-eva-gina-edits/6006148-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Eva Gina Edits"
                          >Eva Gina Edits</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Audaz/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Audaz"
                          >Audaz</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/strictly-rhythm-the-definitive-30/4377344-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS4377344-02A-TN.jpg"
                            alt="Various - Strictly Rhythm The Definitive 30" />
                          <div class="jw-iteration">3</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/4377344-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/4377344-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(4377344, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/strictly-rhythm-the-definitive-30/4377344-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Strictly Rhythm The Definitive 30"
                          >Strictly Rhythm The Definitive 30</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Strictly+Rhythm/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Strictly Rhythm"
                          >Strictly Rhythm</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/toolroom-miami-2023/5988743-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5988743-02A-TN.jpg"
                            alt="Various - Toolroom Miami 2023" />
                          <div class="jw-iteration">4</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5988743-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5988743-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5988743, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/toolroom-miami-2023/5988743-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Toolroom Miami 2023"
                          >Toolroom Miami 2023</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Toolroom/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Toolroom"
                          >Toolroom</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/jeff-mills-purpose-maker-compilation/4028584-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS4028584-02A-TN.jpg"
                            alt="Jeff Mills - Purpose Maker Compilation" />
                          <div class="jw-iteration">5</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/4028584-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/4028584-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(4028584, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Jeff Mills">
                          <a
                            href="/artists/Jeff+Mills/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Jeff Mills</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/jeff-mills-purpose-maker-compilation/4028584-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Purpose Maker Compilation"
                          >Purpose Maker Compilation</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/React/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="React"
                          >React</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/marsh-endless/5966754-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5966754-02A-TN.jpg"
                            alt="Marsh - Endless" />
                          <div class="jw-iteration">6</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5966754-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5966754-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5966754, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Marsh">
                          <a
                            href="/artists/Marsh/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Marsh</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/marsh-endless/5966754-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Endless"
                          >Endless</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Anjunadeep/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Anjunadeep"
                          >Anjunadeep</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/liondub-international-2022-annual/5977506-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5977506-02A-TN.jpg"
                            alt="Various - Liondub International: 2022 Annual" />
                          <div class="jw-iteration">7</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5977506-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5977506-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5977506, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/liondub-international-2022-annual/5977506-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Liondub International: 2022 Annual"
                          >Liondub International: 2022 Annual</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Liondub+International/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Liondub International"
                          >Liondub International</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/beaumonde-remixed/5745618-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5745618-02A-TN.jpg"
                            alt="Various - Beaumonde Remixed" />
                          <div class="jw-iteration">8</div>
                          <div class="jw-special">exclusive</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5745618-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5745618-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5745618, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/beaumonde-remixed/5745618-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Beaumonde Remixed"
                          >Beaumonde Remixed</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Act+Of+Sedition/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Act Of Sedition"
                          >Act Of Sedition</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/kapote-what-it-is-2-0/5934293-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5934293-02A-TN.jpg"
                            alt="Kapote - What It Is (2.0)" />
                          <div class="jw-iteration">9</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5934293-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5934293-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5934293, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Kapote">
                          <a
                            href="/artists/Kapote/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Kapote</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/kapote-what-it-is-2-0/5934293-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="What It Is (2.0)"
                          >What It Is (2.0)</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Toy+Tonics/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Toy Tonics"
                          >Toy Tonics</a
                        >
                      </div>
                    </div>
                    <div
                      class="jw-item jw-item-md col-12 col-sm-6 col-lg-12 touch-hover th-delay">
                      <div class="jw-image">
                        <a
                          href="/products/ibiza-party-techno-house-techno-house-afro/5996492-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);">
                          <img
                            class="img-fluid"
                            src="https://imagescdn.junodownload.com/75/CS5996492-02A-TN.jpg"
                            alt="Ibiza Party Techno House - Techno House Afro" />
                          <div class="jw-iteration">10</div>
                        </a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5996492-2.m3u"
                            title="Listen"
                            data-ua_action="play">
                            <span class="glyphicon glyphicon-listen" aria-hidden="true"></span>
                          </a>
                          <button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue"
                            data-href="/playlists/builder/5996492-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span class="glyphicon glyphicon-cue" aria-hidden="true"></span>
                          </button>
                          <button
                            class="btn btn-secondary btn-xs"
                            onclick="uaAddCartEvent(event); addToCartPopup(5996492, 2);"
                            title="Add to cart"
                            data-ua_action="add to cart">
                            <span
                              class="glyphicon glyphicon-cart-add text-cta"
                              aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Ibiza Party Techno House">
                          <a
                            href="/artists/Ibiza+Party+Techno+House/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Ibiza Party Techno House</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/ibiza-party-techno-house-techno-house-afro/5996492-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Techno House Afro"
                          >Techno House Afro</a
                        >
                        <a
                          class="jw-label"
                          href="/labels/Symphonic+Distribution/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Symphonic Distribution"
                          >Symphonic Distribution</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="text-right text-lg-center">
                    <a
                      class="btn btn-sm btn-primary"
                      href="/all/charts/bestsellers/this-week/releases/?music_product_type=album"
                      >View all top albums<span
                        class="glyphicon glyphicon-chevron-right"
                        aria-hidden="true"></span
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="home-bestsellers-helper d-none d-lg-block"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="home-trust-bar" id="home-trust-barxc">
    <div class="container-fluid">
      <div class="row gutters-sm align-items-center justify-content-around">
        <div class="col-6 col-md-auto trust-drm-free">
          <div class="row no-gutters align-items-center justify-content-center mb-2 mb-md-0">
            <div class="col-12 col-md-auto">
              <svg class="icon-trust-drm-free mr-lg-2"><use xlink:href="#icon-drm-free" /></svg>
            </div>
            <div class="col-12 col-md">DRM Free</div>
          </div>
        </div>
        <div class="col-6 col-md-auto trust-dj-friendly">
          <div class="row no-gutters align-items-center justify-content-center mb-2 mb-md-0">
            <div class="col-12 col-md-auto">
              <svg class="icon-trust-dj-friendly mr-lg-2">
                <use xlink:href="#icon-in-stock" />
              </svg>
            </div>
            <div class="col-12 col-md">DJ-Friendly Full Length Tracks</div>
          </div>
        </div>
        <div class="col-6 col-md-auto trust-tp">
          <div class="row no-gutters align-items-center mb-2 mb-md-0">
            <div class="col-12 col-md-auto">
              <svg class="icon-trustpilot-star mr-1">
                <use xlink:href="#icon-trustpilot-star" /></svg
              ><svg class="icon-trustpilot-star mr-1">
                <use xlink:href="#icon-trustpilot-star" /></svg
              ><svg class="icon-trustpilot-star mr-1">
                <use xlink:href="#icon-trustpilot-star" /></svg
              ><svg class="icon-trustpilot-star mr-1">
                <use xlink:href="#icon-trustpilot-star" /></svg
              ><svg class="icon-trustpilot-star mr-md-2">
                <use xlink:href="#icon-trustpilot-star" />
              </svg>
            </div>
            <div class="col-12 col-md">5-star Trustpilot rating</div>
          </div>
        </div>
        <div class="col-6 col-md-auto trust-payment">
          <div class="trust-payment-logos">
            <svg class="logo-visa mr-2"><use xlink:href="#logo-visa" /></svg
            ><svg class="logo-mastercard mr-2"><use xlink:href="#logo-mastercard" /></svg
            ><svg class="logo-maestro mr-2"><use xlink:href="#logo-maestro" /></svg
            ><!-- <svg class="logo-jcb mr-1"><use xlink:href="#logo-jcb" /></svg> --><svg
              class="logo-paypal">
              <use xlink:href="#logo-paypal" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="home-section home-featured-releases" data-ua_location="featured-releases">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="home-section-sub pt-4 pt-lg-5 pb-3">
            <div
              class="juno-widget juno-widget-home juno-widget-review"
              id="widget-featured-releases-3-1">
              <div class="row gutters-sm">
                <div class="col">
                  <a
                    class="link-td-none"
                    href="/all/two-weeks/releases/?facet[featured][0]=3"
                    data-ua_action="click widget title"
                    onclick="uaAddEvent(event);"
                    ><h2>FEATURED RELEASES</h2></a
                  >
                </div>
                <div class="col-auto">
                  <a
                    class="btn btn-primary btn-view"
                    href="/all/two-weeks/releases/?facet[featured][0]=3"
                    data-ua_action="click widget view all"
                    onclick="uaAddEvent(event);"
                    >View all
                    <span
                      class="glyphicon glyphicon-chevron-right ip5-hide"
                      aria-hidden="true"></span
                  ></a>
                </div>
              </div>
              <div class="jw-container">
                <div class="jw-row jw-row-2 jw-row-static">
                  <div class="jw-item touch-hover th-delay">
                    <div class="row gutters-sm jw-item-review jw-item-review-odd">
                      <div class="col-5 col-sm-4 col-md-5 col-lg-4">
                        <div class="jw-image img-square">
                          <a
                            href="/products/stillz-battlefield-ep/5981652-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            ><img
                              class="lazy"
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://imagescdn.junodownload.com/300/CS5981652-02A-MED.jpg"
                              alt="Stillz - Battlefield EP"
                          /></a>
                          <div class="jw-actions">
                            <button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_play"
                              data-href="/playlists/builder/5981652-2.m3u"
                              title="Listen"
                              data-ua_action="play">
                              <span
                                class="glyphicon glyphicon-listen"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_cue"
                              data-href="/playlists/builder/5981652-2.m3u"
                              title="Cue"
                              data-ua_action="cue">
                              <span
                                class="glyphicon glyphicon-cue"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ml-1"
                              onclick="uaAddCartEvent(event); addToCartPopup(5981652, 2);"
                              title="Add to cart"
                              data-ua_action="add to cart">
                              <span
                                class="glyphicon glyphicon-cart-add text-cta"
                                aria-hidden="true"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-7 col-sm-8 col-md-7 col-lg-8">
                        <div class="jw-artist" title="Stillz">
                          <a
                            href="/artists/Stillz/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Stillz</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/stillz-battlefield-ep/5981652-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Battlefield EP"
                          >Battlefield EP</a
                        ><a
                          class="jw-label"
                          href="/labels/Pick+The+Lock/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Pick The Lock"
                          >Pick The Lock</a
                        >
                        <div class="jw-review mt-2">
                          Forever sparkling with raw bass energy, StillZ joins Nick The Lot's
                          merry band of misfits and murkers on Pick The Lock with this powerful
                          collection of jump-up steppers and slammers. The opening track
                          'Battlefield' sets the benchmark as Pengo and Spooka both get elbow
                          deep into the energy. Elsewhere we have highlights like the groaning,
                          twisted spirit of 'Done It Again', the hyper-grotty buzzes and gnarls
                          of 'Transmit' and the skin-scorching dynamics and energy of 'Dub
                          Siren'. Pure war music. Now let us see your battlefield face!!
                          <div
                            class="jw-review-more"
                            onclick="this.parentNode.className += ' more'; this.remove();">
                            ...<span class="text-primary px-3">Read more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="jw-item touch-hover th-delay">
                    <div class="row gutters-sm jw-item-review">
                      <div class="col-5 col-sm-4 col-md-5 col-lg-4">
                        <div class="jw-image img-square">
                          <a
                            href="/products/alkalino-eva-gina-edits/6006148-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            ><img
                              class="lazy"
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://imagescdn.junodownload.com/300/CS6006148-02A-MED.jpg"
                              alt="Alkalino - Eva Gina Edits"
                          /></a>
                          <div class="jw-special">exclusive</div>
                          <div class="jw-actions">
                            <button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_play"
                              data-href="/playlists/builder/6006148-2.m3u"
                              title="Listen"
                              data-ua_action="play">
                              <span
                                class="glyphicon glyphicon-listen"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_cue"
                              data-href="/playlists/builder/6006148-2.m3u"
                              title="Cue"
                              data-ua_action="cue">
                              <span
                                class="glyphicon glyphicon-cue"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ml-1"
                              onclick="uaAddCartEvent(event); addToCartPopup(6006148, 2);"
                              title="Add to cart"
                              data-ua_action="add to cart">
                              <span
                                class="glyphicon glyphicon-cart-add text-cta"
                                aria-hidden="true"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-7 col-sm-8 col-md-7 col-lg-8">
                        <div class="jw-artist" title="Alkalino">
                          <a
                            href="/artists/Alkalino/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Alkalino</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/alkalino-eva-gina-edits/6006148-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Eva Gina Edits"
                          >Eva Gina Edits</a
                        ><a
                          class="jw-label"
                          href="/labels/Audaz/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Audaz"
                          >Audaz</a
                        >
                        <div class="jw-review mt-2">
                          The Audaz boss and re-editor par excellence serves up seven fresh
                          takes on vintage dancefloor nuggets both very familiar and slightly
                          less so. Sources this time out include The Isley Brothers' 'Fight The
                          Power' ('Fight It',) the Peter Jacques Band's 'Dancing Down The
                          Street' ('Everyone You Meet'), Steely Dan's 'Peg' ('This Is Your Big
                          Debut' - a brave move, but it works!), the Steve Miller Band's 'Fly
                          Like An Eagle' ('Wanna Fly'), Stargard's 'Which Way Is Up' ('This Side
                          Up') and, most surprisingly, The Chordettes' 'Mr Sandman' from back in
                          the 50s ('Bring Me A Dream') - all handled, of course, with Alkalino's
                          usual flair.
                          <div
                            class="jw-review-more"
                            onclick="this.parentNode.className += ' more'; this.remove();">
                            ...<span class="text-primary px-3">Read more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="jw-item touch-hover th-delay">
                    <div class="row gutters-sm jw-item-review jw-item-review-odd">
                      <div class="col-5 col-sm-4 col-md-5 col-lg-4">
                        <div class="jw-image img-square">
                          <a
                            href="/products/felipe-gordon-for-martha/5977522-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            ><img
                              class="lazy"
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://imagescdn.junodownload.com/300/CS5977522-02A-MED.jpg"
                              alt="Felipe Gordon - For Martha"
                          /></a>
                          <div class="jw-actions">
                            <button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_play"
                              data-href="/playlists/builder/5977522-2.m3u"
                              title="Listen"
                              data-ua_action="play">
                              <span
                                class="glyphicon glyphicon-listen"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_cue"
                              data-href="/playlists/builder/5977522-2.m3u"
                              title="Cue"
                              data-ua_action="cue">
                              <span
                                class="glyphicon glyphicon-cue"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ml-1"
                              onclick="uaAddCartEvent(event); addToCartPopup(5977522, 2);"
                              title="Add to cart"
                              data-ua_action="add to cart">
                              <span
                                class="glyphicon glyphicon-cart-add text-cta"
                                aria-hidden="true"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-7 col-sm-8 col-md-7 col-lg-8">
                        <div class="jw-artist" title="Felipe Gordon">
                          <a
                            href="/artists/Felipe+Gordon/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Felipe Gordon</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/felipe-gordon-for-martha/5977522-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="For Martha"
                          >For Martha</a
                        ><a
                          class="jw-label"
                          href="/labels/Clone+Royal+Oak/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Clone Royal Oak"
                          >Clone Royal Oak</a
                        >
                        <div class="jw-review mt-2">
                          Is there anything Felipe Gordon can't do? On his second Clone Royal
                          Oak outing, Gordon eschews the acid flex of his previous EP for the
                          Rotterdam imprint in favour of nods towards New Jersey garage and
                          turn-of-the-90s NYC deep house. The headline attraction is 'For
                          Martha', a bumpin' excursion rich in squelchy synth-bass, synthesiser
                          horn sounds and deliciously dreamy chords. Kai Alce delivers two
                          revisions: an even more old school-sounding revision blessed with his
                          usual jazz-flecked instrumentation (the 'Remix') and an arguably even
                          stronger 'ClubJazz' mix that could have come straight from Jovonn's
                          archive of unreleased early '90s productions. Elsewhere, 'Waves' is a
                          spacey, off-kilter, percussion-rich workout of the sort we'd usually
                          associate with Ron Trent, and the hazy, all-action early morning
                          delight that is 'The Beginning Of That Lonesome Road'.
                          <div
                            class="jw-review-more"
                            onclick="this.parentNode.className += ' more'; this.remove();">
                            ...<span class="text-primary px-3">Read more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="jw-item touch-hover th-delay">
                    <div class="row gutters-sm jw-item-review">
                      <div class="col-5 col-sm-4 col-md-5 col-lg-4">
                        <div class="jw-image img-square">
                          <a
                            href="/products/toolroom-miami-2023/5988743-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            ><img
                              class="lazy"
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://imagescdn.junodownload.com/300/CS5988743-02A-MED.jpg"
                              alt="Various - Toolroom Miami 2023"
                          /></a>
                          <div class="jw-actions">
                            <button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_play"
                              data-href="/playlists/builder/5988743-2.m3u"
                              title="Listen"
                              data-ua_action="play">
                              <span
                                class="glyphicon glyphicon-listen"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_cue"
                              data-href="/playlists/builder/5988743-2.m3u"
                              title="Cue"
                              data-ua_action="cue">
                              <span
                                class="glyphicon glyphicon-cue"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ml-1"
                              onclick="uaAddCartEvent(event); addToCartPopup(5988743, 2);"
                              title="Add to cart"
                              data-ua_action="add to cart">
                              <span
                                class="glyphicon glyphicon-cart-add text-cta"
                                aria-hidden="true"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-7 col-sm-8 col-md-7 col-lg-8">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/toolroom-miami-2023/5988743-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Toolroom Miami 2023"
                          >Toolroom Miami 2023</a
                        ><a
                          class="jw-label"
                          href="/labels/Toolroom/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Toolroom"
                          >Toolroom</a
                        >
                        <div class="jw-review mt-2">
                          Toolroom Miami 2023 is this year's hottest soundtrack to one of the
                          most anticipated conferences in dance music. Included on the album are
                          50 of the finest underground dance anthems from the likes of: Jay
                          Vegas with his hot disco dub take on label chief Mark Knight and Lukas
                          Setto's "Get With You Tonight", Aussie Kristin Velvet with the
                          heads-down groove of "Perfect Division", through to the deep swing of
                          Hannah Wants' remix of Eskuche's "The Sun", AZETE's deep down and
                          dirty "Love Me Loco" and the sweltering tribal tech house of Tony
                          Cortez & Orito Cantora's "La Negra" feat. Orito Cantora - plus much
                          more.
                          <div
                            class="jw-review-more"
                            onclick="this.parentNode.className += ' more'; this.remove();">
                            ...<span class="text-primary px-3">Read more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="jw-item touch-hover th-delay">
                    <div class="row gutters-sm jw-item-review jw-item-review-odd">
                      <div class="col-5 col-sm-4 col-md-5 col-lg-4">
                        <div class="jw-image img-square">
                          <a
                            href="/products/michael-klein-shizo-ep/5983942-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            ><img
                              class="lazy"
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://imagescdn.junodownload.com/300/CS5983942-02A-MED.jpg"
                              alt="Michael Klein - Shizo EP"
                          /></a>
                          <div class="jw-actions">
                            <button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_play"
                              data-href="/playlists/builder/5983942-2.m3u"
                              title="Listen"
                              data-ua_action="play">
                              <span
                                class="glyphicon glyphicon-listen"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_cue"
                              data-href="/playlists/builder/5983942-2.m3u"
                              title="Cue"
                              data-ua_action="cue">
                              <span
                                class="glyphicon glyphicon-cue"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ml-1"
                              onclick="uaAddCartEvent(event); addToCartPopup(5983942, 2);"
                              title="Add to cart"
                              data-ua_action="add to cart">
                              <span
                                class="glyphicon glyphicon-cart-add text-cta"
                                aria-hidden="true"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-7 col-sm-8 col-md-7 col-lg-8">
                        <div class="jw-artist" title="Michael Klein">
                          <a
                            href="/artists/Michael+Klein/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Michael Klein</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/michael-klein-shizo-ep/5983942-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Shizo EP"
                          >Shizo EP</a
                        ><a
                          class="jw-label"
                          href="/labels/Virgo/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Virgo"
                          >Virgo</a
                        >
                        <div class="jw-review mt-2">
                          Michael Klein has had quite a run lately, with releases on Second
                          State and We Are The Brave. Fans of the techno producer will be happy
                          to hear that this form continues with Shizo. The title track revolves
                          around a barrelling rhythm and crystalline synths, like Mathew Jonson
                          on steroids. In contrast, "Ponzu" is closer to the Fachwerk style.
                          Relentless percussion, insistent stabs and a swung rhythm make for a
                          potent combination. The label has also commissioned a series of
                          remixes. Industrialyzer turns both tracks into lean, linear club
                          workouts, with the firing percussion and chord builds of his take on
                          "Shizo" impressing most. Meanwhile, Confidential Recipe drops a dubby
                          take on "Shizo" and Subradeon's version of "Ponzu" is a chord-heavy
                          Detroit-style makeover.
                          <div
                            class="jw-review-more"
                            onclick="this.parentNode.className += ' more'; this.remove();">
                            ...<span class="text-primary px-3">Read more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="jw-item touch-hover th-delay">
                    <div class="row gutters-sm jw-item-review">
                      <div class="col-5 col-sm-4 col-md-5 col-lg-4">
                        <div class="jw-image img-square">
                          <a
                            href="/products/nico-lahs-ancestors-call-part-2/5991509-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            ><img
                              class="lazy"
                              src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              data-src="https://imagescdn.junodownload.com/300/CS5991509-02A-MED.jpg"
                              alt="Nico Lahs - Ancestors Call (Part 2)"
                          /></a>
                          <div class="jw-actions">
                            <button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_play"
                              data-href="/playlists/builder/5991509-2.m3u"
                              title="Listen"
                              data-ua_action="play">
                              <span
                                class="glyphicon glyphicon-listen"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ultraplayer_cue"
                              data-href="/playlists/builder/5991509-2.m3u"
                              title="Cue"
                              data-ua_action="cue">
                              <span
                                class="glyphicon glyphicon-cue"
                                aria-hidden="true"></span></button
                            ><button
                              type="button"
                              class="btn btn-secondary btn-xs ml-1"
                              onclick="uaAddCartEvent(event); addToCartPopup(5991509, 2);"
                              title="Add to cart"
                              data-ua_action="add to cart">
                              <span
                                class="glyphicon glyphicon-cart-add text-cta"
                                aria-hidden="true"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-7 col-sm-8 col-md-7 col-lg-8">
                        <div class="jw-artist" title="Nico Lahs">
                          <a
                            href="/artists/Nico+Lahs/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Nico Lahs</a
                          >
                        </div>
                        <a
                          class="jw-title"
                          href="/products/nico-lahs-ancestors-call-part-2/5991509-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          title="Ancestors Call (Part 2)"
                          >Ancestors Call (Part 2)</a
                        ><a
                          class="jw-label"
                          href="/labels/Omena/"
                          data-ua_action="ln_label"
                          onclick="uaAddEvent(event);"
                          title="Omena"
                          >Omena</a
                        >
                        <div class="jw-review mt-2">
                          Nicola Loporchio AKA Nico Lahs hails from Bari in Italy and has a
                          release CV that stretches back to 2009 and includes releases on Ovum,
                          Poker Flat, Local Talk and Last Night On Earth. This four-tracker for
                          Sweden's Omena straddles the line between deep and progressive/tribal
                          house, with atmospheric synths much in evidence throughout: 'Dancing
                          Stars' is a groovy lil' drifter, 'Ascension' has Afro/tribal
                          flourishes and 'Astral Plan(t)s' packs some wigged-out sci-fi
                          squiggles, but the standout for yours truly is closer 'Love Sets You
                          Free', a dreamy late-night jam underpinned by a surprisingly funky
                          bottom end.
                          <div
                            class="jw-review-more"
                            onclick="this.parentNode.className += ' more'; this.remove();">
                            ...<span class="text-primary px-3">Read more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="home-section home-dj-charts" data-ua_location="dj-charts">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="home-section-sub pt-4 pt-lg-5 pb-3">
            <div
              class="juno-widget juno-widget-home juno-widget-djchart"
              id="widget-dj-charts-5-1">
              <div class="row gutters-sm">
                <div class="col">
                  <a
                    class="link-td-none"
                    href="/all/top_dj_charts/"
                    data-ua_action="click widget title"
                    onclick="uaAddEvent(event);"
                    ><h2>NEW DJ CHARTS</h2></a
                  >
                </div>
                <div class="col-auto">
                  <a
                    class="btn btn-primary btn-view"
                    href="/all/top_dj_charts/"
                    data-ua_action="click widget view all"
                    onclick="uaAddEvent(event);"
                    >View all
                    <span
                      class="glyphicon glyphicon-chevron-right ip5-hide"
                      aria-hidden="true"></span
                  ></a>
                </div>
              </div>
              <div class="jw-body">
                <div class="jw-container">
                  <div class="jw-row jw-row-6 jw-scroller jws-transform">
                    <div class="jw-item jw-item-djchart mb-3">
                      <a
                        class="link-td-none"
                        href="https://www.junodownload.com/charts/dj/2643582-cyd/8228303-Chart/"
                        data-ua_action="click DJ chart"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="img-fluid-fill lazy"
                          src="data:image/gif;base64,R0lGODlhCAAFAIAAAP///wAAACH5BAEAAAAALAAAAAAIAAUAAAIFhI+py1gAOw=="
                          data-src="https://cmscdn.junodownload.com/cms/1531/13548/1_154.jpg"
                          data-lazy-done="false"
                          data-index="0"
                          alt="cyd" />
                        <div class="jw-category-title jw-dj-chart-title">
                          <h4 class="text-truncate">cyd</h4>
                        </div></a
                      >
                    </div>
                    <div class="jw-item jw-item-djchart mb-3">
                      <a
                        class="link-td-none"
                        href="https://www.junodownload.com/charts/dj/2730618-e_l_l_e_n/8228398-Chart/"
                        data-ua_action="click DJ chart"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="img-fluid-fill lazy"
                          src="data:image/gif;base64,R0lGODlhCAAFAIAAAP///wAAACH5BAEAAAAALAAAAAAIAAUAAAIFhI+py1gAOw=="
                          data-src="https://cmscdn.junodownload.com/cms/1531/13549/1_159.jpg"
                          data-lazy-done="false"
                          data-index="1"
                          alt="e l l e n" />
                        <div class="jw-category-title jw-dj-chart-title">
                          <h4 class="text-truncate">e l l e n</h4>
                        </div></a
                      >
                    </div>
                    <div class="jw-item jw-item-djchart mb-3">
                      <a
                        class="link-td-none"
                        href="https://www.junodownload.com/charts/dj/1317828-Kumo/8227549-Chart/"
                        data-ua_action="click DJ chart"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="img-fluid-fill lazy"
                          src="data:image/gif;base64,R0lGODlhCAAFAIAAAP///wAAACH5BAEAAAAALAAAAAAIAAUAAAIFhI+py1gAOw=="
                          data-src="https://cmscdn.junodownload.com/cms/1531/13550/1_162.jpg"
                          data-lazy-done="false"
                          data-index="2"
                          alt="Kumo" />
                        <div class="jw-category-title jw-dj-chart-title">
                          <h4 class="text-truncate">Kumo</h4>
                        </div></a
                      >
                    </div>
                    <div class="jw-item jw-item-djchart mb-3">
                      <a
                        class="link-td-none"
                        href="https://www.junodownload.com/charts/dj/1424531-Antagonist/8228639-Chart/"
                        data-ua_action="click DJ chart"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="img-fluid-fill lazy"
                          src="data:image/gif;base64,R0lGODlhCAAFAIAAAP///wAAACH5BAEAAAAALAAAAAAIAAUAAAIFhI+py1gAOw=="
                          data-src="https://cmscdn.junodownload.com/cms/1531/13551/1_164.jpg"
                          data-lazy-done="false"
                          data-index="3"
                          alt="Antagonist" />
                        <div class="jw-category-title jw-dj-chart-title">
                          <h4 class="text-truncate">Antagonist</h4>
                        </div></a
                      >
                    </div>
                    <div class="jw-item jw-item-djchart mb-3">
                      <a
                        class="link-td-none"
                        href="https://www.junodownload.com/charts/dj/1388279-Howler/8227843-Chart/"
                        data-ua_action="click DJ chart"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="img-fluid-fill lazy"
                          src="data:image/gif;base64,R0lGODlhCAAFAIAAAP///wAAACH5BAEAAAAALAAAAAAIAAUAAAIFhI+py1gAOw=="
                          data-src="https://cmscdn.junodownload.com/cms/1531/13552/1_164.jpg"
                          data-lazy-done="false"
                          data-index="4"
                          alt="Howler" />
                        <div class="jw-category-title jw-dj-chart-title">
                          <h4 class="text-truncate">Howler</h4>
                        </div></a
                      >
                    </div>
                    <div class="jw-item jw-item-djchart mb-3">
                      <a
                        class="link-td-none"
                        href="https://www.junodownload.com/charts/dj/676332-J_amp_M_BROTHERS/8227757-Chart/"
                        data-ua_action="click DJ chart"
                        onclick="uaAddEvent(event);"
                        ><img
                          class="img-fluid-fill lazy"
                          src="data:image/gif;base64,R0lGODlhCAAFAIAAAP///wAAACH5BAEAAAAALAAAAAAIAAUAAAIFhI+py1gAOw=="
                          data-src="https://cmscdn.junodownload.com/cms/1531/13553/1_164.jpg"
                          data-lazy-done="false"
                          data-index="5"
                          alt="J & M BROTHERS" />
                        <div class="jw-category-title jw-dj-chart-title">
                          <h4 class="text-truncate">J & M BROTHERS</h4>
                        </div></a
                      >
                    </div>
                  </div>
                </div>
                <div class="jw-si-hider"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="home-section home-coming-soon" data-ua_location="coming-soon">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="home-section-sub pt-4 pt-lg-5 pb-3">
            <div
              class="juno-widget juno-widget-home juno-widget-product"
              id="widget-coming-soon-6-1">
              <div class="row gutters-sm">
                <div class="col">
                  <a
                    class="link-td-none"
                    href="/coming_soon/all/"
                    data-ua_action="click widget title"
                    onclick="uaAddEvent(event);"
                    ><h2>COMING SOON</h2></a
                  >
                </div>
                <div class="col-auto">
                  <a
                    class="btn btn-primary btn-view"
                    href="/coming_soon/all/"
                    data-ua_action="click widget view all"
                    onclick="uaAddEvent(event);"
                    >View all
                    <span
                      class="glyphicon glyphicon-chevron-right ip5-hide"
                      aria-hidden="true"></span
                  ></a>
                </div>
              </div>
              <div class="jw-body">
                <div class="jw-container">
                  <div class="jw-row jw-row-6 jw-scroller jws-transform">
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/nine-windows-rule-of-thirds/5999823-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5999823-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="0"
                            alt="Nine Windows - Rule Of Thirds"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5999823-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5999823-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5999823&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Nine Windows">
                          <a
                            href="/artists/Nine+Windows/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Nine Windows</a
                          >
                        </div>
                        <div class="jw-title" title="Rule Of Thirds">
                          <a
                            href="/products/nine-windows-rule-of-thirds/5999823-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Rule Of Thirds</a
                          >
                        </div>
                        <div class="jw-label" title="Nine Windows">
                          <a
                            href="/labels/Nine+Windows/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Nine Windows</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/nu-disco-house-finest-vol-1/5823367-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5823367-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="1"
                            alt="Various - Nu Disco House Finest, Vol 1"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5823367-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5823367-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5823367&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <div class="jw-title" title="Nu Disco House Finest, Vol 1">
                          <a
                            href="/products/nu-disco-house-finest-vol-1/5823367-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Nu Disco House Finest, Vol 1</a
                          >
                        </div>
                        <div class="jw-label" title="7AGE Music">
                          <a
                            href="/labels/7AGE+Music/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >7AGE Music</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/midnight/5533563-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5533563-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="2"
                            alt="Various - MidNight"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5533563-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5533563-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5533563&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <div class="jw-title" title="MidNight">
                          <a
                            href="/products/midnight/5533563-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >MidNight</a
                          >
                        </div>
                        <div class="jw-label" title="Digi">
                          <a
                            href="/labels/Digi/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Digi</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/tuccillo-djebali-broken-minds-ep/5940231-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5940231-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="3"
                            alt="Tuccillo / Djebali - Broken Minds EP"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5940231-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5940231-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5940231&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Tuccillo / Djebali">
                          <a
                            href="/artists/Tuccillo/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Tuccillo</a
                          >
                          /
                          <a
                            href="/artists/Djebali/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Djebali</a
                          >
                        </div>
                        <div class="jw-title" title="Broken Minds EP">
                          <a
                            href="/products/tuccillo-djebali-broken-minds-ep/5940231-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Broken Minds EP</a
                          >
                        </div>
                        <div class="jw-label" title="Moan">
                          <a
                            href="/labels/Moan/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Moan</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/the-deep-side-of-berlin-18/5913759-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5913759-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="4"
                            alt="Various - The Deep Side Of Berlin 18"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5913759-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5913759-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5913759&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <div class="jw-title" title="The Deep Side Of Berlin 18">
                          <a
                            href="/products/the-deep-side-of-berlin-18/5913759-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >The Deep Side Of Berlin 18</a
                          >
                        </div>
                        <div class="jw-label" title="City Noises">
                          <a
                            href="/labels/City+Noises/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >City Noises</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/discogalaxy-back-for-disco/6015323-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS6015323-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="5"
                            alt="Discogalaxy - Back For Disco"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6015323-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/6015323-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=6015323&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Discogalaxy">
                          <a
                            href="/artists/Discogalaxy/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Discogalaxy</a
                          >
                        </div>
                        <div class="jw-title" title="Back For Disco">
                          <a
                            href="/products/discogalaxy-back-for-disco/6015323-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Back For Disco</a
                          >
                        </div>
                        <div class="jw-label" title="Disco Galaxy Germany">
                          <a
                            href="/labels/Disco+Galaxy+Germany/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Disco Galaxy Germany</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/som-1-ultimatum/5807336-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5807336-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="6"
                            alt="Som.1 - Ultimatum"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5807336-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5807336-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5807336&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Som.1">
                          <a
                            href="/artists/Som.1/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Som.1</a
                          >
                        </div>
                        <div class="jw-title" title="Ultimatum">
                          <a
                            href="/products/som-1-ultimatum/5807336-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Ultimatum</a
                          >
                        </div>
                        <div class="jw-label" title="R&S">
                          <a
                            href="/labels/R%2526S/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >R&S</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/yam-who-remixes-productions-vol-3/6009974-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS6009974-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="7"
                            alt="Various - Yam Who? (Remixes & Productions) Vol 3"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6009974-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/6009974-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=6009974&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <div class="jw-title" title="Yam Who? (Remixes & Productions) Vol 3">
                          <a
                            href="/products/yam-who-remixes-productions-vol-3/6009974-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Yam Who? (Remixes & Productions) Vol 3</a
                          >
                        </div>
                        <div class="jw-label" title="Midnight Riot">
                          <a
                            href="/labels/Midnight+Riot/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Midnight Riot</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/deep-house-paris-16/5819873-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5819873-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="8"
                            alt="Various - Deep House Paris 16"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5819873-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5819873-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5819873&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <div class="jw-title" title="Deep House Paris 16">
                          <a
                            href="/products/deep-house-paris-16/5819873-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Deep House Paris 16</a
                          >
                        </div>
                        <div class="jw-label" title="City Noises">
                          <a
                            href="/labels/City+Noises/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >City Noises</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/steve-parker-soul-seeker-ep/5909760-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5909760-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="9"
                            alt="Steve Parker - Soul Seeker EP"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5909760-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5909760-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5909760&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Steve Parker">
                          <a
                            href="/artists/Steve+Parker/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Steve Parker</a
                          >
                        </div>
                        <div class="jw-title" title="Soul Seeker EP">
                          <a
                            href="/products/steve-parker-soul-seeker-ep/5909760-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Soul Seeker EP</a
                          >
                        </div>
                        <div class="jw-label" title="Planet Rhythm">
                          <a
                            href="/labels/Planet+Rhythm/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Planet Rhythm</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/hp-vince-trust-your-dreams/5963342-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5963342-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="10"
                            alt="Hp Vince - Trust Your Dreams"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5963342-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5963342-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5963342&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Hp Vince">
                          <a
                            href="/artists/Hp+Vince/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Hp Vince</a
                          >
                        </div>
                        <div class="jw-title" title="Trust Your Dreams">
                          <a
                            href="/products/hp-vince-trust-your-dreams/5963342-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Trust Your Dreams</a
                          >
                        </div>
                        <div class="jw-label" title="Love To Be">
                          <a
                            href="/labels/Love+To+Be/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Love To Be</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/skoel-25-connections-ep/5853996-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5853996-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="11"
                            alt="Skoel - 25 Connections EP"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5853996-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5853996-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5853996&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Skoel">
                          <a
                            href="/artists/Skoel/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Skoel</a
                          >
                        </div>
                        <div class="jw-title" title="25 Connections EP">
                          <a
                            href="/products/skoel-25-connections-ep/5853996-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >25 Connections EP</a
                          >
                        </div>
                        <div class="jw-label" title="Fokuz">
                          <a
                            href="/labels/Fokuz/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Fokuz</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/bobby-thurston-you-got-what-it-takes/5956591-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5956591-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="12"
                            alt="Bobby Thurston - You Got What It Takes"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5956591-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5956591-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5956591&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Bobby Thurston">
                          <a
                            href="/artists/Bobby+Thurston/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Bobby Thurston</a
                          >
                        </div>
                        <div class="jw-title" title="You Got What It Takes">
                          <a
                            href="/products/bobby-thurston-you-got-what-it-takes/5956591-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >You Got What It Takes</a
                          >
                        </div>
                        <div class="jw-label" title="Unidisc">
                          <a
                            href="/labels/Unidisc/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Unidisc</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/max-maxwell-the-wild-kiwi-army-vol/6021204-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS6021204-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="13"
                            alt="Max Maxwell / Nick Munday / Marcos Alonso - The Wild 'Kiwi' Army, Vol 7"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6021204-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/6021204-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=6021204&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div
                          class="jw-artist"
                          title="Max Maxwell / Nick Munday / Marcos Alonso">
                          <a
                            href="/artists/Max+Maxwell/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Max Maxwell</a
                          >
                          /
                          <a
                            href="/artists/Nick+Munday/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Nick Munday</a
                          >
                          /
                          <a
                            href="/artists/Marcos+Alonso/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Marcos Alonso</a
                          >
                        </div>
                        <div class="jw-title" title="The Wild 'Kiwi' Army, Vol 7">
                          <a
                            href="/products/max-maxwell-the-wild-kiwi-army-vol/6021204-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >The Wild 'Kiwi' Army, Vol 7</a
                          >
                        </div>
                        <div class="jw-label" title="Paper Recordings">
                          <a
                            href="/labels/Paper+Recordings/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Paper Recordings</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/jimi-jules-free-bird/6026859-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS6026859-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="14"
                            alt="Jimi Jules - Free Bird"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6026859-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/6026859-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=6026859&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Jimi Jules">
                          <a
                            href="/artists/Jimi+Jules/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Jimi Jules</a
                          >
                        </div>
                        <div class="jw-title" title="Free Bird">
                          <a
                            href="/products/jimi-jules-free-bird/6026859-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Free Bird</a
                          >
                        </div>
                        <div class="jw-label" title="Life And Death">
                          <a
                            href="/labels/Life+And+Death/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Life And Death</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/enrico-sangiuliano-charlotte-de-witte-reflection-ep/5999836-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5999836-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="15"
                            alt="Enrico Sangiuliano / Charlotte De Witte - Reflection EP"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5999836-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5999836-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5999836&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Enrico Sangiuliano / Charlotte De Witte">
                          <a
                            href="/artists/Enrico+Sangiuliano/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Enrico Sangiuliano</a
                          >
                          /
                          <a
                            href="/artists/Charlotte+De+Witte/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Charlotte De Witte</a
                          >
                        </div>
                        <div class="jw-title" title="Reflection EP">
                          <a
                            href="/products/enrico-sangiuliano-charlotte-de-witte-reflection-ep/5999836-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Reflection EP</a
                          >
                        </div>
                        <div class="jw-label" title="NINETOZERO">
                          <a
                            href="/labels/NINETOZERO/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >NINETOZERO</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/ghostbusterz-african-choir-gimme-hope/5978077-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS5978077-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="16"
                            alt="Ghostbusterz / African Choir - Gimme Hope"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/5978077-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/5978077-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=5978077&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Ghostbusterz / African Choir">
                          <a
                            href="/artists/Ghostbusterz/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Ghostbusterz</a
                          >
                          /
                          <a
                            href="/artists/African+Choir/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >African Choir</a
                          >
                        </div>
                        <div class="jw-title" title="Gimme Hope">
                          <a
                            href="/products/ghostbusterz-african-choir-gimme-hope/5978077-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Gimme Hope</a
                          >
                        </div>
                        <div class="jw-label" title="Ruffneckz">
                          <a
                            href="/labels/Ruffneckz/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Ruffneckz</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="jw-item jw-item-product touch-hover th-delay mb-3">
                      <div class="jw-image">
                        <a
                          class="img-square img-release"
                          href="/products/who-say-reload/6010351-02/"
                          data-ua_action="ln_product"
                          onclick="uaAddEvent(event);"
                          ><img
                            class="lazy"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            data-src="https://imagescdn.junodownload.com/300/CS6010351-02A-MED.jpg"
                            data-lazy-done="false"
                            data-index="17"
                            alt="Various - Who Say Reload?"
                        /></a>
                        <div class="jw-actions">
                          <a
                            class="btn btn-secondary btn-xs ultraplayer_play"
                            href="/playlists/builder/6010351-2.m3u"
                            title="Listen"
                            data-ua_action="play"
                            ><span
                              class="glyphicon glyphicon-listen"
                              aria-hidden="true"></span></a
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ultraplayer_cue ml-1"
                            data-href="/playlists/builder/6010351-2.m3u"
                            title="Cue"
                            data-ua_action="cue">
                            <span
                              class="glyphicon glyphicon-cue"
                              aria-hidden="true"></span></button
                          ><button
                            type="button"
                            class="btn btn-secondary btn-xs ml-1"
                            data-redir="/api/1.2/?method=alerts.add&output_type=html&alert_type=4&param1=6010351&param2=2"
                            callback="login_callback"
                            onclick="uaAddEvent(event); if(check_login(this, 'soft')){modal_dialog($(this).attr('data-redir'),'#alert_dialog_container', { width: 375, height:'505', request_type:'POST' })}"
                            title="e-mail me when released"
                            data-ua_action="alert newrelease">
                            <span class="glyphicon glyphicon-email" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                      <div class="jw-info">
                        <div class="jw-artist" title="Various">
                          <a
                            href="/artists/Various/"
                            data-ua_action="ln_artist"
                            onclick="uaAddEvent(event);"
                            >Various</a
                          >
                        </div>
                        <div class="jw-title" title="Who Say Reload?">
                          <a
                            href="/products/who-say-reload/6010351-02/"
                            data-ua_action="ln_product"
                            onclick="uaAddEvent(event);"
                            >Who Say Reload?</a
                          >
                        </div>
                        <div class="jw-label" title="Velocity Press">
                          <a
                            href="/labels/Velocity+Press/"
                            data-ua_action="ln_label"
                            onclick="uaAddEvent(event);"
                            >Velocity Press</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="jw-si-hider"></div>
                <div class="jw-back">
                  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                </div>
                <div class="jw-forward">
                  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;
const HTMLTEMPLATE = `<html><body><h1 class='example-class'>Hello, World!</h1></body></html>`;

describe('createCheerioInstance method', () => {
  test('returns a CheerioAPI object', () => {
    const $ = createCheerioInstance(HTMLTEMPLATE);
    expect($('.example-class').text()).toBe('Hello, World!');
    expect($('h1').text()).toBe('Hello, World!');
  });
});

describe('Get Releases', () => {
  const $ = createCheerioInstance(TEMPLATE);
  const NRC = '.home-top .jw-body .jw-container .jw-item';
  const CSC = '.home-coming-soon .jw-body .jw-container .jw-item';

  it('should return an array of new releases objects', () => {
    const result = scrapeReleases($, NRC);

    expect(result[1]?.artist).toBe('Insider');
    expect(result[1]?.title).toBe('Something Flash');
    expect(result[1]?.label).toBe('R&S');
    expect(result[1]?.cover).toBe('https://imagescdn.junodownload.com/300/CS5807345-02A-MED.jpg');
    expect(result[4]?.artist).toBe(
      'Voice Of Art / Kenneth Bager / Troels Hammer / Dj Divo / Olio / Claus Hojensgard'
    );
  });

  it('should return an array of coming soon releases objects', () => {
    const result = scrapeReleases($, CSC);

    expect(result[0]?.artist).toBe('Nine Windows');
    expect(result[0]?.title).toBe('Rule Of Thirds');
    expect(result[1]?.label).toBe('7AGE Music');
    expect(result[2]?.cover).toBe('https://imagescdn.junodownload.com/300/CS5533563-02A-MED.jpg');
    expect(result[4]?.artist).toBe('Various');
  });
});
