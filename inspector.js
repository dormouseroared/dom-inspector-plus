// DOM Inspector Plus — by dormouseroared & Copilot 😄
// https://github.com/dormouseroared/dom-inspector-plus

(function () {

  const version = "1.6"

  const existing = document.getElementById('editable-inspector')
  if (existing) existing.remove()

  const defaultProps = {
    INPUT: ['id', 'name', 'type', 'value', 'placeholder', 'checked', 'disabled', 'readOnly', 'required', 'style'],
    TEXTAREA: ['id', 'name', 'value', 'placeholder', 'readOnly', 'style'],
    BUTTON: ['id', 'name', 'value', 'type', 'disabled', 'innerText', 'style'],
    IMG: ['src', 'alt', 'width', 'height', 'naturalWidth', 'naturalHeight', 'style'],
    A: ['href', 'target', 'download', 'textContent', 'style'],
    SELECT: ['value', 'disabled', 'multiple', 'selectedIndex', 'style'],
    DEFAULT: ['id', 'className', 'innerText', 'textContent', 'style']
  }

  const presetMap = {
    'Form Fields': ['value', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'min', 'max', 'pattern'],
    'Media Elements': ['src', 'currentTime', 'duration', 'paused', 'muted', 'volume'],
    'Layout & Geometry': ['offsetWidth', 'offsetHeight', 'clientWidth', 'clientHeight', 'scrollHeight', 'scrollTop']
  }

  const storageKey = 'copilotInspectorPrefs'
  const userPrefs = JSON.parse(localStorage.getItem(storageKey) || '{}')

  // --- Create Overlay <div>
  const overlay = document.createElement('div')
  overlay.id = 'editable-inspector'
  Object.assign(overlay.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: '#111',
    color: '#0f0',
    border: '1px solid #444',
    padding: '10px',
    fontFamily: 'monospace',
    fontSize: '12px',
    borderRadius: '6px',
    maxWidth: '520px',
    maxHeight: '500px',
    overflowY: 'auto',
    zIndex: 99999,
    boxShadow: '0 0 10px #000'
  })

  // --- Create Header <div>
  const header = document.createElement('div')
  header.style.display = 'flex'
  header.style.justifyContent = 'space-between'
  header.style.alignItems = 'start'
  header.style.marginBottom = '6px'

  // --- Create Title <div> within Header
  const title = document.createElement('div')
  title.style.fontWeight = 'bold'
  title.textContent = `🔎 DOM Inspector Plus ${version}`
  header.appendChild(title)

  // --- Create Buttons <div> container
  const buttonGroup = document.createElement('div')
  buttonGroup.style.display = "flex"
  buttonGroup.style.gap = "4px"

  // --- Create Copy <button>
  const copyBtn = document.createElement('button')
  copyBtn.textContent = '📋 Copy'
  copyBtn.style.background = '#222'
  copyBtn.style.border = '1px solid #555'
  copyBtn.style.color = '#0f0'
  copyBtn.style.padding = '2px 6px'
  copyBtn.style.cursor = 'pointer'

  // --- Create Exit <button>
  const exitBtn = document.createElement('button')
  exitBtn.textContent = '❌ Exit'
  exitBtn.style.background = '#222'
  exitBtn.style.border = '1px solid #555'
  exitBtn.style.color = '#f55'
  exitBtn.style.padding = '2px 6px'
  exitBtn.style.cursor = 'pointer'

  // --- Add buttons to the header
  buttonGroup.appendChild(copyBtn)
  buttonGroup.appendChild(exitBtn)
  header.appendChild(buttonGroup)
  overlay.appendChild(header)

  //  --- create selectPreset <select> for form fields
  const selectPreset = document.createElement('select')
  selectPreset.style.width = '100%'
  selectPreset.style.marginBottom = '6px'
  Object.entries(presetMap).forEach(([name, list]) => {
    const opt = document.createElement('option')
    opt.value = name
    opt.textContent = `📌 Load Preset: ${name}`
    selectPreset.appendChild(opt)
  })
  overlay.appendChild(selectPreset)

  const inputBox = document.createElement('textarea')
  Object.assign(inputBox.style, {
    width: '100%',
    height: '30px',
    background: '#222',
    color: '#0f0',
    border: '1px solid #555',
    marginBottom: '8px',
    fontFamily: 'monospace',
    fontSize: '12px',
    padding: '4px',
    borderRadius: '4px'
  })
  overlay.appendChild(inputBox)

  const resetBtn = document.createElement('button')
  resetBtn.textContent = '♻️ Reset to Default'
  resetBtn.style.background = '#222'
  resetBtn.style.color = '#f55'
  resetBtn.style.border = '1px solid #444'
  resetBtn.style.marginBottom = '8px'
  resetBtn.style.cursor = 'pointer'
  overlay.appendChild(resetBtn)

  const outputBox = document.createElement('div')
  overlay.appendChild(outputBox)

  document.body.appendChild(overlay)



  //   const host = document.createElement('div')
  //   host.id = 'dom-inspector-host'
  //   host.style.position = 'fixed'
  //   host.style.bottom = '0'
  //   host.style.right = '0'
  //   host.style.zIndex = 2147483647

  //   const shadow = host.attachShadow({ mode: 'open' })

  //   const style = document.createElement('style')
  //   style.textContent = `
  //   * {
  //     all: initial;
  //     font-family: monospace;
  //     font-size: 12px;
  //     color: #0f0;
  //   }

  //   a {
  //     color: #0ff;
  //     text-decoration: none;
  //   }

  //   button {
  //     background: #222;
  //     border: 1px solid #555;
  //     color: #0f0;
  //     padding: 2px 6px;
  //     cursor: pointer;
  //   }

  //   textarea {
  //     background: #222;
  //     border: 1px solid #555;
  //     color: #0f0;
  //     padding: 4px;
  //     border-radius: 4px;
  //   }

  //   div {
  //     line-height: 1.2;
  //   }
  // `
  //   shadow.appendChild(style)
  //   shadow.appendChild(overlay)
  //   document.body.appendChild(host)


  let lastEl = null

  function getOrigin(obj, prop) {
    while (obj && !Object.prototype.hasOwnProperty.call(obj, prop)) {
      obj = Object.getPrototypeOf(obj)
    }
    return obj && obj.constructor ? obj.constructor.name : '[unknown]'
  }

  function mdnLink(protoName, propName) {
    if (!protoName || !propName) return null
    return `https://developer.mozilla.org/en-US/docs/Web/API/${encodeURIComponent(protoName)}/${encodeURIComponent(propName)}`
  }

  function inspect(el) {
    const tag = el.tagName.toUpperCase()
    const props = userPrefs[tag] || defaultProps[tag] || defaultProps.DEFAULT
    const cleanedProps = props.map(p => p.trim()).filter(Boolean)
    inputBox.value = cleanedProps.join(', ')
    let html = `<div style="margin-bottom:6px;color:#aaa;"><strong>&lt;${tag.toLowerCase()}&gt;</strong> — ${cleanedProps.length} properties</div>`

    let textCopy = `<${tag.toLowerCase()}>\n\n`

    cleanedProps.forEach(prop => {
      let val = '[unavailable]', origin = '[unknown]'
      try {
        val = el[prop]
        // workaround for inline styles on the actual element
        // is to use the text version
        // rather than try to process the object
        if (prop === "style") {
          console.log("val el prop:", val, el, prop)
          val = el.style.cssText
          if (!val) val = "[none]"
        }
        origin = getOrigin(el, prop)
        if (typeof val === 'function') val = '[function]'
        else if (Array.isArray(val)) val = `[array] (${val.length})`
        else if (val && typeof val === 'object') val = '[object]'
      } catch {
        val = '[access denied]'
      }

      const link = mdnLink(origin, prop)
      // make it clear this is for inline styles only
      // leave this until the very last
      if (prop === "style") {
        prop = "style (inline)"
      }

      const propHTML = link
        ? `<a href="${link}" target="_blank" style="color:#0ff;text-decoration:none;line-height:1;margin:0;padding:0;background-color:black">${prop}</a>`
        : `<span style="color:#0ff";line-height:1;margin:0;padding:0>${prop}</span>`

      html += `
        <div style="display:flex;gap:4px;margin:0;padding:0;line-height:1;font-size:12px">

          ${propHTML}

          : 

          <span style="color:#0f0">
            ${val}
          </span>

          <span style="color:#aaa;font-style:italic">
          ← ${origin}
          </span>

        </div>`

      textCopy += `${prop}: ${val} ← ${origin}\n`
    })

    outputBox.innerHTML = html
    copyBtn.onclick = () => navigator.clipboard.writeText(textCopy)
  }

  inputBox.addEventListener('input', () => {
    const tag = lastEl?.tagName?.toUpperCase()
    if (!tag) return
    const list = inputBox.value.split(',').map(p => p.trim()).filter(Boolean)
    userPrefs[tag] = list
    localStorage.setItem(storageKey, JSON.stringify(userPrefs))
    console.log("inputBox event listener -> inspect(lastEl)", lastEl)
    inspect(lastEl)
  })

  selectPreset.addEventListener('change', () => {
    const selected = selectPreset.value
    if (!presetMap[selected]) return
    inputBox.value = presetMap[selected].join(', ')
    inputBox.dispatchEvent(new Event('input'))
  })

  resetBtn.addEventListener('click', () => {
    const tag = lastEl?.tagName?.toUpperCase()
    if (!tag || !defaultProps[tag]) return
    inputBox.value = defaultProps[tag].join(', ')
    inputBox.dispatchEvent(new Event('input'))
  })

  Object.assign(exitBtn.style, {
    position: "relative",
    zIndex: 100000,
    pointerEvents: "auto"
  })

  overlay.style.pointerEvents = "auto"

  copyBtn.addEventListener("mouseenter", () => {
    copyBtn.style.color = "#222"
    copyBtn.style.background = "#0f0"
  })
  copyBtn.addEventListener("mouseleave", () => {
    copyBtn.style.color = "#0f0"
    copyBtn.style.background = "#222"
  })

  exitBtn.addEventListener("mouseenter", () => {
    exitBtn.style.color = "#222"
    exitBtn.style.background = "#f55"
  })
  exitBtn.addEventListener("mouseleave", () => {
    exitBtn.style.color = "#f55"
    exitBtn.style.background = "#222"
  })

  exitBtn.addEventListener("click", () => {
    console.log("DOM Inspector exit clicked")
    const el = document.getElementById("editable-inspector")
    if (el) {
      el.remove()
    }

    document.removeEventListener("click", globalClickHandler, true)


    // alert("exit button!")
  })

  // more explicit definition, also allows removal later
  // the other event listeners are for the overlay
  // this covers the actual page we are trying to debug
  // but excluding the overlay
  function globalClickHandler(e) {
    if (overlay.contains(e.target)) return
    e.preventDefault()
    e.stopPropagation()
    lastEl = e.target
    console.log("global click handler -> inspect(lastEl)", lastEl)
    // inspect(lastEl)
    // does this fix the checkbox tick?
    setTimeout(() => inspect(lastEl), 0)
  }

  document.addEventListener("click", globalClickHandler, true)

})()
