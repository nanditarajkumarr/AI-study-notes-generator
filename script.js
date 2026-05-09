// Get DOM elements
const inputText = document.getElementById('input-text');
const generateBtn = document.getElementById('generate-btn');
const notesOutput = document.getElementById('notes-output');
const copyBtn = document.getElementById('copy-btn');

// Event listener for generate button
generateBtn.addEventListener('click', generateNotes);

// Event listener for copy button
copyBtn.addEventListener('click', copyNotes);

// Function to generate notes
function generateNotes() {
    const text = inputText.value.trim();
    
    if (!text) {
        alert('Please enter some text to generate notes.');
        return;
    }
    
    // Simple summarization: split by sentences and take first 5
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const summarySentences = sentences.slice(0, 5);
    
    // Create bullet points
    const bullets = summarySentences.map(sentence => `<li>${sentence.trim()}</li>`).join('');
    
    // Display notes
    notesOutput.innerHTML = `<ul>${bullets}</ul>`;
    
    // Show copy button
    copyBtn.style.display = 'block';
}

// Function to copy notes to clipboard
function copyNotes() {
    const notesText = notesOutput.textContent || notesOutput.innerText;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(notesText).then(() => {
            alert('Notes copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(notesText);
        });
    } else {
        fallbackCopyTextToClipboard(notesText);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('Notes copied to clipboard!');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        alert('Failed to copy notes. Please copy manually.');
    }
    
    document.body.removeChild(textArea);
}