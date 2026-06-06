const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    theme: "dracula",
    mode: "python"
});

async function runCode() {
    const outputDiv = document.getElementById("output");
    outputDiv.innerText = "Running... please wait...";
    const userCode = editor.getValue();
    const url = "https://emkc.org";
    
    const requestData = {
        language: "python",
        version: "3.10.0",
        files: [{ content: userCode }]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });
        const result = await response.json();
        if (result.run && result.run.output !== undefined) {
            outputDiv.innerText = result.run.output || "Code run ho gaya, koi output nahi aaya.";
        } else {
            outputDiv.innerText = "Error: Code run nahi hua.";
        }
    } catch (error) {
        outputDiv.innerText = "Network Error!";
    }
              }
              
