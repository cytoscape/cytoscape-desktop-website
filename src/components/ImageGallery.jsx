import { useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'


const images = [
  {
    title: 'Frontiers in Molecular Biosciences, 2024',
    body: 'Role of 14-3-3 protein family in the pathobiology of EBV in immortalized B cells and Alzheimer\'s disease',
    author: 'Prankur Awasthi, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11322100/',
    img: 'PMC11322100.png',
  },
  {
    title: 'Front Endocrinol (Lausanne), 2026',
    body: 'Integrated RNA-seq and sQTL analysis reveal immune and splicing regulatory features underlying relapse and remission after treatment of Graves’ disease',
    author: 'Yang Wu, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13212118/',
    img: 'PMC13212118.png',
  },
  {
    title: 'Medicine (Baltimore), 2022',
    body: 'Uncovering the molecular mechanism of Gynostemma pentaphyllum (Thunb.) Makino against breast cancer using network pharmacology and molecular docking',
    author: 'Wen-Xiang Wang, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9750687/',
    img: 'PMC9750687.png',
  },
  {
    title: 'Medicine (Baltimore), 2021',
    body: 'Exploring potential mechanisms of Suhexiang Pill against COVID-19 based on network pharmacology and molecular docking',
    author: 'Jialin Li, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8702253/',
    img: 'PMC8702253.png',
  },
  {
    title: 'Journal of Cellular Biochemistry, 2018',
    body: 'Reconstruction and analysis of the aberrant lncRNA-miRNA-mRNA network based on competitive endogenous RNA in CESC',
    author: 'Jukun Song, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6055788/',
    img: 'PMC6055788.png',
  },
  {
    title: 'Plant Physiology, 2025',
    body: 'Optimizing bio-orthogonal non-canonical amino acid tagging (BONCAT) for low-disruption labeling of Arabidopsis proteins in vivo',
    author: 'Nicholas Hassan, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13221635/',
    img: 'PMC13221635.png',
  },
  {
    title: 'PLoS One, 2026',
    body: 'GSEA and the coexpression network approach identify novel pathway connections of molecular processes affected in Porto-sinusoidal vascular disease',
    author: 'Aishwarya Iyer, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13220999/',
    img: 'PMC13220999.png',
  },
  {
    title: 'Genome Biology, 2019',
    body: 'Cytoscape Automation: empowering workflow-based network analysis',
    author: 'David Otasek, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6717989/',
    img: 'PMC6717989.png',
  },
  {
    title: 'BMC Bioinformatics, 2013',
    body: 'Visualization of protein interaction networks: problems and solutions',
    author: 'Giuseppe Agapito, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3548679/',
    img: 'PMC3548679.png',
  },
  {
    title: 'Scientific Data, 2020',
    body: 'Consensus transcriptional regulatory networks of coronavirus-infected human cells',
    author: 'Scott A. Ochsner, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7509801/',
    img: 'PMC7509801.png',
  },
  {
    title: 'Frontiers in Genetics, 2019',
    body: 'Beyond Pathway Analysis: Identification of Active Subnetworks in Rett Syndrome',
    author: 'Ryan A. Miller, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6393361/',
    img: 'PMC6393361.png',
  },
  {
    title: 'Virologica Sinica, 2026',
    body: 'Metatranscriptomics uncovers host immune and microbiome signatures specific to and shared between human metapneumovirus and respiratory syncytial virus infections in children',
    author: 'Hongwei Zhao, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13215961/',
    img: 'PMC13215961.png',
  },
  {
    title: 'iScience, 2026',
    body: 'An NT5E loss-of-function variant permits tissue inflammation and hypertension in systemic lupus erythematosus',
    author: 'Isaac Peabody, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13217859/',
    img: 'PMC13217859.png',
  },
  {
    title: 'Journal of Pharmaceutical Analysis, 2025',
    body: 'Unveiling the ‘Eating Poison’ of Polygala tenuifolia xylem: Mood changes and myocardial injury',
    author: 'Fusheng Zhang, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13217855/',
    img: 'PMC13217855.png',
  },
  {
    title: 'Journal of Cardiothoracic Surgery, 2026',
    body: 'Identification of biomarkers associated with mitochondria and macrophage polarization in acute myocardial infarction: a bioinformatics analysis and validation study',
    author: 'Nan Qu, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13220572/',
    img: 'PMC13220572.png',
  },
  {
    title: 'Biochemistry and Biophysics Reports, 2026',
    body: 'Drug repositioning in metastatic prostate cancer based on protein- protein interaction network: Computational and in vitro analysis',
    author: 'Zakie Saadat, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13214309/',
    img: 'PMC13214309.png',
  },
  {
    title: 'Frontiers in Medicine, 2026',
    body: 'A preclinical investigation into the potential associations of geraniin with ulcerative colitis alleviation through integrated multi-omics and in vivo analysis',
    author: 'Chang Cheng, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13212046/',
    img: 'PMC13212046.png',
  },
  {
    title: 'Journal of Assisted Reproduction and Genetics, 2025',
    body: 'Dissecting the genetic association between abnormal sperm parameters and depression: a transcriptome-wide analysis of 157 participants',
    author: 'Yinwei Chen, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12229347/',
    img: 'PMC12229347.png',
  },
  {
    title: 'FASEB Journal, 2026',
    body: 'Stromal-like cells and retinal pigment epithelium modulate choroidal sprouting through galectin-1-dependent and independent pathways',
    author: 'Magali E Ridano, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12229269/',
    img: 'PMC12229269.png',
  },
  {
    title: 'F1000Research, 2024',
    body: 'Network pharmacology and in silico approaches to uncover multitargeted mechanism of action of Zingiber zerumbet rhizomes for the treatment of idiopathic pulmonary fibrosis',
    author: 'Bharath Harohalli Byregowda, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11809647/',
    img: 'PMC11809647.png',
  },
  {
    title: 'Current Issues in Molecular Biology, 2026',
    body: 'Transcriptomic Profiling Identifies Potential Prognostic Genes in Vietnamese Patients with Non-Small-Cell Lung Cancer',
    author: 'Tuan Quoc Bach, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13204278/',
    img: 'PMC13204278.png',
  },
  {
    title: 'Pharmaceuticals (Basel), 2026',
    body: 'Effectiveness and Safety of Liuwei Dihuang as an Adjunctive Therapy for Cognitive Impairment: A Systematic Review, Meta-Analysis, and Network Pharmacology Analysis',
    author: 'Jihyun Hwang, et al.',
    src: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13209968/',
    img: 'PMC13209968.png',
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
                src={`/images/gallery/${img.img}`}
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
                        <a href={active.src} target="_blank" rel="noreferrer" className="mt-1 flex items-start group">
                          <h3 className="ml-4 font-semibold text-gray-900 group-hover:text-complement-500">
                            {active.author}
                          </h3>
                          <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 mt-1 fill-gray-400 group-hover:fill-complement-500" />
                        </a>
                      </DialogTitle>
                      <img
                        src={`/images/gallery/${active.img}`}
                        alt={active.title ?? ""}
                        className="px-4 w-full max-w-[90vw] max-h-[90vh] mx-auto object-contain rounded"
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