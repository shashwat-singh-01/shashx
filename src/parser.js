// parser.js
export function parse(tokens) {
    let current = 0;

    function walk() {
        let token = tokens[current];

        function parsePrimary() {
            token = tokens[current];

            if (token.type === 'NUMBER') {
                current++;
                return { type: 'NumberLiteral', value: token.value };
            }

            if (token.type === 'STRING') {
                current++;
                return { type: 'StringLiteral', value: token.value };
            }

            if (token.type === 'IDENTIFIER') {
                current++;
                return { type: 'Identifier', name: token.value };
            }

            if (token.type === 'VAR_DECL') {
                const name = token.value;
                current++;
                if (tokens[current].value !== '=') {
                    throw new Error("Expected '='");
                }
                current++;
                const value = parseExpression();
                if (tokens[current]?.value === ';') current++;
                return { type: 'VarDeclaration', name, value };
            }

            throw new Error(`Unexpected token in primary: ${JSON.stringify(token)}`);
        }

        function parseExpression() {
            let left = parsePrimary();

            while (['+', '-', '*', '/', '==', '!=', '<', '>', '<=', '>='].includes(tokens[current]?.value)) {
                const operator = tokens[current].value;
                current++;
                const right = parsePrimary();
                left = {
                    type: 'BinaryExpression',
                    operator,
                    left,
                    right
                };
            }

            return left;
        }

        // pf() function
        if (token.type === 'KEYWORD' && token.value === 'pf') {
            current++; // skip pf
            if (tokens[current].value !== '(') throw new Error('Expected (');
            current++; // skip (

            const args = [];
            while (tokens[current].value !== ')') {
                if (tokens[current].value === '>') {
                    current++;
                    const next = parseExpression();
                    args.push({ type: 'VarConcat', value: next });
                } else {
                    args.push(parseExpression());
                }
            }

            current++; // skip )
            if (tokens[current]?.value === ';') current++;
            return { type: 'PrintStatement', arguments: args };
        }

        // flp loop: flp i = 0 to 3 { ... }
        if (token.type === 'KEYWORD' && token.value === 'flp') {
            current++; // skip 'flp'

            const loopVar = tokens[current].value;
            current++;

            if (tokens[current].value !== '=') throw new Error("Expected '=' after flp loop variable");
            current++;

            const start = parseExpression();

            if (tokens[current].value !== 'to') throw new Error("Expected 'to' in flp loop");
            current++;

            const end = parseExpression();

            if (tokens[current].value !== '{') throw new Error("Expected '{' to start flp body");
            current++;

            const body = [];
            while (tokens[current]?.value !== '}') {
                body.push(walk());
            }
            current++; // skip '}'

            return { type: 'FlpLoop', loopVar, start, end, body };
        }

        // wlp loop: wlp condition { ... }
        if (token.type === 'KEYWORD' && token.value === 'wlp') {
            current++; // skip 'wlp'
            const condition = parseExpression();

            if (tokens[current].value !== '{') throw new Error("Expected '{' after wlp condition");
            current++;

            const body = [];
            while (tokens[current]?.value !== '}') {
                body.push(walk());
            }
            current++; // skip '}'

            return { type: 'LoopStatement', kind: 'wlp', condition, body };
        }

        // dlp loop: dlp { ... } wlp condition;
        if (token.type === 'KEYWORD' && token.value === 'dlp') {
            const kind = token.value;
            current++;

            if (tokens[current]?.value !== '{') throw new Error('Expected { after dlp');
            current++; // skip '{'

            const body = [];
            while (tokens[current]?.value !== '}') {
                body.push(walk());
            }
            current++; // skip '}'

            // expect wlp after }
            if (tokens[current]?.type !== 'KEYWORD' || tokens[current].value !== 'wlp') {
                throw new Error('Expected wlp after dlp body');
            }
            current++;

            const condition = parseExpression();
            if (tokens[current]?.value === ';') current++;

            return { type: 'LoopStatement', kind, condition, body };
        }

        // if-elf-el
        if (token.type === 'KEYWORD' && token.value === 'if') {
            const branches = [];

            while (['if', 'elf'].includes(tokens[current]?.value)) {
                const kind = tokens[current].value;
                current++;

                const condition = parseExpression();
                if (tokens[current]?.value !== '{') throw new Error('Expected {');
                current++;

                const body = [];
                while (tokens[current]?.value !== '}') {
                    body.push(walk());
                }
                current++; // skip '}'

                branches.push({ kind, condition, body });
            }

            // Optional el
            if (tokens[current]?.value === 'el') {
                current++;
                if (tokens[current]?.value !== '{') throw new Error('Expected {');
                current++;

                const body = [];
                while (tokens[current]?.value !== '}') {
                    body.push(walk());
                }
                current++;

                branches.push({ kind: 'el', condition: null, body });
            }

            return { type: 'IfChain', branches };
        }

        // Assignment
        if (token.type === 'IDENTIFIER' && tokens[current + 1]?.value === '=') {
            const name = token.value;
            current += 2;
            const value = parseExpression();
            if (tokens[current]?.value === ';') current++;
            return { type: 'Assignment', name, value };
        }

        // Fallback to expression
        return parseExpression();
    }

    const ast = {
        type: 'Program',
        body: []
    };

    while (current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}
