(function() {
    // Create the main container
    const container = document.createElement('div');
    container.style.width = '400px';
    container.style.height = '400px';
    container.style.position = 'fixed';
    container.style.top = '50px';
    container.style.left = '50px';
    container.style.backgroundColor = '#1e1e1e';
    container.style.border = '1px solid #333';
    container.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
    container.style.zIndex = '1000';
    container.style.cursor = 'move';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    // Create the top bar
    const topBar = document.createElement('div');
    topBar.style.height = '40px';
    topBar.style.backgroundColor = '#333';
    topBar.style.color = '#eee';
    topBar.style.display = 'flex';
    topBar.style.alignItems = 'center';
    topBar.style.padding = '0 10px';
    topBar.style.position = 'relative';
    topBar.style.cursor = 'move';
    container.appendChild(topBar);

    // Add a name to the top bar
    const guiName = document.createElement('span');
    guiName.textContent = 'My GUI';
    guiName.style.flex = '1';
    guiName.style.fontSize = '18px';
    guiName.style.fontWeight = 'bold';
    guiName.style.color = '#eee';
    topBar.appendChild(guiName);

    // Create close button
    const closeButton = document.createElement('div');
    closeButton.textContent = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '10px';
    closeButton.style.top = '50%';
    closeButton.style.transform = 'translateY(-50%)';
    closeButton.style.fontSize = '18px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#eee';
    closeButton.style.padding = '0 5px';
    closeButton.addEventListener('click', () => {
        console.log('Close button clicked!');
        document.body.removeChild(container);
    });
    topBar.appendChild(closeButton);

    // Create the tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.style.display = 'flex';
    tabsContainer.style.backgroundColor = '#2b2b2b';
    tabsContainer.style.borderBottom = '1px solid #444';
    tabsContainer.style.overflow = 'hidden'; // Prevent overflow
    tabsContainer.style.flex = '0 0 auto'; // Ensure the tabs take only their content's height
    tabsContainer.style.whiteSpace = 'nowrap';
    container.appendChild(tabsContainer);

    // Create the content area
    const contentArea = document.createElement('div');
    contentArea.style.flex = '1';
    contentArea.style.padding = '10px';
    contentArea.style.backgroundColor = '#2b2b2b';
    contentArea.style.overflow = 'auto'; // Make content scrollable if needed
    container.appendChild(contentArea);

    // Create an object to manage tabs and their elements
    const tabs = {};
    const components = {}; // Track all components by their ID

    // Function to create a new tab
    function addTab(tabId, tabTitle) {
        const tabButton = document.createElement('button');
        tabButton.textContent = tabTitle;
        tabButton.style.flex = '1'; // Ensure tabs expand to fit container
        tabButton.style.backgroundColor = '#555';
        tabButton.style.color = '#eee';
        tabButton.style.border = 'none';
        tabButton.style.padding = '10px';
        tabButton.style.cursor = 'pointer';
        tabButton.style.borderRadius = '0'; // No rounded corners
        tabButton.style.outline = 'none';
        tabButton.style.whiteSpace = 'nowrap';

        tabButton.addEventListener('click', () => {
            console.log(`Tab ${tabTitle} clicked!`);
            showTab(tabId);
        });

        tabsContainer.appendChild(tabButton);

        const tabContent = document.createElement('div');
        tabContent.style.display = 'none'; // Hide tab content initially
        tabContent.style.backgroundColor = '#2b2b2b';
        tabContent.style.padding = '10px';
        tabContent.style.boxSizing = 'border-box';
        tabs[tabId] = { tabButton, tabContent };
        contentArea.appendChild(tabContent);

        return {
            tabButton,
            tabContent
        };
    }

    // Function to show a specific tab
    function showTab(tabId) {
        // Hide all tab content and reset tab styles
        Object.values(tabs).forEach(({ tabButton, tabContent }) => {
            tabContent.style.display = 'none';
            tabButton.style.backgroundColor = '#555';
            tabButton.style.color = '#eee';
        });

        // Show the selected tab content
        if (tabs[tabId]) {
            tabs[tabId].tabContent.style.display = 'block';
            tabs[tabId].tabButton.style.backgroundColor = '#777'; // Highlight active tab
            tabs[tabId].tabButton.style.color = '#ddd';
        }
    }

    // Function to add a dropdown to a specific tab
    function addDropdown(tabId, id, options) {
        if (!tabs[tabId]) {
            console.error('Tab not found:', tabId);
            return;
        }

        const dropdown = document.createElement('select');
        dropdown.style.width = '100%';
        dropdown.style.padding = '10px';
        dropdown.style.marginBottom = '10px';
        dropdown.style.border = '1px solid #555';
        dropdown.style.backgroundColor = '#333';
        dropdown.style.color = '#eee';

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            dropdown.appendChild(opt);
        });

        tabs[tabId].tabContent.appendChild(dropdown);
        components[id] = dropdown; // Track dropdown in components object

        return {
            getValue: () => dropdown.value,
            setValue: (value) => { dropdown.value = value; }
        };
    }

    // Function to add a slider to a specific tab
    function addSlider(tabId, id, min, max, step, value) {
        if (!tabs[tabId]) {
            console.error('Tab not found:', tabId);
            return;
        }

        const sliderContainer = document.createElement('div');
        sliderContainer.style.marginBottom = '10px';
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = value;
        slider.style.width = '100%';
        slider.style.marginBottom = '5px';
        slider.style.border = '1px solid #555';
        slider.style.backgroundColor = '#333';
        slider.style.color = '#eee';

        const sliderLabel = document.createElement('span');
        sliderLabel.textContent = `Value: ${value}`;
        sliderLabel.style.color = '#eee';

        slider.addEventListener('input', () => {
            sliderLabel.textContent = `Value: ${slider.value}`;
        });

        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(sliderLabel);
        tabs[tabId].tabContent.appendChild(slider);
        components[id] = slider; // Track slider in components object

        return {
            getValue: () => slider.value,
            setValue: (value) => { slider.value = value; sliderLabel.textContent = `Value: ${value}`; }
        };
    }

    // Function to add a text input to a specific tab
    function addTextInput(tabId, id, placeholder) {
        if (!tabs[tabId]) {
            console.error('Tab not found:', tabId);
            return;
        }

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.placeholder = placeholder;
        textInput.style.width = 'calc(100% - 22px)'; // Adjust width to fit with padding and border
        textInput.style.padding = '10px';
        textInput.style.marginBottom = '10px';
        textInput.style.border = '1px solid #555';
        textInput.style.backgroundColor = '#333';
        textInput.style.color = '#eee';

        tabs[tabId].tabContent.appendChild(textInput);
        components[id] = textInput; // Track text input in components object

        return {
            getValue: () => textInput.value,
            setValue: (value) => { textInput.value = value; }
        };
    }

    // Function to add a text input with a button to a specific tab
    function addTextInputWithButton(tabId, id, buttonText, onButtonClick) {
        if (!tabs[tabId]) {
            console.error('Tab not found:', tabId);
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.marginBottom = '10px';

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.style.flex = '1';
        textInput.style.padding = '10px';
        textInput.style.border = '1px solid #555';
        textInput.style.backgroundColor = '#333';
        textInput.style.color = '#eee';

        const button = document.createElement('button');
        button.textContent = buttonText;
        button.style.padding = '10px';
        button.style.marginLeft = '10px';
        button.style.border = 'none';
        button.style.backgroundColor = '#777';
        button.style.color = '#eee';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '5px';
        button.style.outline = 'none';

        button.addEventListener('click', () => {
            onButtonClick(textInput.value);
        });

        wrapper.appendChild(textInput);
        wrapper.appendChild(button);
        tabs[tabId].tabContent.appendChild(wrapper);
        components[id] = textInput; // Track text input with button in components object

        return {
            getValue: () => textInput.value,
            setValue: (value) => { textInput.value = value; }
        };
    }

    // Function to add a regular button to a specific tab
    function addRegularButton(tabId, buttonText, callback) {
        if (!tabs[tabId]) {
            console.error('Tab not found:', tabId);
            return;
        }

        const button = document.createElement('button');
        button.textContent = buttonText;
        button.style.padding = '10px';
        button.style.marginBottom = '10px';
        button.style.border = 'none';
        button.style.backgroundColor = '#777';
        button.style.color = '#eee';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '5px';
        button.style.outline = 'none';

        button.addEventListener('click', callback);

        tabs[tabId].tabContent.appendChild(button);
    }

    // Function to add a toggle button to a specific tab
    function addToggleButton(tabId, id, name, initialValue, onToggle) {
        if (!tabs[tabId]) {
            console.error('Tab not found:', tabId);
            return;
        }

        const toggleButton = document.createElement('button');
        toggleButton.textContent = `${name}: ${initialValue ? 'ON' : 'OFF'}`;
        toggleButton.style.padding = '10px';
        toggleButton.style.marginBottom = '10px';
        toggleButton.style.border = 'none';
        toggleButton.style.backgroundColor = initialValue ? '#4CAF50' : '#f44336'; // Green for ON, Red for OFF
        toggleButton.style.color = '#eee';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.borderRadius = '5px';
        toggleButton.style.outline = 'none';

        let isOn = initialValue;

        toggleButton.addEventListener('click', () => {
            isOn = !isOn;
            toggleButton.textContent = `${name}: ${isOn ? 'ON' : 'OFF'}`;
            toggleButton.style.backgroundColor = isOn ? '#4CAF50' : '#f44336'; // Update color based on state
            components[id] = isOn; // Track toggle state in components object
            if (onToggle) {
                onToggle(isOn); // Execute the callback function
            }
        });

        tabs[tabId].tabContent.appendChild(toggleButton);
        components[id] = isOn; // Initialize toggle state

        return {
            getValue: () => components[id],
            setValue: (value) => {
                isOn = value;
                toggleButton.textContent = `${name}: ${isOn ? 'ON' : 'OFF'}`;
                toggleButton.style.backgroundColor = isOn ? '#4CAF50' : '#f44336';
                components[id] = isOn;
            }
        };
    }

    // Create tabs
    addTab('tab1', 'Tab 1');
    addTab('tab2', 'Tab 2');
    addTab('tab3', 'Tab 3');

    // Show the first tab
    showTab('tab1');

    // Add controls to tabs
    addDropdown('tab1', 'dropdown1', [
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' }
    ]);
    addSlider('tab2', 'slider1', 0, 100, 1, 50);
    addTextInput('tab3', 'textInput1', 'Enter text...');
    addTextInputWithButton('tab3', 'textInput2', 'Alert Text', (value) => {
        alert('Button clicked with text: ' + value);
    });

    // Add a regular button to the first tab
    addRegularButton('tab1', 'Print Specific Values', () => {
        console.log('Printing specified values:');
        console.log(`dropdown1: ${components['dropdown1'] ? components['dropdown1'].value : 'Not found'}`);
        console.log(`slider1: ${components['slider1'] ? components['slider1'].value : 'Not found'}`);
        console.log(`textInput1: ${components['textInput1'] ? components['textInput1'].value : 'Not found'}`);
        console.log(`toggleButton1: ${components['toggleButton1'] !== undefined ? components['toggleButton1'] : 'Not found'}`);
    });

    // Add a toggle button to the second tab
    addToggleButton('tab2', 'toggleButton1', 'Toggle Feature', false, (value) => {
        console.log('Toggle button clicked. New state:', value);
    });
})();
