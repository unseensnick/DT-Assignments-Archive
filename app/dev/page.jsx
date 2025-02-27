"use client";

import CodePlayground from "@/components/code/advanced-ide";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

// Sample files for different examples
const htmlCssJsFiles = [
    {
        id: "html-1",
        name: "index.html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Web Page</title>
</head>
<body>
  <div class="container">
    <h1>Hello, <span id="name">World</span>!</h1>
    <p>This is an interactive example.</p>
    <button id="changeBtn">Change Name</button>
  </div>
</body>
</html>`,
        language: "html",
    },
    {
        id: "css-1",
        name: "styles.css",
        content: `.container {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2c3e50;
}

#name {
  color: #e74c3c;
  font-weight: bold;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}`,
        language: "css",
    },
    {
        id: "js-1",
        name: "script.js",
        content: `// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get references to elements
  const nameSpan = document.getElementById('name');
  const changeBtn = document.getElementById('changeBtn');
  
  // Array of names to cycle through
  const names = ['World', 'Developer', 'Coder', 'Student', 'Friend'];
  let currentIndex = 0;
  
  // Add click event listener to button
  changeBtn.addEventListener('click', function() {
    // Increment index and loop back to start if needed
    currentIndex = (currentIndex + 1) % names.length;
    
    // Change the text with animation
    nameSpan.style.opacity = '0';
    
    setTimeout(() => {
      nameSpan.textContent = names[currentIndex];
      nameSpan.style.opacity = '1';
    }, 300);
    
    console.log('Name changed to:', names[currentIndex]);
  });
  
  console.log('Script initialized successfully!');
});`,
        language: "javascript",
    },
];

const reactFiles = [
    {
        id: "react-1",
        name: "App.jsx",
        content: `import React, { useState } from 'react';
import './styles.css';

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={\`app \${theme}\`}>
      <h1>React Counter App</h1>
      
      <div className="card">
        <p>Current count: <span className="count">{count}</span></p>
        
        <div className="buttons">
          <button onClick={() => setCount(count - 1)}>Decrease</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
      </div>
      
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default App;`,
        language: "jsx",
    },
    {
        id: "react-2",
        name: "styles.css",
        content: `/* Base styles */
.app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* Light theme (default) */
.light {
  background-color: #f0f5ff;
  color: #333;
}

/* Dark theme */
.dark {
  background-color: #2c3e50;
  color: #ecf0f1;
}

.card {
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.light .card {
  background-color: white;
}

.dark .card {
  background-color: #34495e;
}

.count {
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
}

.dark .count {
  color: #2ecc71;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.light button {
  background-color: #3498db;
  color: white;
}

.light button:hover {
  background-color: #2980b9;
}

.dark button {
  background-color: #2ecc71;
  color: #2c3e50;
}

.dark button:hover {
  background-color: #27ae60;
}

.theme-toggle {
  margin-top: 20px;
  background-color: transparent !important;
  border: 1px solid currentColor !important;
}

.light .theme-toggle {
  color: #2c3e50 !important;
}

.dark .theme-toggle {
  color: #ecf0f1 !important;
}`,
        language: "css",
    },
];

const pythonFiles = [
    {
        id: "python-1",
        name: "main.py",
        content: `# Simple Python program to demonstrate basic concepts

def calculate_factorial(n):
    """Calculate the factorial of a number using recursion."""
    if n == 0 or n == 1:
        return 1
    else:
        return n * calculate_factorial(n-1)

def is_prime(n):
    """Check if a number is prime."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

def main():
    print("Python Math Functions Example")
    print("-" * 30)
    
    # Factorial example
    num = 5
    print(f"Factorial of {num}: {calculate_factorial(num)}")
    
    # Prime number check examples
    for n in range(10, 20):
        print(f"{n} is {'prime' if is_prime(n) else 'not prime'}")
    
    # Fibonacci sequence
    print("Fibonacci sequence (10 terms):", fibonacci(10))

if __name__ == "__main__":
    main()`,
        language: "python",
    },
];

export default function AdvancedIDEDemo() {
    const [activeTab, setActiveTab] = useState("html-css-js");

    const configMap = {
        "html-css-js": {
            title: "Web Development IDE",
            height: 400,
            previewHeight: 400,
        },
        react: {
            title: "React Development",
            height: 500,
            previewHeight: 350,
            showConsole: true,
        },
        python: {
            title: "Python Code Editor",
            height: 600,
            showConsole: true,
            initialExpanded: true,
        },
    };

    const filesMap = {
        "html-css-js": htmlCssJsFiles,
        react: reactFiles,
        python: pythonFiles,
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Advanced Code Editor
            </h1>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <div className="flex justify-center mb-6">
                    <TabsList>
                        <TabsTrigger value="html-css-js">
                            HTML/CSS/JS
                        </TabsTrigger>
                        <TabsTrigger value="react">React</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="html-css-js">
                    <Card>
                        <CardHeader>
                            <CardTitle>Web Development Environment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CodePlayground
                                config={configMap["html-css-js"]}
                                files={filesMap["html-css-js"]}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="react">
                    <Card>
                        <CardHeader>
                            <CardTitle>React Development Environment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CodePlayground
                                config={configMap["react"]}
                                files={filesMap["react"]}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="python">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Python Development Environment
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CodePlayground
                                config={configMap["python"]}
                                files={filesMap["python"]}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
