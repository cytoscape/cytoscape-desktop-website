import { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'
import { Button } from '@/components/base/Button'
import { Container } from '@/components/base/Container'
import { Link } from '@/components/base/Link'
import { CircleBackground } from '@/components/CircleBackground'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'


const BASE_URL = 'https://github.com/cytoscape/cytoscape/releases/'
const BASE_OLD_URL = 'http://chianti.ucsd.edu/cytoscape-'

const minorVersion = (version) => {
  // Since it's a semantic version, and there are only versions 3.x.x,
  // we can ignore the "major" number until we release Cytoscape 4.0 :-)
  return Number(version.replace('3.', ''))
}

const releaseURL = (version) => {
  if (!version) {
    return '#'
  }
  const nminorVersion = minorVersion(version)
  if (nminorVersion >= 6.1) {
    return `${BASE_URL}${version}/`
  }
  return `${BASE_OLD_URL}${version}/`
}

const releaseFileURL = (release, userAgent) => {
  /*
  userAgent:
  {
    "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
    "browser": {
      "name": "Chrome",
      "version": "145.0.7632.76",
      "major": "145"
    },
    "cpu": {
      "architecture": "arm64"
    },
    "device": {
      "model": "Macintosh",
      "vendor": "Apple"
    },
    "engine": {
      "name": "Blink",
      "version": "145.0.7632.76"
    },
    "os": {
      "name": "macOS",
      "version": "26.2.0"
    }
  }
  Filenames:
    - Cytoscape_3_10_3_macos_aarch64.dmg
    - Cytoscape_3_10_3_macos_x64.dmg
    - Cytoscape_3_10_3_unix.sh
    - Cytoscape_3_10_3_windows_64bit.exe
  */
  if (!release || !userAgent) {
    return '#'
  }

  const os = userAgent.os.name.toLowerCase()
  let sufix = null

  if (os === 'unix' || os === 'linux') {
    sufix = 'unix.sh'
  } else if (os === 'macos') {
    sufix = `macos_${userAgent.cpu.architecture === 'arm64' ? 'aarch64' : 'x64'}.dmg`
  } else if (os === 'windows') {
    sufix = `windows_${userAgent.cpu.architecture === 'arm64' ? 'arm64' : '64bit'}.exe`
  }

  const nminorVersion = minorVersion(release.version)
  const baseUrl = nminorVersion >= 6.1 ? BASE_URL : BASE_OLD_URL
  const versionUnderscore = release.version.split('.').join('_');
    
  return `${baseUrl}download/${release.version}/Cytoscape_${versionUnderscore}_${sufix}`
}


function LatestVersionPanel({ latestRelease, hide }) {
  const [userAgent , setUserAgent] = useState(null);

  const parser = new UAParser()

  useEffect(() => {
    const result = parser.getResult().withClientHints()
      .then((ua) => {
        setUserAgent(ua)
      }
    )
  }, []);
  
  return (
    <div
      className={`absolute inset-0 transition-all duration-300 ${
        hide
          ? 'opacity-0 translate-y-4 pointer-events-none'
          : 'opacity-100 translate-y-0'
      }`}
    >
      <p className="text-md text-gray-400">
        Adoptium OpenJDK Java 17 will be automatically installed if not already present.
        If you experience difficulty with this, manual installers for OpenJDK Java 
        can be downloaded <Link href="https://adoptium.net/" ariaLabel="OpenJDK Java download" linkOut darkBackground>here</Link>.
      </p>
      <div className="mt-8 flex justify-center">
        <Button
          variant="solid"
          color="primary"
          href={releaseFileURL(latestRelease, userAgent)}
          className="min-w-44 pl-4 pr-6"
        >
          <ArrowDownTrayIcon className="h-6 w-6 flex-none" />
          <span className="ml-2.5">
            Download for {userAgent?.os.name} ({userAgent?.cpu.architecture})
          </span>
        </Button>
      </div>
    </div>
  )
}

function OlderVersionsPanel({ olderReleases, hide }) {
  const versionList = (items) => (
    <ul className="w-full">
      {items.map(({ version, date }) => (
        <li
          key={version}
          className="grid grid-cols-[120px_1fr] gap-4 py-2"
        >
          <span className="text-right tabular-nums text-yellow-50 font-mono ">
            <Link href={releaseURL(version)} darkBackground linkOut>{version}</Link>
          </span>
          <span className="text-left text-gray-400 text-sm font-mono" >
            {date}
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={`absolute inset-0 transition-all duration-300 ${
        hide
          ? 'opacity-0 translate-y-4 pointer-events-none'
          : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="w-full flex sm:flex-row flex-col xl:gap-7 lg:gap-5 gap-0 overflow-y-auto h-56">
        {versionList(olderReleases.slice(0, Math.ceil(olderReleases.length / 2)))}
        {versionList(olderReleases.slice(Math.ceil(olderReleases.length / 2)))}
      </div>
    </div>
  )
}


export function CallToAction() {
  const [releases, setReleases] = useState([]);
  const [category, setCategory] = useState('latest'); // latest, older

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/releases.json'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setReleases(jsonData.releases);
      } catch (error) {
        console.error('Error fetching cytoscape releases data:', error);
      }
    };

    fetchData();
  }, [])

  const latestRelease = releases.length > 0 ? releases[0] : null;
  const olderReleases = releases.length > 1 ? releases.slice(1) : [];

  return (
    <section
      id="download"
      className="relative overflow-hidden bg-gray-900 sm:py-28 py-10"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:block hidden">
        <CircleBackground color="#fff" size="720" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mb-10 font-medium tracking-tight text-white sm:text-4xl text-3xl">
            Download
              {category === 'older' ? 
                <> Older Versions</>
                : 
                <> the Latest Version <span className="text-yellow-50 font-mono font-normal text-sm">({latestRelease?.version})</span></>
              }
          </h2>
          <div className="relative mt-6 sm:min-h-[240px] min-h-[300px]">
          {latestRelease && olderReleases && (
          <>
            <LatestVersionPanel latestRelease={latestRelease} hide={category === 'older'} />
            <OlderVersionsPanel olderReleases={olderReleases} hide={category !== 'older'} />
          </>
          )}
          </div>
        </div>
      </Container>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 mt-12 text-center">
        <div className="flex items-center justify-center gap-x-6">
          <Link
            onClick={() => setCategory(category === 'older' ? 'latest' : 'older')}
            ariaLabel={category === 'older' ? "Show latest version" : "Show older versions"}
            darkBackground={true}
          >
            {category === 'older' ? 'Latest Version' : 'Older Versions'}
          </Link>
        {category === 'latest' && (
          <Link
            ariaLabel="Show versions for other platforms"
            href={releaseURL(latestRelease?.version)}
            darkBackground={true}
            linkOut
          >
            Other Platforms
          </Link>
        )}
        </div>
      </div>
    </section>
  )
}
