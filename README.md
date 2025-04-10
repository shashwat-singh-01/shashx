<p align="right">
  <a href="https://shashwat-singh-01.github.io/shashx_Documentation/" target="_blank">
    <img src="https://img.shields.io/badge/📄%20Documentation-View%20Now-blue?style=for-the-badge" alt="Documentation">
  </a>
</p>



<h1 align="center">🚀 shashx</h1>
<p align="center"><strong>A lightweight, dynamically-typed interpreted language built for simplicity and learning.</strong></p>



---

## 📖 What is shashx?

**`shashx`** is a custom-designed, educational programming language developed by [Shashwat Singh](https://github.com/shashwat-singh-01), focusing on simplicity, clean syntax, and powerful learning potential.

- 🔤 Inspired by modern scripting languages
- 🧠 Created to understand how interpreters, tokenizers, and parsers work
- 🧪 Perfect for experimenting with language design

---

## ✨ Features

- ✅ Dynamically typed
- ✅ Interpreted (no compilation needed)
- ✅ Custom clean syntax
- ✅ Supports variables, loops, conditionals, and print statements
- ✅ Built with JavaScript (Node.js)
- ✅ CLI-based execution
- ✅ VS Code syntax highlighting extension

---

## 📦 Installation

### 1. **Install via NPM (Recommended)**

```bash
npm install -g shashx
```

> This will globally install the `shashx` CLI.

---

## 🏃 How to Run a `.sx` File

1. Create a file with the `.sx` extension, e.g., `hello.sx`
2. Run it using the CLI:

```bash
shashx path/to/hello.sx
```

---

## 🧠 Syntax Guide

### ➕ Print Statement

```shashx
pf("Hello, World!")
```

### 📦 Variable Declaration

```shashx
@x = 10
@y = 20
pf(>x)
pf(>y)
```

### 🔁 Loops

#### ➰ For Loop (`flp`)

```shashx
flp @i = 0 to 3{
  pf("flp i = " >i);
}
```

#### 🔁 While Loop (`wlp`)

```shashx
@j = 0;
wlp j < 2 {
  pf("wlp j = " > j);
  j = j + 1;
}
```

#### 🔁 Do-While Loop (`dlp`)

```shashx
@k = 0;
dlp {
  pf("dlp k = " > k);
  k = k + 1;
} wlp k < 2;
```

### 🔂 Conditional Statements

```shashx
@x = 10
if x > 5
  pf("Greater than 5")
elf x == 5
  pf("Equals 5")
el
  pf("Less than 5")
```

---

## 🧩 VS Code Extension Support

> Want syntax highlighting in Visual Studio Code?

### 🔌 Install from Marketplace

You can get the extension here:  
👉 [shashx-lang on Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=shashwat-sx.shashx-lang)

### 🎨 Features

- Syntax highlighting
- File recognition (`.sx`)
- Friendly editing experience

---

## 📁 Project Structure

```
shashx-lang/
├── bin/
│   └── shashx.bat         # CLI batch file
├── examples/
│   └── loop.sx            # Sample code files
├── src/
│   ├── lexer.js
│   ├── parser.js
│   └── interpreter.js
├── main.js                # Entry point
├── package.json
└── README.md
```

---

## 📢 Contribution

Want to improve `shashx`?

1. 🍴 Fork the repo
2. 🛠️ Make changes
3. 📩 Open a PR

Bug reports, ideas, and suggestions are always welcome!

---

## 📬 Contact

> Have questions, ideas, or feedback?

**Shashwat Singh**  
📧 Email: [singhshashwat521@gmail.com](mailto:singhshashwat521@gmail.com)  
🌐 GitHub: [github.com/shashwat-singh-01](https://github.com/shashwat-singh-01)  
🔗 LinkedIn: [linkedin.com/in/shashwat-singh-200495248](https://www.linkedin.com/in/shashwat-singh-200495248)

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

<p align="center"><strong>💡 Start building with shashx today and explore the internals of a real language interpreter!</strong></p>
```

---

