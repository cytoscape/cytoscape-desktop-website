import { useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'


const images = [
  {
    title: 'PLOS ONE, 2022',
    body: 'Identification of hub genes associated with COVID-19 and idiopathic pulmonary fibrosis by integrated bioinformatics analysis',
    author: 'Qianyi Chen, et al.',
    doi: 'https://doi.org/10.1371/journal.pone.0262737',
    src: 'journal.pone.0262737.png',
  },
  {
    title: 'J. Cellular Biochemistry, 2018',
    body: 'Reconstruction and analysis of the aberrant lncRNA‐miRNA‐mRNA network based on competitive endogenous RNA in CESC',
    author: 'Jukun Song, et al.',
    doi: 'https://doi.org/10.1002%2Fjcb.26850',
    src: 'jcb.26850.png',
  },
  {
    title: 'Genome Biology, 2019',
    body: 'Cytoscape Automation: empowering workflow-based network analysis',
    author: 'David Otasek, et al.',
    doi: 'https://doi.org/10.1186/s13059-019-1758-4',
    src: 's13059-019-1758-4.png',
  },
  {
    title: 'Laboratory Investigation, 2008',
    body: 'The fibromatosis signature defines a robust stromal response in breast carcinoma',
    author: 'Andrew H Beck, et al.',
    doi: 'https://doi.org/10.1038%2Flabinvest.2008.31',
    src: 'labinvest.2008.31.png',
  },
  {
    title: 'BMC Bioinformatics, 2013',
    body: 'Visualization of protein interaction networks: problems and solutions',
    author: 'Giuseppe Agapito, et al.',
    doi: 'https://doi.org/10.1186%2F1471-2105-14-S1-S1',
    src: '1471-2105-14-S1-S1.png',
  },
  {
    title: 'Human Genomics, 2022',
    body: 'Construction of the coexpression network involved in the pathogenesis of thyroid eye disease via bioinformatics analysis',
    author: 'Jinxing Hu, et al.',
    doi: 'https://doi.org/10.1186%2Fs40246-022-00412-0',
    src: 's40246-022-00412-0.png',
  },
  {
    title: 'Frontiers Bioeng. Biotechnol., 2020',
    body: 'A Guide to Conquer the Biological Network Era Using Graph Theory',
    author: 'Mikaela Koutrouli, et al.',
    doi: 'https://doi.org/10.3389%2Ffbioe.2020.00034',
    src: 'fbioe.2020.00034.png',
  },
  {
    title: 'World Journal of Transplantation, 2016',
    body: 'Proteomics for rejection diagnosis in renal transplant patients: Where are we now?',
    author: 'Wilfried Gwinner, et al.',
    doi: 'https://doi.org/10.5500%2Fwjt.v6.i1.28',
    src: 'wjt.v6.i1.28.png',
  },
  {
    title: 'F1000Research, 2021',
    body: 'scNetViz: from single cells to networks using Cytoscape',
    author: 'Krishna Choudhary, et al.',
    doi: 'https://doi.org/10.12688%2Ff1000research.52460.1',
    src: 'f1000research.52460.1.png',
  },
  {
    title: 'Scientific Data, 2020',
    body: 'Consensus transcriptional regulatory networks of coronavirus-infected human cells',
    author: 'Scott A. Ochsner, et al.',
    doi: 'https://doi.org/10.1038%2Fs41597-020-00628-6',
    src: 's41597-020-00628-6.png',
  },
  {
    title: 'Frontiers in Genetics, 2019',
    body: 'Beyond Pathway Analysis: Identification of Active Subnetworks in Rett Syndrome',
    author: 'Ryan A. Miller, et al.',
    doi: 'https://doi.org/10.3389%2Ffgene.2019.00059',
    src: 'fgene.2019.00059.png',
  },
  {
    title: 'Metabolites, 2021',
    body: 'Gut Microbiota Dysbiosis Is Associated with Elevated Bile Acids in Parkinson’s Disease',
    author: 'Peipei Li, et al.',
    doi: 'https://doi.org/10.3390%2Fmetabo11010029',
    src: 'metabo11010029.png',
  },
]


export function ImageGallery({
  speed = 40,
  thumbSize = 128,
}) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [active, setActive] = useState(null)

  const handleCloseDialog = () => {
    setActive(null)
  }

  // Pause scrolling when the strip leaves the viewport.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Auto-scroll loop. Track contains the images twice; we reset at the halfway
  // point so the seam is invisible.
  useEffect(() => {
    const track = trackRef.current
    if (!track || !isVisible || isHovered || active) return

    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      const dt = now - last
      last = now
      track.scrollLeft += (speed * dt) / 1000
      const half = track.scrollWidth / 2
      if (track.scrollLeft >= half) track.scrollLeft -= half
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isVisible, isHovered, active, speed])

  // ESC closes the dialog.
  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active])

  const doubled = [...images, ...images]

  return (
    <section
      id="gallery"
      aria-label="Image gallery"
      className="bg-gray-900 py-2 border-t-2 border-gray-500"
    >
      <div
        ref={rootRef}
        className="lg:max-w-7xl max-w-full mx-auto lg:px-8"
      >
        <div
          ref={trackRef}
          className="flex overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {doubled.map((img, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setActive(img)}
              className="flex-shrink-0 rounded-xl overflow-hidden border-4 border-transparent transition-transform duration-200 hover:border-complement-400 focus:outline-none focus-visible:border-complement-400 active:border-complement-600"
              style={{ height: thumbSize, width: thumbSize }}
            >
              <img
                src={`/images/gallery/${img.src}`}
                alt={img.title ?? ""}
                draggable={false}
                className="h-full w-full object-cover block"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Dialog for active image */}

      <Transition show={active}>
        <Dialog onClose={handleCloseDialog} className="relative z-10" >
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform sm:max-w-3xl w-full rounded-t-lg bg-white pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 sm:rounded-lg">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      className="rounded-xl bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-complement-500 focus:ring-offset-2"
                      onClick={handleCloseDialog}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div>
                  {active && (
                    <div className="-mt-2.5">
                      <DialogTitle
                        as="h3"
                        className="flex items-center mb-6 text-base font-semibold leading-6 text-gray-900"
                      >
                        <a href={active.doi} target="_blank" rel="noreferrer" className="mt-1 flex items-start group">
                          <h3 className="ml-4 font-semibold text-gray-900 group-hover:text-complement-500">
                            {active.author}
                          </h3>
                          <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 mt-1 fill-gray-400 group-hover:fill-complement-500" />
                        </a>
                      </DialogTitle>
                      <img
                        src={`/images/gallery/${active.src}`}
                        alt={active.title ?? ""}
                        className="px-4 w-full max-w-[90vw] max-h-[90vh] object-contain rounded"
                      />
                    </div>
                  )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  )
}