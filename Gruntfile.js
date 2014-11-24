
module.exports = function(grunt){
	grunt.initConfig({
		
		paths:{
			dev: 'served-files',
			prod: 'production-files',
			lib: 'lib',
			html: 'html'
		},
		
		pkg: grunt.file.readJSON('package.json'),
		
		// JSHint
		jshint: {
			options:{
				reporter: require('jshint-stylish')
			},
			all: ['Gruntfile.js', '<%= paths.lib %>/js/**/*.js']
		},
		
		// Concatenation
		concat: {
			options: {
				separator: ';'
			},
			dist:{
				src: ['<%= paths.lib %>/js/**/*.js'],
				dest: '<%= paths.dev %>/lib/js/<%= pkg.name %>.js'
			}
		},
		
		// Uglify
		uglify:{
			dev:{
				options:{
					banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n\n',
					sourceMap: true,
					sourceMapName: '<%= paths.dev %>/lib/js/<%= pkg.name %>.map'
				},				
				files:{
					'<%= paths.dev %>/lib/js/<%= pkg.name %>.min.js' : [ '<%= concat.dist.dest %>' ]
				}
			},
			prod:{
				options:{
					banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n\n'
				},				
				files:{
					'<%= paths.prod %>/lib/js/<%= pkg.name %>.min.js' : [ '<%= concat.dist.dest %>' ]
				}
			}
			
		},
		
		// Less
		less: {
			dev:{
				options:{
					paths: ['<%= paths.lib %>/less/'],
					cleancss: false
				},
				files: {
					'<%= paths.dev %>/lib/css/<%= pkg.name %>.css' : '<%= paths.lib %>/less/style.less'
					
				}
			},
			prod:{
				options:{
					paths: ['<%= paths.lib %>/less/'],
					cleancss: true
				},
				files: {
					'<%= paths.prod %>/lib/css/<%= pkg.name %>.css' : '<%= paths.lib %>/less/style.less'
					
				}
			}
		},
		
		
		// Copy
		copy:{
			devImgs:{
				flatten: false,
				expand: true,
				filter: 'isFile',
				cwd: '<%= paths.lib %>/imgs',
				src: ['**'],
				dest: '<%= paths.dev %>/lib/imgs/'
			},
			prodImgs:{
				flatten: false,
				expand: true,
				filter: 'isFile',
				cwd: '<%= paths.lib %>/imgs',
				src: ['**'],
				dest: '<%= paths.prod %>/lib/imgs/'
			},
			devHTML:{
				flatten: false,
				expand: true,
				filter: 'isFile',
				cwd: '<%= paths.html %>',
				src: ['**'],
				dest: '<%= paths.dev %>/'
			},
			prodHTML:{
				flatten: false,
				expand: true,
				filter: 'isFile',
				cwd: '<%= paths.html %>',
				src: ['**'],
				dest: '<%= paths.prod %>/'
			}
		},
		
		// Clean
		clean:{
			dev: [ '<%= paths.dev %>'],
			prod: [ '<%= paths.prod %>'],
			devLeftOver: [ '<%= concat.dist.dest %>' ]
		},
		
		
		
		// Watch
		watch: {
			files: ['<%= paths.lib %>/**', '<%= paths.html %>/**'],
			tasks: [ 'jshint', 'concat', 'uglify:dev', 'less:dev', 'copy:devImgs', 'copy:devHTML' ]
		}
		
		
		
	});	
	

	grunt.loadNpmTasks('grunt-contrib-jshint');		
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');	
	grunt.loadNpmTasks('grunt-contrib-less');	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	
	grunt.registerTask( 'default', [ 'clean:dev', 'clean:prod', 'jshint', 'concat', 'uglify', 'less', 'copy', 'clean:devLeftOver' ] );
	
};