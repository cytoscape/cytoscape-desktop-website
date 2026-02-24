import React, { useEffect } from 'react'
import { Button } from '@/components/base/Button'
import { BugAntIcon } from '@heroicons/react/24/solid'

let urlVars = undefined

const getUrlVars = () => {
  if (urlVars == undefined) {
    urlVars = {}
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      urlVars[key] = value
    })
  }
  return urlVars
}

const getIssueEnvironment = () => {
  const cyVersion = getUrlVars()['cyversion']
  const os = getUrlVars()['os']
  const javaversion = getUrlVars()['javaversion']

  return "Cytoscape Version: " + (cyVersion ? cyVersion : "") + "\n\nOperating System: " + (os ? os : "") + "\n\nJava Version: " + (javaversion ? javaversion : "")
}


export function JiraCollector() {
  useEffect(() => {
    // Define the global trigger function
    window.ATL_JQ_PAGE_PROPS = {
      "triggerFunction": (showCollectorDialog) => {
        document.getElementById('my-custom-trigger').onclick = (e) => {
          e.preventDefault()
          showCollectorDialog()
        }
      },
      fieldValues: {
          summary: "",
          description: "How to reproduce the bug in Cytoscape:\n\n" + getIssueEnvironment()
      }
    }

    // Load the Jira script
    const script = document.createElement('script')
    script.src = "https://cytoscape.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/o2joag/b/24/a44af77267a987a660377e5c46e0fb64/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=45488c8f"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script) // Cleanup
    }
  }, [])

  return (
    <Button id="my-custom-trigger">
      <BugAntIcon className="h-5 w-5 mr-2" />
      Click here to report a bug
    </Button>
  )
}

export default JiraCollector