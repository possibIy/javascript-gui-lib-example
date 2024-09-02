(function() {
    // GUI Settings
    let defaultWidth = 500;
    let defaultHeight = 500;
    let showKeybind = 'E';
    let guiName = 'My GUI';
    let isVisible = true;
    let initialTab = 'tab1'; // Set initial tab here
    let components = {}; // Object to keep track of component states

    // Function to create the GUI container
    function createContainer() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '50px';
        container.style.left = '50px';
        container.style.width = `${defaultWidth}px`;
        container.style.height = `${defaultHeight}px`;
        container.style.backgroundColor = '#2E2E2E'; // Dark grey background
        container.style.border = '1px solid #333';
        container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        container.style.zIndex = '1000';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.overflow = 'hidden';
        document.body.appendChild(container);

        return container;
    }

    // Create the top bar
    function createTopBar(container) {
        const topBar = document.createElement('div');
        topBar.style.height = '40px';
        topBar.style.backgroundColor = '#333';
        topBar.style.color = '#E0E0E0';
        topBar.style.display = 'flex';
        topBar.style.alignItems = 'center';
        topBar.style.padding = '0 10px';
        topBar.style.position = 'relative';
        topBar.style.cursor = 'move';
        container.appendChild(topBar);

        const guiNameElement = document.createElement('span');
        guiNameElement.textContent = `${guiName} | ${showKeybind}`;
        guiNameElement.style.flex = '1';
        guiNameElement.style.fontSize = '18px';
        guiNameElement.style.fontWeight = 'bold';
        guiNameElement.style.color = '#E0E0E0';
        topBar.appendChild(guiNameElement);

        const closeButton = document.createElement('div');
        closeButton.textContent = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.right = '10px';
        closeButton.style.top = '50%';
        closeButton.style.transform = 'translateY(-50%)';
        closeButton.style.fontSize = '18px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#E0E0E0';
        closeButton.style.padding = '0 5px';
        closeButton.addEventListener('click', () => {
            toggleVisibility();
        });
        topBar.appendChild(closeButton);

        return topBar;
    }

    // Function to handle dragging of the GUI
    function makeDraggable(container, topBar) {
        let isDragging = false;
        let offsetX, offsetY;

        topBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - container.getBoundingClientRect().left;
            offsetY = e.clientY - container.getBoundingClientRect().top;
            document.body.style.cursor = 'move';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
                container.style.left = `${Math.max(0, x)}px`;
                container.style.top = `${Math.max(0, y)}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.cursor = 'default';
        });
    }

    // Function to toggle GUI visibility
    function toggleVisibility() {
        isVisible = !isVisible;
        container.style.display = isVisible ? 'flex' : 'none';
    }

    // Create tabs
    function createTabs(container) {
        const tabsContainer = document.createElement('div');
        tabsContainer.style.display = 'flex';
        tabsContainer.style.backgroundColor = '#3E3E3E'; // Slightly lighter grey for tabs
        tabsContainer.style.borderBottom = '1px solid #444';
        tabsContainer.style.flex = '0 0 auto';
        tabsContainer.style.whiteSpace = 'nowrap';
        container.appendChild(tabsContainer);

        return tabsContainer;
    }

    // Create the content area
    function createContentArea(container) {
        const contentArea = document.createElement('div');
        contentArea.style.flex = '1';
        contentArea.style.padding = '10px';
        contentArea.style.backgroundColor = '#2E2E2E'; // Dark grey background
        contentArea.style.overflow = 'auto';
        container.appendChild(contentArea);

        return contentArea;
    }

    // Create a tab
    function addTab(tabsContainer, contentArea, tabId, tabTitle) {
        const tabButton = document.createElement('button');
        tabButton.textContent = tabTitle;
        tabButton.style.flex = '1';
        tabButton.style.backgroundColor = '#4E4E4E';
        tabButton.style.color = '#E0E0E0';
        tabButton.style.border = 'none';
        tabButton.style.padding = '10px';
        tabButton.style.cursor = 'pointer';
        tabButton.style.borderRadius = '0';
        tabButton.style.outline = 'none';
        tabButton.style.whiteSpace = 'nowrap';
        tabButton.addEventListener('click', () => showTab(tabId));
        tabsContainer.appendChild(tabButton);

        const tabContent = document.createElement('div');
        tabContent.style.display = 'none';
        tabContent.style.backgroundColor = '#2E2E2E';
        tabContent.style.padding = '10px';
        tabContent.style.boxSizing = 'border-box';
        tabs[tabId] = { tabButton, tabContent };
        contentArea.appendChild(tabContent);

        return tabContent;
    }

    // Function to show a specific tab
    function showTab(tabId) {
        Object.values(tabs).forEach(({ tabButton, tabContent }) => {
            tabContent.style.display = 'none';
            tabButton.style.backgroundColor = '#4E4E4E';
            tabButton.style.color = '#E0E0E0';
        });

        if (tabs[tabId]) {
            tabs[tabId].tabContent.style.display = 'block';
            tabs[tabId].tabButton.style.backgroundColor = '#6E6E6E';
            tabs[tabId].tabButton.style.color = '#FFFFFF';
        }
    }

    // Function to add a header
    function addHeader(tabId, text) {
        const header = document.createElement('h1');
        header.textContent = text;
        header.style.color = '#E0E0E0';
        tabs[tabId].tabContent.appendChild(header);
    }

    // Function to add a paragraph
    function addParagraph(tabId, text) {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        paragraph.style.color = '#E0E0E0';
        tabs[tabId].tabContent.appendChild(paragraph);
    }

    // Function to add a spacer
    function addSpacer(tabId) {
        const spacer = document.createElement('div');
        spacer.style.height = '20px';
        spacer.style.borderTop = '1px solid #444';
        tabs[tabId].tabContent.appendChild(spacer);
    }

    // Function to add a dropdown
    function addDropdown(tabId, id, options) {
        if (!tabs[tabId]) {
            console.error('Tab not found:', tabId);
            return;
        }

        const dropdown = document.createElement('select');
        dropdown.style.width = '100%';
        dropdown.style.padding = '10px';
        dropdown.style.marginBottom = '10px';
        dropdown.style.border = '1px solid #444';
        dropdown.style.backgroundColor = '#3E3E3E';
        dropdown.style.color = '#E0E0E0';

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            dropdown.appendChild(opt);
        });

        tabs[tabId].tabContent.appendChild(dropdown);
        components[id] = dropdown;

        return {
            getValue: () => dropdown.value,
            setValue: (value) => { dropdown.value = value; }
        };
    }

    // Function to add a slider
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
        slider.style.border = '1px solid #444';
        slider.style.backgroundColor = '#3E3E3E';
        slider.style.color = '#E0E0E0';

        const sliderLabel = document.createElement('span');
        sliderLabel.textContent = `Value: ${value}`;
        sliderLabel.style.color = '#E0E0E0';

        slider.addEventListener('input', () => {
            sliderLabel.textContent = `Value: ${slider.value}`;
            components[id] = slider.value;
        });

        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(sliderLabel);
        tabs[tabId].tabContent.appendChild(sliderContainer);

        components[id] = slider.value;

        return {
            getValue: () => components[id],
            setValue: (value) => {
                slider.value = value;
                sliderLabel.textContent = `Value: ${value}`;
                components[id] = value;
            }
        };
    }

    // Function to add a regular button
    function addButton(tabId, id, text, onClick) {
        if (!tabs[tabId]) {
            console.error('Tab not found:', tabId);
            return;
        }

        const button = document.createElement('button');
        button.textContent = text;
        button.style.padding = '10px';
        button.style.marginBottom = '10px';
        button.style.border = 'none';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = '#E0E0E0';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '0';
        button.style.outline = 'none';
        button.addEventListener('click', onClick);

        tabs[tabId].tabContent.appendChild(button);
        components[id] = button;

        return {
            setText: (newText) => {
                button.textContent = newText;
            }
        };
    }

    // Function to add a text input with a button
    function addTextInputButton(tabId, inputId, buttonId, buttonText, onButtonClick) {
        if (!tabs[tabId]) {
            console.error('Tab not found:', tabId);
            return;
        }

        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.marginBottom = '10px';

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.style.flex = '1';
        textInput.style.padding = '10px';
        textInput.style.border = '1px solid #444';
        textInput.style.backgroundColor = '#3E3E3E';
        textInput.style.color = '#E0E0E0';

        const button = document.createElement('button');
        button.textContent = buttonText;
        button.style.padding = '10px';
        button.style.marginLeft = '5px';
        button.style.border = 'none';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = '#E0E0E0';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '0';
        button.style.outline = 'none';
        button.addEventListener('click', () => onButtonClick(textInput.value));

        container.appendChild(textInput);
        container.appendChild(button);
        tabs[tabId].tabContent.appendChild(container);

        components[inputId] = textInput;
        components[buttonId] = button;
    }

    // Initialize GUI
    const container = createContainer();
    const topBar = createTopBar(container);
    makeDraggable(container, topBar);
    const tabsContainer = createTabs(container);
    const contentArea = createContentArea(container);

    // Define tabs
    const tabs = {};
    const tab1Content = addTab(tabsContainer, contentArea, 'tab1', 'Tab 1');
    const tab2Content = addTab(tabsContainer, contentArea, 'tab2', 'Tab 2');
    const tab3Content = addTab(tabsContainer, contentArea, 'tab3', 'Tab 3');

    // Show the initial tab
    showTab(initialTab);

    // Add components to tabs
    addHeader('tab1', 'Header for Tab 1');
    addParagraph('tab1', 'This is a paragraph in Tab 1.');
    addSpacer('tab1');
    addButton('tab1', 'button1', 'Regular Button', () => alert('Button Clicked!'));
    addTextInputButton('tab1', 'textInput1', 'textButton1', 'Submit', (text) => alert(`Text Submitted: ${text}`));
    addDropdown('tab1', 'dropdown1', [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' }
    ]);
    addSlider('tab1', 'slider1', 0, 100, 1, 50);

    addHeader('tab2', 'Header for Tab 2');
    addParagraph('tab2', 'This is a paragraph in Tab 2.');
    addSpacer('tab2');
    addButton('tab2', 'button2', 'Another Button', () => alert('Another Button Clicked!'));

    addHeader('tab3', 'Header for Tab 3');
    addParagraph('tab3', 'This is a paragraph in Tab 3.');
    addSpacer('tab3');

    // Function to handle keybind toggling
    function handleKeybind(e) {
        if (e.key.toUpperCase() === showKeybind.toUpperCase()) {
            toggleVisibility();
        }
    }

    document.addEventListener('keydown', handleKeybind);

    // Usage Example (for coders)
    window.gui = {
        container,
        tabs,
        toggleVisibility,
        addHeader,
        addParagraph,
        addSpacer,
        addDropdown,
        addSlider,
        addButton,
        addTextInputButton,
    };
})();
