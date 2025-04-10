// interpreter.js
export function run(ast) {
    const env = {};

    function evaluate(node) {
        switch (node.type) {
            case 'Program':
                node.body.forEach(evaluate);
                break;

            case 'VarDeclaration':
                env[node.name] = evaluate(node.value);
                break;

            case 'Assignment':
                if (!(node.name in env)) {
                    throw new Error(`Variable "${node.name}" not declared.`);
                }
                env[node.name] = evaluate(node.value);
                break;

            case 'NumberLiteral':
            case 'StringLiteral':
                return node.value;

            case 'Identifier':
                if (node.name in env) {
                    return env[node.name];
                } else {
                    throw new Error(`Variable "${node.name}" not defined.`);
                }

            case 'BinaryExpression': {
                const left = evaluate(node.left);
                const right = evaluate(node.right);

                if (typeof left === 'string' || typeof right === 'string') {
                    if (node.operator === '>') {
                        return String(left) + String(right);
                    }
                }

                switch (node.operator) {
                    case '+': return left + right;
                    case '-': return left - right;
                    case '*': return left * right;
                    case '/': return left / right;
                    case '==': return left === right;
                    case '!=': return left !== right;
                    case '<': return left < right;
                    case '>': return left > right;
                    case '<=': return left <= right;
                    case '>=': return left >= right;
                    default:
                        throw new Error(`Unsupported operator ${node.operator}`);
                }
            }

            case 'PrintStatement': {
                const parts = node.arguments.map(evaluate);
                console.log(parts.join(''));
                break;
            }

            case 'IfChain':
                for (const branch of node.branches) {
                    if (branch.kind === 'el' || evaluate(branch.condition)) {
                        branch.body.forEach(evaluate);
                        break;
                    }
                }
                break;

            case 'LoopStatement': {
                if (node.kind === 'flp' || node.kind === 'wlp') {
                    while (evaluate(node.condition)) {
                        for (const stmt of node.body) {
                            evaluate(stmt);
                        }
                    }
                } else if (node.kind === 'dlp') {
                    do {
                        for (const stmt of node.body) {
                            evaluate(stmt);
                        }
                    } while (evaluate(node.condition));
                }
                break;
            }

            case 'FlpLoop': {
                const loopVar = node.loopVar;
                const start = evaluate(node.start);
                const end = evaluate(node.end);

                for (env[loopVar] = start; env[loopVar] < end; env[loopVar]++) {
                    for (const stmt of node.body) {
                        evaluate(stmt);
                    }
                }
                break;
            }

            default:
                throw new Error(`Unknown AST node type: ${node.type}`);
        }
    }

    evaluate(ast);
}
