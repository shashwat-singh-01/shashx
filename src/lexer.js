export function tokenize(code) {
    const tokens = [];

    // 🧼 Step 1: Remove single-line comments (~> ...)
    const cleanedCode = code
        .split('\n')
        .map(line => {
            const commentIndex = line.indexOf('~>');
            return commentIndex >= 0 ? line.slice(0, commentIndex) : line;
        })
        .join('\n');

    // 🧠 Step 2: Tokenize cleaned code
    const regex = /\s*([@a-zA-Z_][a-zA-Z0-9_]*|\d+|"[^"]*"|==|!=|<=|>=|[=<>!{}();+\-*/]|pf|if|elf|el|flp|wlp|dlp|to|>|\(|\))\s*/g;

    let match;

    while ((match = regex.exec(cleanedCode)) !== null) {
        const token = match[1];

        if (["pf", "if", "elf", "el", "flp", "wlp", "dlp"].includes(token)) {
            tokens.push({ type: "KEYWORD", value: token });
        } else if (["==", "!=", "<=", ">=", "=", "<", ">", "+", "-", "*", "/", "!", ";", "(", ")", "{", "}"].includes(token)) {
            let type = "SYMBOL";
            if (token === "{" || token === "}") type = "BRACE";
            tokens.push({ type, value: token });
        } else if (token.startsWith("@")) {
            tokens.push({ type: "VAR_DECL", value: token.slice(1) });
        } else if (token.startsWith('"')) {
            tokens.push({ type: "STRING", value: token.slice(1, -1) });
        } else if (!isNaN(token)) {
            tokens.push({ type: "NUMBER", value: Number(token) });
        } else {
            tokens.push({ type: "IDENTIFIER", value: token });
        }
    }

    return tokens;
}
