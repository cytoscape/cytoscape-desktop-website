import { useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import ReactMarkdown from '@/components/base/ReactMarkdown'
import { XMarkIcon } from '@heroicons/react/24/outline'


export function ReleaseNotes({ version, open, onClose }) {
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!version) {
      return
    }
    const fetchReleaseNotes = async () => {
      try {
        const formattedVersion = version.replace(/\./g, '_')
        console.log(`Fetching release notes for version: ${formattedVersion}`)
        const response = await fetch(`/release-notes/${formattedVersion}.md`)
        if (!response.ok) {
          throw new Error('Failed to fetch release notes')
        }
        const data = await response.text()
        setNotes(data)
      } catch (error) {
        console.error('Error fetching release notes:', error)
        setNotes('Unable to load release notes at this time.')
      }
    }

    fetchReleaseNotes()
  }, [version])
  
  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-10" >
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
              <DialogPanel className="relative transform sm:max-w-3xl w-full rounded-t-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 sm:rounded-lg">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-xl bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-complement-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="-mt-2.5">
                    <DialogTitle
                      as="h3"
                      className="mb-6 text-base font-semibold leading-6 text-gray-900"
                    >
                      Release Notes for Version {version}
                    </DialogTitle>
                    <div className="mt-12 text-sm max-h-[60vh] overflow-y-auto">
                      <ReactMarkdown>{notes}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}