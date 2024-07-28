import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import CleanCSS from 'clean-css';

export default {
	input: './src/index.js',
	output: [{
		file: './dist/index.min.js',
		format: 'iife',
		name: 'version',
		plugins: [
			terser(),
		]
	}],
	plugins: [,
		copy({
			targets: [
				{
					src: './src/styles.css',
					dest: './dist',
					rename: 'breadcrumb.min.css',
					transform: (contents) => new CleanCSS().minify(contents).styles
				}
			]
		})],
};