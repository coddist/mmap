echo "💣 Pruning existing build..."
rm -rf ../pkg

echo "🏗️ Compiling TypeScript..."
npx tsc

echo "🗜️ Compressing output..."
npx google-closure-compiler --js=pkg/index.js --js_output_file=pkg/index.min.js