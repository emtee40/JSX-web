// generatedy by JSX compiler 0.9.47 (2013-06-28 14:31:45 -0700; 517cd62770065c815b4ea9886d407afeac3c7579)
var JSX = {};
(function (JSX) {
/**
 * extends the class
 */
function $__jsx_extend(derivations, base) {
	var ctor = function () {};
	ctor.prototype = base.prototype;
	var proto = new ctor();
	for (var i in derivations) {
		derivations[i].prototype = proto;
	}
}

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions, renamed to avoid conflict with local variable names
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url, cb) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url, cb);
};

JSX.resetProfileResults = function () {
	if ($__jsx_profiler.resetResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.resetResults();
};
JSX.DEBUG = false;
function g_StopIteration() {
};

$__jsx_extend([g_StopIteration], Error);
function ScriptLoader() {
};

$__jsx_extend([ScriptLoader], Object);
function ScriptLoader$load$() {
	var scripts;
	var i;
	var l;
	var script;
	var id;
	scripts = dom.document.getElementsByTagName("script");
	for ((i = 0, l = scripts.length); i < l; ++ i) {
		script = scripts[i];
		if (script.type === "application/jsx") {
			id = (script.src ? script.src : script.innerHTML);
			if ($__jsx_ObjectHasOwnProperty.call(ScriptLoader.seen, id)) {
				continue;
			}
			ScriptLoader.seen[id] = true;
			ScriptLoader$loadScript$LHTMLScriptElement$(script);
		}
	}
};

ScriptLoader.load$ = ScriptLoader$load$;

function ScriptLoader$loadScript$LHTMLScriptElement$(script) {
	var t0;
	var platform;
	var c;
	var o;
	var emitter;
	var sourceFile;
	var optimizeCommands;
	var output;
	var compiledScript;
	var scriptSection;
	var applicationArguments;
	var args;
	var array;
	var i;
	var jsxModule;
	var jsxRequire;
	var jsxRuntime;
	var jsxMain;
	var content$0;
	var array$len$0;
	t0 = Date.now();
	platform = new BrowserPlatform();
	c = new Compiler(platform);
	o = ({_compiler: null, _commands: [], _log: [], _dumpLogs: false, _enableRunTimeTypeCheck: true});
	emitter = new JavaScriptEmitter(platform);
	c._emitter = emitter;
	if (script.src) {
		sourceFile = script.src.replace(/^.*\//, "");
	} else {
		sourceFile = "<script>";
		content$0 = script.innerHTML;
		platform.fileContent["<script>"] = content$0;
	}
	Compiler$addSourceFile_0$LCompiler$LToken$S(c, null, sourceFile);
	if (ScriptLoader.optimizationLevel > 0) {
		optimizeCommands = [ "lto", "no-assert", "no-log", "no-debug", "staticize", "fold-const", "return-if", "inline", "dce", "unbox", "fold-const", "lcse", "dce", "fold-const", "array-length", "unclassify" ].filter((function (command) {
			return command != "no-log";
		}));
		Optimizer$setup_0$LOptimizer$AS(o, optimizeCommands);
		o._enableRunTimeTypeCheck = false;
		emitter._enableRunTimeTypeCheck = false;
	}
	c._optimizer = o;
	if (! Compiler$compile_0$LCompiler$(c)) {
		throw new Error("Failed to compile!");
	}
	output = emitter.getOutput$();
	if (ScriptLoader.optimizationLevel > 1) {
		output = BrowserPlatform$applyClosureCompiler_0$LBrowserPlatform$SSB(platform, output, "SIMPLE_OPTIMIZATIONS", false);
	}
	compiledScript = dom.document.createElement("script");
	scriptSection = dom.document.createTextNode(output);
	compiledScript.appendChild(scriptSection);
	script.parentNode.appendChild(compiledScript);
	console.log("jsx-script-loader: load " + sourceFile + " in " + (Date.now() - t0 + "") + " ms.");
	applicationArguments = script.getAttribute("data-arguments");
	if (applicationArguments) {
		args = JSON.parse(applicationArguments);
		if (args instanceof Array) {
			array = args;
			for ((i = 0, array$len$0 = array.length); i < array$len$0; ++ i) {
				if (typeof array[i] !== "string") {
					throw new TypeError("Not an array of string: arguments[i] is " + JSON.stringify(array[i]));
				}
			}
		} else {
			throw new TypeError("Not an array of string: " + applicationArguments);
		}
		BrowserPlatform$debug_0$LBrowserPlatform$X(platform, Util$format$SAS("run _Main.main()@%1 with %2", [ sourceFile, applicationArguments ]));
		jsxModule = js.global.JSX;
		jsxRequire = jsxModule.require;
		jsxRuntime = jsxRequire(sourceFile);
		jsxMain = jsxRuntime._Main;
		jsxMain["main$AS"](args);
	}
};

ScriptLoader.loadScript$LHTMLScriptElement$ = ScriptLoader$loadScript$LHTMLScriptElement$;

function _Main() {
};

$__jsx_extend([_Main], Object);
function _Main$main$AS(args) {
	ScriptLoader$load$();
};

_Main.main = _Main$main$AS;
_Main.main$AS = _Main$main$AS;

function dom() {
};

$__jsx_extend([dom], Object);
function EventInit() {
};

$__jsx_extend([EventInit], Object);
function CustomEventInit() {
};

$__jsx_extend([CustomEventInit], EventInit);
function MutationObserverInit() {
};

$__jsx_extend([MutationObserverInit], Object);
function UIEventInit() {
};

$__jsx_extend([UIEventInit], EventInit);
function FocusEventInit() {
};

$__jsx_extend([FocusEventInit], Object);
function MouseEventInit() {
};

$__jsx_extend([MouseEventInit], UIEventInit);
function WheelEventInit() {
};

$__jsx_extend([WheelEventInit], Object);
function KeyboardEventInit() {
};

$__jsx_extend([KeyboardEventInit], Object);
function CompositionEventInit() {
};

$__jsx_extend([CompositionEventInit], Object);
function ProgressEventInit() {
};

$__jsx_extend([ProgressEventInit], EventInit);
function XMLHttpRequestOptions() {
};

$__jsx_extend([XMLHttpRequestOptions], Object);
function TrackEventInit() {
};

$__jsx_extend([TrackEventInit], EventInit);
function PopStateEventInit() {
};

$__jsx_extend([PopStateEventInit], EventInit);
function HashChangeEventInit() {
};

$__jsx_extend([HashChangeEventInit], EventInit);
function PageTransitionEventInit() {
};

$__jsx_extend([PageTransitionEventInit], EventInit);
function DragEventInit() {
};

$__jsx_extend([DragEventInit], EventInit);
function CloseEventInit() {
};

$__jsx_extend([CloseEventInit], EventInit);
function StorageEventInit() {
};

$__jsx_extend([StorageEventInit], EventInit);
function MessageEventInit() {
};

$__jsx_extend([MessageEventInit], EventInit);
function ErrorEventInit() {
};

$__jsx_extend([ErrorEventInit], EventInit);
function EventSourceInit() {
};

$__jsx_extend([EventSourceInit], Object);
function IDBObjectStoreParameters() {
};

$__jsx_extend([IDBObjectStoreParameters], Object);
function IDBIndexParameters() {
};

$__jsx_extend([IDBIndexParameters], Object);
function IDBVersionChangeEventInit() {
};

$__jsx_extend([IDBVersionChangeEventInit], EventInit);
function NotificationOptions() {
};

$__jsx_extend([NotificationOptions], Object);
function RTCSessionDescriptionInit() {
};

$__jsx_extend([RTCSessionDescriptionInit], Object);
function RTCIceCandidateInit() {
};

$__jsx_extend([RTCIceCandidateInit], Object);
function RTCIceServer() {
};

$__jsx_extend([RTCIceServer], Object);
function RTCConfiguration() {
};

$__jsx_extend([RTCConfiguration], Object);
function DataChannelInit() {
};

$__jsx_extend([DataChannelInit], Object);
function RTCPeerConnectionIceEventInit() {
};

$__jsx_extend([RTCPeerConnectionIceEventInit], EventInit);
function MediaStreamEventInit() {
};

$__jsx_extend([MediaStreamEventInit], EventInit);
function DataChannelEventInit() {
};

$__jsx_extend([DataChannelEventInit], EventInit);
function MediaStreamConstraints() {
};

$__jsx_extend([MediaStreamConstraints], Object);
function MediaTrackConstraints() {
};

$__jsx_extend([MediaTrackConstraints], Object);
function HitRegionOptions() {
};

$__jsx_extend([HitRegionOptions], Object);
function WebGLContextAttributes() {
};

$__jsx_extend([WebGLContextAttributes], Object);
function WebGLContextEventInit() {
};

$__jsx_extend([WebGLContextEventInit], EventInit);
function DeviceOrientationEventInit() {
};

$__jsx_extend([DeviceOrientationEventInit], EventInit);
function DeviceMotionEventInit() {
};

$__jsx_extend([DeviceMotionEventInit], EventInit);
function Compiler(platform) {
	this._builtinParsers = null;
	this._emitter = null;
	this._platform = platform;
	this._mode = 0;
	this._optimizer = null;
	this._warningFilters = [  ];
	this._warningAsError = false;
	this._parsers = [];
	this._fileCache = {};
	this._searchPaths = [ this._platform.getRoot$() + "/lib/common" ];
	Compiler$addSourceFile_0$LCompiler$LToken$S(this, null, this._platform.getRoot$() + "/lib/built-in.jsx");
	this._builtinParsers = this._parsers.concat([]);
};

$__jsx_extend([Compiler], Object);
function Compiler$getEmitter_0$LCompiler$($this) {
	return $this._emitter;
};

Compiler.getEmitter_0$LCompiler$ = Compiler$getEmitter_0$LCompiler$;

function Compiler$addSourceFile_0$LCompiler$LToken$S($this, token, path) {
	return Compiler$addSourceFile_0$LCompiler$LToken$SLCompletionRequest$($this, token, path, null);
};

Compiler.addSourceFile_0$LCompiler$LToken$S = Compiler$addSourceFile_0$LCompiler$LToken$S;

function Compiler$addSourceFile_0$LCompiler$LToken$SLCompletionRequest$($this, token, path, completionRequest) {
	var parser;
	if ((parser = Compiler$findParser_0$LCompiler$S($this, path)) == null) {
		parser = ({_sourceToken: token, _filename: path, _completionRequest: completionRequest, _input: "", _lines: null, _tokenLength: 0, _lineNumber: 0, _columnOffset: 0, _fileLevelDocComment: null, _docComment: null, _errors: null, _templateClassDefs: null, _classDefs: null, _imports: null, _isGenerator: false, _locals: null, _statements: null, _closures: null, _outerClass: null, _classType: null, _extendType: null, _implementTypes: null, _objectTypesUsed: null, _inners: null, _templateInners: null, _templateInstantiationRequests: null, _prevScope: null, _funcLocal: null, _arguments: null, _classFlags: 0, _typeArgs: null});
		$this._parsers.push(parser);
	}
	return parser;
};

Compiler.addSourceFile_0$LCompiler$LToken$SLCompletionRequest$ = Compiler$addSourceFile_0$LCompiler$LToken$SLCompletionRequest$;

function Compiler$findParser_0$LCompiler$S($this, path) {
	var i;
	for (i = 0; i < $this._parsers.length; ++ i) {
		if (Parser$getPath_0$LParser$($this._parsers[i]) === path) {
			return $this._parsers[i];
		}
	}
	return null;
};

Compiler.findParser_0$LCompiler$S = Compiler$findParser_0$LCompiler$S;

function Compiler$compile_0$LCompiler$($this) {
	var errors;
	var i;
	var builtins;
	var transformer;
	errors = [];
	for (i = 0; i < $this._parsers.length; ++ i) {
		if (! Compiler$parseFile_0$LCompiler$ALCompileError$LParser$($this, errors, $this._parsers[i])) {
			if (! Compiler$_handleErrors_0$LCompiler$ALCompileError$($this, errors)) {
				return false;
			}
		}
	}
	switch ($this._mode) {
	case 1:
		return true;
	}
	Compiler$normalizeClassDefs_0$LCompiler$ALCompileError$($this, errors);
	if (! Compiler$_handleErrors_0$LCompiler$ALCompileError$($this, errors)) {
		return false;
	}
	Compiler$_resolveImports_0$LCompiler$ALCompileError$($this, errors);
	if (! Compiler$_handleErrors_0$LCompiler$ALCompileError$($this, errors)) {
		return false;
	}
	builtins = $this._builtinParsers[0];
	BooleanType._classDef = Parser$lookup_0$LParser$ALCompileError$LToken$S(builtins, errors, null, "Boolean");
	NumberType._classDef = Parser$lookup_0$LParser$ALCompileError$LToken$S(builtins, errors, null, "Number");
	StringType._classDef = Parser$lookup_0$LParser$ALCompileError$LToken$S(builtins, errors, null, "String");
	FunctionType._classDef = Parser$lookup_0$LParser$ALCompileError$LToken$S(builtins, errors, null, "Function");
	CodeTransformer.stopIterationType = new ObjectType(Parser$lookup_0$LParser$ALCompileError$LToken$S(builtins, errors, null, "g_StopIteration"));
	for (i = 0; i < builtins._templateClassDefs.length; ++ i) {
		if (builtins._templateClassDefs[i].className$() === "__jsx_generator") {
			CodeTransformer.jsxGeneratorClassDef = builtins._templateClassDefs[i];
		}
	}
	if (! Compiler$_handleErrors_0$LCompiler$ALCompileError$($this, errors)) {
		return false;
	}
	Compiler$_resolveTypes_0$LCompiler$ALCompileError$($this, errors);
	if (! Compiler$_handleErrors_0$LCompiler$ALCompileError$($this, errors)) {
		return false;
	}
	Compiler$_exportEntryPoints_0$LCompiler$($this);
	Compiler$_analyze_0$LCompiler$ALCompileError$($this, errors);
	if (! Compiler$_handleErrors_0$LCompiler$ALCompileError$($this, errors)) {
		return false;
	}
	switch ($this._mode) {
	case 2:
		return true;
	case 3:
		return true;
	}
	transformer = ({_labelMap: [], _statementIDs: {}});
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$($this, (function (parser, classDef) {
		return ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$(classDef, (function onMember(member) {
			var funcDef;
			if (member instanceof MemberFunctionDefinition) {
				funcDef = member;
				if (MemberFunctionDefinition$isGenerator_0$LMemberFunctionDefinition$(funcDef)) {
					CodeTransformer$transformFunctionDefinition_0$LCodeTransformer$LMemberFunctionDefinition$(transformer, funcDef);
				}
			}
			return MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(member, (function (funcDef) {
				return onMember(funcDef);
			}));
		}));
	}));
	Compiler$_optimize_0$LCompiler$($this);
	Compiler$_generateCode_0$LCompiler$ALCompileError$($this, errors);
	return (! Compiler$_handleErrors_0$LCompiler$ALCompileError$($this, errors) ? false : true);
};

Compiler.compile_0$LCompiler$ = Compiler$compile_0$LCompiler$;

function Compiler$getFileContent_0$LCompiler$ALCompileError$LToken$S($this, errors, sourceToken, path) {
	if ($this._fileCache[path] == null) {
		try {
			$this._fileCache[path] = $this._platform.load$S(path);
		} catch ($__jsx_catch_0) {
			if ($__jsx_catch_0 instanceof Error) {
				errors.push(new CompileError(sourceToken, "could not open file: " + path + ", " + $__jsx_catch_0.toString()));
				$this._fileCache[path] = null;
			} else {
				throw $__jsx_catch_0;
			}
		}
	}
	return $this._fileCache[path];
};

Compiler.getFileContent_0$LCompiler$ALCompileError$LToken$S = Compiler$getFileContent_0$LCompiler$ALCompileError$LToken$S;

function Compiler$parseFile_0$LCompiler$ALCompileError$LParser$($this, errors, parser) {
	var content;
	var imports;
	var i;
	var imports$len$0;
	content = Compiler$getFileContent_0$LCompiler$ALCompileError$LToken$S($this, errors, parser._sourceToken, parser._filename);
	if (content == null) {
		Parser$parse_0$LParser$SALCompileError$(parser, "", []);
		return false;
	}
	Parser$parse_0$LParser$SALCompileError$(parser, content, errors);
	if ($this._mode !== 1) {
		imports = parser._imports;
		for ((i = 0, imports$len$0 = imports.length); i < imports$len$0; ++ i) {
			if (! Compiler$_handleImport_0$LCompiler$ALCompileError$LParser$LImport$($this, errors, parser, imports[i])) {
				return false;
			}
		}
	}
	return true;
};

Compiler.parseFile_0$LCompiler$ALCompileError$LParser$ = Compiler$parseFile_0$LCompiler$ALCompileError$LParser$;

function Compiler$_handleImport_0$LCompiler$ALCompileError$LParser$LImport$($this, errors, parser, imprt) {
	var wildImprt;
	var resolvedDir;
	var files;
	var found;
	var i;
	var path;
	var newParser;
	if (imprt instanceof WildcardImport) {
		wildImprt = imprt;
		resolvedDir = Compiler$_resolvePath_0$LCompiler$SS($this, Token$getFilename_0$LToken$(wildImprt._filenameToken), wildImprt._directory);
		files = [];
		try {
			files = $this._platform.getFilesInDirectory$S(resolvedDir);
		} catch ($__jsx_catch_0) {
			if ($__jsx_catch_0 instanceof Error) {
				errors.push(new CompileError(wildImprt._filenameToken, "could not read files in directory: " + resolvedDir + ", " + $__jsx_catch_0.toString()));
				return false;
			} else {
				throw $__jsx_catch_0;
			}
		}
		found = false;
		for (i = 0; i < files.length; ++ i) {
			if (files[i].length >= wildImprt._suffix.length && files[i].charAt(0) !== "." && files[i].substring(files[i].length - wildImprt._suffix.length) === wildImprt._suffix) {
				path = resolvedDir + "/" + files[i];
				if (path !== parser._filename) {
					newParser = Compiler$addSourceFile_0$LCompiler$LToken$SLCompletionRequest$($this, wildImprt._filenameToken, resolvedDir + "/" + files[i], null);
					wildImprt._sourceParsers.push(newParser);
					found = true;
				}
			}
		}
		if (! found) {
			errors.push(new CompileError(wildImprt._filenameToken, "no matching files found in directory: " + resolvedDir));
			return false;
		}
	} else {
		path = Compiler$_resolvePath_0$LCompiler$SS($this, Token$getFilename_0$LToken$(imprt._filenameToken), Util$decodeStringLiteral$S(Token$getValue_0$LToken$(imprt._filenameToken)));
		if (path === parser._filename) {
			errors.push(new CompileError(imprt._filenameToken, "cannot import itself"));
			return false;
		}
		newParser = Compiler$addSourceFile_0$LCompiler$LToken$SLCompletionRequest$($this, imprt._filenameToken, path, null);
		imprt._sourceParsers.push(newParser);
	}
	return true;
};

Compiler._handleImport_0$LCompiler$ALCompileError$LParser$LImport$ = Compiler$_handleImport_0$LCompiler$ALCompileError$LParser$LImport$;

function Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$($this, f) {
	var onClassDef;
	var i;
	var parser;
	var classDefs;
	var j;
	var classDefs$len$0;
	function onClassDef(parser, classDef) {
		var inners;
		var i;
		var inners$len$0;
		if (! f(parser, classDef)) {
			return false;
		}
		inners = classDef._inners;
		for ((i = 0, inners$len$0 = inners.length); i < inners$len$0; ++ i) {
			if (! onClassDef(parser, inners[i])) {
				return false;
			}
		}
		return true;
	}
	for (i = 0; i < $this._parsers.length; ++ i) {
		parser = $this._parsers[i];
		classDefs = parser._classDefs;
		for ((j = 0, classDefs$len$0 = classDefs.length); j < classDefs$len$0; ++ j) {
			if (! onClassDef(parser, classDefs[j])) {
				return false;
			}
		}
	}
	return true;
};

Compiler.forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$ = Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$;

function Compiler$normalizeClassDefs_0$LCompiler$ALCompileError$($this, errors) {
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$($this, (function (parser, classDef) {
		ClassDefinition$normalizeClassDefs_0$LClassDefinition$ALCompileError$(classDef, errors);
		return true;
	}));
};

Compiler.normalizeClassDefs_0$LCompiler$ALCompileError$ = Compiler$normalizeClassDefs_0$LCompiler$ALCompileError$;

function Compiler$_resolveImports_0$LCompiler$ALCompileError$($this, errors) {
	var i;
	var imports;
	var j;
	var $this$0;
	for (i = 0; i < $this._parsers.length; ++ i) {
		Parser$registerBuiltinImports_0$LParser$ALParser$($this._parsers[i], $this._builtinParsers);
		$this$0 = $this._parsers[i];
		imports = $this$0._imports;
		for (j = 0; j < imports.length; ++ j) {
			Import$assertExistenceOfNamedClasses_0$LImport$ALCompileError$(imports[j], errors);
		}
	}
};

Compiler._resolveImports_0$LCompiler$ALCompileError$ = Compiler$_resolveImports_0$LCompiler$ALCompileError$;

function Compiler$_resolveTypes_0$LCompiler$ALCompileError$($this, errors) {
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$($this, (function (parser, classDef) {
		ClassDefinition$resolveTypes_0$LClassDefinition$LAnalysisContext$(classDef, ({errors: errors, parser: parser, postInstantiationCallback: null, funcDef: null, blockStack: null, statement: null}));
		return true;
	}));
};

Compiler._resolveTypes_0$LCompiler$ALCompileError$ = Compiler$_resolveTypes_0$LCompiler$ALCompileError$;

function Compiler$_analyze_0$LCompiler$ALCompileError$($this, errors) {
	var createContext;
	createContext = (function (parser) {
		return ({errors: errors, parser: parser, postInstantiationCallback: (function (parser, classDef) {
			ClassDefinition$setAnalysisContextOfVariables_0$LClassDefinition$LAnalysisContext$(classDef, createContext(parser));
			ClassDefinition$analyze_0$LClassDefinition$LAnalysisContext$(classDef, createContext(parser));
			return classDef;
		}), funcDef: null, blockStack: null, statement: null});
	});
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$($this, (function (parser, classDef) {
		ClassDefinition$setAnalysisContextOfVariables_0$LClassDefinition$LAnalysisContext$(classDef, createContext(parser));
		return true;
	}));
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$($this, (function (parser, classDef) {
		ClassDefinition$analyze_0$LClassDefinition$LAnalysisContext$(classDef, createContext(parser));
		return true;
	}));
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$($this, (function (parser, classDef) {
		ClassDefinition$analyzeUnusedVariables_0$LClassDefinition$(classDef);
		return true;
	}));
};

Compiler._analyze_0$LCompiler$ALCompileError$ = Compiler$_analyze_0$LCompiler$ALCompileError$;

function Compiler$_optimize_0$LCompiler$($this) {
	if ($this._optimizer != null) {
		Optimizer$performOptimization_0$LOptimizer$(Optimizer$setCompiler_0$LOptimizer$LCompiler$($this._optimizer, $this));
	}
};

Compiler._optimize_0$LCompiler$ = Compiler$_optimize_0$LCompiler$;

function Compiler$_generateCode_0$LCompiler$ALCompileError$($this, errors) {
	var classDefs;
	var i;
	var nativeClassNames;
	var foundConflict;
	var getMaxIndexOfClasses;
	var deps;
	var maxIndexOfClasses;
	var i$0;
	classDefs = [];
	for (i = 0; i < $this._parsers.length; ++ i) {
		classDefs = classDefs.concat(Parser$getClassDefs_0$LParser$($this._parsers[i]));
	}
	for (i = 0; i < classDefs.length; ++ i) {
		if (ClassDefinition$getInnerClasses_0$LClassDefinition$(classDefs[i]).length !== 0) {
			classDefs = classDefs.concat(ClassDefinition$getInnerClasses_0$LClassDefinition$(classDefs[i]));
		}
	}
	nativeClassNames = {};
	foundConflict = false;
	for (i$0 in classDefs) {
		(function (classDef) {
			if ((classDef.flags$() & 16) === 0) {
				return;
			}
			if ($__jsx_ObjectHasOwnProperty.call(nativeClassNames, classDef.className$()) && ! (classDef instanceof InstantiatedClassDefinition && nativeClassNames[classDef.className$()] instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClass_0$LInstantiatedClassDefinition$(classDef) == InstantiatedClassDefinition$getTemplateClass_0$LInstantiatedClassDefinition$(nativeClassNames[classDef.className$()]))) {
				errors.push(CompileError$addCompileNote_0$LCompileError$LCompileNote$(new CompileError(classDef.getToken$(), "native class with same name is already defined"), new CompileNote(nativeClassNames[classDef.className$()].getToken$(), "here")));
				foundConflict = true;
				return;
			}
			nativeClassNames[classDef.className$()] = classDef;
		})(classDefs[i$0]);
	}
	if (foundConflict) {
		return;
	}
	getMaxIndexOfClasses = (function (deps) {
		var i;
		var j;
		deps = deps.concat([  ]);
		if (deps.length === 0) {
			return -1;
		}
		for (i = 0; i < classDefs.length; ++ i) {
			for (j = 0; j < deps.length; ++ j) {
				if (classDefs[i] == deps[j]) {
					deps.splice(j, 1);
					if (deps.length === 0) {
						return i;
					}
				}
			}
		}
		throw new Error("logic flaw, could not find class definition of '" + deps[0].className$() + "'");
	});
	for (i = 0; i < classDefs.length; ) {
		deps = ClassDefinition$implementTypes_0$LClassDefinition$(classDefs[i]).map((function (t) {
			return t._classDef;
		})).concat([  ]);
		if (ClassDefinition$extendType_0$LClassDefinition$(classDefs[i]) != null) {
			deps.unshift(ClassDefinition$extendType_0$LClassDefinition$(classDefs[i]).getClassDef$());
		}
		if (ClassDefinition$getOuterClassDef_0$LClassDefinition$(classDefs[i]) != null && deps.indexOf(ClassDefinition$getOuterClassDef_0$LClassDefinition$(classDefs[i])) === -1) {
			deps.unshift(ClassDefinition$getOuterClassDef_0$LClassDefinition$(classDefs[i]));
		}
		maxIndexOfClasses = getMaxIndexOfClasses(deps);
		if (maxIndexOfClasses > i) {
			classDefs.splice(maxIndexOfClasses + 1, 0, classDefs[i]);
			classDefs.splice(i, 1);
		} else {
			++ i;
		}
	}
	$this._emitter.emit$ALClassDefinition$(classDefs);
};

Compiler._generateCode_0$LCompiler$ALCompileError$ = Compiler$_generateCode_0$LCompiler$ALCompileError$;

function Compiler$_exportEntryPoints_0$LCompiler$($this) {
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$($this, (function (parser, classDef) {
		switch (classDef._outerClassDef != null ? ClassDefinition$classFullName_0$LClassDefinition$(classDef._outerClassDef) + "." + classDef._className : classDef.className$()) {
		case "_Main":
			ClassDefinition$setFlags_0$LClassDefinition$N(classDef, classDef.flags$() | 16384);
			ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, (function (funcDef) {
				if ((MemberDefinition$flags_0$LMemberDefinition$(funcDef) & ClassDefinition.IS_STATIC) !== 0 && MemberDefinition$name_0$LMemberDefinition$(funcDef) === "main" && MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$(funcDef).length === 1 && Util$isArrayOf$LClassDefinition$LType$(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef)[0].getClassDef$(), Type.stringType)) {
					MemberDefinition$setFlags_0$LMemberDefinition$N(funcDef, MemberDefinition$flags_0$LMemberDefinition$(funcDef) | ClassDefinition.IS_EXPORT);
				}
				return true;
			}));
			break;
		case "_Test":
			ClassDefinition$setFlags_0$LClassDefinition$N(classDef, classDef.flags$() | 16384);
			ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, (function (funcDef) {
				if ((MemberDefinition$flags_0$LMemberDefinition$(funcDef) & ClassDefinition.IS_STATIC) === 0 && (MemberDefinition$name_0$LMemberDefinition$(funcDef).match(/^test/) || MemberDefinition$name_0$LMemberDefinition$(funcDef) === "constructor") && MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$(funcDef).length === 0) {
					MemberDefinition$setFlags_0$LMemberDefinition$N(funcDef, MemberDefinition$flags_0$LMemberDefinition$(funcDef) | ClassDefinition.IS_EXPORT);
				}
				return true;
			}));
			break;
		}
		return true;
	}));
};

Compiler._exportEntryPoints_0$LCompiler$ = Compiler$_exportEntryPoints_0$LCompiler$;

function Compiler$_handleErrors_0$LCompiler$ALCompileError$($this, errors) {
	var isFatal;
	var i$0;
	if ($this._mode === 2) {
		errors.splice(0, errors.length);
		return true;
	}
	isFatal = false;
	for (i$0 in errors) {
		(function (error) {
			var warning;
			var doWarn;
			var i;
			var s$0;
			var this$0;
			var i$0;
			var platform$0;
			var note$0;
			var _platform$0;
			var _platform$1;
			if (error instanceof CompileWarning) {
				warning = error;
				for (i = 0; i < $this._warningFilters.length; ++ i) {
					if ((doWarn = $this._warningFilters[i](warning)) != null) {
						break;
					}
				}
				if (doWarn != false) {
					platform$0 = $this._platform;
					s$0 = Util$makeErrorMessage$LPlatform$SUSNNN(platform$0, "Warning: " + warning._message, warning._filename, warning._lineNumber, warning._columnNumber, warning._size);
					console.warn(s$0);
					isFatal = $this._warningAsError;
				}
			} else {
				(_platform$1 = $this._platform).error$S(CompileIssue$format_0$LCompileIssue$LPlatform$(error, _platform$1));
				this$0 = error._notes;
				for (i$0 in this$0) {
					note$0 = this$0[i$0];
					(_platform$0 = $this._platform).error$S(CompileIssue$format_0$LCompileIssue$LPlatform$(note$0, _platform$0));
				}
				isFatal = true;
			}
		})(errors[i$0]);
	}
	errors.splice(0, errors.length);
	return ! isFatal;
};

Compiler._handleErrors_0$LCompiler$ALCompileError$ = Compiler$_handleErrors_0$LCompiler$ALCompileError$;

function Compiler$_resolvePath_0$LCompiler$SS($this, srcPath, givenPath) {
	var searchPaths;
	var i;
	var path;
	var lastSlashAt;
	var path$0;
	var path$1;
	if (givenPath.match(/^\.{1,2}\//) == null) {
		searchPaths = $this._searchPaths.concat($this._emitter.getSearchPaths$());
		for (i = 0; i < searchPaths.length; ++ i) {
			path$0 = searchPaths[i] + "/" + givenPath;
			path = Util$_resolvedPathParts$S(path$0).join("/");
			if ($this._platform.fileExists$S(path)) {
				return path;
			}
		}
	}
	lastSlashAt = srcPath.lastIndexOf("/");
	path$1 = (lastSlashAt !== -1 ? srcPath.substring(0, lastSlashAt + 1) : "") + givenPath;
	path = Util$_resolvedPathParts$S(path$1).join("/");
	return path;
};

Compiler._resolvePath_0$LCompiler$SS = Compiler$_resolvePath_0$LCompiler$SS;

function _Util() {
};

$__jsx_extend([_Util], Object);
function _Util$handleSubStatements$F$ALStatement$B$LStatement$(cb, statement) {
	var ret;
	ret = false;
	if (statement instanceof ContinuableStatement) {
		if (cb(statement.getStatements$())) {
			ret = true;
		}
	} else {
		if (statement instanceof IfStatement) {
			if (cb(IfStatement$getOnTrueStatements_0$LIfStatement$(statement))) {
				ret = true;
			}
			if (cb(IfStatement$getOnFalseStatements_0$LIfStatement$(statement))) {
				ret = true;
			}
		} else {
			if (statement instanceof SwitchStatement) {
				if (cb(SwitchStatement$getStatements_0$LSwitchStatement$(statement))) {
					ret = true;
				}
			} else {
				if (statement instanceof TryStatement) {
					if (cb(TryStatement$getTryStatements_0$LTryStatement$(statement))) {
						ret = true;
					}
					if (cb(TryStatement$getCatchStatements_0$LTryStatement$(statement).map((function (s) {
						return s;
					})))) {
						ret = true;
					}
					if (cb(TryStatement$getFinallyStatements_0$LTryStatement$(statement))) {
						ret = true;
					}
				} else {
					if (statement instanceof CatchStatement) {
						if (cb(CatchStatement$getStatements_0$LCatchStatement$(statement))) {
							ret = true;
						}
					}
				}
			}
		}
	}
	return ret;
};

_Util.handleSubStatements$F$ALStatement$B$LStatement$ = _Util$handleSubStatements$F$ALStatement$B$LStatement$;

function _Util$classIsNative$LClassDefinition$(classDef) {
	return ! ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$(classDef, (function (classDef) {
		return (classDef.className$() === "Object" || (classDef.flags$() & 16) === 0 ? true : false);
	}));
};

_Util.classIsNative$LClassDefinition$ = _Util$classIsNative$LClassDefinition$;

function _Util$exprHasSideEffects$LExpression$(expr) {
	var onExpr;
	function onExpr(expr, _) {
		var callingFuncDef;
		if (expr instanceof FunctionExpression || expr instanceof NewExpression || expr instanceof AssignmentExpression || expr instanceof PreIncrementExpression || expr instanceof PostIncrementExpression || expr instanceof SuperExpression) {
			return false;
		} else {
			if (expr instanceof CallExpression) {
				callingFuncDef = _DetermineCalleeCommand$getCallingFuncDef$LStashable$(expr);
				if (callingFuncDef != null && (callingFuncDef._flags & 2048) !== 0) {
				} else {
					return false;
				}
			} else {
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			}
		}
	}
	return ! onExpr(expr, null);
};

_Util.exprHasSideEffects$LExpression$ = _Util$exprHasSideEffects$LExpression$;

function _Util$conditionIsConstant$LExpression$(expr) {
	var leafIsConstant;
	var asExpr;
	function leafIsConstant(expr) {
		if (expr instanceof NullExpression) {
			return false;
		} else {
			if (expr instanceof BooleanLiteralExpression) {
				return Token$getValue_0$LToken$(expr._token) === "true";
			} else {
				if (expr instanceof StringLiteralExpression) {
					return Token$getValue_0$LToken$(expr._token).length > 2;
				} else {
					if (expr instanceof NumberLiteralExpression || expr instanceof IntegerLiteralExpression) {
						return !! (+Token$getValue_0$LToken$(expr._token));
					} else {
						if (expr instanceof MapLiteralExpression || expr instanceof ArrayLiteralExpression) {
							return true;
						}
					}
				}
			}
		}
		return null;
	}
	if (expr instanceof LeafExpression) {
		return leafIsConstant(expr);
	} else {
		if (expr instanceof AsExpression) {
			asExpr = expr;
			return (asExpr._type.equals$LType$(Type.booleanType) ? leafIsConstant(asExpr._expr) : null);
		} else {
			return null;
		}
	}
};

_Util.conditionIsConstant$LExpression$ = _Util$conditionIsConstant$LExpression$;

function _Util$optimizeBasicBlock$LMemberFunctionDefinition$F$ALExpression$V$(funcDef, optimizeExpressions) {
	var optimizeStatements;
	var statements;
	function optimizeStatements(statements) {
		var statementIndex;
		var exprsToOptimize;
		var setOptimizedExprs;
		var statement;
		var expr;
		var i;
		var $this$0;
		statementIndex = 0;
		while (statementIndex < statements.length) {
			exprsToOptimize = [];
			setOptimizedExprs = [];
			while (statementIndex < statements.length) {
				statement = statements[statementIndex++];
				if (statement instanceof ExpressionStatement) {
					exprsToOptimize.push(UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statement));
					setOptimizedExprs.push((function (statement) {
						return (function (expr) {
							UnaryExpressionStatement$setExpr_0$LUnaryExpressionStatement$LExpression$(statement, expr);
						});
					})(statement));
				} else {
					if (statement instanceof ReturnStatement) {
						$this$0 = statement;
						expr = $this$0._expr;
						if (expr != null) {
							exprsToOptimize.push(ReturnStatement$getExpr_0$LReturnStatement$(statement));
							setOptimizedExprs.push((function (statement) {
								return (function (expr) {
									ReturnStatement$setExpr_0$LReturnStatement$LExpression$(statement, expr);
								});
							})(statement));
						}
						break;
					} else {
						statement.handleStatements$F$ALStatement$B$((function (statements) {
							optimizeStatements(statements);
							return true;
						}));
						if (statement instanceof IfStatement) {
							exprsToOptimize.push(IfStatement$getExpr_0$LIfStatement$(statement));
							setOptimizedExprs.push((function (statement) {
								return (function (expr) {
									IfStatement$setExpr_0$LIfStatement$LExpression$(statement, expr);
								});
							})(statement));
						} else {
							if (statement instanceof SwitchStatement) {
								exprsToOptimize.push(SwitchStatement$getExpr_0$LSwitchStatement$(statement));
								setOptimizedExprs.push((function (statement) {
									return (function (expr) {
										SwitchStatement$setExpr_0$LSwitchStatement$LExpression$(statement, expr);
									});
								})(statement));
							}
						}
						break;
					}
				}
			}
			if (exprsToOptimize.length !== 0) {
				optimizeExpressions(exprsToOptimize);
				for (i = 0; i < exprsToOptimize.length; ++ i) {
					setOptimizedExprs[i](exprsToOptimize[i]);
				}
			}
		}
	}
	statements = funcDef._statements;
	if (statements != null) {
		optimizeStatements(statements);
	}
};

_Util.optimizeBasicBlock$LMemberFunctionDefinition$F$ALExpression$V$ = _Util$optimizeBasicBlock$LMemberFunctionDefinition$F$ALExpression$V$;

function Optimizer() {
	this._compiler = null;
	this._commands = [];
	this._log = [];
	this._dumpLogs = false;
	this._enableRunTimeTypeCheck = true;
};

$__jsx_extend([Optimizer], Object);
function Optimizer$setup_0$LOptimizer$AS($this, cmds) {
	var calleesAreDetermined;
	var determineCallee;
	var i;
	var cmd;
	var _commands$0;
	calleesAreDetermined = false;
	function determineCallee() {
		if (! calleesAreDetermined) {
			$this._commands.push(new _DetermineCalleeCommand());
			calleesAreDetermined = true;
		}
	}
	for (i = 0; i < cmds.length; ++ i) {
		cmd = cmds[i];
		if (cmd == "lto") {
			$this._commands.push(new _LinkTimeOptimizationCommand());
		} else {
			if (cmd == "no-assert") {
				$this._commands.push(new _NoAssertCommand());
			} else {
				if (cmd == "no-log") {
					$this._commands.push(new _NoLogCommand());
				} else {
					if (cmd == "no-debug") {
						$this._commands.push(new _NoDebugCommand());
					} else {
						if (cmd == "strip") {
							$this._commands.push(new _StripOptimizeCommand());
						} else {
							if (cmd == "staticize") {
								$this._commands.push(new _StaticizeOptimizeCommand());
								calleesAreDetermined = false;
							} else {
								if (cmd == "unclassify") {
									$this._commands.push(new _UnclassifyOptimizationCommand());
									calleesAreDetermined = false;
								} else {
									if (cmd == "fold-const") {
										$this._commands.push(new _FoldConstantCommand());
									} else {
										if (cmd == "dce") {
											determineCallee();
											$this._commands.push(new _DeadCodeEliminationOptimizeCommand());
										} else {
											if (cmd == "inline") {
												determineCallee();
												$this._commands.push(new _InlineOptimizeCommand());
											} else {
												if (cmd == "return-if") {
													$this._commands.push(new _ReturnIfOptimizeCommand());
												} else {
													if (cmd == "lcse") {
														$this._commands.push(new _LCSEOptimizeCommand());
													} else {
														if (cmd == "unbox") {
															determineCallee();
															$this._commands.push(new _UnboxOptimizeCommand());
														} else {
															if (cmd == "array-length") {
																$this._commands.push(new _ArrayLengthOptimizeCommand());
															} else {
																if (cmd == "dump-logs") {
																	$this._dumpLogs = true;
																} else {
																	return "unknown optimization command: " + cmd;
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	for (i = 0; i < $this._commands.length; ++ i) {
		if ($this._commands[i] instanceof _LinkTimeOptimizationCommand) {
			break;
		}
	}
	if (i !== $this._commands.length) {
		(_commands$0 = $this._commands).unshift(_commands$0.splice(i, 1)[0]);
	}
	return null;
};

Optimizer.setup_0$LOptimizer$AS = Optimizer$setup_0$LOptimizer$AS;

function Optimizer$setCompiler_0$LOptimizer$LCompiler$($this, compiler) {
	$this._compiler = compiler;
	return $this;
};

Optimizer.setCompiler_0$LOptimizer$LCompiler$ = Optimizer$setCompiler_0$LOptimizer$LCompiler$;

function Optimizer$performOptimization_0$LOptimizer$($this) {
	var i;
	var platform;
	var message$0;
	var message$1;
	var $this$0;
	for (i = 0; i < $this._commands.length; ++ i) {
		try {
			message$0 = "starting optimizer: " + $this._commands[i]._identifier;
			$this._log.push(message$0);
			_OptimizeCommand$setup_0$L_OptimizeCommand$LOptimizer$($this._commands[i], $this).performOptimization$();
			message$1 = "finished optimizer: " + $this._commands[i]._identifier;
			$this._log.push(message$1);
		} catch ($__jsx_catch_0) {
			if ($__jsx_catch_0 instanceof Error) {
				$this$0 = $this._compiler;
				platform = $this$0._platform;
				platform.error$S("fatal error: optimizer '" + $this._commands[i]._identifier + "' died unexpectedly, dumping the logs");
				Optimizer$dumpLogs_0$LOptimizer$($this);
				throw $__jsx_catch_0;
			} else {
				throw $__jsx_catch_0;
			}
		}
	}
	if ($this._dumpLogs) {
		Optimizer$dumpLogs_0$LOptimizer$($this);
	}
};

Optimizer.performOptimization_0$LOptimizer$ = Optimizer$performOptimization_0$LOptimizer$;

function Optimizer$dumpLogs_0$LOptimizer$($this) {
	var platform;
	var i;
	var $this$0;
	$this$0 = $this._compiler;
	platform = $this$0._platform;
	for (i = 0; i < $this._log.length; ++ i) {
		platform.error$S($this._log[i]);
	}
};

Optimizer.dumpLogs_0$LOptimizer$ = Optimizer$dumpLogs_0$LOptimizer$;

function _OptimizeCommand() {
};

$__jsx_extend([_OptimizeCommand], Object);
function _OptimizeCommand$setup_0$L_OptimizeCommand$LOptimizer$($this, optimizer) {
	$this._optimizer = optimizer;
	return $this;
};

_OptimizeCommand.setup_0$L_OptimizeCommand$LOptimizer$ = _OptimizeCommand$setup_0$L_OptimizeCommand$LOptimizer$;

function _OptimizeCommand$getCompiler_0$L_OptimizeCommand$($this) {
	var $this$0;
	$this$0 = $this._optimizer;
	return $this$0._compiler;
};

_OptimizeCommand.getCompiler_0$L_OptimizeCommand$ = _OptimizeCommand$getCompiler_0$L_OptimizeCommand$;

function _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, stashable) {
	var stash;
	stash = stashable.getStash$S($this._identifier);
	if (stash == null) {
		stash = stashable.setStash$SLStash$($this._identifier, $this._createStash$());
	}
	return stash;
};

_OptimizeCommand.getStash_0$L_OptimizeCommand$LStashable$ = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$;

_OptimizeCommand.prototype._createStash$ = function () {
	throw new Error("if you are going to use the stash, you need to override this function");
};


function _OptimizeCommand$resetStash_0$L_OptimizeCommand$LStashable$($this, stashable) {
	stashable.setStash$SLStash$($this._identifier, null);
};

_OptimizeCommand.resetStash_0$L_OptimizeCommand$LStashable$ = _OptimizeCommand$resetStash_0$L_OptimizeCommand$LStashable$;

function _OptimizeCommand$createVar_0$L_OptimizeCommand$LMemberFunctionDefinition$LType$S($this, funcDef, type, baseName) {
	var locals;
	var nameExists;
	var i;
	var newLocal;
	var message$0;
	var $this$0$0;
	var message$0$0;
	locals = funcDef._locals;
	function nameExists(n) {
		var i;
		var locals$len$0;
		for ((i = 0, locals$len$0 = locals.length); i < locals$len$0; ++ i) {
			if (Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(locals[i])) === n) {
				return true;
			}
		}
		return false;
	}
	for (i = 0; nameExists(baseName + "$" + (i + "")); ++ i) {
	}
	newLocal = new LocalVariable(new Token$0(baseName + "$" + (i + ""), false), type);
	locals.push(newLocal);
	message$0 = "rewriting " + baseName + " to " + Token$getValue_0$LToken$(newLocal._name);
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	return newLocal;
};

_OptimizeCommand.createVar_0$L_OptimizeCommand$LMemberFunctionDefinition$LType$S = _OptimizeCommand$createVar_0$L_OptimizeCommand$LMemberFunctionDefinition$LType$S;

_OptimizeCommand.prototype.log$S = function (message) {
	var $this$0;
	var message$0;
	$this$0 = this._optimizer;
	message$0 = "[" + this._identifier + "] " + message;
	$this$0._log.push(message$0);
};


function _OptimizeCommand$log_0$L_OptimizeCommand$S($this, message) {
	var $this$0;
	var message$0;
	$this$0 = $this._optimizer;
	message$0 = "[" + $this._identifier + "] " + message;
	$this$0._log.push(message$0);
};

_OptimizeCommand.log_0$L_OptimizeCommand$S = _OptimizeCommand$log_0$L_OptimizeCommand$S;

function _OptimizeCommand$setupCommand_0$L_OptimizeCommand$L_OptimizeCommand$($this, command) {
	var optimizer$0;
	optimizer$0 = $this._optimizer;
	command._optimizer = optimizer$0;
	return command;
};

_OptimizeCommand.setupCommand_0$L_OptimizeCommand$L_OptimizeCommand$ = _OptimizeCommand$setupCommand_0$L_OptimizeCommand$L_OptimizeCommand$;

function _FunctionOptimizeCommand() {
};

$__jsx_extend([_FunctionOptimizeCommand], _OptimizeCommand);
_FunctionOptimizeCommand.prototype.performOptimization$ = function () {
	var $this = this;
	var doit;
	function doit(funcDef) {
		var message$0;
		var $this$0$0;
		var message$0$0;
		var message$1;
		var $this$0$1;
		var message$0$1;
		message$0 = "starting optimization of " + funcDef.getNotation$();
		$this$0$0 = $this._optimizer;
		message$0$0 = "[" + $this._identifier + "] " + message$0;
		$this$0$0._log.push(message$0$0);
		$this.optimizeFunction$LMemberFunctionDefinition$(funcDef);
		message$1 = "finished optimization of " + funcDef.getNotation$();
		$this$0$1 = $this._optimizer;
		message$0$1 = "[" + $this._identifier + "] " + message$1;
		$this$0$1._log.push(message$0$1);
	}
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$(classDef, (function (member) {
			var funcDef;
			if (member instanceof MemberFunctionDefinition) {
				funcDef = member;
				if (MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$(funcDef) != null) {
					doit(funcDef);
				}
			}
			MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(member, (function (funcDef) {
				doit(funcDef);
				return true;
			}));
			return true;
		}));
		return true;
	}));
};


function _LinkTimeOptimizationCommand() {
	this._identifier = "lto";
	this._optimizer = null;
};

$__jsx_extend([_LinkTimeOptimizationCommand], _OptimizeCommand);
_LinkTimeOptimizationCommand.prototype._createStash$ = function () {
	return new _LinkTimeOptimizationCommand$CStash();
};


_LinkTimeOptimizationCommand.prototype.performOptimization$ = function () {
	var $this = this;
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		var i;
		if (classDef._extendType != null) {
			_OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, classDef._extendType.getClassDef$()).extendedBy.push(classDef);
		}
		for (i = 0; i < classDef._implementTypes.length; ++ i) {
			_OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, classDef._implementTypes[i].getClassDef$()).extendedBy.push(classDef);
		}
		return true;
	}));
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		var message$0;
		var $this$0$0;
		var message$0$0;
		if ((classDef.flags$() & 16596) === 0 && _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, classDef).extendedBy.length === 0) {
			message$0 = "marking class as final: " + classDef.className$();
			$this$0$0 = $this._optimizer;
			message$0$0 = "[" + $this._identifier + "] " + message$0;
			$this$0$0._log.push(message$0$0);
			ClassDefinition$setFlags_0$LClassDefinition$N(classDef, classDef.flags$() | 4);
			ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, (function (funcDef) {
				if ((MemberDefinition$flags_0$LMemberDefinition$(funcDef) & (ClassDefinition.IS_STATIC | ClassDefinition.IS_FINAL)) === 0) {
					MemberDefinition$setFlags_0$LMemberDefinition$N(funcDef, MemberDefinition$flags_0$LMemberDefinition$(funcDef) | ClassDefinition.IS_FINAL);
				}
				return true;
			}));
		} else {
			if ((classDef.flags$() & 20) === 0) {
				ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, (function (funcDef) {
					var overrides;
					if ((MemberDefinition$flags_0$LMemberDefinition$(funcDef) & (ClassDefinition.IS_STATIC | ClassDefinition.IS_NATIVE | ClassDefinition.IS_FINAL)) !== 0) {
					} else {
						if ((MemberDefinition$flags_0$LMemberDefinition$(funcDef) & ClassDefinition.IS_ABSTRACT) === 0) {
							if (MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$(funcDef) == null) {
								throw new Error("a non-native, non-abstract function with out function body?");
							}
							overrides = _LinkTimeOptimizationCommand$_getOverrides_0$L_LinkTimeOptimizationCommand$LClassDefinition$ALClassDefinition$SALType$($this, classDef, _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, classDef).extendedBy, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef));
							if (overrides.length === 0) {
								_OptimizeCommand$log_0$L_OptimizeCommand$S($this, "marking function as final: " + funcDef.getNotation$());
								MemberDefinition$setFlags_0$LMemberDefinition$N(funcDef, MemberDefinition$flags_0$LMemberDefinition$(funcDef) | ClassDefinition.IS_FINAL);
							} else {
								_OptimizeCommand$log_0$L_OptimizeCommand$S($this, "function has overrides, not marking as final: " + funcDef.getNotation$());
							}
						} else {
							if ((MemberDefinition$flags_0$LMemberDefinition$(funcDef) & ClassDefinition.IS_ABSTRACT) !== 0) {
							}
						}
					}
					return true;
				}));
			}
		}
		return true;
	}));
};


function _LinkTimeOptimizationCommand$_getOverrides_0$L_LinkTimeOptimizationCommand$LClassDefinition$ALClassDefinition$SALType$($this, srcClassDef, classDefs, name, argTypes) {
	var overrides;
	var i;
	overrides = [];
	for (i = 0; i < classDefs.length; ++ i) {
		overrides = overrides.concat(_LinkTimeOptimizationCommand$_getOverridesByClass_0$L_LinkTimeOptimizationCommand$LClassDefinition$LClassDefinition$SALType$($this, srcClassDef, classDefs[i], name, argTypes));
	}
	return overrides;
};

_LinkTimeOptimizationCommand._getOverrides_0$L_LinkTimeOptimizationCommand$LClassDefinition$ALClassDefinition$SALType$ = _LinkTimeOptimizationCommand$_getOverrides_0$L_LinkTimeOptimizationCommand$LClassDefinition$ALClassDefinition$SALType$;

function _LinkTimeOptimizationCommand$_getOverridesByClass_0$L_LinkTimeOptimizationCommand$LClassDefinition$LClassDefinition$SALType$($this, srcClassDef, classDef, name, argTypes) {
	var overrides;
	var addOverride;
	var implementClassDefs;
	var i;
	overrides = _LinkTimeOptimizationCommand$_getOverrides_0$L_LinkTimeOptimizationCommand$LClassDefinition$ALClassDefinition$SALType$($this, srcClassDef, _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, classDef).extendedBy, name, argTypes);
	function addOverride(funcDef) {
		if (MemberDefinition$name_0$LMemberDefinition$(funcDef) === name && (funcDef._flags & 2) === 0 && Util$typesAreEqual$ALType$ALType$(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef), argTypes)) {
			overrides.push(funcDef);
			return false;
		}
		return true;
	}
	ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, addOverride);
	implementClassDefs = classDef._implementTypes.map((function (type) {
		return type._classDef;
	}));
	for (i = 0; i < implementClassDefs.length; ++ i) {
		if (srcClassDef != implementClassDefs[i]) {
			ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$(implementClassDefs[i], (function (classDef) {
				return ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, addOverride);
			}));
		}
	}
	return overrides;
};

_LinkTimeOptimizationCommand._getOverridesByClass_0$L_LinkTimeOptimizationCommand$LClassDefinition$LClassDefinition$SALType$ = _LinkTimeOptimizationCommand$_getOverridesByClass_0$L_LinkTimeOptimizationCommand$LClassDefinition$LClassDefinition$SALType$;

function _StripOptimizeCommand() {
	this._identifier = "strip";
	this._optimizer = null;
	this._classesInstantiated = [];
	this._methodsAlive = {};
	this._membersToWalk = [];
};

$__jsx_extend([_StripOptimizeCommand], _OptimizeCommand);
_StripOptimizeCommand.prototype._createStash$ = function () {
	return new _StripOptimizeCommand$C_Stash();
};


function _StripOptimizeCommand$_touchStatic_0$L_StripOptimizeCommand$LMemberDefinition$($this, member) {
	var stash;
	var message$0;
	var $this$0$0;
	var message$0$0;
	stash = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, member);
	if (stash.touched) {
		return;
	}
	message$0 = "touched " + member.getNotation$();
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	stash.touched = true;
	$this._membersToWalk.push(member);
};

_StripOptimizeCommand._touchStatic_0$L_StripOptimizeCommand$LMemberDefinition$ = _StripOptimizeCommand$_touchStatic_0$L_StripOptimizeCommand$LMemberDefinition$;

function _StripOptimizeCommand$_touchInstance_0$L_StripOptimizeCommand$LClassDefinition$($this, classDef) {
	var stash;
	var name;
	var listOfArgTypes;
	var i;
	var funcDef;
	var message$0;
	var $this$0$0;
	var message$0$0;
	var this$0;
	var i$0;
	var implementType$0;
	stash = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, classDef);
	if (stash.touched) {
		return;
	}
	message$0 = "touched " + classDef.className$();
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	stash.touched = true;
	$this._classesInstantiated.push(classDef);
	for (name in $this._methodsAlive) {
		listOfArgTypes = $this._methodsAlive[name];
		for (i = 0; i !== listOfArgTypes.length; ++ i) {
			funcDef = Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, name, listOfArgTypes[i], false);
			if (funcDef != null) {
				$this._membersToWalk.push(funcDef);
			}
		}
	}
	if (classDef._extendType != null) {
		_StripOptimizeCommand$_touchInstance_0$L_StripOptimizeCommand$LClassDefinition$($this, classDef._extendType.getClassDef$());
	}
	this$0 = classDef._implementTypes;
	for (i$0 in this$0) {
		implementType$0 = this$0[i$0];
		_StripOptimizeCommand$_touchInstance_0$L_StripOptimizeCommand$LClassDefinition$($this, implementType$0._classDef);
	}
};

_StripOptimizeCommand._touchInstance_0$L_StripOptimizeCommand$LClassDefinition$ = _StripOptimizeCommand$_touchInstance_0$L_StripOptimizeCommand$LClassDefinition$;

function _StripOptimizeCommand$_touchConstructor_0$L_StripOptimizeCommand$LMemberFunctionDefinition$($this, funcDef) {
	var stash;
	var message$0;
	var $this$0$0;
	var message$0$0;
	stash = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, funcDef);
	if (stash.touched) {
		return;
	}
	message$0 = "touched " + funcDef.getNotation$();
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	stash.touched = true;
	$this._membersToWalk.push(funcDef);
	_StripOptimizeCommand$_touchInstance_0$L_StripOptimizeCommand$LClassDefinition$($this, funcDef._classDef);
};

_StripOptimizeCommand._touchConstructor_0$L_StripOptimizeCommand$LMemberFunctionDefinition$ = _StripOptimizeCommand$_touchConstructor_0$L_StripOptimizeCommand$LMemberFunctionDefinition$;

function _StripOptimizeCommand$_touchMethod_0$L_StripOptimizeCommand$SALType$($this, name, argTypes) {
	var listOfArgTypes;
	var i;
	var funcDef;
	var message$0;
	var $this$0$0;
	var message$0$0;
	if ($__jsx_ObjectHasOwnProperty.call($this._methodsAlive, name)) {
		listOfArgTypes = $this._methodsAlive[name];
	} else {
		listOfArgTypes = $this._methodsAlive[name] = [];
	}
	for (i = 0; i < listOfArgTypes.length; ++ i) {
		if (Util$typesAreEqual$ALType$ALType$(listOfArgTypes[i], argTypes)) {
			return;
		}
	}
	message$0 = "touched #" + name;
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	listOfArgTypes.push(argTypes.concat());
	for (i = 0; i < $this._classesInstantiated.length; ++ i) {
		funcDef = Util$findFunctionInClass$LClassDefinition$SALType$B($this._classesInstantiated[i], name, argTypes, false);
		if (funcDef != null) {
			$this._membersToWalk.push(funcDef);
		}
	}
};

_StripOptimizeCommand._touchMethod_0$L_StripOptimizeCommand$SALType$ = _StripOptimizeCommand$_touchMethod_0$L_StripOptimizeCommand$SALType$;

_StripOptimizeCommand.prototype.performOptimization$ = function () {
	var $this = this;
	var isEmittedClass;
	var member;
	var memberShouldPreserve;
	var message$0;
	var $this$0$0;
	var message$0$0;
	var this$0;
	var i$0;
	var $this$0;
	var $this$0$1;
	function isEmittedClass(classDef) {
		return (classDef instanceof TemplateClassDefinition ? false : (classDef.flags$() & 16) !== 0 ? false : true);
	}
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		classDef.setStash$SLStash$($this._identifier, null);
		return ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$(classDef, (function (member) {
			_OptimizeCommand$resetStash_0$L_OptimizeCommand$LStashable$($this, member);
			return true;
		}));
	}));
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		if (! (classDef instanceof TemplateClassDefinition) && (classDef.flags$() & 16) !== 0) {
			ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, (function (funcDef) {
				if (MemberDefinition$name_0$LMemberDefinition$(funcDef) === "constructor") {
				} else {
					if ((MemberDefinition$flags_0$LMemberDefinition$(funcDef) & ClassDefinition.IS_FINAL) !== 0) {
					} else {
						_StripOptimizeCommand$_touchMethod_0$L_StripOptimizeCommand$SALType$($this, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef));
					}
				}
				return true;
			}));
		}
		return true;
	}));
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		if (isEmittedClass(classDef)) {
			if ((classDef.flags$() & 16384) !== 0) {
				_StripOptimizeCommand$_touchInstance_0$L_StripOptimizeCommand$LClassDefinition$($this, classDef);
			}
			ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$(classDef, (function (member) {
				var funcDef;
				if ((MemberDefinition$flags_0$LMemberDefinition$(member) & ClassDefinition.IS_EXPORT) !== 0) {
					if ((MemberDefinition$flags_0$LMemberDefinition$(member) & ClassDefinition.IS_STATIC) !== 0) {
						_StripOptimizeCommand$_touchStatic_0$L_StripOptimizeCommand$LMemberDefinition$($this, member);
					} else {
						if (member instanceof MemberFunctionDefinition) {
							funcDef = member;
							if (MemberDefinition$name_0$LMemberDefinition$(funcDef) === "constructor") {
								_StripOptimizeCommand$_touchConstructor_0$L_StripOptimizeCommand$LMemberFunctionDefinition$($this, funcDef);
							} else {
								_StripOptimizeCommand$_touchMethod_0$L_StripOptimizeCommand$SALType$($this, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef));
							}
						}
					}
				}
				return true;
			}));
		}
		return true;
	}));
	while (this._membersToWalk.length !== 0) {
		member = this._membersToWalk.shift();
		message$0 = "walking " + member.getNotation$();
		$this$0$0 = this._optimizer;
		message$0$0 = "[" + this._identifier + "] " + message$0;
		$this$0$0._log.push(message$0$0);
		if (member instanceof MemberFunctionDefinition) {
			_StripOptimizeCommand$_walkFunctionDefinition_0$L_StripOptimizeCommand$LMemberFunctionDefinition$(this, member);
		} else {
			_StripOptimizeCommand$_walkVariableDefinition_0$L_StripOptimizeCommand$LMemberVariableDefinition$(this, member);
		}
	}
	function memberShouldPreserve(member) {
		var isTouched;
		var listOfArgTypes;
		var i;
		if ((member._flags & 16384) !== 0) {
			return true;
		}
		isTouched = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, member).touched;
		if ((member._flags & 8) !== 0) {
			return isTouched;
		} else {
			if (member instanceof MemberFunctionDefinition) {
				if (MemberDefinition$name_0$LMemberDefinition$(member) === "constructor") {
					return isTouched;
				} else {
					if (_OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, member._classDef).touched && $__jsx_ObjectHasOwnProperty.call($this._methodsAlive, MemberDefinition$name_0$LMemberDefinition$(member))) {
						listOfArgTypes = $this._methodsAlive[MemberDefinition$name_0$LMemberDefinition$(member)];
						for (i = 0; i !== listOfArgTypes.length; ++ i) {
							if (Util$typesAreEqual$ALType$ALType$(listOfArgTypes[i], MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(member))) {
								return true;
							}
						}
					}
					return false;
				}
			} else {
				return true;
			}
		}
	}
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		var numConstructors;
		var members;
		var memberIndex;
		var member;
		var ctor;
		var message$0;
		var $this$0$0;
		var message$0$0;
		var message$1;
		var $this$0$1;
		var message$0$1;
		var message$2;
		var $this$0$2;
		var message$0$2;
		if (isEmittedClass(classDef)) {
			numConstructors = 0;
			members = classDef._members;
			for (memberIndex = 0; memberIndex !== members.length; ) {
				member = members[memberIndex];
				if (memberShouldPreserve(member)) {
					if (member instanceof MemberFunctionDefinition && (member._flags & 8) === 0 && MemberDefinition$name_0$LMemberDefinition$(member) === "constructor") {
						++ numConstructors;
					}
					++ memberIndex;
					message$0 = "preserving used: " + member.getNotation$();
					$this$0$0 = $this._optimizer;
					message$0$0 = "[" + $this._identifier + "] " + message$0;
					$this$0$0._log.push(message$0$0);
				} else {
					message$1 = "removing unused: " + member.getNotation$();
					$this$0$1 = $this._optimizer;
					message$0$1 = "[" + $this._identifier + "] " + message$1;
					$this$0$1._log.push(message$0$1);
					members.splice(memberIndex, 1);
				}
			}
			if (numConstructors === 0) {
				message$2 = "substituting fake constructor for class: " + classDef.className$();
				$this$0$2 = $this._optimizer;
				message$0$2 = "[" + $this._identifier + "] " + message$2;
				$this$0$2._log.push(message$0$2);
				ctor = new MemberFunctionDefinition(null, new Token$0("constructor", true), 4 | classDef.flags$() & 16384, Type.voidType, [], [], [], [], classDef.getToken$(), null);
				ctor._classDef = classDef;
				members.push(ctor);
			}
		}
		return true;
	}));
	$this$0$1 = this._optimizer;
	$this$0 = $this$0$1._compiler;
	this$0 = $this$0._parsers;
	for (i$0 in this$0) {
		(function (parser) {
			var classDefs;
			var i;
			var preserve;
			var message$0;
			var $this$0$0;
			var message$0$0;
			classDefs = parser._classDefs;
			for (i = 0; i !== classDefs.length; ) {
				preserve = true;
				if ((classDefs[i].flags$() & 16) !== 0 && ClassDefinition$getNativeSource_0$LClassDefinition$(classDefs[i]) != null && ! _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, classDefs[i]).touched && ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$(classDefs[i], (function (member) {
					if ((MemberDefinition$flags_0$LMemberDefinition$(member) & ClassDefinition.IS_STATIC) === 0) {
						return true;
					}
					return ! _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, member).touched;
				}))) {
					preserve = false;
				}
				if (preserve) {
					++ i;
				} else {
					message$0 = "removing unused native class: " + classDefs[i].className$();
					$this$0$0 = $this._optimizer;
					message$0$0 = "[" + $this._identifier + "] " + message$0;
					$this$0$0._log.push(message$0$0);
					classDefs.splice(i, 1);
				}
			}
		})(this$0[i$0]);
	}
};


function _StripOptimizeCommand$_walkExpression_0$L_StripOptimizeCommand$LExpression$($this, expr) {
	var onExpr;
	function onExpr(expr) {
		var callee;
		var propertyExpr;
		var name;
		var member;
		var superExpr;
		var $this$0;
		var exprType$0;
		var exprType$1;
		if (expr instanceof NewExpression) {
			callee = Util$findFunctionInClass$LClassDefinition$SALType$B(expr.getType$().getClassDef$(), "constructor", ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(NewExpression$getConstructor_0$LNewExpression$(expr)), false);
			_StripOptimizeCommand$_touchConstructor_0$L_StripOptimizeCommand$LMemberFunctionDefinition$($this, callee);
		} else {
			if (expr instanceof InstanceofExpression) {
				_StripOptimizeCommand$_touchInstance_0$L_StripOptimizeCommand$LClassDefinition$($this, InstanceofExpression$getExpectedType_0$LInstanceofExpression$(expr).getClassDef$());
			} else {
				if (expr instanceof AsExpression) {
					if (expr.getType$() instanceof ObjectType) {
						_StripOptimizeCommand$_touchInstance_0$L_StripOptimizeCommand$LClassDefinition$($this, expr.getType$().getClassDef$());
					}
				} else {
					if (expr instanceof AsNoConvertExpression) {
						if (expr.getType$() instanceof ObjectType) {
							_StripOptimizeCommand$_touchInstance_0$L_StripOptimizeCommand$LClassDefinition$($this, expr.getType$().getClassDef$());
						}
					} else {
						if (expr instanceof PropertyExpression) {
							if (! expr.isClassSpecifier$()) {
								propertyExpr = expr;
								$this$0 = propertyExpr._identifierToken;
								name = $this$0._value;
								if (propertyExpr._expr.isClassSpecifier$()) {
									exprType$0 = propertyExpr._type;
									if (! (exprType$0 instanceof FunctionType) ? false : exprType$0.isAssignable$() ? false : true) {
										member = Util$findFunctionInClass$LClassDefinition$SALType$B(propertyExpr.getHolderType$().getClassDef$(), name, ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(expr.getType$()), true);
									} else {
										member = Util$findVariableInClass$LClassDefinition$SB(propertyExpr.getHolderType$().getClassDef$(), name, true);
									}
									_StripOptimizeCommand$_touchStatic_0$L_StripOptimizeCommand$LMemberDefinition$($this, member);
								} else {
									exprType$1 = propertyExpr._type;
									if (! (exprType$1 instanceof FunctionType) ? false : exprType$1.isAssignable$() ? false : true) {
										_StripOptimizeCommand$_touchMethod_0$L_StripOptimizeCommand$SALType$($this, name, ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(expr.getType$()));
									}
								}
							}
						} else {
							if (expr instanceof SuperExpression) {
								superExpr = expr;
								_StripOptimizeCommand$_touchMethod_0$L_StripOptimizeCommand$SALType$($this, Token$getValue_0$LToken$(superExpr._name), ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(superExpr._funcType));
							}
						}
					}
				}
			}
		}
		return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
	}
	return onExpr(expr);
};

_StripOptimizeCommand._walkExpression_0$L_StripOptimizeCommand$LExpression$ = _StripOptimizeCommand$_walkExpression_0$L_StripOptimizeCommand$LExpression$;

function _StripOptimizeCommand$_walkStatement_0$L_StripOptimizeCommand$LStatement$($this, statement) {
	var onStatement;
	function onStatement(statement) {
		var ctorStatement;
		var callee;
		if (statement instanceof ConstructorInvocationStatement) {
			ctorStatement = statement;
			callee = Util$findFunctionInClass$LClassDefinition$SALType$B(ctorStatement._ctorClassType.getClassDef$(), "constructor", ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(ctorStatement._ctorFunctionType), false);
			_StripOptimizeCommand$_touchConstructor_0$L_StripOptimizeCommand$LMemberFunctionDefinition$($this, callee);
		}
		Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function (expr) {
			return _StripOptimizeCommand$_walkExpression_0$L_StripOptimizeCommand$LExpression$($this, expr);
		}));
		return statement.forEachStatement$F$LStatement$B$(onStatement);
	}
	return onStatement(statement);
};

_StripOptimizeCommand._walkStatement_0$L_StripOptimizeCommand$LStatement$ = _StripOptimizeCommand$_walkStatement_0$L_StripOptimizeCommand$LStatement$;

function _StripOptimizeCommand$_walkFunctionDefinition_0$L_StripOptimizeCommand$LMemberFunctionDefinition$($this, funcDef) {
	if (funcDef._statements != null) {
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			return _StripOptimizeCommand$_walkStatement_0$L_StripOptimizeCommand$LStatement$($this, statement);
		}), funcDef._statements);
	}
	return MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(funcDef, (function (funcDef) {
		return _StripOptimizeCommand$_walkFunctionDefinition_0$L_StripOptimizeCommand$LMemberFunctionDefinition$($this, funcDef);
	}));
};

_StripOptimizeCommand._walkFunctionDefinition_0$L_StripOptimizeCommand$LMemberFunctionDefinition$ = _StripOptimizeCommand$_walkFunctionDefinition_0$L_StripOptimizeCommand$LMemberFunctionDefinition$;

function _StripOptimizeCommand$_walkVariableDefinition_0$L_StripOptimizeCommand$LMemberVariableDefinition$($this, varDef) {
	var initialValue;
	initialValue = varDef._initialValue;
	if (initialValue != null) {
		_StripOptimizeCommand$_walkExpression_0$L_StripOptimizeCommand$LExpression$($this, initialValue);
	}
	return MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(varDef, (function (funcDef) {
		return _StripOptimizeCommand$_walkFunctionDefinition_0$L_StripOptimizeCommand$LMemberFunctionDefinition$($this, funcDef);
	}));
};

_StripOptimizeCommand._walkVariableDefinition_0$L_StripOptimizeCommand$LMemberVariableDefinition$ = _StripOptimizeCommand$_walkVariableDefinition_0$L_StripOptimizeCommand$LMemberVariableDefinition$;

function _NoAssertCommand() {
	this._identifier = "no-assert";
	this._optimizer = null;
	this._excludeNative = false;
};

$__jsx_extend([_NoAssertCommand], _FunctionOptimizeCommand);
_NoAssertCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	_NoAssertCommand$_optimizeStatements_0$L_NoAssertCommand$ALStatement$(this, funcDef._statements);
	return true;
};


function _NoAssertCommand$_optimizeStatements_0$L_NoAssertCommand$ALStatement$($this, statements) {
	var optimize;
	function optimize(statements) {
		var i;
		for (i = 0; i < statements.length; ) {
			if (statements[i] instanceof AssertStatement) {
				statements.splice(i, 1);
			} else {
				_Util$handleSubStatements$F$ALStatement$B$LStatement$(optimize, statements[i]);
				++ i;
			}
		}
		return false;
	}
	optimize(statements);
};

_NoAssertCommand._optimizeStatements_0$L_NoAssertCommand$ALStatement$ = _NoAssertCommand$_optimizeStatements_0$L_NoAssertCommand$ALStatement$;

function _NoLogCommand() {
	this._identifier = "no-log";
	this._optimizer = null;
	this._excludeNative = false;
};

$__jsx_extend([_NoLogCommand], _FunctionOptimizeCommand);
_NoLogCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	_NoLogCommand$_optimizeStatements_0$L_NoLogCommand$ALStatement$(this, funcDef._statements);
	return true;
};


function _NoLogCommand$_optimizeStatements_0$L_NoLogCommand$ALStatement$($this, statements) {
	var optimize;
	function optimize(statements) {
		var i;
		for (i = 0; i < statements.length; ) {
			if (statements[i] instanceof LogStatement) {
				statements.splice(i, 1);
			} else {
				_Util$handleSubStatements$F$ALStatement$B$LStatement$(optimize, statements[i]);
				++ i;
			}
		}
		return false;
	}
	optimize(statements);
};

_NoLogCommand._optimizeStatements_0$L_NoLogCommand$ALStatement$ = _NoLogCommand$_optimizeStatements_0$L_NoLogCommand$ALStatement$;

function _DetermineCalleeCommand() {
	this._identifier = "determine-callee";
	this._optimizer = null;
	this._excludeNative = false;
};

$__jsx_extend([_DetermineCalleeCommand], _FunctionOptimizeCommand);
_DetermineCalleeCommand.prototype._createStash$ = function () {
	return new _DetermineCalleeCommand$CStash();
};


_DetermineCalleeCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	var $this = this;
	Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
		var callingFuncDef;
		var $this$0;
		var $this$1;
		if (statement instanceof ConstructorInvocationStatement) {
			callingFuncDef = _DetermineCalleeCommand$findCallingFunctionInClass$LClassDefinition$SALType$B(ConstructorInvocationStatement$getConstructingClassDef_0$LConstructorInvocationStatement$(statement), "constructor", ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(ConstructorInvocationStatement$getConstructorType_0$LConstructorInvocationStatement$(statement)), false);
			if (callingFuncDef == null) {
				throw new Error("could not determine the associated parent ctor");
			}
			_OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, statement).callingFuncDef = callingFuncDef;
		} else {
			if (statement instanceof FunctionStatement) {
				$this$1 = statement;
				$this$0 = $this$1._funcDef;
				Util$forEachStatement$F$LStatement$B$ALStatement$(onStatement, $this$0._statements);
			}
		}
		Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function onExpr(expr) {
			var calleeExpr;
			var propertyExpr;
			var holderType;
			var callingFuncDef;
			if (expr instanceof CallExpression) {
				calleeExpr = CallExpression$getExpr_0$LCallExpression$(expr);
				if (calleeExpr instanceof PropertyExpression && ! calleeExpr.getType$().isAssignable$()) {
					propertyExpr = calleeExpr;
					holderType = propertyExpr.getHolderType$();
					callingFuncDef = _DetermineCalleeCommand$findCallingFunction$LClassDefinition$SALType$B(holderType.getClassDef$(), Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(propertyExpr)), ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(propertyExpr.getType$()), UnaryExpression$getExpr_0$LUnaryExpression$(propertyExpr).isClassSpecifier$());
					_DetermineCalleeCommand$_setCallingFuncDef_0$L_DetermineCalleeCommand$LStashable$LMemberFunctionDefinition$($this, expr, callingFuncDef);
				} else {
					if (calleeExpr instanceof FunctionExpression) {
						_DetermineCalleeCommand$_setCallingFuncDef_0$L_DetermineCalleeCommand$LStashable$LMemberFunctionDefinition$($this, expr, FunctionExpression$getFuncDef_0$LFunctionExpression$(calleeExpr));
					} else {
						_DetermineCalleeCommand$_setCallingFuncDef_0$L_DetermineCalleeCommand$LStashable$LMemberFunctionDefinition$($this, expr, null);
					}
				}
			} else {
				if (expr instanceof NewExpression) {
					callingFuncDef = _DetermineCalleeCommand$findCallingFunctionInClass$LClassDefinition$SALType$B(expr.getType$().getClassDef$(), "constructor", ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(NewExpression$getConstructor_0$LNewExpression$(expr)), false);
					if (callingFuncDef == null) {
						throw new Error("could not find matching constructor for " + NewExpression$getConstructor_0$LNewExpression$(expr).toString());
					}
					_DetermineCalleeCommand$_setCallingFuncDef_0$L_DetermineCalleeCommand$LStashable$LMemberFunctionDefinition$($this, expr, callingFuncDef);
				}
			}
			if (expr instanceof FunctionExpression) {
				return MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
			} else {
				return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
			}
		}));
		return statement.forEachStatement$F$LStatement$B$(onStatement);
	}), funcDef._statements);
	return true;
};


function _DetermineCalleeCommand$_setCallingFuncDef_0$L_DetermineCalleeCommand$LStashable$LMemberFunctionDefinition$($this, stashable, funcDef) {
	_OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, stashable).callingFuncDef = funcDef;
};

_DetermineCalleeCommand._setCallingFuncDef_0$L_DetermineCalleeCommand$LStashable$LMemberFunctionDefinition$ = _DetermineCalleeCommand$_setCallingFuncDef_0$L_DetermineCalleeCommand$LStashable$LMemberFunctionDefinition$;

function _DetermineCalleeCommand$findCallingFunctionInClass$LClassDefinition$SALType$B(classDef, funcName, argTypes, isStatic) {
	var found;
	found = Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, funcName, argTypes, isStatic);
	if (found != null) {
		if ((found._flags & 12) === 0) {
			found = null;
		}
	}
	return found;
};

_DetermineCalleeCommand.findCallingFunctionInClass$LClassDefinition$SALType$B = _DetermineCalleeCommand$findCallingFunctionInClass$LClassDefinition$SALType$B;

function _DetermineCalleeCommand$findCallingFunction$LClassDefinition$SALType$B(classDef, funcName, argTypes, isStatic) {
	var found;
	found = null;
	ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$(classDef, (function (classDef) {
		return ((found = _DetermineCalleeCommand$findCallingFunctionInClass$LClassDefinition$SALType$B(classDef, funcName, argTypes, isStatic)) != null ? false : true);
	}));
	return found;
};

_DetermineCalleeCommand.findCallingFunction$LClassDefinition$SALType$B = _DetermineCalleeCommand$findCallingFunction$LClassDefinition$SALType$B;

function _DetermineCalleeCommand$getCallingFuncDef$LStashable$(stashable) {
	var stash;
	stash = stashable.getStash$S("determine-callee");
	if (stash == null) {
		throw new Error("callee not searched");
	}
	return stash.callingFuncDef;
};

_DetermineCalleeCommand.getCallingFuncDef$LStashable$ = _DetermineCalleeCommand$getCallingFuncDef$LStashable$;

function _StaticizeOptimizeCommand() {
	this._identifier = "staticize";
	this._optimizer = null;
};

$__jsx_extend([_StaticizeOptimizeCommand], _OptimizeCommand);
_StaticizeOptimizeCommand.prototype._createStash$ = function () {
	return new _StaticizeOptimizeCommand$CStash();
};


_StaticizeOptimizeCommand.prototype.performOptimization$ = function () {
	var $this = this;
	var memberCanBeStaticized;
	function memberCanBeStaticized(funcDef) {
		return (funcDef._flags & 62) === 4 && MemberDefinition$name_0$LMemberDefinition$(funcDef) !== "constructor";
	}
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		if ((classDef.flags$() & 192) !== 0) {
			return true;
		}
		ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, (function onFunction(funcDef) {
			if (memberCanBeStaticized(funcDef)) {
				_OptimizeCommand$log_0$L_OptimizeCommand$S($this, "staticizing method: " + MemberDefinition$name_0$LMemberDefinition$(funcDef));
				_StaticizeOptimizeCommand$_staticizeMethod_0$L_StaticizeOptimizeCommand$LMemberFunctionDefinition$($this, funcDef);
			}
			return true;
		}));
		return true;
	}));
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		var onFunction;
		var message$0;
		var $this$0$0;
		var message$0$0;
		message$0 = "rewriting member method calls in class: " + classDef.className$();
		$this$0$0 = $this._optimizer;
		message$0$0 = "[" + $this._identifier + "] " + message$0;
		$this$0$0._log.push(message$0$0);
		ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDef, (function (varDef) {
			if (MemberVariableDefinition$getInitialValue_0$LMemberVariableDefinition$(varDef) == null) {
				return true;
			}
			_StaticizeOptimizeCommand$_rewriteMethodCallsToStatic_0$L_StaticizeOptimizeCommand$LExpression$F$LExpression$V$LMemberFunctionDefinition$($this, MemberVariableDefinition$getInitialValue_0$LMemberVariableDefinition$(varDef), (function (expr) {
				MemberVariableDefinition$setInitialValue_0$LMemberVariableDefinition$LExpression$(varDef, expr);
			}), null);
			return true;
		}));
		function onFunction(funcDef) {
			var onStatement;
			function onStatement(statement) {
				statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function (expr, replaceCb) {
					_StaticizeOptimizeCommand$_rewriteMethodCallsToStatic_0$L_StaticizeOptimizeCommand$LExpression$F$LExpression$V$LMemberFunctionDefinition$($this, expr, replaceCb, funcDef);
					return true;
				}));
				return statement.forEachStatement$F$LStatement$B$(onStatement);
			}
			MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(funcDef, onStatement);
			return MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(funcDef, onFunction);
		}
		ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, onFunction);
		return true;
	}));
};


function _StaticizeOptimizeCommand$_staticizeMethod_0$L_StaticizeOptimizeCommand$LMemberFunctionDefinition$($this, funcDef) {
	var staticFuncDef;
	var classDef;
	var newName;
	var thisArg;
	var _members$0;
	staticFuncDef = MemberFunctionDefinition$clone_0$LMemberFunctionDefinition$(funcDef);
	classDef = funcDef._classDef;
	staticFuncDef._classDef = classDef;
	(_members$0 = classDef._members).splice(_members$0.indexOf(funcDef) + 1, 0, staticFuncDef);
	newName = _StaticizeOptimizeCommand$_findFrechFunctionName_0$L_StaticizeOptimizeCommand$LClassDefinition$SALType$B($this, classDef, MemberDefinition$name_0$LMemberDefinition$(funcDef), [ new ObjectType(classDef) ].concat(ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(funcDef.getType$())), true);
	_OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, funcDef).altName = newName;
	staticFuncDef._nameToken = new Token$0(newName, true);
	MemberDefinition$setFlags_0$LMemberDefinition$N(staticFuncDef, funcDef._flags | 8);
	thisArg = new ArgumentDeclaration(new Token$0("$this", false), new ObjectType(classDef));
	staticFuncDef._args.unshift(thisArg);
	Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
		var $this$0;
		var $this$1;
		if (statement instanceof FunctionStatement) {
			$this$1 = statement;
			$this$0 = $this$1._funcDef;
			Util$forEachStatement$F$LStatement$B$ALStatement$(onStatement, $this$0._statements);
		}
		return statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
			if (expr instanceof ThisExpression) {
				replaceCb(new LocalExpression(LocalVariable$getName_0$LLocalVariable$(thisArg), thisArg));
			} else {
				if (expr instanceof FunctionExpression) {
					return MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
				}
			}
			return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
		})) && statement.forEachStatement$F$LStatement$B$(onStatement);
	}), staticFuncDef._statements);
};

_StaticizeOptimizeCommand._staticizeMethod_0$L_StaticizeOptimizeCommand$LMemberFunctionDefinition$ = _StaticizeOptimizeCommand$_staticizeMethod_0$L_StaticizeOptimizeCommand$LMemberFunctionDefinition$;

function _StaticizeOptimizeCommand$_findFrechFunctionName_0$L_StaticizeOptimizeCommand$LClassDefinition$SALType$B($this, classDef, baseName, argTypes, isStatic) {
	var index;
	var newName;
	index = 0;
	do {
		newName = Util$format$SAS("%1_%2", [ baseName, index + "" ]);
		++ index;
	} while (Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, newName, argTypes, isStatic) != null);
	return newName;
};

_StaticizeOptimizeCommand._findFrechFunctionName_0$L_StaticizeOptimizeCommand$LClassDefinition$SALType$B = _StaticizeOptimizeCommand$_findFrechFunctionName_0$L_StaticizeOptimizeCommand$LClassDefinition$SALType$B;

function _StaticizeOptimizeCommand$_rewriteMethodCallsToStatic_0$L_StaticizeOptimizeCommand$LExpression$F$LExpression$V$LMemberFunctionDefinition$($this, expr, replaceCb, rewritingFuncDef) {
	var onExpr;
	function onExpr(expr, replaceCb) {
		var calleeExpr;
		var propertyExpr;
		var receiverType;
		var funcDef;
		var newName;
		var superExpr;
		var classDef;
		var thisVar;
		var thisArg;
		var $this$0;
		var $this$1;
		if (expr instanceof CallExpression) {
			$this$0 = expr;
			calleeExpr = $this$0._expr;
			if (calleeExpr instanceof PropertyExpression && ! UnaryExpression$getExpr_0$LUnaryExpression$(calleeExpr).isClassSpecifier$() && ! calleeExpr.getType$().isAssignable$()) {
				propertyExpr = calleeExpr;
				$this$1 = propertyExpr._expr.getType$();
				receiverType = ($this$1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$1) : $this$1);
				if ((receiverType.getClassDef$().flags$() & 192) === 0) {
					funcDef = _StaticizeOptimizeCommand$_findFunctionInClassTree_0$L_StaticizeOptimizeCommand$LClassDefinition$SALType$B($this, receiverType.getClassDef$(), Token$getValue_0$LToken$(propertyExpr._identifierToken), ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(propertyExpr._type), false);
					if (funcDef != null && (newName = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, funcDef).altName) != null) {
						onExpr(propertyExpr._expr, (function (expr) {
							UnaryExpression$setExpr_0$LUnaryExpression$LExpression$(propertyExpr, expr);
						}));
						Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, CallExpression$getArguments_0$LCallExpression$(expr));
						replaceCb(new CallExpression(expr._token, new PropertyExpression$0(propertyExpr._token, new ClassExpression(new Token$0(funcDef._classDef.className$(), true), new ObjectType(funcDef._classDef)), new Token$0(newName, true), propertyExpr._typeArgs, new StaticFunctionType(null, ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(funcDef.getType$()), [ new ObjectType(funcDef._classDef) ].concat(ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(funcDef.getType$())), false)), [ propertyExpr._expr ].concat(CallExpression$getArguments_0$LCallExpression$(expr))));
						return true;
					}
				}
			}
		} else {
			if (expr instanceof SuperExpression) {
				superExpr = expr;
				classDef = superExpr._funcType.getObjectType$().getClassDef$();
				funcDef = _StaticizeOptimizeCommand$_findFunctionInClassTree_0$L_StaticizeOptimizeCommand$LClassDefinition$SALType$B($this, classDef, Token$getValue_0$LToken$(superExpr._name), ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(superExpr._funcType), false);
				if (funcDef != null && (newName = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, funcDef).altName) != null) {
					Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, superExpr._args);
					if ((rewritingFuncDef._flags & 8) !== 0) {
						thisArg = rewritingFuncDef._args[0];
						thisVar = new LocalExpression(thisArg._name, thisArg);
					} else {
						thisVar = new ThisExpression(new Token$0("this", false), funcDef._classDef);
					}
					replaceCb(new CallExpression(expr._token, new PropertyExpression$0(superExpr._token, new ClassExpression(new Token$0(funcDef._classDef.className$(), true), new ObjectType(funcDef._classDef)), new Token$0(newName, true), [  ], new StaticFunctionType(null, ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(funcDef.getType$()), [ new ObjectType(funcDef._classDef) ].concat(ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(funcDef.getType$())), false)), [ thisVar ].concat(superExpr._args)));
					return true;
				}
			}
		}
		return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
	}
	onExpr(expr, replaceCb);
};

_StaticizeOptimizeCommand._rewriteMethodCallsToStatic_0$L_StaticizeOptimizeCommand$LExpression$F$LExpression$V$LMemberFunctionDefinition$ = _StaticizeOptimizeCommand$_rewriteMethodCallsToStatic_0$L_StaticizeOptimizeCommand$LExpression$F$LExpression$V$LMemberFunctionDefinition$;

function _StaticizeOptimizeCommand$_findFunctionInClassTree_0$L_StaticizeOptimizeCommand$LClassDefinition$SALType$B($this, classDef, name, argTypes, isStatic) {
	var funcDef;
	var this$0;
	while (classDef.className$() !== "Object") {
		if ((funcDef = Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, name, argTypes, isStatic)) != null) {
			return funcDef;
		}
		this$0 = classDef._extendType;
		classDef = this$0._classDef;
	}
	return Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, name, argTypes, isStatic);
};

_StaticizeOptimizeCommand._findFunctionInClassTree_0$L_StaticizeOptimizeCommand$LClassDefinition$SALType$B = _StaticizeOptimizeCommand$_findFunctionInClassTree_0$L_StaticizeOptimizeCommand$LClassDefinition$SALType$B;

function _UnclassifyOptimizationCommand() {
	this._identifier = "unclassify";
	this._optimizer = null;
};

$__jsx_extend([_UnclassifyOptimizationCommand], _OptimizeCommand);
_UnclassifyOptimizationCommand.prototype._createStash$ = function () {
	return new _UnclassifyOptimizationCommand$CStash();
};


_UnclassifyOptimizationCommand.prototype.performOptimization$ = function () {
	var $this = this;
	var classDefs;
	var i$0;
	classDefs = _UnclassifyOptimizationCommand$_getClassesToUnclassify_0$L_UnclassifyOptimizationCommand$(this);
	for (i$0 in classDefs) {
		(function (classDef) {
			var message$0;
			var $this$0$0;
			var message$0$0;
			message$0 = "unclassifying class: " + classDef.className$();
			$this$0$0 = $this._optimizer;
			message$0$0 = "[" + $this._identifier + "] " + message$0;
			$this$0$0._log.push(message$0$0);
			ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, (function onFunction(funcDef) {
				if ((MemberDefinition$flags_0$LMemberDefinition$(funcDef) & ClassDefinition.IS_STATIC) === 0 && MemberDefinition$name_0$LMemberDefinition$(funcDef) !== "constructor") {
					_OptimizeCommand$log_0$L_OptimizeCommand$S($this, "rewriting method to static function: " + MemberDefinition$name_0$LMemberDefinition$(funcDef));
					_UnclassifyOptimizationCommand$_rewriteFunctionAsStatic_0$L_UnclassifyOptimizationCommand$LMemberFunctionDefinition$($this, funcDef);
				}
				return true;
			}));
		})(classDefs[i$0]);
	}
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		var onFunction;
		var message$0;
		var $this$0$0;
		var message$0$0;
		message$0 = "rewriting member method calls in class: " + classDef.className$();
		$this$0$0 = $this._optimizer;
		message$0$0 = "[" + $this._identifier + "] " + message$0;
		$this$0$0._log.push(message$0$0);
		function onFunction(funcDef) {
			var onStatement;
			function onStatement(statement) {
				statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function (expr, replaceCb) {
					_UnclassifyOptimizationCommand$_rewriteMethodCallsToStatic_0$L_UnclassifyOptimizationCommand$LExpression$F$LExpression$V$ALClassDefinition$($this, expr, replaceCb, classDefs);
					return true;
				}));
				return statement.forEachStatement$F$LStatement$B$(onStatement);
			}
			MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(funcDef, onStatement);
			return MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(funcDef, onFunction);
		}
		ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, onFunction);
		ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDef, (function (varDef) {
			if ((MemberDefinition$flags_0$LMemberDefinition$(varDef) & ClassDefinition.IS_STATIC) !== 0) {
				if (MemberVariableDefinition$getInitialValue_0$LMemberVariableDefinition$(varDef) != null) {
					_UnclassifyOptimizationCommand$_rewriteMethodCallsToStatic_0$L_UnclassifyOptimizationCommand$LExpression$F$LExpression$V$ALClassDefinition$($this, MemberVariableDefinition$getInitialValue_0$LMemberVariableDefinition$(varDef), (function (expr) {
						MemberVariableDefinition$setInitialValue_0$LMemberVariableDefinition$LExpression$(varDef, expr);
					}), classDefs);
				}
			}
			return MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(varDef, onFunction);
		}));
		return true;
	}));
};


function _UnclassifyOptimizationCommand$_getClassesToUnclassify_0$L_UnclassifyOptimizationCommand$($this) {
	var candidates;
	var candidateIndex;
	var hasInlineableCtor;
	candidates = [];
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$($this), (function (parser, classDef) {
		if ((classDef.flags$() & 16404) === 4 && classDef._extendType.getClassDef$().className$() === "Object" && classDef._implementTypes.length === 0 && ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, (function (funcDef) {
			return (MemberDefinition$flags_0$LMemberDefinition$(funcDef) & (ClassDefinition.IS_OVERRIDE | ClassDefinition.IS_EXPORT)) === 0;
		}))) {
			candidates.push(classDef);
		}
		return true;
	}));
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$($this), (function (parser, classDef) {
		var onExpr;
		var onFunction;
		if (candidates.length === 0) {
			return false;
		}
		function onExpr(expr) {
			var foundClassDefIndex;
			if (! (expr != null)) {
				debugger;
				throw new Error("[/Users/gfx/repo/try-on-web/JSX/src/optimizer.jsx:1379:28] assertion failure\n                assert expr != null;\n                            ^^\n");
			}
			if (expr instanceof InstanceofExpression) {
				foundClassDefIndex = candidates.indexOf(InstanceofExpression$getExpectedType_0$LInstanceofExpression$(expr).getClassDef$());
				if (foundClassDefIndex !== - 1) {
					candidates.splice(foundClassDefIndex, 1);
					if (candidates.length === 0) {
						return false;
					}
				}
			} else {
				if (expr instanceof AsExpression && expr.getType$() instanceof ObjectType) {
					foundClassDefIndex = candidates.indexOf(expr.getType$().getClassDef$());
					if (foundClassDefIndex !== - 1) {
						candidates.splice(foundClassDefIndex, 1);
						if (candidates.length === 0) {
							return false;
						}
					}
				}
			}
			return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
		}
		function onFunction(funcDef) {
			MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(funcDef, (function onStatement(statement) {
				Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, onExpr);
				return statement.forEachStatement$F$LStatement$B$(onStatement);
			}));
			return MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(funcDef, onFunction);
		}
		ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, onFunction);
		ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDef, (function (varDef) {
			if ((MemberDefinition$flags_0$LMemberDefinition$(varDef) & ClassDefinition.IS_STATIC) !== 0) {
				if (MemberVariableDefinition$getInitialValue_0$LMemberVariableDefinition$(varDef) != null) {
					onExpr(MemberVariableDefinition$getInitialValue_0$LMemberVariableDefinition$(varDef));
				}
			}
			return MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(varDef, onFunction);
		}));
		return true;
	}));
	for (candidateIndex = candidates.length - 1; candidateIndex >= 0; -- candidateIndex) {
		hasInlineableCtor = false;
		ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(candidates[candidateIndex], (function (funcDef) {
			var inliner;
			var message$0;
			var $this$0$0;
			var message$0$0;
			if ((funcDef._flags & 8) === 0 && MemberDefinition$name_0$LMemberDefinition$(funcDef) === "constructor") {
				inliner = _UnclassifyOptimizationCommand$_createInliner_0$L_UnclassifyOptimizationCommand$LMemberFunctionDefinition$($this, funcDef);
				message$0 = funcDef.getNotation$() + " is" + (inliner ? "" : " not") + " inlineable";
				$this$0$0 = $this._optimizer;
				message$0$0 = "[" + $this._identifier + "] " + message$0;
				$this$0$0._log.push(message$0$0);
				if (inliner) {
					_OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, funcDef).inliner = inliner;
					hasInlineableCtor = true;
				}
			}
			return true;
		}));
		if (! hasInlineableCtor) {
			candidates.splice(candidateIndex, 1);
		}
	}
	return (candidates.length === 0 ? candidates : candidates);
};

_UnclassifyOptimizationCommand._getClassesToUnclassify_0$L_UnclassifyOptimizationCommand$ = _UnclassifyOptimizationCommand$_getClassesToUnclassify_0$L_UnclassifyOptimizationCommand$;

function _UnclassifyOptimizationCommand$_createInliner_0$L_UnclassifyOptimizationCommand$LMemberFunctionDefinition$($this, funcDef) {
	var propertyNames;
	var propertyExprs;
	var expectedArgIndex;
	var statements;
	var statementIndex;
	var statementExpr;
	var lhsExpr;
	var onRHSExpr;
	var propertyIndex;
	var i;
	var $this$0;
	var $this$1;
	var propertyNames$len$0;
	if (funcDef._locals.length !== 0) {
		return null;
	}
	propertyNames = [];
	ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(funcDef._classDef, (function (member) {
		if ((member._flags & 8) === 0) {
			propertyNames.push(MemberDefinition$name_0$LMemberDefinition$(member));
		}
		return true;
	}));
	propertyExprs = [];
	expectedArgIndex = 0;
	statements = funcDef._statements;
	if (statements.length !== propertyNames.length) {
		return null;
	}
	for (statementIndex = 0; statementIndex < statements.length; ++ statementIndex) {
		if (! (statements[statementIndex] instanceof ExpressionStatement)) {
			return null;
		}
		$this$0 = statements[statementIndex];
		statementExpr = $this$0._expr;
		if (! (statementExpr instanceof AssignmentExpression)) {
			return null;
		}
		$this$1 = statementExpr;
		lhsExpr = $this$1._expr1;
		if (! (lhsExpr instanceof PropertyExpression && UnaryExpression$getExpr_0$LUnaryExpression$(lhsExpr) instanceof ThisExpression)) {
			return null;
		}
		onRHSExpr = (function (expr) {
			var argIndex;
			if (expr instanceof AssignmentExpression || expr instanceof PreIncrementExpression || expr instanceof PostIncrementExpression) {
				return false;
			} else {
				if (expr instanceof FunctionExpression) {
					return false;
				} else {
					if (expr instanceof ThisExpression) {
						return false;
					} else {
						if (expr instanceof LocalExpression) {
							argIndex = funcDef._args.map((function (i) {
								return i;
							})).indexOf(LocalExpression$getLocal_0$LLocalExpression$(expr));
							if (argIndex === -1) {
								throw new Error("logic flaw; could not find argument: " + Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(LocalExpression$getLocal_0$LLocalExpression$(expr))));
							}
							if (expectedArgIndex !== argIndex) {
								return false;
							}
							++ expectedArgIndex;
						}
					}
				}
			}
			return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onRHSExpr);
		});
		if (! onRHSExpr(BinaryExpression$getSecondExpr_0$LBinaryExpression$(statementExpr))) {
			return null;
		}
		propertyIndex = propertyNames.indexOf(Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(lhsExpr)));
		if (propertyIndex === -1) {
			throw new Error("logic flaw; could not find property: " + Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(lhsExpr)));
		}
		if (propertyExprs[propertyIndex]) {
			return null;
		}
		for ((i = propertyIndex + 1, propertyNames$len$0 = propertyNames.length); i < propertyNames$len$0; ++ i) {
			if (propertyExprs[i] != null && _Util$exprHasSideEffects$LExpression$(propertyExprs[i])) {
				return null;
			}
		}
		propertyExprs[propertyIndex] = BinaryExpression$getSecondExpr_0$LBinaryExpression$(statementExpr).clone$();
	}
	return (function (newExpr) {
		return propertyExprs.map((function (expr) {
			var onExpr;
			function onExpr(expr, replaceCb) {
				var args;
				var argIndex;
				var i;
				if (expr instanceof LocalExpression) {
					(args = MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$(funcDef), argIndex = - 1);
					for (i in args) {
						if (args[i] == LocalExpression$getLocal_0$LLocalExpression$(expr)) {
							argIndex = i;
							break;
						}
					}
					if (argIndex === - 1) {
						throw new Error("logic flaw");
					}
					replaceCb(NewExpression$getArguments_0$LNewExpression$(newExpr)[argIndex]);
					return true;
				}
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			}
			expr = expr.clone$();
			onExpr(expr, (function (newExpr) {
				expr = newExpr;
			}));
			return expr;
		}));
	});
};

_UnclassifyOptimizationCommand._createInliner_0$L_UnclassifyOptimizationCommand$LMemberFunctionDefinition$ = _UnclassifyOptimizationCommand$_createInliner_0$L_UnclassifyOptimizationCommand$LMemberFunctionDefinition$;

function _UnclassifyOptimizationCommand$_rewriteFunctionAsStatic_0$L_UnclassifyOptimizationCommand$LMemberFunctionDefinition$($this, funcDef) {
	var thisArg;
	thisArg = new ArgumentDeclaration(new Token$0("$this", false), new ObjectType(funcDef._classDef));
	funcDef._args.unshift(thisArg);
	Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
		var $this$0;
		var $this$1;
		if (statement instanceof FunctionStatement) {
			$this$1 = statement;
			$this$0 = $this$1._funcDef;
			Util$forEachStatement$F$LStatement$B$ALStatement$(onStatement, $this$0._statements);
		}
		return statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
			if (expr instanceof ThisExpression) {
				replaceCb(new LocalExpression(LocalVariable$getName_0$LLocalVariable$(thisArg), thisArg));
			} else {
				if (expr instanceof FunctionExpression) {
					return MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
				}
			}
			return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
		})) && statement.forEachStatement$F$LStatement$B$(onStatement);
	}), funcDef._statements);
	MemberDefinition$setFlags_0$LMemberDefinition$N(funcDef, funcDef._flags | 8);
};

_UnclassifyOptimizationCommand._rewriteFunctionAsStatic_0$L_UnclassifyOptimizationCommand$LMemberFunctionDefinition$ = _UnclassifyOptimizationCommand$_rewriteFunctionAsStatic_0$L_UnclassifyOptimizationCommand$LMemberFunctionDefinition$;

function _UnclassifyOptimizationCommand$_rewriteMethodCallsToStatic_0$L_UnclassifyOptimizationCommand$LExpression$F$LExpression$V$ALClassDefinition$($this, expr, replaceCb, unclassifyingClassDefs) {
	var onExpr;
	onExpr = (function (expr, replaceCb) {
		var calleeExpr;
		var propertyExpr;
		var receiverType;
		var receiverClassDef;
		var funcType;
		var $this$0;
		var $this$1;
		if (expr instanceof CallExpression) {
			$this$0 = expr;
			calleeExpr = $this$0._expr;
			if (calleeExpr instanceof PropertyExpression && ! UnaryExpression$getExpr_0$LUnaryExpression$(calleeExpr).isClassSpecifier$() && ! calleeExpr.getType$().isAssignable$() && ! (Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(calleeExpr)) === "toString" && CallExpression$getArguments_0$LCallExpression$(expr).length === 0)) {
				propertyExpr = calleeExpr;
				$this$1 = propertyExpr._expr.getType$();
				receiverType = ($this$1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$1) : $this$1);
				receiverClassDef = receiverType.getClassDef$();
				if (unclassifyingClassDefs.indexOf(receiverClassDef) !== -1) {
					onExpr(propertyExpr._expr, (function (expr) {
						UnaryExpression$setExpr_0$LUnaryExpression$LExpression$(propertyExpr, expr);
					}));
					Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, CallExpression$getArguments_0$LCallExpression$(expr));
					funcType = propertyExpr._type;
					replaceCb(new CallExpression(expr._token, new PropertyExpression$0(propertyExpr._token, new ClassExpression(new Token$0(receiverClassDef.className$(), true), receiverType), propertyExpr._identifierToken, propertyExpr._typeArgs, new StaticFunctionType(null, ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(funcType), [ receiverType ].concat(ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(funcType)), false)), [ propertyExpr._expr ].concat(CallExpression$getArguments_0$LCallExpression$(expr))));
					return true;
				}
			}
		}
		return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
	});
	onExpr(expr, replaceCb);
};

_UnclassifyOptimizationCommand._rewriteMethodCallsToStatic_0$L_UnclassifyOptimizationCommand$LExpression$F$LExpression$V$ALClassDefinition$ = _UnclassifyOptimizationCommand$_rewriteMethodCallsToStatic_0$L_UnclassifyOptimizationCommand$LExpression$F$LExpression$V$ALClassDefinition$;

function _FoldConstantCommand() {
	this._identifier = "fold-const";
	this._optimizer = null;
	this._excludeNative = false;
};

$__jsx_extend([_FoldConstantCommand], _FunctionOptimizeCommand);
_FoldConstantCommand.prototype._createStash$ = function () {
	return new _FoldConstantCommand$CStash();
};


_FoldConstantCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	var $this = this;
	Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
		statement.forEachStatement$F$LStatement$B$(onStatement);
		statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function (expr, replaceCb) {
			return _FoldConstantCommand$_optimizeExpression_0$L_FoldConstantCommand$LExpression$F$LExpression$V$($this, expr, replaceCb);
		}));
		return true;
	}), funcDef._statements);
	return true;
};


function _FoldConstantCommand$_optimizeExpression_0$L_FoldConstantCommand$LExpression$F$LExpression$V$($this, expr, replaceCb) {
	var propertyExpr;
	var holderType;
	var member;
	var foldedExpr;
	var calculateCb;
	var baseExpr;
	var firstExpr;
	var secondExpr;
	var innerExpr;
	var condition;
	var op;
	var conditionalExpr;
	var condExpr;
	var ifTrueExpr;
	var ifFalseExpr;
	var message$0;
	var $this$0$0;
	var message$0$0;
	var message$1;
	var $this$0$1;
	var message$0$1;
	var $this$0;
	var $this$1;
	var $this$2;
	var $this$3;
	var $this$4;
	var $this$5;
	var $this$6;
	expr.forEachExpression$F$LExpression$F$LExpression$V$B$((function (expr, replaceCb) {
		return _FoldConstantCommand$_optimizeExpression_0$L_FoldConstantCommand$LExpression$F$LExpression$V$($this, expr, replaceCb);
	}));
	if (expr instanceof PropertyExpression) {
		propertyExpr = expr;
		holderType = propertyExpr.getHolderType$();
		if (propertyExpr._expr.isClassSpecifier$()) {
			member = null;
			ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(holderType.getClassDef$(), (function (m) {
				if (m instanceof MemberVariableDefinition && MemberDefinition$name_0$LMemberDefinition$(m) === Token$getValue_0$LToken$(propertyExpr._identifierToken)) {
					member = m;
				}
				return member == null;
			}));
			if (member != null && (member._flags & 1) !== 0) {
				_FoldConstantCommand$_foldStaticConst_0$L_FoldConstantCommand$LMemberVariableDefinition$($this, member);
				foldedExpr = _FoldConstantCommand$_toFoldedExpr_0$L_FoldConstantCommand$LExpression$LType$($this, member._initialValue, member.getType$());
				if (foldedExpr != null) {
					foldedExpr = _FoldConstantCommand$_toFoldedExpr_0$L_FoldConstantCommand$LExpression$LType$($this, foldedExpr, propertyExpr._type);
					if (foldedExpr != null) {
						message$0 = "folding property '" + (MemberDefinition$name_0$LMemberDefinition$(member) + " : " + member._type.toString()) + "' at '" + Token$getFilename_0$LToken$(propertyExpr._token) + ":" + (Token$getLineNumber_0$LToken$(propertyExpr._token) + "");
						$this$0$0 = $this._optimizer;
						message$0$0 = "[" + $this._identifier + "] " + message$0;
						$this$0$0._log.push(message$0$0);
						replaceCb(foldedExpr);
					}
				}
			}
		}
	} else {
		if (expr instanceof SignExpression) {
			switch (Token$getValue_0$LToken$(expr._token)) {
			case "+":
				calculateCb = (function (x) {
					return + x;
				});
				break;
			case "-":
				calculateCb = (function (x) {
					return - x;
				});
				break;
			default:
				return false;
			}
			message$1 = "folding operator '" + Token$getValue_0$LToken$(expr._token) + "' at '" + Token$getFilename_0$LToken$(expr._token) + ":" + (Token$getLineNumber_0$LToken$(expr._token) + "");
			$this$0$1 = $this._optimizer;
			message$0$1 = "[" + $this._identifier + "] " + message$1;
			$this$0$1._log.push(message$0$1);
			$this$0 = expr;
			baseExpr = $this$0._expr;
			if (baseExpr instanceof IntegerLiteralExpression) {
				replaceCb(new IntegerLiteralExpression(new Token$0(calculateCb(+Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(baseExpr))) + "", false)));
			} else {
				if (baseExpr instanceof NumberLiteralExpression) {
					replaceCb(new NumberLiteralExpression(new Token$0(calculateCb(+Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(baseExpr))) + "", false)));
				}
			}
		} else {
			if (expr instanceof AdditiveExpression) {
				$this$1 = expr;
				firstExpr = $this$1._expr1;
				$this$2 = expr;
				secondExpr = $this$2._expr2;
				if (_FoldConstantCommand$_foldNumericBinaryExpression_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$($this, expr, replaceCb)) {
				} else {
					if (firstExpr instanceof StringLiteralExpression && secondExpr instanceof StringLiteralExpression) {
						replaceCb(new StringLiteralExpression(new Token$0(Util$encodeStringLiteral$S(Util$decodeStringLiteral$S(Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(firstExpr))) + Util$decodeStringLiteral$S(Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(secondExpr)))), false)));
					}
				}
			} else {
				if (expr instanceof EqualityExpression) {
					_FoldConstantCommand$_foldEqualityExpression_0$L_FoldConstantCommand$LEqualityExpression$F$LExpression$V$($this, expr, replaceCb);
				} else {
					if (expr instanceof BinaryNumberExpression || expr instanceof ShiftExpression) {
						_FoldConstantCommand$_foldNumericBinaryExpression_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$($this, expr, replaceCb);
					} else {
						if (expr instanceof AsExpression) {
							_FoldConstantCommand$_foldAsExpression_0$L_FoldConstantCommand$LAsExpression$F$LExpression$V$($this, expr, replaceCb);
						} else {
							if (expr instanceof LogicalNotExpression) {
								$this$3 = expr;
								innerExpr = $this$3._expr;
								if ((condition = _Util$conditionIsConstant$LExpression$(innerExpr)) != null) {
									replaceCb(new BooleanLiteralExpression(new Token$0((condition ? "false" : "true"), false)));
								}
							} else {
								if (expr instanceof LogicalExpression) {
									$this$4 = expr;
									firstExpr = $this$4._expr1;
									$this$5 = expr;
									secondExpr = $this$5._expr2;
									if ((condition = _Util$conditionIsConstant$LExpression$(firstExpr)) != null) {
										$this$6 = expr._token;
										op = $this$6._value;
										if (op === "||" && condition) {
											replaceCb(new AsExpression(firstExpr._token, firstExpr, Type.booleanType));
										} else {
											if (op === "||" && ! condition) {
												replaceCb(new AsExpression(secondExpr._token, secondExpr, Type.booleanType));
											} else {
												if (op === "&&" && condition) {
													replaceCb(new AsExpression(secondExpr._token, secondExpr, Type.booleanType));
												} else {
													if (op === "&&" && ! condition) {
														replaceCb(new AsExpression(firstExpr._token, firstExpr, Type.booleanType));
													} else {
														throw new Error("logic flaw");
													}
												}
											}
										}
									}
								} else {
									if (expr instanceof ConditionalExpression) {
										conditionalExpr = expr;
										condExpr = conditionalExpr._condExpr;
										if ((condition = _Util$conditionIsConstant$LExpression$(condExpr)) != null) {
											ifTrueExpr = conditionalExpr._ifTrueExpr || condExpr;
											ifFalseExpr = conditionalExpr._ifFalseExpr;
											replaceCb(condition ? ifTrueExpr : ifFalseExpr);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return true;
};

_FoldConstantCommand._optimizeExpression_0$L_FoldConstantCommand$LExpression$F$LExpression$V$ = _FoldConstantCommand$_optimizeExpression_0$L_FoldConstantCommand$LExpression$F$LExpression$V$;

function _FoldConstantCommand$_foldEqualityExpression_0$L_FoldConstantCommand$LEqualityExpression$F$LExpression$V$($this, expr, replaceCb) {
	var firstExpr;
	var secondExpr;
	var isEqual;
	var result;
	firstExpr = expr._expr1;
	secondExpr = expr._expr2;
	isEqual = null;
	if (firstExpr instanceof StringLiteralExpression && secondExpr instanceof StringLiteralExpression) {
		isEqual = Util$decodeStringLiteral$S(Token$getValue_0$LToken$(firstExpr._token)) === Util$decodeStringLiteral$S(Token$getValue_0$LToken$(secondExpr._token));
	} else {
		if ((firstExpr instanceof NumberLiteralExpression || firstExpr instanceof IntegerLiteralExpression) && (secondExpr instanceof NumberLiteralExpression || secondExpr instanceof IntegerLiteralExpression)) {
			isEqual = +Token$getValue_0$LToken$(firstExpr._token) === +Token$getValue_0$LToken$(secondExpr._token);
		}
	}
	if (isEqual != null) {
		result = (Token$getValue_0$LToken$(expr._token) === "==" ? isEqual : ! isEqual);
		replaceCb(new BooleanLiteralExpression(new Token$0((result ? "true" : "false"), true)));
	}
};

_FoldConstantCommand._foldEqualityExpression_0$L_FoldConstantCommand$LEqualityExpression$F$LExpression$V$ = _FoldConstantCommand$_foldEqualityExpression_0$L_FoldConstantCommand$LEqualityExpression$F$LExpression$V$;

function _FoldConstantCommand$_foldNumericBinaryExpression_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$($this, expr, replaceCb) {
	var exprIsZero;
	var exprIsOne;
	if (_FoldConstantCommand$_isIntegerOrNumberLiteralExpression_0$L_FoldConstantCommand$LExpression$($this, expr._expr1) && _FoldConstantCommand$_isIntegerOrNumberLiteralExpression_0$L_FoldConstantCommand$LExpression$($this, expr._expr2)) {
		return _FoldConstantCommand$_foldNumericBinaryExpressionOfConstants_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$($this, expr, replaceCb);
	}
	function exprIsZero(expr) {
		return expr instanceof NumberLiteralExpression && +Token$getValue_0$LToken$(expr._token) === 0;
	}
	function exprIsOne(expr) {
		return expr instanceof NumberLiteralExpression && +Token$getValue_0$LToken$(expr._token) === 1;
	}
	switch (Token$getValue_0$LToken$(expr._token)) {
	case "+":
		if (exprIsZero(expr._expr1)) {
			replaceCb(expr._expr2);
			return true;
		} else {
			if (exprIsZero(expr._expr2)) {
				replaceCb(expr._expr1);
				return true;
			}
		}
		break;
	case "-":
		if (exprIsZero(expr._expr1)) {
			replaceCb(new SignExpression(new Token$0("-", false), expr._expr2));
			return true;
		} else {
			if (exprIsZero(expr._expr2)) {
				replaceCb(expr._expr1);
				return true;
			}
		}
		break;
	case "*":
		if (exprIsOne(expr._expr1)) {
			replaceCb(expr._expr2);
			return true;
		} else {
			if (exprIsOne(expr._expr2)) {
				replaceCb(expr._expr1);
				return true;
			}
		}
		break;
	case "/":
		if (exprIsOne(expr._expr2)) {
			replaceCb(expr._expr1);
			return true;
		}
		break;
	}
	return false;
};

_FoldConstantCommand._foldNumericBinaryExpression_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$ = _FoldConstantCommand$_foldNumericBinaryExpression_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$;

function _FoldConstantCommand$_foldNumericBinaryExpressionOfConstants_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$($this, expr, replaceCb) {
	switch (Token$getValue_0$LToken$(expr._token)) {
	case "*":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsNumeric_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x * y;
		}));
		break;
	case "+":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsNumeric_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x + y;
		}));
		break;
	case "-":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsNumeric_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x - y;
		}));
		break;
	case "%":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsNumeric_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x % y;
		}));
		break;
	case "/":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsNumber_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x / y;
		}));
		break;
	case ">>>":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x >>> y;
		}));
		break;
	case ">>":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x >> y;
		}));
		break;
	case "<<":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x << y;
		}));
		break;
	case "&":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x & y;
		}));
		break;
	case "|":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x | y;
		}));
		break;
	case "^":
		_FoldConstantCommand$_foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, (function (x, y) {
			return x ^ y;
		}));
		break;
	default:
		return false;
	}
	return true;
};

_FoldConstantCommand._foldNumericBinaryExpressionOfConstants_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$ = _FoldConstantCommand$_foldNumericBinaryExpressionOfConstants_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$;

function _FoldConstantCommand$_foldNumericBinaryExpressionAsNumeric_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, calcCb) {
	if (expr._expr1 instanceof IntegerLiteralExpression && expr._expr2 instanceof IntegerLiteralExpression) {
		_FoldConstantCommand$_foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, calcCb);
	} else {
		_FoldConstantCommand$_foldNumericBinaryExpressionAsNumber_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, calcCb);
	}
};

_FoldConstantCommand._foldNumericBinaryExpressionAsNumeric_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$ = _FoldConstantCommand$_foldNumericBinaryExpressionAsNumeric_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$;

function _FoldConstantCommand$_foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, calcCb) {
	var value;
	var message$0;
	var $this$0$0;
	var message$0$0;
	value = calcCb(+Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(expr._expr1)), +Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(expr._expr2)));
	message$0 = "folding operator '" + Token$getValue_0$LToken$(expr._token) + "' at " + Token$getFilename_0$LToken$(expr._token) + ":" + (Token$getLineNumber_0$LToken$(expr._token) + "") + " to int: " + (value + "");
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	if (value % 1 !== 0) {
		throw new Error("value is not an integer");
	}
	replaceCb(new IntegerLiteralExpression(new Token$0(value + "", false)));
};

_FoldConstantCommand._foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$ = _FoldConstantCommand$_foldNumericBinaryExpressionAsInteger_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$;

function _FoldConstantCommand$_foldNumericBinaryExpressionAsNumber_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$($this, expr, replaceCb, calcCb) {
	var value;
	var message$0;
	var $this$0$0;
	var message$0$0;
	value = calcCb(+Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(expr._expr1)), +Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(expr._expr2)));
	message$0 = "folding operator '" + Token$getValue_0$LToken$(expr._token) + "' at " + Token$getFilename_0$LToken$(expr._token) + ":" + (Token$getLineNumber_0$LToken$(expr._token) + "") + " to number: " + (value + "");
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	replaceCb(new NumberLiteralExpression(new Token$0(value + "", false)));
};

_FoldConstantCommand._foldNumericBinaryExpressionAsNumber_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$ = _FoldConstantCommand$_foldNumericBinaryExpressionAsNumber_0$L_FoldConstantCommand$LBinaryExpression$F$LExpression$V$F$NNN$;

function _FoldConstantCommand$_isIntegerOrNumberLiteralExpression_0$L_FoldConstantCommand$LExpression$($this, expr) {
	return expr instanceof NumberLiteralExpression || expr instanceof IntegerLiteralExpression;
};

_FoldConstantCommand._isIntegerOrNumberLiteralExpression_0$L_FoldConstantCommand$LExpression$ = _FoldConstantCommand$_isIntegerOrNumberLiteralExpression_0$L_FoldConstantCommand$LExpression$;

function _FoldConstantCommand$_foldStaticConst_0$L_FoldConstantCommand$LMemberVariableDefinition$($this, member) {
	var stash;
	var initialValue;
	stash = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, member);
	if (stash.isOptimized) {
		return;
	}
	stash.isOptimized = true;
	initialValue = member._initialValue;
	if (initialValue != null) {
		_FoldConstantCommand$_optimizeExpression_0$L_FoldConstantCommand$LExpression$F$LExpression$V$($this, initialValue, (function (expr) {
			member._initialValue = expr;
		}));
	}
};

_FoldConstantCommand._foldStaticConst_0$L_FoldConstantCommand$LMemberVariableDefinition$ = _FoldConstantCommand$_foldStaticConst_0$L_FoldConstantCommand$LMemberVariableDefinition$;

function _FoldConstantCommand$_toFoldedExpr_0$L_FoldConstantCommand$LExpression$LType$($this, expr, type) {
	if (expr instanceof NullExpression) {
		return expr;
	} else {
		if (expr instanceof BooleanLiteralExpression) {
			return expr;
		} else {
			if (expr instanceof IntegerLiteralExpression) {
				return expr;
			} else {
				if (expr instanceof NumberLiteralExpression) {
					if ((type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type).equals$LType$(Type.integerType)) {
						return new IntegerLiteralExpression(new Token$0((Token$getValue_0$LToken$(expr._token) | 0).toString(), false));
					}
					return expr;
				} else {
					if (expr instanceof StringLiteralExpression) {
						return expr;
					}
				}
			}
		}
	}
	return null;
};

_FoldConstantCommand._toFoldedExpr_0$L_FoldConstantCommand$LExpression$LType$ = _FoldConstantCommand$_toFoldedExpr_0$L_FoldConstantCommand$LExpression$LType$;

function _FoldConstantCommand$_foldAsExpression_0$L_FoldConstantCommand$LAsExpression$F$LExpression$V$($this, expr, replaceCb) {
	var baseExpr;
	var $this$0$0;
	var message$0$0;
	var $this$0$1;
	var message$0$1;
	var $this$0$2;
	var message$0$2;
	var $this$0$3;
	var message$0$3;
	var $this$0$4;
	var message$0$4;
	var $this$0$5;
	var message$0$5;
	var $this$0$6;
	var message$0$6;
	var $this$0$7;
	var message$0$7;
	var $this$0$8;
	var message$0$8;
	var $this$0$9;
	var message$0$9;
	var $this$0$10;
	var message$0$10;
	var $this$0$11;
	var message$0$11;
	baseExpr = expr._expr;
	if (expr._type.equals$LType$(Type.stringType)) {
		if (baseExpr.getType$().equals$LType$(Type.stringType)) {
			$this$0$0 = $this._optimizer;
			message$0$0 = "[" + $this._identifier + "] " + "folding type cast: string as string";
			$this$0$0._log.push(message$0$0);
			replaceCb(baseExpr);
		} else {
			if (baseExpr instanceof BooleanLiteralExpression || baseExpr instanceof NumberLiteralExpression || baseExpr instanceof IntegerLiteralExpression) {
				$this$0$1 = $this._optimizer;
				message$0$1 = "[" + $this._identifier + "] " + "folding type cast: primitive literal as string";
				$this$0$1._log.push(message$0$1);
				replaceCb(new StringLiteralExpression(new Token$0(Util$encodeStringLiteral$S(Token$getValue_0$LToken$(baseExpr._token)), false)));
			}
		}
	} else {
		if (expr._type.equals$LType$(Type.numberType)) {
			if (baseExpr.getType$().equals$LType$(Type.numberType)) {
				$this$0$2 = $this._optimizer;
				message$0$2 = "[" + $this._identifier + "] " + "folding type cast: number as number";
				$this$0$2._log.push(message$0$2);
				replaceCb(baseExpr);
			} else {
				if (baseExpr instanceof StringLiteralExpression) {
					$this$0$3 = $this._optimizer;
					message$0$3 = "[" + $this._identifier + "] " + "folding type cast: string literal as number";
					$this$0$3._log.push(message$0$3);
					replaceCb(new NumberLiteralExpression(new Token$0(+Util$decodeStringLiteral$S(Token$getValue_0$LToken$(baseExpr._token)) + "", false)));
				} else {
					if (baseExpr instanceof IntegerLiteralExpression) {
						$this$0$4 = $this._optimizer;
						message$0$4 = "[" + $this._identifier + "] " + "folding type cast: int literal as number";
						$this$0$4._log.push(message$0$4);
						replaceCb(new NumberLiteralExpression(new Token$0(+Token$getValue_0$LToken$(baseExpr._token) + "", false)));
					}
				}
			}
		} else {
			if (expr._type.equals$LType$(Type.integerType)) {
				if (baseExpr.getType$().equals$LType$(Type.integerType)) {
					$this$0$5 = $this._optimizer;
					message$0$5 = "[" + $this._identifier + "] " + "folding type cast: int as int";
					$this$0$5._log.push(message$0$5);
					replaceCb(baseExpr);
				} else {
					if (baseExpr instanceof StringLiteralExpression) {
						$this$0$6 = $this._optimizer;
						message$0$6 = "[" + $this._identifier + "] " + "folding type cast: string literal as int";
						$this$0$6._log.push(message$0$6);
						replaceCb(new IntegerLiteralExpression(new Token$0((Util$decodeStringLiteral$S(Token$getValue_0$LToken$(baseExpr._token)) | 0) + "", false)));
					} else {
						if (baseExpr instanceof NumberLiteralExpression) {
							$this$0$7 = $this._optimizer;
							message$0$7 = "[" + $this._identifier + "] " + "folding type cast: number literal as int";
							$this$0$7._log.push(message$0$7);
							replaceCb(new IntegerLiteralExpression(new Token$0((Token$getValue_0$LToken$(baseExpr._token) | 0) + "", false)));
						}
					}
				}
			} else {
				if (expr._type.equals$LType$(Type.booleanType)) {
					if (baseExpr.getType$().equals$LType$(Type.booleanType)) {
						$this$0$8 = $this._optimizer;
						message$0$8 = "[" + $this._identifier + "] " + "folding type cast: boolean as boolean";
						$this$0$8._log.push(message$0$8);
						replaceCb(baseExpr);
					} else {
						if (baseExpr instanceof StringLiteralExpression) {
							$this$0$9 = $this._optimizer;
							message$0$9 = "[" + $this._identifier + "] " + "folding type cast: string literal as boolean";
							$this$0$9._log.push(message$0$9);
							replaceCb(new BooleanLiteralExpression(new Token$0(!! Util$decodeStringLiteral$S(Token$getValue_0$LToken$(baseExpr._token)) + "", false)));
						} else {
							if (baseExpr instanceof NumberLiteralExpression) {
								$this$0$10 = $this._optimizer;
								message$0$10 = "[" + $this._identifier + "] " + "folding type cast: number literal as boolean";
								$this$0$10._log.push(message$0$10);
								replaceCb(new BooleanLiteralExpression(new Token$0((+Token$getValue_0$LToken$(baseExpr._token) ? "true" : "false"), false)));
							} else {
								if (baseExpr instanceof IntegerLiteralExpression) {
									$this$0$11 = $this._optimizer;
									message$0$11 = "[" + $this._identifier + "] " + "folding type cast: integer literal as boolean";
									$this$0$11._log.push(message$0$11);
									replaceCb(new BooleanLiteralExpression(new Token$0((Token$getValue_0$LToken$(baseExpr._token) | 0 ? "true" : "false"), false)));
								}
							}
						}
					}
				}
			}
		}
	}
};

_FoldConstantCommand._foldAsExpression_0$L_FoldConstantCommand$LAsExpression$F$LExpression$V$ = _FoldConstantCommand$_foldAsExpression_0$L_FoldConstantCommand$LAsExpression$F$LExpression$V$;

function _DeadCodeEliminationOptimizeCommand() {
	this._identifier = "dce";
	this._optimizer = null;
	this._excludeNative = false;
};

$__jsx_extend([_DeadCodeEliminationOptimizeCommand], _FunctionOptimizeCommand);
_DeadCodeEliminationOptimizeCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	if (funcDef._statements == null) {
		return true;
	}
	while (_DeadCodeEliminationOptimizeCommand$_optimizeFunction_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$(this, funcDef) || _DeadCodeEliminationOptimizeCommand$_removeExpressionStatementsWithoutSideEffects_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$(this, funcDef)) {
	}
	return true;
};


function _DeadCodeEliminationOptimizeCommand$_removeExpressionStatementsWithoutSideEffects_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$($this, funcDef) {
	var shouldRetry;
	shouldRetry = false;
	(function onStatements(statements) {
		var i;
		for (i = 0; i < statements.length; ) {
			if (statements[i] instanceof ExpressionStatement && ! _Util$exprHasSideEffects$LExpression$(UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statements[i]))) {
				shouldRetry = true;
				statements.splice(i, 1);
			} else {
				statements[i++].handleStatements$F$ALStatement$B$(onStatements);
			}
		}
		return true;
	})(funcDef._statements);
	return shouldRetry;
};

_DeadCodeEliminationOptimizeCommand._removeExpressionStatementsWithoutSideEffects_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ = _DeadCodeEliminationOptimizeCommand$_removeExpressionStatementsWithoutSideEffects_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$;

function _DeadCodeEliminationOptimizeCommand$_optimizeFunction_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$($this, funcDef) {
	var shouldRetry;
	var locals;
	var localsUsed;
	var localIndex;
	shouldRetry = false;
	_Util$optimizeBasicBlock$LMemberFunctionDefinition$F$ALExpression$V$(funcDef, (function (exprs) {
		_DeadCodeEliminationOptimizeCommand$_eliminateDeadStoresToProperties_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs);
		_DeadCodeEliminationOptimizeCommand$_delayAssignmentsBetweenLocals_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs);
		_DeadCodeEliminationOptimizeCommand$_eliminateDeadStores_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs);
		_DeadCodeEliminationOptimizeCommand$_eliminateDeadConditions_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs);
	}));
	(function onStatements(statements) {
		var i;
		var statement;
		for (i = statements.length - 1; i >= 0; -- i) {
			statement = statements[i];
			if (statement instanceof ExpressionStatement) {
				if (! _Util$exprHasSideEffects$LExpression$(UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statement))) {
					statements.splice(i, 1);
				}
			}
			statement.handleStatements$F$ALStatement$B$(onStatements);
		}
		return true;
	})(funcDef._statements);
	locals = funcDef._locals;
	localsUsed = new Array(locals.length);
	Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
		var $this$0;
		var $this$1;
		if (statement instanceof FunctionStatement) {
			$this$1 = statement;
			$this$0 = $this$1._funcDef;
			Util$forEachStatement$F$LStatement$B$ALStatement$(onStatement, $this$0._statements);
		}
		Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function onExpr(expr) {
			var i;
			if (expr instanceof AssignmentExpression && BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr) instanceof LocalExpression && BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr).getType$().equals$LType$(BinaryExpression$getSecondExpr_0$LBinaryExpression$(expr).getType$())) {
				return onExpr(BinaryExpression$getSecondExpr_0$LBinaryExpression$(expr));
			} else {
				if (expr instanceof LocalExpression) {
					for (i = 0; i < locals.length; ++ i) {
						if (locals[i] == LocalExpression$getLocal_0$LLocalExpression$(expr)) {
							break;
						}
					}
					if (i !== locals.length) {
						localsUsed[i] = true;
					}
				} else {
					if (expr instanceof FunctionExpression) {
						MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
					}
				}
			}
			return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
		}));
		return statement.forEachStatement$F$LStatement$B$(onStatement);
	}), funcDef._statements);
	for (localIndex = localsUsed.length - 1; localIndex >= 0; -- localIndex) {
		if (localsUsed[localIndex]) {
			continue;
		}
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			var $this$0;
			var $this$1;
			if (statement instanceof FunctionStatement) {
				$this$1 = statement;
				$this$0 = $this$1._funcDef;
				Util$forEachStatement$F$LStatement$B$ALStatement$(onStatement, $this$0._statements);
			}
			statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
				var rhsExpr;
				if (expr instanceof AssignmentExpression && BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr) instanceof LocalExpression && LocalExpression$getLocal_0$LLocalExpression$(BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr)) == locals[localIndex]) {
					rhsExpr = BinaryExpression$getSecondExpr_0$LBinaryExpression$(expr);
					replaceCb(rhsExpr);
					shouldRetry = true;
					return onExpr(rhsExpr, null);
				} else {
					if (expr instanceof LocalExpression && LocalExpression$getLocal_0$LLocalExpression$(expr) == locals[localIndex]) {
						throw new Error("logic flaw, found a variable going to be removed being used");
					} else {
						if (expr instanceof FunctionExpression) {
							MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
						}
					}
				}
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			}));
			return statement.forEachStatement$F$LStatement$B$(onStatement);
		}), funcDef._statements);
		locals.splice(localIndex, 1);
	}
	return shouldRetry;
};

_DeadCodeEliminationOptimizeCommand._optimizeFunction_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ = _DeadCodeEliminationOptimizeCommand$_optimizeFunction_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$;

function _DeadCodeEliminationOptimizeCommand$_delayAssignmentsBetweenLocals_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs) {
	var localsUntouchable;
	var locals;
	var _onExpr;
	var onExpr;
	localsUntouchable = new TypedMap$LocalVariable$boolean$E();
	locals = new TypedMap$LocalVariable$Expression$E();
	_onExpr = (function (expr) {
		var local;
		var $this$0;
		var message$0;
		var $this$0$0;
		var message$0$0;
		var $this$1;
		var message$1;
		var $this$0$1;
		var message$0$1;
		if (expr instanceof AssignmentExpression && Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(expr)) !== "=" && BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr) instanceof LocalExpression) {
			$this$0 = BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr);
			local = $this$0._local;
			message$0 = "local variable " + Token$getValue_0$LToken$(local._name) + " cannot be rewritten (has fused op)";
			$this$0$0 = $this._optimizer;
			message$0$0 = "[" + $this._identifier + "] " + message$0;
			$this$0$0._log.push(message$0$0);
			TypedMap$LocalVariable$boolean$E$set_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$B(localsUntouchable, local, true);
		} else {
			if (expr instanceof IncrementExpression && UnaryExpression$getExpr_0$LUnaryExpression$(expr) instanceof LocalExpression) {
				$this$1 = UnaryExpression$getExpr_0$LUnaryExpression$(expr);
				local = $this$1._local;
				message$1 = "local variable " + Token$getValue_0$LToken$(local._name) + " cannot be rewritten (has increment)";
				$this$0$1 = $this._optimizer;
				message$0$1 = "[" + $this._identifier + "] " + message$1;
				$this$0$1._log.push(message$0$1);
				TypedMap$LocalVariable$boolean$E$set_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$B(localsUntouchable, local, true);
			}
		}
		return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, _onExpr);
	});
	Util$forEachExpression$F$LExpression$B$ALExpression$(_onExpr, exprs);
	onExpr = (function (expr, replaceCb) {
		var assignmentExpr;
		var lhsLocal;
		var rhsExpr;
		var rhsLocal;
		var cachedExpr;
		var callingFuncDef;
		var $this$0;
		var message$0;
		var $this$0$0;
		var message$0$0;
		var $this$1;
		var message$1;
		var $this$0$1;
		var message$0$1;
		var message$2;
		var $this$0$2;
		var message$0$2;
		var this$0;
		var _list$0;
		var _list$1;
		if (expr instanceof AssignmentExpression) {
			assignmentExpr = expr;
			if (assignmentExpr._expr1 instanceof LocalExpression) {
				onExpr(assignmentExpr._expr2, (function (expr) {
					BinaryExpression$setSecondExpr_0$LBinaryExpression$LExpression$(assignmentExpr, expr);
				}));
				if (! TypedMap$LocalVariable$boolean$E$get_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$(localsUntouchable, LocalExpression$getLocal_0$LLocalExpression$(assignmentExpr._expr1)) && assignmentExpr._expr1.getType$().equals$LType$(assignmentExpr._expr2.getType$())) {
					$this$0 = assignmentExpr._expr1;
					lhsLocal = $this$0._local;
					message$0 = "resetting cache for: " + Token$getValue_0$LToken$(lhsLocal._name);
					$this$0$0 = $this._optimizer;
					message$0$0 = "[" + $this._identifier + "] " + message$0;
					$this$0$0._log.push(message$0$0);
					TypedMap$LocalVariable$Expression$E$reversedForEach_0$LTypedMap$LocalVariable$Expression$E$F$LLocalVariable$LExpression$B$(locals, (function (local, expr) {
						if (local == lhsLocal) {
							_OptimizeCommand$log_0$L_OptimizeCommand$S($this, "  clearing itself");
							TypedMap$LocalVariable$Expression$E$delete_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$(locals, local);
						} else {
							if (expr instanceof LocalExpression && LocalExpression$getLocal_0$LLocalExpression$(expr) == lhsLocal) {
								_OptimizeCommand$log_0$L_OptimizeCommand$S($this, "  clearing " + Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(local)));
								TypedMap$LocalVariable$Expression$E$delete_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$(locals, local);
							}
						}
						return true;
					}));
					if (Token$getValue_0$LToken$(assignmentExpr._token) === "=") {
						rhsExpr = assignmentExpr._expr2;
						if (rhsExpr instanceof LocalExpression) {
							$this$1 = rhsExpr;
							rhsLocal = $this$1._local;
							if (lhsLocal != rhsLocal && ! TypedMap$LocalVariable$boolean$E$get_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$(localsUntouchable, rhsLocal)) {
								message$1 = "  set to: " + Token$getValue_0$LToken$(rhsLocal._name);
								$this$0$1 = $this._optimizer;
								message$0$1 = "[" + $this._identifier + "] " + message$1;
								$this$0$1._log.push(message$0$1);
								TypedMap$LocalVariable$Expression$E$set_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$LExpression$(locals, lhsLocal, rhsExpr);
							}
						} else {
							if (rhsExpr instanceof NullExpression || rhsExpr instanceof NumberLiteralExpression || rhsExpr instanceof IntegerLiteralExpression || rhsExpr instanceof StringLiteralExpression) {
								message$2 = "  set to: " + Token$getValue_0$LToken$(rhsExpr._token);
								$this$0$2 = $this._optimizer;
								message$0$2 = "[" + $this._identifier + "] " + message$2;
								$this$0$2._log.push(message$0$2);
								TypedMap$LocalVariable$Expression$E$set_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$LExpression$(locals, lhsLocal, rhsExpr);
							}
						}
					}
				}
				return true;
			}
		} else {
			if (expr instanceof LocalExpression) {
				cachedExpr = TypedMap$LocalVariable$Expression$E$get_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$(locals, LocalExpression$getLocal_0$LLocalExpression$(expr));
				if (cachedExpr) {
					replaceCb(cachedExpr.clone$());
					return true;
				}
			} else {
				if (expr instanceof CallExpression) {
					callingFuncDef = _DetermineCalleeCommand$getCallingFuncDef$LStashable$(expr);
					if (callingFuncDef != null && (callingFuncDef._flags & 2048) !== 0) {
					} else {
						expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
						if (funcDef._parent != null || funcDef._closures.length !== 0) {
							(_list$0 = locals._list).splice(0, _list$0.length);
						}
						return true;
					}
				} else {
					if (expr instanceof NewExpression) {
						this$0 = expr;
						! Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, this$0._args) ? false : true;
						(_list$1 = locals._list).splice(0, _list$1.length);
						return true;
					}
				}
			}
		}
		return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
	});
	Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, exprs);
};

_DeadCodeEliminationOptimizeCommand._delayAssignmentsBetweenLocals_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$ = _DeadCodeEliminationOptimizeCommand$_delayAssignmentsBetweenLocals_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$;

function _DeadCodeEliminationOptimizeCommand$_eliminateDeadStores_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs) {
	var lastAssignExpr;
	var onExpr;
	lastAssignExpr = [];
	onExpr = (function (expr, rewriteCb) {
		var assignExpr;
		var lhsLocal;
		var i;
		var callingFuncDef;
		var $this$0;
		var message$0;
		var $this$0$0;
		var message$0$0;
		var lastAssignExpr$len$0;
		if (expr instanceof AssignmentExpression) {
			assignExpr = expr;
			if (Token$getValue_0$LToken$(assignExpr._token) === "=" && assignExpr._expr1 instanceof LocalExpression) {
				onExpr(assignExpr._expr2, (function (assignExpr) {
					return (function (expr) {
						BinaryExpression$setSecondExpr_0$LBinaryExpression$LExpression$(assignExpr, expr);
					});
				})(assignExpr));
				$this$0 = assignExpr._expr1;
				lhsLocal = $this$0._local;
				for ((i = 0, lastAssignExpr$len$0 = lastAssignExpr.length); i < lastAssignExpr$len$0; ++ i) {
					if (lastAssignExpr[i].first == lhsLocal) {
						break;
					}
				}
				if (i !== lastAssignExpr.length) {
					message$0 = "eliminating dead store to: " + Token$getValue_0$LToken$(lhsLocal._name);
					$this$0$0 = $this._optimizer;
					message$0$0 = "[" + $this._identifier + "] " + message$0;
					$this$0$0._log.push(message$0$0);
					lastAssignExpr[i].third(BinaryExpression$getSecondExpr_0$LBinaryExpression$(lastAssignExpr[i].second));
				}
				lastAssignExpr[i] = ({first: lhsLocal, second: expr, third: rewriteCb});
				return true;
			}
		} else {
			if (expr instanceof LocalExpression) {
				for (i = 0; i < lastAssignExpr.length; ++ i) {
					if (lastAssignExpr[i].first == LocalExpression$getLocal_0$LLocalExpression$(expr)) {
						lastAssignExpr.splice(i, 1);
						break;
					}
				}
			} else {
				if (expr instanceof CallExpression) {
					onExpr(CallExpression$getExpr_0$LCallExpression$(expr), (function (callExpr) {
						return (function (expr) {
							CallExpression$setExpr_0$LCallExpression$LExpression$(callExpr, expr);
						});
					})(expr));
					Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, CallExpression$getArguments_0$LCallExpression$(expr));
					callingFuncDef = _DetermineCalleeCommand$getCallingFuncDef$LStashable$(expr);
					if (callingFuncDef != null && (callingFuncDef._flags & 2048) !== 0) {
					} else {
						lastAssignExpr.splice(0, lastAssignExpr.length);
					}
					return true;
				} else {
					if (expr instanceof NewExpression) {
						Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, NewExpression$getArguments_0$LNewExpression$(expr));
						lastAssignExpr.splice(0, lastAssignExpr.length);
						return true;
					} else {
						if (expr instanceof LogicalExpression || expr instanceof ConditionalExpression) {
							expr.forEachExpression$F$LExpression$F$LExpression$V$B$((function (expr, rewriteCb) {
								var result;
								result = onExpr(expr, rewriteCb);
								lastAssignExpr.splice(0, lastAssignExpr.length);
								return result;
							}));
							return true;
						}
					}
				}
			}
		}
		return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
	});
	Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, exprs);
};

_DeadCodeEliminationOptimizeCommand._eliminateDeadStores_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$ = _DeadCodeEliminationOptimizeCommand$_eliminateDeadStores_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$;

function _DeadCodeEliminationOptimizeCommand$_eliminateDeadStoresToProperties_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs) {
	var isFirstLevelPropertyAccess;
	var baseExprsAreEqual;
	var lastAssignExpr;
	var onExpr;
	function isFirstLevelPropertyAccess(expr) {
		var baseExpr;
		var $this$0;
		if (! (expr instanceof PropertyExpression)) {
			return false;
		}
		$this$0 = expr;
		baseExpr = $this$0._expr;
		return (baseExpr instanceof LocalExpression || baseExpr instanceof ThisExpression || baseExpr.isClassSpecifier$() ? true : false);
	}
	function baseExprsAreEqual(x, y) {
		if (x instanceof LocalExpression && y instanceof LocalExpression) {
			return LocalExpression$getLocal_0$LLocalExpression$(x) == LocalExpression$getLocal_0$LLocalExpression$(y);
		} else {
			if (x instanceof ThisExpression && y instanceof ThisExpression) {
				return true;
			} else {
				if (x.isClassSpecifier$() && y.isClassSpecifier$()) {
					return x.getType$().equals$LType$(y.getType$());
				}
			}
		}
		return false;
	}
	lastAssignExpr = {};
	onExpr = (function (expr, rewriteCb) {
		var assignmentExpr;
		var firstExpr;
		var propertyName;
		var k;
		var baseExpr;
		var $this$0;
		var $this$1;
		var $this$2;
		var $this$3;
		var $this$4;
		if (expr instanceof AssignmentExpression) {
			assignmentExpr = expr;
			firstExpr = assignmentExpr._expr1;
			if (Token$getValue_0$LToken$(expr._token) === "=" && isFirstLevelPropertyAccess(firstExpr) && ! _Util$classIsNative$LClassDefinition$(UnaryExpression$getExpr_0$LUnaryExpression$(firstExpr).getType$().getClassDef$())) {
				$this$3 = firstExpr;
				$this$0 = $this$3._identifierToken;
				propertyName = $this$0._value;
				onExpr(assignmentExpr._expr2, null);
				if (lastAssignExpr[propertyName] && lastAssignExpr[propertyName].second != null && baseExprsAreEqual(UnaryExpression$getExpr_0$LUnaryExpression$(firstExpr), UnaryExpression$getExpr_0$LUnaryExpression$(BinaryExpression$getFirstExpr_0$LBinaryExpression$(lastAssignExpr[propertyName].first)))) {
					lastAssignExpr[propertyName].second(BinaryExpression$getSecondExpr_0$LBinaryExpression$(lastAssignExpr[propertyName].first));
				}
				lastAssignExpr[propertyName] = ({first: assignmentExpr, second: rewriteCb});
				return true;
			} else {
				if (assignmentExpr._expr1 instanceof LocalExpression) {
					onExpr(assignmentExpr._expr2, null);
					for (k in lastAssignExpr) {
						$this$1 = BinaryExpression$getFirstExpr_0$LBinaryExpression$(lastAssignExpr[k].first);
						baseExpr = $this$1._expr;
						if (baseExpr instanceof LocalExpression && LocalExpression$getLocal_0$LLocalExpression$(baseExpr) == LocalExpression$getLocal_0$LLocalExpression$(BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr))) {
							delete lastAssignExpr[k];
						}
					}
					return true;
				}
			}
		} else {
			if (isFirstLevelPropertyAccess(expr)) {
				$this$4 = expr;
				$this$2 = $this$4._identifierToken;
				propertyName = $this$2._value;
				delete lastAssignExpr[propertyName];
			} else {
				if (expr instanceof CallExpression) {
					onExpr(CallExpression$getExpr_0$LCallExpression$(expr), null);
					Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, CallExpression$getArguments_0$LCallExpression$(expr));
					lastAssignExpr = {};
					return true;
				} else {
					if (expr instanceof NewExpression) {
						Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, NewExpression$getArguments_0$LNewExpression$(expr));
						lastAssignExpr = {};
						return true;
					}
				}
			}
		}
		return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
	});
	Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, exprs);
};

_DeadCodeEliminationOptimizeCommand._eliminateDeadStoresToProperties_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$ = _DeadCodeEliminationOptimizeCommand$_eliminateDeadStoresToProperties_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$;

function _DeadCodeEliminationOptimizeCommand$_eliminateDeadConditions_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs) {
	var spliceStatements;
	function spliceStatements(dest, index, src) {
		var i;
		dest.splice(index, 1);
		for (i = 0; i < src.length; ++ i) {
			dest.splice(index + i, 0, src[i]);
		}
	}
	(function onStatements(statements) {
		var i;
		var statement;
		var ifStatement;
		var cond;
		for (i = statements.length - 1; i >= 0; -- i) {
			statement = statements[i];
			if (statement instanceof IfStatement) {
				ifStatement = statement;
				cond = _Util$conditionIsConstant$LExpression$(ifStatement._expr);
				if (cond == null) {
				} else {
					if (cond == false && ifStatement._onFalseStatements.length === 0) {
						statements.splice(i, 1);
					} else {
						if (cond == false) {
							spliceStatements(statements, i, ifStatement._onFalseStatements);
						} else {
							if (cond == true) {
								spliceStatements(statements, i, ifStatement._onTrueStatements);
							}
						}
					}
				}
			}
			statement.handleStatements$F$ALStatement$B$(onStatements);
		}
		return true;
	})(funcDef._statements);
};

_DeadCodeEliminationOptimizeCommand._eliminateDeadConditions_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$ = _DeadCodeEliminationOptimizeCommand$_eliminateDeadConditions_0$L_DeadCodeEliminationOptimizeCommand$LMemberFunctionDefinition$ALExpression$;

function _InlineOptimizeCommand() {
	this._identifier = "inline";
	this._optimizer = null;
	this._excludeNative = false;
};

$__jsx_extend([_InlineOptimizeCommand], _FunctionOptimizeCommand);
_InlineOptimizeCommand.prototype._createStash$ = function () {
	return new _InlineOptimizeCommand$CStash();
};


_InlineOptimizeCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	var stash;
	var message$0;
	var $this$0$0;
	var message$0$0;
	var message$1;
	var $this$0$1;
	var message$0$1;
	stash = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$(this, funcDef);
	if (stash.isOptimized) {
		return true;
	}
	stash.isOptimized = true;
	if (funcDef._statements == null) {
		return true;
	}
	message$0 = "* starting optimization of " + funcDef.getNotation$();
	$this$0$0 = this._optimizer;
	message$0$0 = "[" + this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	while (true) {
		while (true) {
			if (! _InlineOptimizeCommand$_handleStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$(this, funcDef, funcDef._statements)) {
				break;
			}
			_OptimizeCommand$setupCommand_0$L_OptimizeCommand$L_OptimizeCommand$(this, new _DetermineCalleeCommand()).optimizeFunction$LMemberFunctionDefinition$(funcDef);
		}
		if (! _OptimizeCommand$setupCommand_0$L_OptimizeCommand$L_OptimizeCommand$(this, new _ReturnIfOptimizeCommand()).optimizeFunction$LMemberFunctionDefinition$(funcDef)) {
			break;
		}
	}
	message$1 = "* finished optimization of " + funcDef.getNotation$();
	$this$0$1 = this._optimizer;
	message$0$1 = "[" + this._identifier + "] " + message$1;
	$this$0$1._log.push(message$0$1);
	return true;
};


function _InlineOptimizeCommand$_handleStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$($this, funcDef, statements) {
	var altered;
	var i;
	var left;
	altered = false;
	for (i = 0; i < statements.length; ++ i) {
		left = statements.length - i;
		if (_InlineOptimizeCommand$_handleStatement_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$N($this, funcDef, statements, i)) {
			altered = true;
		}
		i = statements.length - left;
	}
	return altered;
};

_InlineOptimizeCommand._handleStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$ = _InlineOptimizeCommand$_handleStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$;

function _InlineOptimizeCommand$_handleStatement_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$N($this, funcDef, statements, stmtIndex) {
	var altered;
	var statement;
	var callingFuncDef;
	altered = false;
	statement = statements[stmtIndex];
	statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
		var args;
		var callingFuncDef;
		var stmt;
		var clonedExpr;
		var message$0;
		var $this$0$0;
		var message$0$0;
		var $this$0;
		var $this$1;
		expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
		if (expr instanceof CallExpression) {
			args = _InlineOptimizeCommand$_getArgsAndThisIfCallExprIsInlineable_0$L_InlineOptimizeCommand$LCallExpression$B($this, expr, true);
			if (args != null) {
				callingFuncDef = _DetermineCalleeCommand$getCallingFuncDef$LStashable$(expr);
				message$0 = "expanding " + callingFuncDef.getNotation$() + " as expression";
				$this$0$0 = $this._optimizer;
				message$0$0 = "[" + $this._identifier + "] " + message$0;
				$this$0$0._log.push(message$0$0);
				stmt = callingFuncDef._statements[0];
				if (stmt instanceof ExpressionStatement) {
					$this$0 = stmt;
					expr = $this$0._expr;
				} else {
					if (stmt instanceof ReturnStatement) {
						$this$1 = stmt;
						expr = $this$1._expr;
					} else {
						throw new Error('logic flaw');
					}
				}
				clonedExpr = expr.clone$();
				_InlineOptimizeCommand$_rewriteExpression_0$L_InlineOptimizeCommand$LExpression$F$LExpression$V$ALExpression$LMemberFunctionDefinition$($this, clonedExpr, (function (expr) {
					clonedExpr = expr;
				}), args, callingFuncDef);
				replaceCb(clonedExpr);
			}
		}
		return true;
	}));
	if (statement instanceof ConstructorInvocationStatement) {
		callingFuncDef = _DetermineCalleeCommand$getCallingFuncDef$LStashable$(statement);
		$this.optimizeFunction$LMemberFunctionDefinition$(callingFuncDef);
		if (_InlineOptimizeCommand$_functionIsInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$($this, callingFuncDef) && _InlineOptimizeCommand$_argsAreInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALExpression$B($this, callingFuncDef, ConstructorInvocationStatement$getArguments_0$LConstructorInvocationStatement$(statement), false)) {
			statements.splice(stmtIndex, 1);
			_InlineOptimizeCommand$_expandCallingFunction_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$($this, funcDef, statements, stmtIndex, callingFuncDef, ConstructorInvocationStatement$getArguments_0$LConstructorInvocationStatement$(statement).concat([ new ThisExpression(null, funcDef._classDef) ]));
		}
	} else {
		if (statement instanceof ExpressionStatement) {
			if (_InlineOptimizeCommand$_expandStatementExpression_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$F$NV$($this, funcDef, statements, stmtIndex, UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statement), (function (stmtIndex) {
				statements.splice(stmtIndex, 1);
			}))) {
				altered = true;
			}
		} else {
			if (statement instanceof ReturnStatement) {
				if (_InlineOptimizeCommand$_expandStatementExpression_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$F$NV$($this, funcDef, statements, stmtIndex, ReturnStatement$getExpr_0$LReturnStatement$(statement), (function (stmtIndex) {
					statements.splice(stmtIndex, 1);
					statements[stmtIndex - 1] = new ReturnStatement(statement.getToken$(), statements[stmtIndex - 1] instanceof ReturnStatement ? ReturnStatement$getExpr_0$LReturnStatement$(statements[stmtIndex - 1]) : UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statements[stmtIndex - 1]));
				}))) {
					altered = true;
				}
			} else {
				if (statement instanceof IfStatement) {
					if (_InlineOptimizeCommand$_expandStatementExpression_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$F$NV$($this, funcDef, statements, stmtIndex, IfStatement$getExpr_0$LIfStatement$(statement), (function (stmtIndex) {
						var $this$0;
						var expr$0;
						$this$0 = statement;
						expr$0 = (statements[stmtIndex - 1] instanceof ReturnStatement ? ReturnStatement$getExpr_0$LReturnStatement$(statements[stmtIndex - 1]) : UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statements[stmtIndex - 1]));
						$this$0._expr = expr$0;
						statements.splice(stmtIndex - 1, 1);
					}))) {
						altered = true;
					}
					if (_InlineOptimizeCommand$_handleSubStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$LStatement$($this, funcDef, statement)) {
						altered = true;
					}
				} else {
					if (_InlineOptimizeCommand$_handleSubStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$LStatement$($this, funcDef, statement)) {
						altered = true;
					}
				}
			}
		}
	}
	return altered;
};

_InlineOptimizeCommand._handleStatement_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$N = _InlineOptimizeCommand$_handleStatement_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$N;

function _InlineOptimizeCommand$_handleSubStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$LStatement$($this, funcDef, statement) {
	return _Util$handleSubStatements$F$ALStatement$B$LStatement$((function (statements) {
		return _InlineOptimizeCommand$_handleStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$($this, funcDef, statements);
	}), statement);
};

_InlineOptimizeCommand._handleSubStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$LStatement$ = _InlineOptimizeCommand$_handleSubStatements_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$LStatement$;

function _InlineOptimizeCommand$_expandStatementExpression_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$F$NV$($this, funcDef, statements, stmtIndex, expr, cb) {
	var args;
	var stmt;
	var rhsExpr;
	var lastExpr;
	var $this$0;
	var $this$1;
	if (expr instanceof CallExpression) {
		args = _InlineOptimizeCommand$_getArgsAndThisIfCallExprIsInlineable_0$L_InlineOptimizeCommand$LCallExpression$B($this, expr, false);
		if (args != null) {
			stmtIndex = _InlineOptimizeCommand$_expandCallingFunction_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$($this, funcDef, statements, stmtIndex, _DetermineCalleeCommand$getCallingFuncDef$LStashable$(expr), args);
			cb(stmtIndex);
			return true;
		}
	} else {
		if (expr instanceof AssignmentExpression && _InlineOptimizeCommand$_lhsHasNoSideEffects_0$L_InlineOptimizeCommand$LExpression$($this, BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr)) && BinaryExpression$getSecondExpr_0$LBinaryExpression$(expr) instanceof CallExpression) {
			args = _InlineOptimizeCommand$_getArgsAndThisIfCallExprIsInlineable_0$L_InlineOptimizeCommand$LCallExpression$B($this, BinaryExpression$getSecondExpr_0$LBinaryExpression$(expr), false);
			if (args != null) {
				stmtIndex = _InlineOptimizeCommand$_expandCallingFunction_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$($this, funcDef, statements, stmtIndex, _DetermineCalleeCommand$getCallingFuncDef$LStashable$(BinaryExpression$getSecondExpr_0$LBinaryExpression$(expr)), args);
				stmt = statements[stmtIndex - 1];
				if (stmt instanceof ReturnStatement) {
					$this$0 = stmt;
					rhsExpr = $this$0._expr;
				} else {
					if (stmt instanceof ExpressionStatement) {
						$this$1 = stmt;
						rhsExpr = $this$1._expr;
					} else {
						return false;
					}
				}
				lastExpr = new AssignmentExpression(expr._token, BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr), rhsExpr);
				statements[stmtIndex - 1] = new ExpressionStatement(lastExpr);
				cb(stmtIndex);
				return true;
			}
		}
	}
	return false;
};

_InlineOptimizeCommand._expandStatementExpression_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$F$NV$ = _InlineOptimizeCommand$_expandStatementExpression_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$F$NV$;

function _InlineOptimizeCommand$_lhsHasNoSideEffects_0$L_InlineOptimizeCommand$LExpression$($this, lhsExpr) {
	var holderExpr;
	var arrayExpr;
	var $this$0;
	var _expr2$0;
	if (lhsExpr instanceof LocalExpression) {
		return true;
	}
	if (lhsExpr instanceof PropertyExpression) {
		$this$0 = lhsExpr;
		holderExpr = $this$0._expr;
		if (holderExpr instanceof ThisExpression) {
			return true;
		}
		if (holderExpr instanceof LocalExpression || holderExpr.isClassSpecifier$()) {
			return true;
		}
	} else {
		if (lhsExpr instanceof ArrayExpression) {
			arrayExpr = lhsExpr;
			if (arrayExpr._expr1 instanceof LocalExpression && ((_expr2$0 = arrayExpr._expr2) instanceof NumberLiteralExpression || _expr2$0 instanceof StringLiteralExpression || _expr2$0 instanceof LocalExpression)) {
				return true;
			}
		}
	}
	return false;
};

_InlineOptimizeCommand._lhsHasNoSideEffects_0$L_InlineOptimizeCommand$LExpression$ = _InlineOptimizeCommand$_lhsHasNoSideEffects_0$L_InlineOptimizeCommand$LExpression$;

function _InlineOptimizeCommand$_getArgsAndThisIfCallExprIsInlineable_0$L_InlineOptimizeCommand$LCallExpression$B($this, callExpr, asExpression) {
	var callingFuncDef;
	var receiverExpr;
	var calleeExpr;
	var modifiesArgs;
	var argsAndThis;
	var $this$0;
	callingFuncDef = _DetermineCalleeCommand$getCallingFuncDef$LStashable$(callExpr);
	if (callingFuncDef == null) {
		return null;
	}
	$this.optimizeFunction$LMemberFunctionDefinition$(callingFuncDef);
	receiverExpr = null;
	if ((callingFuncDef._flags & 8) === 0) {
		calleeExpr = callExpr._expr;
		if (! (calleeExpr instanceof PropertyExpression)) {
			throw new Error("unexpected type of expression");
		}
		$this$0 = calleeExpr;
		receiverExpr = $this$0._expr;
		if (asExpression) {
			if (! (receiverExpr instanceof LocalExpression || receiverExpr instanceof ThisExpression)) {
				return null;
			}
		}
	}
	if (! _InlineOptimizeCommand$_functionIsInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$($this, callingFuncDef)) {
		return null;
	}
	if (asExpression) {
		if (callingFuncDef._statements.length !== 1) {
			return null;
		}
		if (callingFuncDef._locals.length !== 0) {
			return null;
		}
		modifiesArgs = ! Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			var onExpr;
			onExpr = (function onExpr(expr) {
				if (expr instanceof AssignmentExpression && BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr) instanceof LocalExpression) {
					return false;
				}
				return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
			});
			return Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, onExpr);
		}), callingFuncDef._statements);
		if (modifiesArgs) {
			return null;
		}
	}
	if (! _InlineOptimizeCommand$_argsAreInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALExpression$B($this, callingFuncDef, callExpr._args, asExpression)) {
		return null;
	}
	argsAndThis = callExpr._args.concat([]);
	if (_InlineOptimizeCommand$_functionHasThis_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$($this, callingFuncDef)) {
		if (receiverExpr != null) {
			argsAndThis.push(receiverExpr);
		} else {
			argsAndThis.push(new ThisExpression(null, callingFuncDef._classDef));
		}
	} else {
		argsAndThis.push(null);
	}
	return argsAndThis;
};

_InlineOptimizeCommand._getArgsAndThisIfCallExprIsInlineable_0$L_InlineOptimizeCommand$LCallExpression$B = _InlineOptimizeCommand$_getArgsAndThisIfCallExprIsInlineable_0$L_InlineOptimizeCommand$LCallExpression$B;

function _InlineOptimizeCommand$_argsAreInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALExpression$B($this, callingFuncDef, actualArgs, asExpression) {
	var formalArgsTypes;
	var i;
	var actualArgs$len$0;
	formalArgsTypes = MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(callingFuncDef);
	if (actualArgs.length !== formalArgsTypes.length) {
		throw new Error("number of arguments mismatch");
	}
	for ((i = 0, actualArgs$len$0 = actualArgs.length); i < actualArgs$len$0; ++ i) {
		if (asExpression && ! (actualArgs[i] instanceof LeafExpression)) {
			return false;
		}
		if (! _InlineOptimizeCommand$_argIsInlineable_0$L_InlineOptimizeCommand$LType$LType$($this, actualArgs[i].getType$(), formalArgsTypes[i])) {
			return false;
		}
	}
	return true;
};

_InlineOptimizeCommand._argsAreInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALExpression$B = _InlineOptimizeCommand$_argsAreInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALExpression$B;

function _InlineOptimizeCommand$_argIsInlineable_0$L_InlineOptimizeCommand$LType$LType$($this, actualType, formalType) {
	var $this$0;
	$this$0 = $this._optimizer;
	if ($this$0._enableRunTimeTypeCheck) {
		if (actualType instanceof NullableType && ! (formalType instanceof NullableType)) {
			return false;
		}
	}
	actualType = (actualType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(actualType) : actualType);
	formalType = (formalType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(formalType) : formalType);
	return (actualType instanceof ObjectType && formalType instanceof ObjectType ? actualType.isConvertibleTo$LType$(formalType) : actualType.equals$LType$(formalType));
};

_InlineOptimizeCommand._argIsInlineable_0$L_InlineOptimizeCommand$LType$LType$ = _InlineOptimizeCommand$_argIsInlineable_0$L_InlineOptimizeCommand$LType$LType$;

function _InlineOptimizeCommand$_isWorthInline_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$($this, funcDef) {
	var n;
	if (funcDef._nameToken == null) {
		return true;
	}
	n = 0;
	Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
		var cont;
		cont = Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function onExpr(expr) {
			if (++ n >= _InlineOptimizeCommand.INLINE_THRESHOLD) {
				return false;
			}
			return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
		}));
		return (! cont ? false : statement.forEachStatement$F$LStatement$B$(onStatement));
	}), funcDef._statements);
	return n < 30;
};

_InlineOptimizeCommand._isWorthInline_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ = _InlineOptimizeCommand$_isWorthInline_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$;

function _InlineOptimizeCommand$_functionIsInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$($this, funcDef) {
	var stash;
	var message$0;
	var $this$0$0;
	var message$0$0;
	stash = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, funcDef);
	if (stash.isInlineable == null) {
		stash.isInlineable = (function () {
			var statements;
			var requestsInline;
			statements = funcDef._statements;
			if (statements == null) {
				return false;
			}
			requestsInline = (funcDef._flags & 1024) !== 0;
			if (requestsInline) {
			} else {
				if (! _InlineOptimizeCommand$_isWorthInline_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$($this, funcDef)) {
					return false;
				}
			}
			return Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
				if (statement instanceof ExpressionStatement) {
				} else {
					if (requestsInline && (statement instanceof ForStatement || statement instanceof ForInStatement || statement instanceof DoWhileStatement || statement instanceof WhileStatement || statement instanceof IfStatement || statement instanceof SwitchStatement)) {
					} else {
						if (statement instanceof ReturnStatement && statement == MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$(funcDef)[MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$(funcDef).length - 1]) {
						} else {
							return false;
						}
					}
				}
				if (! Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function onExpr(expr) {
					if (expr instanceof FunctionExpression) {
						return false;
					}
					if (expr instanceof SuperExpression) {
						return false;
					}
					if (expr instanceof LocalExpression) {
						if (MemberFunctionDefinition$getFuncLocal_0$LMemberFunctionDefinition$(funcDef) != null && MemberFunctionDefinition$getFuncLocal_0$LMemberFunctionDefinition$(funcDef) == LocalExpression$getLocal_0$LLocalExpression$(expr)) {
							return false;
						}
					}
					return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
				}))) {
					return false;
				}
				return statement.forEachStatement$F$LStatement$B$(onStatement);
			}), funcDef._statements);
		})();
		message$0 = funcDef.getNotation$() + (stash.isInlineable ? " is" : " is not") + " inlineable";
		$this$0$0 = $this._optimizer;
		message$0$0 = "[" + $this._identifier + "] " + message$0;
		$this$0$0._log.push(message$0$0);
	}
	return stash.isInlineable;
};

_InlineOptimizeCommand._functionIsInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ = _InlineOptimizeCommand$_functionIsInlineable_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$;

function _InlineOptimizeCommand$_expandCallingFunction_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$($this, callerFuncDef, statements, stmtIndex, calleeFuncDef, argsAndThis) {
	var argsAndThisAndLocals;
	var calleeStatements;
	var i;
	var statement;
	var onExpr;
	var message$0;
	var $this$0$0;
	var message$0$0;
	message$0 = "expanding " + calleeFuncDef.getNotation$();
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	argsAndThisAndLocals = argsAndThis.concat([]);
	stmtIndex = _InlineOptimizeCommand$_createVars_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$($this, callerFuncDef, statements, stmtIndex, calleeFuncDef, argsAndThisAndLocals);
	calleeStatements = calleeFuncDef._statements;
	for (i = 0; i < calleeStatements.length; ++ i) {
		statement = (calleeStatements[i] instanceof ReturnStatement ? new ExpressionStatement(ReturnStatement$getExpr_0$LReturnStatement$(calleeStatements[i]).clone$()) : calleeStatements[i].clone$());
		onExpr = (function onExpr(expr, replaceCb) {
			return _InlineOptimizeCommand$_rewriteExpression_0$L_InlineOptimizeCommand$LExpression$F$LExpression$V$ALExpression$LMemberFunctionDefinition$($this, expr, replaceCb, argsAndThisAndLocals, calleeFuncDef);
		});
		statement.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
		statement.forEachStatement$F$LStatement$B$((function onStatement(statement) {
			statement.forEachStatement$F$LStatement$B$(onStatement);
			return statement.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
		}));
		statements.splice(stmtIndex++, 0, statement);
	}
	return stmtIndex;
};

_InlineOptimizeCommand._expandCallingFunction_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$ = _InlineOptimizeCommand$_expandCallingFunction_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$;

function _InlineOptimizeCommand$_createVars_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$($this, callerFuncDef, statements, stmtIndex, calleeFuncDef, argsAndThisAndLocals) {
	var tempExpr;
	var formalArgs;
	var i;
	var locals;
	var tempVar;
	if ((calleeFuncDef._flags & 8) === 0) {
		tempExpr = _InlineOptimizeCommand$_createVarForArgOrThis_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$LType$S($this, callerFuncDef, statements, stmtIndex, argsAndThisAndLocals[argsAndThisAndLocals.length - 1], new ObjectType(calleeFuncDef._classDef), "this");
		if (tempExpr != null) {
			argsAndThisAndLocals[argsAndThisAndLocals.length - 1] = tempExpr;
			++ stmtIndex;
		}
	}
	formalArgs = calleeFuncDef._args;
	for (i = 0; i < formalArgs.length; ++ i) {
		if (argsAndThisAndLocals[i] instanceof FunctionExpression && _InlineOptimizeCommand$_getNumberOfTimesArgIsUsed_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$LArgumentDeclaration$($this, calleeFuncDef, formalArgs[i]) <= 1) {
		} else {
			tempExpr = _InlineOptimizeCommand$_createVarForArgOrThis_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$LType$S($this, callerFuncDef, statements, stmtIndex, argsAndThisAndLocals[i], LocalVariable$getType_0$LLocalVariable$(formalArgs[i]), Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(formalArgs[i])));
			if (tempExpr != null) {
				argsAndThisAndLocals[i] = tempExpr;
				++ stmtIndex;
			}
		}
	}
	locals = calleeFuncDef._locals;
	for (i = 0; i < locals.length; ++ i) {
		tempVar = _OptimizeCommand$createVar_0$L_OptimizeCommand$LMemberFunctionDefinition$LType$S($this, callerFuncDef, LocalVariable$getType_0$LLocalVariable$(locals[i]), Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(locals[i])));
		argsAndThisAndLocals.push(new LocalExpression(tempVar._name, tempVar));
	}
	return stmtIndex;
};

_InlineOptimizeCommand._createVars_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$ = _InlineOptimizeCommand$_createVars_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLMemberFunctionDefinition$ALExpression$;

function _InlineOptimizeCommand$_getNumberOfTimesArgIsUsed_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$LArgumentDeclaration$($this, funcDef, local) {
	var count;
	count = 0;
	Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
		statement.forEachStatement$F$LStatement$B$(onStatement);
		Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function onExpr(expr) {
			Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
			if (expr instanceof LocalExpression && LocalExpression$getLocal_0$LLocalExpression$(expr) == local) {
				++ count;
			}
			return true;
		}));
		return true;
	}), funcDef._statements);
	return count;
};

_InlineOptimizeCommand._getNumberOfTimesArgIsUsed_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$LArgumentDeclaration$ = _InlineOptimizeCommand$_getNumberOfTimesArgIsUsed_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$LArgumentDeclaration$;

function _InlineOptimizeCommand$_createVarForArgOrThis_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$LType$S($this, callerFuncDef, statements, stmtIndex, expr, type, baseName) {
	var newLocal;
	if (expr instanceof ThisExpression || expr instanceof LeafExpression) {
		return null;
	}
	newLocal = _OptimizeCommand$createVar_0$L_OptimizeCommand$LMemberFunctionDefinition$LType$S($this, callerFuncDef, type, baseName);
	statements.splice(stmtIndex, 0, new ExpressionStatement(new AssignmentExpression(new Token$0("=", false), new LocalExpression(newLocal._name, newLocal), expr)));
	return new LocalExpression(newLocal._name, newLocal);
};

_InlineOptimizeCommand._createVarForArgOrThis_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$LType$S = _InlineOptimizeCommand$_createVarForArgOrThis_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ALStatement$NLExpression$LType$S;

function _InlineOptimizeCommand$_rewriteExpression_0$L_InlineOptimizeCommand$LExpression$F$LExpression$V$ALExpression$LMemberFunctionDefinition$($this, expr, replaceCb, argsAndThisAndLocals, calleeFuncDef) {
	var formalArgs;
	var j;
	var locals;
	var k;
	var formalArgs$len$0;
	var locals$len$0;
	formalArgs = calleeFuncDef._args;
	if (expr instanceof LocalExpression) {
		for ((j = 0, formalArgs$len$0 = formalArgs.length); j < formalArgs$len$0; ++ j) {
			if (Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(formalArgs[j])) === Token$getValue_0$LToken$(expr._token)) {
				break;
			}
		}
		if (j === formalArgs.length) {
			++ j;
			locals = calleeFuncDef._locals;
			if (locals.length !== argsAndThisAndLocals.length - j) {
				throw new Error("logic flaw");
			}
			for ((k = 0, locals$len$0 = locals.length); k < locals$len$0; (++ k, ++ j)) {
				if (Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(locals[k])) === Token$getValue_0$LToken$(expr._token)) {
					break;
				}
			}
		}
		if (j !== argsAndThisAndLocals.length) {
			if (argsAndThisAndLocals[j] instanceof FunctionExpression) {
				replaceCb(argsAndThisAndLocals[j]);
				argsAndThisAndLocals[j] = null;
			} else {
				replaceCb(argsAndThisAndLocals[j].clone$());
			}
		}
	} else {
		if (expr instanceof ThisExpression) {
			replaceCb(argsAndThisAndLocals[formalArgs.length].clone$());
		}
	}
	expr.forEachExpression$F$LExpression$F$LExpression$V$B$((function (expr, replaceCb) {
		return _InlineOptimizeCommand$_rewriteExpression_0$L_InlineOptimizeCommand$LExpression$F$LExpression$V$ALExpression$LMemberFunctionDefinition$($this, expr, replaceCb, argsAndThisAndLocals, calleeFuncDef);
	}));
	return true;
};

_InlineOptimizeCommand._rewriteExpression_0$L_InlineOptimizeCommand$LExpression$F$LExpression$V$ALExpression$LMemberFunctionDefinition$ = _InlineOptimizeCommand$_rewriteExpression_0$L_InlineOptimizeCommand$LExpression$F$LExpression$V$ALExpression$LMemberFunctionDefinition$;

function _InlineOptimizeCommand$_functionHasThis_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$($this, funcDef) {
	do {
		if ((funcDef._flags & 8) === 0) {
			return true;
		}
	} while ((funcDef = funcDef._parent) != null);
	return false;
};

_InlineOptimizeCommand._functionHasThis_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$ = _InlineOptimizeCommand$_functionHasThis_0$L_InlineOptimizeCommand$LMemberFunctionDefinition$;

function _ReturnIfOptimizeCommand() {
	this._identifier = "return-if";
	this._optimizer = null;
	this._excludeNative = false;
	this._altered = false;
};

$__jsx_extend([_ReturnIfOptimizeCommand], _FunctionOptimizeCommand);
_ReturnIfOptimizeCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	var message$0;
	var $this$0$0;
	var message$0$0;
	if (funcDef._returnType.equals$LType$(Type.voidType)) {
		return false;
	}
	this._altered = false;
	_ReturnIfOptimizeCommand$_optimizeStatements_0$L_ReturnIfOptimizeCommand$ALStatement$(this, funcDef._statements);
	message$0 = funcDef.getNotation$() + " " + (this._altered ? "Y" : "N");
	$this$0$0 = this._optimizer;
	message$0$0 = "[" + this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	return this._altered;
};


function _ReturnIfOptimizeCommand$_statementsCanBeReturnExpr_0$L_ReturnIfOptimizeCommand$ALStatement$($this, statements) {
	if (statements.length === 1 && statements[0] instanceof ReturnStatement) {
		return true;
	}
	_ReturnIfOptimizeCommand$_optimizeStatements_0$L_ReturnIfOptimizeCommand$ALStatement$($this, statements);
	return (statements.length === 1 && statements[0] instanceof ReturnStatement ? true : false);
};

_ReturnIfOptimizeCommand._statementsCanBeReturnExpr_0$L_ReturnIfOptimizeCommand$ALStatement$ = _ReturnIfOptimizeCommand$_statementsCanBeReturnExpr_0$L_ReturnIfOptimizeCommand$ALStatement$;

function _ReturnIfOptimizeCommand$_optimizeStatements_0$L_ReturnIfOptimizeCommand$ALStatement$($this, statements) {
	var ifStatement;
	var onFalseStatements;
	if (statements.length >= 1 && statements[statements.length - 1] instanceof IfStatement) {
		ifStatement = statements[statements.length - 1];
		if (_ReturnIfOptimizeCommand$_statementsCanBeReturnExpr_0$L_ReturnIfOptimizeCommand$ALStatement$($this, ifStatement._onTrueStatements) && _ReturnIfOptimizeCommand$_statementsCanBeReturnExpr_0$L_ReturnIfOptimizeCommand$ALStatement$($this, ifStatement._onFalseStatements)) {
			statements[statements.length - 1] = _ReturnIfOptimizeCommand$_createReturnStatement_0$L_ReturnIfOptimizeCommand$LToken$LExpression$LExpression$LExpression$($this, ifStatement._token, ifStatement._expr, ReturnStatement$getExpr_0$LReturnStatement$(ifStatement._onTrueStatements[0]), ReturnStatement$getExpr_0$LReturnStatement$(ifStatement._onFalseStatements[0]));
			$this._altered = true;
			_ReturnIfOptimizeCommand$_optimizeStatements_0$L_ReturnIfOptimizeCommand$ALStatement$($this, statements);
		}
	} else {
		if (statements.length >= 2 && statements[statements.length - 1] instanceof ReturnStatement && statements[statements.length - 2] instanceof IfStatement) {
			ifStatement = statements[statements.length - 2];
			if (_ReturnIfOptimizeCommand$_statementsCanBeReturnExpr_0$L_ReturnIfOptimizeCommand$ALStatement$($this, ifStatement._onTrueStatements)) {
				onFalseStatements = ifStatement._onFalseStatements;
				if (onFalseStatements.length === 0) {
					statements.splice(statements.length - 2, 2, _ReturnIfOptimizeCommand$_createReturnStatement_0$L_ReturnIfOptimizeCommand$LToken$LExpression$LExpression$LExpression$($this, ifStatement._token, ifStatement._expr, ReturnStatement$getExpr_0$LReturnStatement$(ifStatement._onTrueStatements[0]), ReturnStatement$getExpr_0$LReturnStatement$(statements[statements.length - 1])));
					$this._altered = true;
					_ReturnIfOptimizeCommand$_optimizeStatements_0$L_ReturnIfOptimizeCommand$ALStatement$($this, statements);
				} else {
					if (onFalseStatements.length === 1 && onFalseStatements[0] instanceof IfStatement && IfStatement$getOnFalseStatements_0$LIfStatement$(onFalseStatements[0]).length === 0) {
						IfStatement$getOnFalseStatements_0$LIfStatement$(onFalseStatements[0]).push(statements[statements.length - 1]);
						statements.pop();
						$this._altered = true;
						_ReturnIfOptimizeCommand$_optimizeStatements_0$L_ReturnIfOptimizeCommand$ALStatement$($this, statements);
					}
				}
			}
		}
	}
};

_ReturnIfOptimizeCommand._optimizeStatements_0$L_ReturnIfOptimizeCommand$ALStatement$ = _ReturnIfOptimizeCommand$_optimizeStatements_0$L_ReturnIfOptimizeCommand$ALStatement$;

function _ReturnIfOptimizeCommand$_createReturnStatement_0$L_ReturnIfOptimizeCommand$LToken$LExpression$LExpression$LExpression$($this, token, condExpr, trueExpr, falseExpr) {
	return new ReturnStatement(token, new ConditionalExpression$0(new Token$0("?", false), condExpr, trueExpr, falseExpr, falseExpr.getType$()));
};

_ReturnIfOptimizeCommand._createReturnStatement_0$L_ReturnIfOptimizeCommand$LToken$LExpression$LExpression$LExpression$ = _ReturnIfOptimizeCommand$_createReturnStatement_0$L_ReturnIfOptimizeCommand$LToken$LExpression$LExpression$LExpression$;

function _LCSECachedExpression(origExpr, replaceCb) {
	this._origExpr = origExpr;
	this._replaceCb = replaceCb;
	this._localExpr = null;
};

$__jsx_extend([_LCSECachedExpression], Object);
function _LCSECachedExpression$getOrigExpr_0$L_LCSECachedExpression$($this) {
	return $this._origExpr;
};

_LCSECachedExpression.getOrigExpr_0$L_LCSECachedExpression$ = _LCSECachedExpression$getOrigExpr_0$L_LCSECachedExpression$;

function _LCSECachedExpression$getLocalExpr_0$L_LCSECachedExpression$F$LType$SLLocalExpression$$($this, createVarCb) {
	if ($this._localExpr == null) {
		$this._localExpr = createVarCb($this._origExpr.getType$(), Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$($this._origExpr)));
		$this._replaceCb(new AssignmentExpression(new Token$0("=", false), $this._localExpr, $this._origExpr));
	}
	return $this._localExpr;
};

_LCSECachedExpression.getLocalExpr_0$L_LCSECachedExpression$F$LType$SLLocalExpression$$ = _LCSECachedExpression$getLocalExpr_0$L_LCSECachedExpression$F$LType$SLLocalExpression$$;

function _LCSEOptimizeCommand() {
	this._identifier = "lcse";
	this._optimizer = null;
	this._excludeNative = false;
};

$__jsx_extend([_LCSEOptimizeCommand], _FunctionOptimizeCommand);
_LCSEOptimizeCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	var $this = this;
	_Util$optimizeBasicBlock$LMemberFunctionDefinition$F$ALExpression$V$(funcDef, (function (exprs) {
		_LCSEOptimizeCommand$_optimizeExpressions_0$L_LCSEOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs);
	}));
	return true;
};


function _LCSEOptimizeCommand$_optimizeExpressions_0$L_LCSEOptimizeCommand$LMemberFunctionDefinition$ALExpression$($this, funcDef, exprs) {
	var cachedExprs;
	var getCacheKey;
	var registerCacheable;
	var clearCacheByLocalName;
	var clearCache;
	var onExpr;
	var $this$0$0;
	var message$0$0;
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + "optimizing expressions starting";
	$this$0$0._log.push(message$0$0);
	cachedExprs = {};
	getCacheKey = (function (expr) {
		var propertyExpr;
		var receiverType;
		var base;
		var $this$0;
		var $this$1;
		var $this$2;
		if (expr instanceof PropertyExpression) {
			propertyExpr = expr;
			receiverType = propertyExpr._expr.getType$();
			if (receiverType instanceof ObjectType && _Util$classIsNative$LClassDefinition$(receiverType.getClassDef$())) {
				return null;
			}
			base = getCacheKey(propertyExpr._expr);
			return (base == null ? null : base + "." + Token$getValue_0$LToken$(propertyExpr._identifierToken));
		} else {
			if (expr instanceof LocalExpression) {
				$this$2 = expr;
				$this$1 = $this$2._local;
				$this$0 = $this$1._name;
				return $this$0._value;
			} else {
				if (expr instanceof ThisExpression) {
					return "this";
				}
			}
		}
		return null;
	});
	registerCacheable = (function (key, expr, replaceCb) {
		var message$0;
		var $this$0$0;
		var message$0$0;
		message$0 = "registering lcse entry for: " + key;
		$this$0$0 = $this._optimizer;
		message$0$0 = "[" + $this._identifier + "] " + message$0;
		$this$0$0._log.push(message$0$0);
		cachedExprs[key] = ({_origExpr: expr, _replaceCb: replaceCb, _localExpr: null});
	});
	clearCacheByLocalName = (function (name) {
		var k;
		var message$0;
		var $this$0$0;
		var message$0$0;
		var message$1;
		var $this$0$1;
		var message$0$1;
		message$0 = "clearing lcse entry for local name: " + name;
		$this$0$0 = $this._optimizer;
		message$0$0 = "[" + $this._identifier + "] " + message$0;
		$this$0$0._log.push(message$0$0);
		for (k in cachedExprs) {
			if (k.substring(0, name.length + 1) === name + ".") {
				message$1 = "  removing: " + k;
				$this$0$1 = $this._optimizer;
				message$0$1 = "[" + $this._identifier + "] " + message$1;
				$this$0$1._log.push(message$0$1);
				delete cachedExprs[k];
			}
		}
	});
	(function (name) {
		var k;
		var mayPreserve;
		var message$0;
		var $this$0$0;
		var message$0$0;
		var message$1;
		var $this$0$1;
		var message$0$1;
		message$0 = "clearing lcse entry for property name: " + name;
		$this$0$0 = $this._optimizer;
		message$0$0 = "[" + $this._identifier + "] " + message$0;
		$this$0$0._log.push(message$0$0);
		for (k in cachedExprs) {
			mayPreserve = (function onExpr(expr) {
				return (expr instanceof LocalExpression || expr instanceof ThisExpression ? true : Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(expr)) === name ? false : onExpr(UnaryExpression$getExpr_0$LUnaryExpression$(expr)));
			})(_LCSECachedExpression$getOrigExpr_0$L_LCSECachedExpression$(cachedExprs[k]));
			if (! mayPreserve) {
				message$1 = "  removing: " + k;
				$this$0$1 = $this._optimizer;
				message$0$1 = "[" + $this._identifier + "] " + message$1;
				$this$0$1._log.push(message$0$1);
				delete cachedExprs[k];
			}
		}
	});
	clearCache = (function () {
		var $this$0$0;
		var message$0$0;
		$this$0$0 = $this._optimizer;
		message$0$0 = "[" + $this._identifier + "] " + "clearing lcse cache";
		$this$0$0._log.push(message$0$0);
		cachedExprs = {};
	});
	onExpr = (function (expr, replaceCb) {
		var assignmentExpr;
		var lhsExpr;
		var lhsPropertyExpr;
		var cacheKey;
		var incrementExpr;
		var propertyExpr;
		var conditionalExpr;
		var funcExpr;
		var args;
		var i;
		var $this$0;
		var $this$1;
		var $this$0$0;
		var message$0$0;
		var $this$2;
		var message$0;
		var $this$0$1;
		var message$0$1;
		if (expr instanceof AssignmentExpression) {
			assignmentExpr = expr;
			lhsExpr = assignmentExpr._expr1;
			if (lhsExpr instanceof LocalExpression) {
				onExpr(assignmentExpr._expr2, (function (expr) {
					BinaryExpression$setSecondExpr_0$LBinaryExpression$LExpression$(assignmentExpr, expr);
				}));
				clearCacheByLocalName(Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(LocalExpression$getLocal_0$LLocalExpression$(lhsExpr))));
			} else {
				if (lhsExpr instanceof PropertyExpression) {
					lhsPropertyExpr = lhsExpr;
					onExpr(UnaryExpression$getExpr_0$LUnaryExpression$(lhsExpr), (function (expr) {
						UnaryExpression$setExpr_0$LUnaryExpression$LExpression$(lhsPropertyExpr, expr);
					}));
					onExpr(assignmentExpr._expr2, (function (expr) {
						BinaryExpression$setSecondExpr_0$LBinaryExpression$LExpression$(assignmentExpr, expr);
					}));
					if (Token$getValue_0$LToken$(lhsPropertyExpr._identifierToken) === "length") {
					} else {
						cacheKey = getCacheKey(lhsExpr);
						if (cacheKey) {
							registerCacheable(cacheKey, lhsExpr, (function (expr) {
								BinaryExpression$setFirstExpr_0$LBinaryExpression$LExpression$(assignmentExpr, expr);
							}));
						}
					}
				} else {
					clearCache();
				}
			}
			return true;
		} else {
			if (expr instanceof IncrementExpression) {
				incrementExpr = expr;
				if (incrementExpr._expr instanceof PropertyExpression) {
					propertyExpr = incrementExpr._expr;
					onExpr(propertyExpr._expr, (function (expr) {
						UnaryExpression$setExpr_0$LUnaryExpression$LExpression$(propertyExpr, expr);
					}));
				}
				clearCache();
				return true;
			} else {
				if (expr instanceof ConditionalExpression) {
					conditionalExpr = expr;
					onExpr(conditionalExpr._condExpr, (function (expr) {
						ConditionalExpression$setCondExpr_0$LConditionalExpression$LExpression$(conditionalExpr, expr);
					}));
					clearCache();
					return true;
				} else {
					if (expr instanceof FunctionExpression) {
						clearCache();
						return true;
					} else {
						if (expr instanceof CallExpression) {
							$this$0 = expr;
							funcExpr = $this$0._expr;
							if (funcExpr instanceof LocalExpression) {
							} else {
								if (funcExpr instanceof PropertyExpression) {
									propertyExpr = funcExpr;
									onExpr(propertyExpr._expr, (function (expr) {
										UnaryExpression$setExpr_0$LUnaryExpression$LExpression$(propertyExpr, expr);
									}));
								} else {
									clearCache();
								}
							}
							$this$1 = expr;
							args = $this$1._args;
							for (i = 0; i < args.length; ++ i) {
								onExpr(args[i], (function (args, index) {
									return (function (expr) {
										args[index] = expr;
									});
								})(args, i));
							}
							clearCache();
							return true;
						} else {
							if (expr instanceof NewExpression) {
								$this$0$0 = $this._optimizer;
								message$0$0 = "[" + $this._identifier + "] " + "new expression";
								$this$0$0._log.push(message$0$0);
								$this$2 = expr;
								args = $this$2._args;
								for (i = 0; i < args.length; ++ i) {
									onExpr(args[i], (function (args, index) {
										return (function (expr) {
											args[index] = expr;
										});
									})(args, i));
								}
								clearCache();
								return true;
							}
						}
					}
				}
			}
		}
		if (expr instanceof PropertyExpression) {
			if (Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(expr)) === "length") {
			} else {
				cacheKey = getCacheKey(expr);
				if (cacheKey) {
					message$0 = "rewriting cse for: " + cacheKey;
					$this$0$1 = $this._optimizer;
					message$0$1 = "[" + $this._identifier + "] " + message$0;
					$this$0$1._log.push(message$0$1);
					if (cachedExprs[cacheKey]) {
						replaceCb(_LCSECachedExpression$getLocalExpr_0$L_LCSECachedExpression$F$LType$SLLocalExpression$$(cachedExprs[cacheKey], (function (type, baseName) {
							var localVar;
							localVar = _OptimizeCommand$createVar_0$L_OptimizeCommand$LMemberFunctionDefinition$LType$S($this, funcDef, type, baseName);
							return new LocalExpression(LocalVariable$getName_0$LLocalVariable$(localVar), localVar);
						})).clone$());
					} else {
						registerCacheable(cacheKey, expr, replaceCb);
					}
				}
			}
		}
		return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
	});
	Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(onExpr, exprs);
};

_LCSEOptimizeCommand._optimizeExpressions_0$L_LCSEOptimizeCommand$LMemberFunctionDefinition$ALExpression$ = _LCSEOptimizeCommand$_optimizeExpressions_0$L_LCSEOptimizeCommand$LMemberFunctionDefinition$ALExpression$;

function _UnboxOptimizeCommand() {
	this._identifier = "unbox";
	this._optimizer = null;
	this._excludeNative = false;
};

$__jsx_extend([_UnboxOptimizeCommand], _FunctionOptimizeCommand);
_UnboxOptimizeCommand.prototype._createStash$ = function () {
	return new _UnboxOptimizeCommand$CStash();
};


_UnboxOptimizeCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	var locals;
	var i;
	var iMax;
	if (funcDef._statements == null) {
		return false;
	}
	locals = funcDef._locals;
	for ((i = 0, iMax = locals.length); i < iMax; ) {
		if (_UnboxOptimizeCommand$_optimizeLocal_0$L_UnboxOptimizeCommand$LMemberFunctionDefinition$LLocalVariable$(this, funcDef, locals[i])) {
			locals.splice(i, 1);
		} else {
			++ i;
		}
	}
	return true;
};


function _UnboxOptimizeCommand$_optimizeLocal_0$L_UnboxOptimizeCommand$LMemberFunctionDefinition$LLocalVariable$($this, funcDef, local) {
	var classDef;
	var foundNew;
	var onStatement;
	var canUnbox;
	if (! (local._type instanceof ObjectType)) {
		return false;
	}
	classDef = local._type.getClassDef$();
	if (_Util$classIsNative$LClassDefinition$(classDef)) {
		return false;
	}
	foundNew = false;
	onStatement = (function (statement) {
		var onExpr;
		var newExpr;
		onExpr = (function (expr) {
			var baseExpr;
			if (expr instanceof PropertyExpression) {
				baseExpr = UnaryExpression$getExpr_0$LUnaryExpression$(expr);
				if (baseExpr instanceof LocalExpression && LocalExpression$getLocal_0$LLocalExpression$(baseExpr) == local) {
					if (! expr.getType$().isAssignable$()) {
						return false;
					}
					return true;
				}
			} else {
				if (expr instanceof LocalExpression) {
					if (LocalExpression$getLocal_0$LLocalExpression$(expr) == local) {
						return false;
					}
				} else {
					if (expr instanceof FunctionExpression) {
						return MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
					}
				}
			}
			return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
		});
		newExpr = _UnboxOptimizeCommand$_statementIsConstructingTheLocal_0$L_UnboxOptimizeCommand$LStatement$LLocalVariable$($this, statement, local);
		if (newExpr != null) {
			if (! newExpr._type.equals$LType$(local._type)) {
				return false;
			}
			if (! _UnboxOptimizeCommand$_newExpressionCanUnbox_0$L_UnboxOptimizeCommand$LExpression$($this, newExpr)) {
				return false;
			}
			if (! Expression$forEachExpression_0$LExpression$F$LExpression$B$(newExpr, onExpr)) {
				return false;
			}
			if (! Util$forEachExpression$F$LExpression$B$ALExpression$((function (expr) {
				return ! _Util$exprHasSideEffects$LExpression$(expr);
			}), newExpr._args)) {
				return false;
			}
			foundNew = true;
			return true;
		}
		if (statement instanceof FunctionStatement) {
			if (! MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionStatement$getFuncDef_0$LFunctionStatement$(statement), onStatement)) {
				return false;
			}
		}
		return (! Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, onExpr) ? false : statement.forEachStatement$F$LStatement$B$(onStatement));
	});
	canUnbox = Util$forEachStatement$F$LStatement$B$ALStatement$(onStatement, funcDef._statements);
	if (canUnbox && foundNew) {
		_UnboxOptimizeCommand$_unboxVariable_0$L_UnboxOptimizeCommand$LMemberFunctionDefinition$LLocalVariable$($this, funcDef, local);
		return true;
	} else {
		return false;
	}
};

_UnboxOptimizeCommand._optimizeLocal_0$L_UnboxOptimizeCommand$LMemberFunctionDefinition$LLocalVariable$ = _UnboxOptimizeCommand$_optimizeLocal_0$L_UnboxOptimizeCommand$LMemberFunctionDefinition$LLocalVariable$;

function _UnboxOptimizeCommand$_newExpressionCanUnbox_0$L_UnboxOptimizeCommand$LExpression$($this, newExpr) {
	var ctor;
	var stash;
	if ((newExpr.getType$().getClassDef$().flags$() & 16) !== 0) {
		return false;
	}
	ctor = _DetermineCalleeCommand$getCallingFuncDef$LStashable$(newExpr);
	stash = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$($this, ctor);
	return (stash.canUnbox != null ? stash.canUnbox : stash.canUnbox = (function () {
		return (ctor._locals.length !== 0 ? false : MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(ctor, (function (statement) {
			var assigned;
			var expr;
			var lhsExpr;
			var propertyName;
			assigned = {};
			if (! (statement instanceof ExpressionStatement)) {
				return false;
			}
			expr = UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statement);
			if (! (expr instanceof AssignmentExpression)) {
				return false;
			}
			lhsExpr = BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr);
			if (! (lhsExpr instanceof PropertyExpression && UnaryExpression$getExpr_0$LUnaryExpression$(lhsExpr) instanceof ThisExpression)) {
				return false;
			}
			propertyName = Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(lhsExpr));
			if (assigned[propertyName]) {
				return false;
			}
			assigned[propertyName] = true;
			return (function onExpr(expr) {
				if (expr instanceof ThisExpression) {
					return false;
				} else {
					if (expr instanceof FunctionExpression) {
						return false;
					}
				}
				return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
			})(BinaryExpression$getSecondExpr_0$LBinaryExpression$(expr));
		})));
	})());
};

_UnboxOptimizeCommand._newExpressionCanUnbox_0$L_UnboxOptimizeCommand$LExpression$ = _UnboxOptimizeCommand$_newExpressionCanUnbox_0$L_UnboxOptimizeCommand$LExpression$;

function _UnboxOptimizeCommand$_unboxVariable_0$L_UnboxOptimizeCommand$LMemberFunctionDefinition$LLocalVariable$($this, funcDef, local) {
	var variableMap;
	var createLocalExpressionFor;
	var buildConstructingStatements;
	var onStatements;
	var message$0;
	var $this$0$0;
	var message$0$0;
	message$0 = "unboxing " + Token$getValue_0$LToken$(local._name);
	$this$0$0 = $this._optimizer;
	message$0$0 = "[" + $this._identifier + "] " + message$0;
	$this$0$0._log.push(message$0$0);
	variableMap = {};
	ClassDefinition$forEachClassFromBase_0$LClassDefinition$F$LClassDefinition$B$(local._type.getClassDef$(), (function (classDef) {
		ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDef, (function (member) {
			if ((MemberDefinition$flags_0$LMemberDefinition$(member) & (ClassDefinition.IS_STATIC | ClassDefinition.IS_ABSTRACT)) === 0) {
				variableMap[MemberDefinition$name_0$LMemberDefinition$(member)] = _OptimizeCommand$createVar_0$L_OptimizeCommand$LMemberFunctionDefinition$LType$S($this, funcDef, member.getType$(), Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(local)) + "$" + MemberDefinition$name_0$LMemberDefinition$(member));
			}
			return true;
		}));
		return true;
	}));
	createLocalExpressionFor = (function (propertyName) {
		if (! variableMap[propertyName]) {
			throw new Error("could not find local variable for property name: " + propertyName);
		}
		return new LocalExpression(LocalVariable$getName_0$LLocalVariable$(variableMap[propertyName]), variableMap[propertyName]);
	});
	buildConstructingStatements = (function (dstStatements, dstStatementIndex, newExpr) {
		var ctor;
		ctor = _DetermineCalleeCommand$getCallingFuncDef$LStashable$(newExpr);
		Util$forEachStatement$F$LStatement$B$ALStatement$((function (statement) {
			var propertyName;
			var rhsExpr;
			var onExpr;
			propertyName = Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(BinaryExpression$getFirstExpr_0$LBinaryExpression$(UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statement))));
			rhsExpr = BinaryExpression$getSecondExpr_0$LBinaryExpression$(UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statement)).clone$();
			onExpr = (function (expr, replaceCb) {
				var argIndex;
				if (expr instanceof LocalExpression) {
					for (argIndex = 0; argIndex < MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$(ctor).length; ++ argIndex) {
						if (LocalExpression$getLocal_0$LLocalExpression$(expr) == MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$(ctor)[argIndex]) {
							break;
						}
					}
					if (argIndex === MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$(ctor).length) {
						throw new Error("logic flaw, could not find the local in arguments");
					}
					replaceCb(NewExpression$getArguments_0$LNewExpression$(newExpr)[argIndex].clone$());
				}
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			});
			onExpr(rhsExpr, (function (expr) {
				rhsExpr = expr;
			}));
			dstStatements.splice(dstStatementIndex++, 0, new ExpressionStatement(new AssignmentExpression(new Token$0("=", false), createLocalExpressionFor(propertyName), rhsExpr)));
			return true;
		}), ctor._statements);
		return dstStatementIndex;
	});
	onStatements = (function (statements) {
		var statementIndex;
		var onExpr;
		var newExpr;
		for (statementIndex = 0; statementIndex < statements.length; ) {
			onExpr = (function (expr, replaceCb) {
				if (expr instanceof PropertyExpression && UnaryExpression$getExpr_0$LUnaryExpression$(expr) instanceof LocalExpression && LocalExpression$getLocal_0$LLocalExpression$(UnaryExpression$getExpr_0$LUnaryExpression$(expr)) == local) {
					replaceCb(createLocalExpressionFor(Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(expr))));
					return true;
				} else {
					if (expr instanceof FunctionExpression) {
						return onStatements(MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr)));
					} else {
						if (expr instanceof LocalExpression && LocalExpression$getLocal_0$LLocalExpression$(expr) == local) {
							throw new Error("logic flaw, unexpected pattern");
						}
					}
				}
				expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
				return true;
			});
			if (statements[statementIndex] instanceof FunctionStatement) {
				onStatements(MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$(FunctionStatement$getFuncDef_0$LFunctionStatement$(statements[statementIndex])));
				++ statementIndex;
			} else {
				newExpr = _UnboxOptimizeCommand$_statementIsConstructingTheLocal_0$L_UnboxOptimizeCommand$LStatement$LLocalVariable$($this, statements[statementIndex], local);
				if (newExpr != null) {
					statements.splice(statementIndex, 1);
					statementIndex = buildConstructingStatements(statements, statementIndex, newExpr);
				} else {
					statements[statementIndex].forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
					statements[statementIndex].handleStatements$F$ALStatement$B$(onStatements);
					++ statementIndex;
				}
			}
		}
		return true;
	});
	onStatements(funcDef._statements);
};

_UnboxOptimizeCommand._unboxVariable_0$L_UnboxOptimizeCommand$LMemberFunctionDefinition$LLocalVariable$ = _UnboxOptimizeCommand$_unboxVariable_0$L_UnboxOptimizeCommand$LMemberFunctionDefinition$LLocalVariable$;

function _UnboxOptimizeCommand$_statementIsConstructingTheLocal_0$L_UnboxOptimizeCommand$LStatement$LLocalVariable$($this, statement, local) {
	var expr;
	var lhsExpr;
	var rhsExpr;
	var $this$0;
	var $this$1;
	var $this$2;
	if (! (statement instanceof ExpressionStatement)) {
		return null;
	}
	$this$0 = statement;
	expr = $this$0._expr;
	if (! (expr instanceof AssignmentExpression)) {
		return null;
	}
	$this$1 = expr;
	lhsExpr = $this$1._expr1;
	if (! (lhsExpr instanceof LocalExpression)) {
		return null;
	}
	if (LocalExpression$getLocal_0$LLocalExpression$(lhsExpr) != local) {
		return null;
	}
	$this$2 = expr;
	rhsExpr = $this$2._expr2;
	return (! (rhsExpr instanceof NewExpression) ? null : rhsExpr);
};

_UnboxOptimizeCommand._statementIsConstructingTheLocal_0$L_UnboxOptimizeCommand$LStatement$LLocalVariable$ = _UnboxOptimizeCommand$_statementIsConstructingTheLocal_0$L_UnboxOptimizeCommand$LStatement$LLocalVariable$;

function _ArrayLengthOptimizeCommand() {
	this._identifier = "array-length";
	this._optimizer = null;
	this._excludeNative = false;
};

$__jsx_extend([_ArrayLengthOptimizeCommand], _FunctionOptimizeCommand);
_ArrayLengthOptimizeCommand.prototype.optimizeFunction$LMemberFunctionDefinition$ = function (funcDef) {
	var $this = this;
	Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
		var condExpr;
		var arrayLocal;
		var $this$0;
		statement.forEachStatement$F$LStatement$B$(onStatement);
		if (statement instanceof ForStatement) {
			$this$0 = statement;
			condExpr = $this$0._condExpr;
			arrayLocal = (condExpr != null ? _ArrayLengthOptimizeCommand$_hasLengthExprOfLocalArray_0$L_ArrayLengthOptimizeCommand$LExpression$($this, condExpr) : null);
			if (arrayLocal != null) {
				_ArrayLengthOptimizeCommand$_optimizeArrayLength_0$L_ArrayLengthOptimizeCommand$LMemberFunctionDefinition$LForStatement$LLocalVariable$($this, funcDef, statement, arrayLocal);
			}
		}
		return true;
	}), funcDef._statements);
	return true;
};


function _ArrayLengthOptimizeCommand$_optimizeArrayLength_0$L_ArrayLengthOptimizeCommand$LMemberFunctionDefinition$LForStatement$LLocalVariable$($this, funcDef, statement, arrayLocal) {
	var lengthLocal;
	var assignToLocal;
	var onExpr;
	var message$0;
	var $this$0$0;
	var message$0$0;
	var expr$0;
	if (_ArrayLengthOptimizeCommand$_lengthIsUnmodifiedInExpr_0$L_ArrayLengthOptimizeCommand$LExpression$($this, statement._condExpr) && _ArrayLengthOptimizeCommand$_lengthIsUnmodifiedInExpr_0$L_ArrayLengthOptimizeCommand$LExpression$($this, statement._postExpr) && statement.forEachStatement$F$LStatement$B$((function (statement) {
		return _ArrayLengthOptimizeCommand$_lengthIsUnmodifiedInStatement_0$L_ArrayLengthOptimizeCommand$LStatement$($this, statement);
	}))) {
		message$0 = funcDef.getNotation$() + " optimizing .length at line " + (Token$getLineNumber_0$LToken$(statement._token) + "");
		$this$0$0 = $this._optimizer;
		message$0$0 = "[" + $this._identifier + "] " + message$0;
		$this$0$0._log.push(message$0$0);
		lengthLocal = _OptimizeCommand$createVar_0$L_OptimizeCommand$LMemberFunctionDefinition$LType$S($this, funcDef, Type.integerType, Token$getValue_0$LToken$(arrayLocal._name) + "$len");
		assignToLocal = new AssignmentExpression(new Token$0("=", false), new LocalExpression(new Token$0(Token$getValue_0$LToken$(lengthLocal._name), true), lengthLocal), new PropertyExpression$0(new Token$0(".", false), new LocalExpression(new Token$0(Token$getValue_0$LToken$(arrayLocal._name), true), arrayLocal), new Token$0("length", true), [], lengthLocal._type));
		if (statement._initExpr != null) {
			expr$0 = new CommaExpression(new Token$0(",", false), statement._initExpr, assignToLocal);
			statement._initExpr = expr$0;
		} else {
			statement._initExpr = assignToLocal;
		}
		onExpr = (function (expr, replaceCb) {
			if (expr instanceof PropertyExpression && Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(expr)) === "length" && UnaryExpression$getExpr_0$LUnaryExpression$(expr) instanceof LocalExpression && LocalExpression$getLocal_0$LLocalExpression$(UnaryExpression$getExpr_0$LUnaryExpression$(expr)) == arrayLocal) {
				replaceCb(new LocalExpression(new Token$0(Token$getValue_0$LToken$(lengthLocal._name), true), lengthLocal));
			} else {
				expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			}
			return true;
		});
		statement._condExpr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
		statement._postExpr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
		! Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement2(statement) {
			statement.forEachStatement$F$LStatement$B$(onStatement2);
			statement.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			return true;
		}), statement._statements) ? false : true;
	}
};

_ArrayLengthOptimizeCommand._optimizeArrayLength_0$L_ArrayLengthOptimizeCommand$LMemberFunctionDefinition$LForStatement$LLocalVariable$ = _ArrayLengthOptimizeCommand$_optimizeArrayLength_0$L_ArrayLengthOptimizeCommand$LMemberFunctionDefinition$LForStatement$LLocalVariable$;

function _ArrayLengthOptimizeCommand$_hasLengthExprOfLocalArray_0$L_ArrayLengthOptimizeCommand$LExpression$($this, expr) {
	var local;
	local = null;
	Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, (function onExpr(expr) {
		var $this$0;
		if (expr instanceof PropertyExpression && Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(expr)) === "length" && UnaryExpression$getExpr_0$LUnaryExpression$(expr) instanceof LocalExpression && _ArrayLengthOptimizeCommand$_typeIsArray_0$L_ArrayLengthOptimizeCommand$LType$($this, Type$resolveIfNullable_0$LType$(UnaryExpression$getExpr_0$LUnaryExpression$(expr).getType$()))) {
			$this$0 = UnaryExpression$getExpr_0$LUnaryExpression$(expr);
			local = $this$0._local;
			return false;
		}
		return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
	}));
	return local;
};

_ArrayLengthOptimizeCommand._hasLengthExprOfLocalArray_0$L_ArrayLengthOptimizeCommand$LExpression$ = _ArrayLengthOptimizeCommand$_hasLengthExprOfLocalArray_0$L_ArrayLengthOptimizeCommand$LExpression$;

function _ArrayLengthOptimizeCommand$_lengthIsUnmodifiedInStatement_0$L_ArrayLengthOptimizeCommand$LStatement$($this, statement) {
	return (! statement.forEachStatement$F$LStatement$B$((function (statement) {
		return _ArrayLengthOptimizeCommand$_lengthIsUnmodifiedInStatement_0$L_ArrayLengthOptimizeCommand$LStatement$($this, statement);
	})) ? false : Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function (expr) {
		return _ArrayLengthOptimizeCommand$_lengthIsUnmodifiedInExpr_0$L_ArrayLengthOptimizeCommand$LExpression$($this, expr);
	})));
};

_ArrayLengthOptimizeCommand._lengthIsUnmodifiedInStatement_0$L_ArrayLengthOptimizeCommand$LStatement$ = _ArrayLengthOptimizeCommand$_lengthIsUnmodifiedInStatement_0$L_ArrayLengthOptimizeCommand$LStatement$;

function _ArrayLengthOptimizeCommand$_lengthIsUnmodifiedInExpr_0$L_ArrayLengthOptimizeCommand$LExpression$($this, expr) {
	if (expr instanceof AssignmentExpression) {
		if (_ArrayLengthOptimizeCommand$_lhsMayModifyLength_0$L_ArrayLengthOptimizeCommand$LExpression$($this, BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr))) {
			return false;
		}
	} else {
		if (expr instanceof CallExpression || expr instanceof SuperExpression) {
			return false;
		} else {
			if (expr instanceof IncrementExpression) {
				if (_ArrayLengthOptimizeCommand$_lhsMayModifyLength_0$L_ArrayLengthOptimizeCommand$LExpression$($this, UnaryExpression$getExpr_0$LUnaryExpression$(expr))) {
					return false;
				}
			}
		}
	}
	return true;
};

_ArrayLengthOptimizeCommand._lengthIsUnmodifiedInExpr_0$L_ArrayLengthOptimizeCommand$LExpression$ = _ArrayLengthOptimizeCommand$_lengthIsUnmodifiedInExpr_0$L_ArrayLengthOptimizeCommand$LExpression$;

function _ArrayLengthOptimizeCommand$_lhsMayModifyLength_0$L_ArrayLengthOptimizeCommand$LExpression$($this, expr) {
	var exprType;
	var $this$0;
	if (expr instanceof PropertyExpression && Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(expr)) === "length") {
		return true;
	}
	if (expr instanceof ArrayExpression) {
		return true;
	}
	$this$0 = expr.getType$();
	exprType = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	return (exprType.equals$LType$(Type.variantType) ? true : _ArrayLengthOptimizeCommand$_typeIsArray_0$L_ArrayLengthOptimizeCommand$LType$($this, exprType) ? true : false);
};

_ArrayLengthOptimizeCommand._lhsMayModifyLength_0$L_ArrayLengthOptimizeCommand$LExpression$ = _ArrayLengthOptimizeCommand$_lhsMayModifyLength_0$L_ArrayLengthOptimizeCommand$LExpression$;

function _ArrayLengthOptimizeCommand$_typeIsArray_0$L_ArrayLengthOptimizeCommand$LType$($this, type) {
	var classDef;
	if (! (type instanceof ObjectType)) {
		return false;
	}
	classDef = type.getClassDef$();
	return (! (classDef instanceof InstantiatedClassDefinition) ? false : InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) === "Array");
};

_ArrayLengthOptimizeCommand._typeIsArray_0$L_ArrayLengthOptimizeCommand$LType$ = _ArrayLengthOptimizeCommand$_typeIsArray_0$L_ArrayLengthOptimizeCommand$LType$;

function _NoDebugCommand() {
	this._identifier = "no-debug";
	this._optimizer = null;
};

$__jsx_extend([_NoDebugCommand], _OptimizeCommand);
_NoDebugCommand.prototype._createStash$ = function () {
	return new _NoDebugCommand$CStash();
};


_NoDebugCommand.prototype.performOptimization$ = function () {
	var $this = this;
	var stash;
	stash = _OptimizeCommand$getStash_0$L_OptimizeCommand$LStashable$(this, Compiler$getEmitter_0$LCompiler$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this)));
	stash.debugValue = false;
	Compiler$forEachClassDef_0$LCompiler$F$LParser$LClassDefinition$B$(_OptimizeCommand$getCompiler_0$L_OptimizeCommand$(this), (function (parser, classDef) {
		if (classDef.className$() === "JSX") {
			ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDef, (function (memberVariable) {
				var falseExpr;
				if (MemberDefinition$name_0$LMemberDefinition$(memberVariable) === "DEBUG" && (MemberDefinition$flags_0$LMemberDefinition$(memberVariable) & ClassDefinition.IS_STATIC) !== 0) {
					_OptimizeCommand$log_0$L_OptimizeCommand$S($this, "set JSX.DEBUG = " + (stash.debugValue + ""));
					falseExpr = new BooleanLiteralExpression(new Token$0(stash.debugValue + "", true));
					MemberVariableDefinition$setInitialValue_0$LMemberVariableDefinition$LExpression$(memberVariable, falseExpr);
					return false;
				}
				return true;
			}));
			return false;
		}
		return true;
	}));
};


function _Util$0() {
};

$__jsx_extend([_Util$0], Object);
function _Util$0$getOutputClassName$LClassDefinition$(classDef) {
	return classDef.getStash$S("emitter.outputname").outputName;
};

_Util$0.getOutputClassName$LClassDefinition$ = _Util$0$getOutputClassName$LClassDefinition$;

function _Util$0$getNameOfNativeConstructor$LClassDefinition$(classDef) {
	return (classDef instanceof InstantiatedClassDefinition ? InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) === "Map" ? "Object" : InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) : classDef.className$());
};

_Util$0.getNameOfNativeConstructor$LClassDefinition$ = _Util$0$getNameOfNativeConstructor$LClassDefinition$;

function _Util$0$setOutputClassNames$ALClassDefinition$(classDefs) {
	var setOutputName;
	var escapeClassNameIfInstantiated;
	var countByName;
	var newUniqueName;
	var i;
	var classDef;
	var className;
	var ctors;
	var j;
	var exportedCtor;
	var n;
	function setOutputName(stashable, name) {
		stashable.setStash$SLStash$("emitter.outputname", new _Util$0$COutputNameStash(name));
	}
	function escapeClassNameIfInstantiated(name) {
		return name.replace(/\.</g, "$$").replace(/>/g, "$E").replace(/[^A-Za-z0-9_]/g, "$");
	}
	countByName = {};
	function newUniqueName(className) {
		var name;
		if (countByName[className]) {
			name = className + "$" + (countByName[className] - 1 + "");
			++ countByName[className];
		} else {
			name = className;
			countByName[className] = 1;
		}
		return escapeClassNameIfInstantiated(name);
	}
	for (i = 0; i < classDefs.length; ++ i) {
		classDef = classDefs[i];
		if ((classDef.flags$() & 16) !== 0) {
			className = classDef.className$();
			if (! $__jsx_ObjectHasOwnProperty.call(countByName, className)) {
				setOutputName(classDef, escapeClassNameIfInstantiated(className));
				countByName[className] = 1;
			}
		}
	}
	for (i = 0; i < classDefs.length; ++ i) {
		classDef = classDefs[i];
		if ((classDef.flags$() & 16) === 0) {
			if (classDef._outerClassDef != null) {
				className = _Util$0$getOutputClassName$LClassDefinition$(classDef._outerClassDef) + "$C" + classDef.className$();
			} else {
				className = classDef.className$();
			}
			ctors = _Util$0$findFunctions$LClassDefinition$SB(classDef, "constructor", false);
			if (ctors.length !== 0) {
				for (j = 0; j < ctors.length; ++ j) {
					if ((MemberDefinition$flags_0$LMemberDefinition$(ctors[j]) & 16384) !== 0) {
						exportedCtor = ctors[j];
						ctors.splice(j, 1);
						ctors.unshift(exportedCtor);
						break;
					}
				}
				n = newUniqueName(className);
				setOutputName(classDef, n);
				setOutputName(ctors[0], n);
				for (j = 1; j < ctors.length; ++ j) {
					setOutputName(ctors[j], newUniqueName(className));
				}
			} else {
				setOutputName(classDef, newUniqueName(className));
			}
		}
	}
};

_Util$0.setOutputClassNames$ALClassDefinition$ = _Util$0$setOutputClassNames$ALClassDefinition$;

function _Util$0$encodeObjectLiteralKey$S(s) {
	return (s.length === 0 || s.match(/^[A-Za-z_$][A-Za-z0-9_$]*$/) ? s : Util$encodeStringLiteral$S(s));
};

_Util$0.encodeObjectLiteralKey$S = _Util$0$encodeObjectLiteralKey$S;

function _Util$0$findFunctions$LClassDefinition$SB(classDef, name, isStatic) {
	var functions;
	var members;
	var i;
	var member;
	functions = [];
	members = classDef._members;
	for (i = 0; i < members.length; ++ i) {
		member = members[i];
		if (member instanceof MemberFunctionDefinition && MemberDefinition$name_0$LMemberDefinition$(member) === name && (member._flags & 8) === (isStatic ? 8 : 0)) {
			functions.push(member);
		}
	}
	return functions;
};

_Util$0.findFunctions$LClassDefinition$SB = _Util$0$findFunctions$LClassDefinition$SB;

function _Mangler() {
};

$__jsx_extend([_Mangler], Object);
function _Mangler$mangleFunctionName_0$L_Mangler$SALType$($this, name, argTypes) {
	return name + _Mangler$mangleFunctionArguments_0$L_Mangler$ALType$($this, argTypes);
};

_Mangler.mangleFunctionName_0$L_Mangler$SALType$ = _Mangler$mangleFunctionName_0$L_Mangler$SALType$;

function _Mangler$mangleTypeName_0$L_Mangler$LType$($this, type) {
	var classDef;
	var typeArgs;
	var $this$0;
	if (type.equals$LType$(Type.voidType)) {
		return "V";
	} else {
		if (type.equals$LType$(Type.booleanType)) {
			return "B";
		} else {
			if (type.equals$LType$(Type.integerType)) {
				return "I";
			} else {
				if (type.equals$LType$(Type.numberType)) {
					return "N";
				} else {
					if (type.equals$LType$(Type.stringType)) {
						return "S";
					} else {
						if (type instanceof ObjectType) {
							classDef = type.getClassDef$();
							if (classDef instanceof InstantiatedClassDefinition) {
								$this$0 = classDef;
								typeArgs = $this$0._typeArguments;
								switch (InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef)) {
								case "Array":
									return "A" + _Mangler$mangleTypeName_0$L_Mangler$LType$($this, typeArgs[0]);
								case "Map":
									return "H" + _Mangler$mangleTypeName_0$L_Mangler$LType$($this, typeArgs[0]);
								default:
								}
							}
							return "L" + _Util$0$getOutputClassName$LClassDefinition$(type.getClassDef$()) + "$";
						} else {
							if (type instanceof StaticFunctionType) {
								return "F" + _Mangler$mangleFunctionArguments_0$L_Mangler$ALType$($this, ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(type)) + _Mangler$mangleTypeName_0$L_Mangler$LType$($this, ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(type)) + "$";
							} else {
								if (type instanceof MemberFunctionType) {
									return "M" + _Mangler$mangleTypeName_0$L_Mangler$LType$($this, type.getObjectType$()) + _Mangler$mangleFunctionArguments_0$L_Mangler$ALType$($this, ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(type)) + _Mangler$mangleTypeName_0$L_Mangler$LType$($this, ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(type)) + "$";
								} else {
									if (type instanceof NullableType) {
										return "U" + _Mangler$mangleTypeName_0$L_Mangler$LType$($this, NullableType$getBaseType_0$LNullableType$(type));
									} else {
										if (type.equals$LType$(Type.variantType)) {
											return "X";
										} else {
											throw new Error("FIXME " + type.toString());
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};

_Mangler.mangleTypeName_0$L_Mangler$LType$ = _Mangler$mangleTypeName_0$L_Mangler$LType$;

function _Mangler$mangleFunctionArguments_0$L_Mangler$ALType$($this, argTypes) {
	var s;
	var i;
	var argTypes$len$0;
	s = "$";
	for ((i = 0, argTypes$len$0 = argTypes.length); i < argTypes$len$0; ++ i) {
		s += _Mangler$mangleTypeName_0$L_Mangler$LType$($this, argTypes[i]);
	}
	return s;
};

_Mangler.mangleFunctionArguments_0$L_Mangler$ALType$ = _Mangler$mangleFunctionArguments_0$L_Mangler$ALType$;

function _Namer() {
	this._emitter = null;
	this._catchLevel = -1;
};

$__jsx_extend([_Namer], Object);
_Namer.prototype.getNameOfProperty$LClassDefinition$S = function (classDef, name) {
	return name;
};


_Namer.prototype.getNameOfMethod$LClassDefinition$SALType$ = function (classDef, name, argTypes) {
	return (Util$memberRootIsNative$LClassDefinition$SALType$B(classDef, name, argTypes, false) ? name : _Mangler$mangleFunctionName_0$L_Mangler$SALType$(JavaScriptEmitter$getMangler_0$LJavaScriptEmitter$(this._emitter), name, argTypes));
};


_Namer.prototype.getNameOfStaticVariable$LClassDefinition$S = function (classDef, name) {
	return name;
};


_Namer.prototype.getNameOfStaticFunction$LClassDefinition$SALType$ = function (classDef, name, argTypes) {
	var className;
	className = classDef.getStash$S("emitter.outputname").outputName;
	return (Util$memberRootIsNative$LClassDefinition$SALType$B(classDef, name, argTypes, true) ? className + "." + name : className + "$" + _Mangler$mangleFunctionName_0$L_Mangler$SALType$(JavaScriptEmitter$getMangler_0$LJavaScriptEmitter$(this._emitter), name, argTypes));
};


_Namer.prototype.getNameOfConstructor$LClassDefinition$ALType$ = function (classDef, argTypes) {
	var ctor$0;
	ctor$0 = Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, "constructor", argTypes, false);
	return ((ctor$0._classDef.flags$() & 16) !== 0 ? _Util$0$getNameOfNativeConstructor$LClassDefinition$(ctor$0._classDef) : ctor$0.getStash$S("emitter.outputname").outputName);
};


_Namer.prototype.getNameOfClass$LClassDefinition$ = function (classDef) {
	return classDef.getStash$S("emitter.outputname").outputName;
};


_Namer.prototype.enterScope$LLocalVariable$F$V$ = function (local, cb) {
	cb();
};


_Namer.prototype.enterFunction$LMemberFunctionDefinition$F$V$ = function (funcDef, cb) {
	cb();
};


function _Namer$_enterCatch_0$L_Namer$LTryStatement$F$F$S$V$S($this, tryStmt, cb, catchName) {
	var catchStmts;
	var i;
	tryStmt.setStash$SLStash$("namer", new _Namer$C_TryStash(catchName));
	catchStmts = tryStmt._catchStatements;
	for (i in catchStmts) {
		CatchStatement$getLocal_0$LCatchStatement$(catchStmts[i]).setStash$SLStash$("namer", new _Namer$C_CatchTargetStash(tryStmt));
	}
	cb((function () {
		return tryStmt.getStash$S("namer").catchName;
	}));
};

_Namer._enterCatch_0$L_Namer$LTryStatement$F$F$S$V$S = _Namer$_enterCatch_0$L_Namer$LTryStatement$F$F$S$V$S;

_Namer.prototype.getNameOfLocalVariable$LLocalVariable$ = function (local) {
	return (local instanceof CaughtVariable ? _Namer$_getCatchName_0$L_Namer$LCaughtVariable$(this, local) : Token$getValue_0$LToken$(local._name));
};


function _Namer$_getCatchName_0$L_Namer$LCaughtVariable$($this, caught) {
	var tryStmt$0;
	tryStmt$0 = caught.getStash$S("namer").tryStmt;
	return tryStmt$0.getStash$S("namer").catchName;
};

_Namer._getCatchName_0$L_Namer$LCaughtVariable$ = _Namer$_getCatchName_0$L_Namer$LCaughtVariable$;

function _MinifiedNameGenerator(skipWords) {
	var i;
	this._skipWords = {};
	this._memo = [];
	this._counter = 0;
	for (i in skipWords) {
		this._skipWords[skipWords[i]] = true;
	}
};

$__jsx_extend([_MinifiedNameGenerator], Object);
_MinifiedNameGenerator.prototype.get$N = function (n) {
	var candidate;
	while (this._memo.length <= n) {
		do {
			candidate = _MinifiedNameGenerator$_stringify$N(this._counter++);
		} while ($__jsx_ObjectHasOwnProperty.call(this._skipWords, candidate) || candidate.match(/^[0-9$]/));
		this._memo.push(candidate);
	}
	return this._memo[n];
};


function _MinifiedNameGenerator$get_0$L_MinifiedNameGenerator$N($this, n) {
	var candidate;
	while ($this._memo.length <= n) {
		do {
			candidate = _MinifiedNameGenerator$_stringify$N($this._counter++);
		} while ($__jsx_ObjectHasOwnProperty.call($this._skipWords, candidate) || candidate.match(/^[0-9$]/));
		$this._memo.push(candidate);
	}
	return $this._memo[n];
};

_MinifiedNameGenerator.get_0$L_MinifiedNameGenerator$N = _MinifiedNameGenerator$get_0$L_MinifiedNameGenerator$N;

function _MinifiedNameGenerator$_stringify$N(n) {
	var name;
	var colIndex;
	name = "";
	do {
		colIndex = n % "$_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
		name += "$_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(colIndex);
		n = (n - colIndex) / "$_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
	} while (n !== 0);
	return name;
};

_MinifiedNameGenerator._stringify$N = _MinifiedNameGenerator$_stringify$N;

function _Minifier(emitter, classDefs) {
	this._propertyUseCount = {};
	this._propertyConversionTable = null;
	this._globalUseCount = {};
	this._globalConversionTable = null;
	this._outerLocals = [];
	this._emitter = emitter;
	this._classDefs = classDefs;
};

$__jsx_extend([_Minifier], Object);
function _Minifier$_recordUsedIdentifiers_0$L_Minifier$LStashable$F$V$($this, stashable, cb) {
	var globalUseCountBackup;
	var k;
	var outerLocalUseCount;
	var i;
	var scopeStash;
	globalUseCountBackup = {};
	for (k in $this._globalUseCount) {
		globalUseCountBackup[k] = $this._globalUseCount[k];
	}
	outerLocalUseCount = [];
	for (i in $this._outerLocals) {
		outerLocalUseCount[i] = _Minifier$_getLocalStash$LLocalVariable$($this._outerLocals[i]).useCount;
	}
	cb();
	scopeStash = _Minifier$_getScopeStash$LStashable$(stashable);
	for (k in $this._globalUseCount) {
		if ($this._globalUseCount[k] != globalUseCountBackup[k]) {
			scopeStash.usedGlobals[k] = true;
		}
	}
	for (i in $this._outerLocals) {
		if (outerLocalUseCount[i] != _Minifier$_getLocalStash$LLocalVariable$($this._outerLocals[i]).useCount) {
			scopeStash.usedOuterLocals.push($this._outerLocals[i]);
		}
	}
};

_Minifier._recordUsedIdentifiers_0$L_Minifier$LStashable$F$V$ = _Minifier$_recordUsedIdentifiers_0$L_Minifier$LStashable$F$V$;

function _Minifier$_minifyProperties_0$L_Minifier$($this) {
	var k;
	$this._propertyConversionTable = _Minifier$_buildConversionTable$HNL_MinifiedNameGenerator$($this._propertyUseCount, new _MinifiedNameGenerator([  ].concat(_MinifiedNameGenerator.KEYWORDS, (function () {
		var nativePropertyNames;
		var this$0;
		var i$0;
		nativePropertyNames = {};
		this$0 = $this._classDefs;
		for (i$0 in this$0) {
			(function (classDef) {
				ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$(classDef, (function (member) {
					if ((MemberDefinition$flags_0$LMemberDefinition$(member) & ClassDefinition.IS_STATIC) === 0 && ((MemberDefinition$flags_0$LMemberDefinition$(member) | classDef.flags$()) & ClassDefinition.IS_NATIVE) !== 0) {
						nativePropertyNames[MemberDefinition$name_0$LMemberDefinition$(member)] = true;
					}
					return true;
				}));
			})(this$0[i$0]);
		}
		return Object.keys(nativePropertyNames);
	})())));
	for (k in $this._propertyConversionTable) {
	}
};

_Minifier._minifyProperties_0$L_Minifier$ = _Minifier$_minifyProperties_0$L_Minifier$;

function _Minifier$_minifyStaticVariables_0$L_Minifier$($this) {
	var this$0;
	var i$0;
	this$0 = $this._classDefs;
	for (i$0 in this$0) {
		(function (classDef) {
			var exportedStaticVarNames;
			var stash;
			if ((classDef.flags$() & 272) === 0) {
				exportedStaticVarNames = [];
				ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDef, (function (member) {
					if ((MemberDefinition$flags_0$LMemberDefinition$(member) & (ClassDefinition.IS_STATIC | ClassDefinition.IS_EXPORT)) === (ClassDefinition.IS_STATIC | ClassDefinition.IS_EXPORT)) {
						exportedStaticVarNames.push(MemberDefinition$name_0$LMemberDefinition$(member));
					}
					return true;
				}));
				stash = _Minifier$_getClassStash$LClassDefinition$(classDef);
				stash.staticVariableConversionTable = _Minifier$_buildConversionTable$HNL_MinifiedNameGenerator$(stash.staticVariableUseCount, new _MinifiedNameGenerator(_MinifiedNameGenerator.KEYWORDS.concat(exportedStaticVarNames)));
			}
		})(this$0[i$0]);
	}
};

_Minifier._minifyStaticVariables_0$L_Minifier$ = _Minifier$_minifyStaticVariables_0$L_Minifier$;

function _Minifier$_minifyGlobals_0$L_Minifier$($this) {
	var useCount;
	var k;
	var this$0;
	var i$0;
	useCount = {};
	for (k in $this._globalUseCount) {
		useCount[k] = $this._globalUseCount[k];
	}
	this$0 = $this._classDefs;
	for (i$0 in this$0) {
		(function (classDef) {
			if ((classDef.flags$() & 272) !== 0) {
				delete useCount[classDef.className$()];
			}
		})(this$0[i$0]);
	}
	$this._globalConversionTable = _Minifier$_buildConversionTable$HNL_MinifiedNameGenerator$(useCount, new _MinifiedNameGenerator([  ].concat(_MinifiedNameGenerator.KEYWORDS, _MinifiedNameGenerator.GLOBALS, (function () {
		var nativeClassNames;
		var this$0;
		var i$0;
		nativeClassNames = [];
		this$0 = $this._classDefs;
		for (i$0 in this$0) {
			(function (classDef) {
				if ((classDef.flags$() & ClassDefinition.IS_NATIVE) !== 0) {
					nativeClassNames.push(classDef.className$());
				}
			})(this$0[i$0]);
		}
		return nativeClassNames;
	})())));
	for (k in $this._globalConversionTable) {
	}
};

_Minifier._minifyGlobals_0$L_Minifier$ = _Minifier$_minifyGlobals_0$L_Minifier$;

function _Minifier$_buildConversionTable_0$L_Minifier$ALLocalVariable$L_Minifier$C_ScopeStash$($this, locals, scopeStash) {
	var useCount;
	var reserved;
	var k;
	var i;
	var conversionTable;
	var i$0;
	var i$1;
	var local$0;
	var local$1;
	useCount = {};
	for (i$0 in locals) {
		local$0 = locals[i$0];
		useCount[Token$getValue_0$LToken$(local$0._name)] = _Minifier$_getLocalStash$LLocalVariable$(local$0).useCount;
	}
	reserved = [  ];
	for (k in scopeStash.usedGlobals) {
		reserved.push($__jsx_ObjectHasOwnProperty.call($this._globalConversionTable, k) ? $this._globalConversionTable[k] : k);
	}
	for (i in scopeStash.usedOuterLocals) {
		reserved.push(_Minifier$_getLocalStash$LLocalVariable$(scopeStash.usedOuterLocals[i]).minifiedName);
	}
	"local minification, preserving: " + reserved.join(",");
	reserved = reserved.concat(_MinifiedNameGenerator.KEYWORDS);
	conversionTable = _Minifier$_buildConversionTable$HNL_MinifiedNameGenerator$(useCount, new _MinifiedNameGenerator(reserved));
	for (i$1 in locals) {
		local$1 = locals[i$1];
		_Minifier$_getLocalStash$LLocalVariable$(local$1).minifiedName = conversionTable[Token$getValue_0$LToken$(local$1._name)];
	}
};

_Minifier._buildConversionTable_0$L_Minifier$ALLocalVariable$L_Minifier$C_ScopeStash$ = _Minifier$_buildConversionTable_0$L_Minifier$ALLocalVariable$L_Minifier$C_ScopeStash$;

function _Minifier$_buildConversionTable$HNL_MinifiedNameGenerator$(useCount, nameGenerator) {
	var propertyNames;
	var conversionTable;
	var i;
	propertyNames = Object.keys(useCount).sort((function (x, y) {
		var delta;
		delta = useCount[y] - useCount[x];
		return (delta !== 0 ? delta : x < y ? -1 : 1);
	}));
	conversionTable = {};
	for (i = 0; i < propertyNames.length; ++ i) {
		conversionTable[propertyNames[i]] = _MinifiedNameGenerator$get_0$L_MinifiedNameGenerator$N(nameGenerator, i);
	}
	return conversionTable;
};

_Minifier._buildConversionTable$HNL_MinifiedNameGenerator$ = _Minifier$_buildConversionTable$HNL_MinifiedNameGenerator$;

function _Minifier$_getClassStash$LClassDefinition$(classDef) {
	var stash;
	stash = classDef.getStash$S("minifier.class");
	if (stash == null) {
		stash = classDef.setStash$SLStash$("minifier.class", new _Minifier$C_ClassStash());
	}
	return stash;
};

_Minifier._getClassStash$LClassDefinition$ = _Minifier$_getClassStash$LClassDefinition$;

function _Minifier$_getScopeStash$LStashable$(stashable) {
	var stash;
	stash = stashable.getStash$S("minifier.scope");
	if (stash == null) {
		stash = stashable.setStash$SLStash$("minifier.scope", new _Minifier$C_ScopeStash());
	}
	return stash;
};

_Minifier._getScopeStash$LStashable$ = _Minifier$_getScopeStash$LStashable$;

function _Minifier$_getLocalStash$LLocalVariable$(local) {
	var stash;
	stash = local.getStash$S("minifier.local");
	if (stash == null) {
		stash = local.setStash$SLStash$("minifier.local", new _Minifier$C_LocalStash());
	}
	return stash;
};

_Minifier._getLocalStash$LLocalVariable$ = _Minifier$_getLocalStash$LLocalVariable$;

function _Minifier$_incr$HNS(useCount, name) {
	if ($__jsx_ObjectHasOwnProperty.call(useCount, name)) {
		++ useCount[name];
	} else {
		useCount[name] = 1;
	}
};

_Minifier._incr$HNS = _Minifier$_incr$HNS;

function _Minifier$_getArgsAndLocals$LMemberFunctionDefinition$(funcDef) {
	var list;
	var this$0;
	var i$0;
	var a$0;
	list = [];
	this$0 = funcDef._args;
	for (i$0 in this$0) {
		a$0 = this$0[i$0];
		list.push(a$0);
	}
	return list.concat(funcDef._locals);
};

_Minifier._getArgsAndLocals$LMemberFunctionDefinition$ = _Minifier$_getArgsAndLocals$LMemberFunctionDefinition$;

var esprima = require('esprima');
var esmangle = require('esmangle');
var escodegen = require('escodegen');
function _StatementEmitter() {
};

$__jsx_extend([_StatementEmitter], Object);
function _StatementEmitter$emitLabelOfStatement_0$L_StatementEmitter$LLabellableStatement$($this, statement) {
	var label;
	var $this$0;
	label = statement._label;
	if (label != null) {
		JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this._emitter);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, label._value + ":\n", label);
		$this$0 = $this._emitter;
		++ $this$0._indent;
	}
};

_StatementEmitter.emitLabelOfStatement_0$L_StatementEmitter$LLabellableStatement$ = _StatementEmitter$emitLabelOfStatement_0$L_StatementEmitter$LLabellableStatement$;

function _ConstructorInvocationStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_ConstructorInvocationStatementEmitter], _StatementEmitter);
_ConstructorInvocationStatementEmitter.prototype.emit$ = function () {
	var ctorType;
	var argTypes;
	var ctorName;
	var token;
	var this$0;
	var _statement$0;
	ctorType = ConstructorInvocationStatement$getConstructorType_0$LConstructorInvocationStatement$(this._statement);
	argTypes = (ctorType != null ? ctorType._argTypes : []);
	ctorName = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfConstructor$LClassDefinition$ALType$(ConstructorInvocationStatement$getConstructingClassDef_0$LConstructorInvocationStatement$(this._statement), argTypes);
	this$0 = _statement$0 = this._statement;
	token = this$0._token;
	if (ctorName === "Error" && ConstructorInvocationStatement$getArguments_0$LConstructorInvocationStatement$(_statement$0).length === 1) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "Error.call(this);\n", token);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "this.message = ", token);
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, ConstructorInvocationStatement$getArguments_0$LConstructorInvocationStatement$(this._statement)[0]).emit$N(_AssignmentExpressionEmitter._operatorPrecedence["="]);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ";\n", token);
	} else {
		JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$(this._emitter, token, ctorName + ".call(this", ConstructorInvocationStatement$getArguments_0$LConstructorInvocationStatement$(this._statement), argTypes);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ";\n", token);
	}
};


function _ExpressionStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_ExpressionStatementEmitter], _StatementEmitter);
_ExpressionStatementEmitter.prototype.emit$ = function () {
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(this._statement)).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ";\n", null);
};


function _FunctionStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_FunctionStatementEmitter], _StatementEmitter);
_FunctionStatementEmitter.prototype.emit$ = function () {
	var $this = this;
	var funcDef;
	var $this$0;
	var _emitter$0;
	$this$0 = this._statement;
	funcDef = $this$0._funcDef;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(_emitter$0 = this._emitter, "function " + JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(_emitter$0).getNameOfLocalVariable$LLocalVariable$(funcDef._funcLocal) + "(", funcDef._token);
	JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).enterFunction$LMemberFunctionDefinition$F$V$(funcDef, (function () {
		var args;
		var i;
		var $this$0;
		var _emitter$0;
		args = funcDef._args;
		for (i = 0; i < args.length; ++ i) {
			if (i !== 0) {
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ", ", funcDef._token);
			}
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(_emitter$0 = $this._emitter, JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(_emitter$0).getNameOfLocalVariable$LLocalVariable$(args[i]), funcDef._token);
		}
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ") {\n", funcDef._token);
		$this$0 = $this._emitter;
		++ $this$0._indent;
		JavaScriptEmitter$_emitFunctionBody_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this._emitter, funcDef);
		JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this._emitter);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "}\n", funcDef._token);
	}));
};


function _ReturnStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_ReturnStatementEmitter], _StatementEmitter);
_ReturnStatementEmitter.prototype.emit$ = function () {
	var expr;
	var $this$0;
	$this$0 = this._statement;
	expr = $this$0._expr;
	if (expr != null) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "return ", null);
		if (this._emitter._enableProfiler) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "$__jsx_profiler.exit(", null);
		}
		JavaScriptEmitter$_emitRHSOfAssignment_0$LJavaScriptEmitter$LExpression$LType$(this._emitter, ReturnStatement$getExpr_0$LReturnStatement$(this._statement), MemberFunctionDefinition$getReturnType_0$LMemberFunctionDefinition$(this._emitter._emittingFunction));
		if (this._emitter._enableProfiler) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ")", null);
		}
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ";\n", null);
	} else {
		if (this._emitter._enableProfiler) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "return $__jsx_profiler.exit();\n", this._statement.getToken$());
		} else {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "return;\n", this._statement.getToken$());
		}
	}
};


function _DeleteStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_DeleteStatementEmitter], _StatementEmitter);
_DeleteStatementEmitter.prototype.emit$ = function () {
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "delete ", this._statement.getToken$());
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(this._statement)).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ";\n", null);
};


function _BreakStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_BreakStatementEmitter], _StatementEmitter);
_BreakStatementEmitter.prototype.emit$ = function () {
	if (JumpStatement$getLabel_0$LJumpStatement$(this._statement) != null) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "break " + Token$getValue_0$LToken$(JumpStatement$getLabel_0$LJumpStatement$(this._statement)) + ";\n", this._statement.getToken$());
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "break;\n", this._statement.getToken$());
	}
};


function _ContinueStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_ContinueStatementEmitter], _StatementEmitter);
_ContinueStatementEmitter.prototype.emit$ = function () {
	if (JumpStatement$getLabel_0$LJumpStatement$(this._statement) != null) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "continue " + Token$getValue_0$LToken$(JumpStatement$getLabel_0$LJumpStatement$(this._statement)) + ";\n", this._statement.getToken$());
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "continue;\n", this._statement.getToken$());
	}
};


function _DoWhileStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_DoWhileStatementEmitter], _StatementEmitter);
_DoWhileStatementEmitter.prototype.emit$ = function () {
	_StatementEmitter$emitLabelOfStatement_0$L_StatementEmitter$LLabellableStatement$(this, this._statement);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "do {\n", null);
	JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, this._statement.getStatements$());
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "} while (", null);
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, DoWhileStatement$getExpr_0$LDoWhileStatement$(this._statement)).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ");\n", null);
};


function _ForInStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_ForInStatementEmitter], _StatementEmitter);
_ForInStatementEmitter.prototype.emit$ = function () {
	_StatementEmitter$emitLabelOfStatement_0$L_StatementEmitter$LLabellableStatement$(this, this._statement);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "for (", null);
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, ForInStatement$getLHSExpr_0$LForInStatement$(this._statement)).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " in ", null);
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, ForInStatement$getListExpr_0$LForInStatement$(this._statement)).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ") {\n", null);
	JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, this._statement.getStatements$());
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "}\n", null);
};


function _ForStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_ForStatementEmitter], _StatementEmitter);
_ForStatementEmitter.prototype.emit$ = function () {
	var initExpr;
	var condExpr;
	var postExpr;
	var $this$0;
	var $this$1;
	var $this$2;
	_StatementEmitter$emitLabelOfStatement_0$L_StatementEmitter$LLabellableStatement$(this, this._statement);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "for (", this._statement.getToken$());
	$this$0 = this._statement;
	initExpr = $this$0._initExpr;
	if (initExpr != null) {
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, initExpr).emit$N(0);
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "; ", null);
	$this$1 = this._statement;
	condExpr = $this$1._condExpr;
	if (condExpr != null) {
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, condExpr).emit$N(0);
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "; ", null);
	$this$2 = this._statement;
	postExpr = $this$2._postExpr;
	if (postExpr != null) {
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, postExpr).emit$N(0);
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ") {\n", null);
	JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, this._statement.getStatements$());
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "}\n", null);
};


function _IfStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_IfStatementEmitter], _StatementEmitter);
_IfStatementEmitter.prototype.emit$ = function () {
	var ifFalseStatements;
	var $this$0;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "if (", this._statement.getToken$());
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, IfStatement$getExpr_0$LIfStatement$(this._statement)).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ") {\n", null);
	JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, IfStatement$getOnTrueStatements_0$LIfStatement$(this._statement));
	$this$0 = this._statement;
	ifFalseStatements = $this$0._onFalseStatements;
	if (ifFalseStatements.length !== 0) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "} else {\n", null);
		JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, ifFalseStatements);
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "}\n", null);
};


function _SwitchStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_SwitchStatementEmitter], _StatementEmitter);
_SwitchStatementEmitter.prototype.emit$ = function () {
	_StatementEmitter$emitLabelOfStatement_0$L_StatementEmitter$LLabellableStatement$(this, this._statement);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "switch (", this._statement.getToken$());
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, SwitchStatement$getExpr_0$LSwitchStatement$(this._statement), 0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ") {\n", null);
	JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, SwitchStatement$getStatements_0$LSwitchStatement$(this._statement));
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "}\n", null);
};


function _CaseStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_CaseStatementEmitter], _StatementEmitter);
_CaseStatementEmitter.prototype.emit$ = function () {
	var $this$0;
	JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$(this._emitter);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "case ", null);
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, CaseStatement$getExpr_0$LCaseStatement$(this._statement), 0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ":\n", null);
	$this$0 = this._emitter;
	++ $this$0._indent;
};


function _DefaultStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_DefaultStatementEmitter], _StatementEmitter);
_DefaultStatementEmitter.prototype.emit$ = function () {
	var $this$0;
	JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$(this._emitter);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "default:\n", null);
	$this$0 = this._emitter;
	++ $this$0._indent;
};


function _WhileStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_WhileStatementEmitter], _StatementEmitter);
_WhileStatementEmitter.prototype.emit$ = function () {
	_StatementEmitter$emitLabelOfStatement_0$L_StatementEmitter$LLabellableStatement$(this, this._statement);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "while (", this._statement.getToken$());
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, WhileStatement$getExpr_0$LWhileStatement$(this._statement)).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ") {\n", null);
	JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, this._statement.getStatements$());
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "}\n", null);
};


function _TryStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_TryStatementEmitter], _StatementEmitter);
_TryStatementEmitter.prototype.emit$ = function () {
	var $this = this;
	var catchStatements;
	var finallyStatements;
	var $this$0;
	var $this$1;
	var tryStmt$0;
	var $this$2;
	var $this$3;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "try {\n", this._statement.getToken$());
	JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, TryStatement$getTryStatements_0$LTryStatement$(this._statement));
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "}", null);
	$this$0 = this._statement;
	catchStatements = $this$0._catchStatements;
	if (catchStatements.length !== 0) {
		$this$3 = this._emitter;
		$this$1 = $this$3._namer;
		tryStmt$0 = this._statement;
		++ $this$1._catchLevel;
		_Namer$_enterCatch_0$L_Namer$LTryStatement$F$F$S$V$S($this$1, tryStmt$0, (function (getCatchName) {
			var $this$0;
			var $this$1;
			var $this$2;
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, " catch (" + getCatchName() + ") {\n", null);
			if ($this._emitter._enableProfiler) {
				$this$0 = $this._emitter;
				++ $this$0._indent;
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$__jsx_profiler.resume($__jsx_profiler_ctx);\n", null);
				JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this._emitter);
			}
			JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$($this._emitter, catchStatements.map((function (s) {
				return s;
			})));
			if (! LocalVariable$getType_0$LLocalVariable$(CatchStatement$getLocal_0$LCatchStatement$(catchStatements[catchStatements.length - 1])).equals$LType$(Type.variantType)) {
				$this$1 = $this._emitter;
				++ $this$1._indent;
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "{\n", null);
				$this$2 = $this._emitter;
				++ $this$2._indent;
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "throw " + getCatchName() + ";\n", null);
				JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this._emitter);
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "}\n", null);
				JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this._emitter);
			}
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "}", null);
		}), "$__jsx_catch_" + ($this$1._catchLevel + ""));
		-- $this$1._catchLevel;
	}
	$this$2 = this._statement;
	finallyStatements = $this$2._finallyStatements;
	if (finallyStatements.length !== 0 || catchStatements.length === 0) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " finally {\n", null);
		JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, finallyStatements);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "}", null);
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "\n", null);
};


function _CatchStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_CatchStatementEmitter], _StatementEmitter);
_CatchStatementEmitter.prototype.emit$ = function () {
	var localType;
	var $this$0;
	var $this$1;
	var _emitter$0;
	$this$1 = this._statement;
	$this$0 = $this$1._local;
	localType = $this$0._type;
	if (localType instanceof ObjectType) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(_emitter$0 = this._emitter, "if (" + JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(_emitter$0).getNameOfLocalVariable$LLocalVariable$(CatchStatement$getLocal_0$LCatchStatement$(this._statement)) + " instanceof " + JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfClass$LClassDefinition$(localType.getClassDef$()) + ") {\n", this._statement.getToken$());
		JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, CatchStatement$getStatements_0$LCatchStatement$(this._statement));
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "} else ", null);
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "{\n", null);
		JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$(this._emitter, CatchStatement$getStatements_0$LCatchStatement$(this._statement));
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "}\n", null);
	}
};


function _ThrowStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_ThrowStatementEmitter], _StatementEmitter);
_ThrowStatementEmitter.prototype.emit$ = function () {
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "throw ", this._statement.getToken$());
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, ThrowStatement$getExpr_0$LThrowStatement$(this._statement)).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ";\n", null);
};


function _AssertStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_AssertStatementEmitter], _StatementEmitter);
_AssertStatementEmitter.prototype.emit$ = function () {
	var $this = this;
	var condExpr;
	var _statement$0;
	condExpr = (_statement$0 = this._statement)._expr;
	if (_statement$0._msgExpr != null) {
		JavaScriptEmitter$_emitAssertionWithMsg_0$LJavaScriptEmitter$F$V$LToken$SLExpression$(this._emitter, (function () {
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, condExpr).emit$N(0);
		}), condExpr._token, "assertion failure", this._statement._msgExpr);
	} else {
		JavaScriptEmitter$_emitAssertion_0$LJavaScriptEmitter$F$V$LToken$S(this._emitter, (function () {
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, condExpr).emit$N(0);
		}), condExpr._token, "assertion failure");
	}
};


function _LogStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_LogStatementEmitter], _StatementEmitter);
_LogStatementEmitter.prototype.emit$ = function () {
	var exprs;
	var i;
	var $this$0;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "console.log(", this._statement.getToken$());
	$this$0 = this._statement;
	exprs = $this$0._exprs;
	for (i = 0; i < exprs.length; ++ i) {
		if (i !== 0) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ", ", null);
		}
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, exprs[i]).emit$N(0);
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ");\n", null);
};


function _DebuggerStatementEmitter(emitter, statement) {
	this._emitter = emitter;
	this._statement = statement;
};

$__jsx_extend([_DebuggerStatementEmitter], _StatementEmitter);
_DebuggerStatementEmitter.prototype.emit$ = function () {
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "debugger;\n", this._statement.getToken$());
};


function _ExpressionEmitter() {
};

$__jsx_extend([_ExpressionEmitter], Object);
function _ExpressionEmitter$emitWithPrecedence_0$L_ExpressionEmitter$NNF$V$($this, outerOpPrecedence, precedence, callback) {
	if (precedence > outerOpPrecedence) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "(", null);
		callback();
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ")", null);
	} else {
		callback();
	}
};

_ExpressionEmitter.emitWithPrecedence_0$L_ExpressionEmitter$NNF$V$ = _ExpressionEmitter$emitWithPrecedence_0$L_ExpressionEmitter$NNF$V$;

function _LocalExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_LocalExpressionEmitter], _ExpressionEmitter);
_LocalExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var local;
	var $this$0;
	var _emitter$0;
	$this$0 = this._expr;
	local = $this$0._local;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(_emitter$0 = this._emitter, JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(_emitter$0).getNameOfLocalVariable$LLocalVariable$(local), Expression$getToken_0$LExpression$(this._expr));
};


function _ClassExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_ClassExpressionEmitter], _ExpressionEmitter);
_ClassExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var type;
	var this$0;
	var _emitter$0;
	this$0 = this._expr;
	type = this$0._parsedType;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(_emitter$0 = this._emitter, JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(_emitter$0).getNameOfClass$LClassDefinition$(type.getClassDef$()), null);
};


function _NullExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_NullExpressionEmitter], _ExpressionEmitter);
_NullExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var token;
	var $this$0;
	$this$0 = this._expr;
	token = $this$0._token;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "null", token);
};


function _BooleanLiteralExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_BooleanLiteralExpressionEmitter], _ExpressionEmitter);
_BooleanLiteralExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var token;
	var $this$0;
	$this$0 = this._expr;
	token = $this$0._token;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, token._value, token);
};


function _IntegerLiteralExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_IntegerLiteralExpressionEmitter], _ExpressionEmitter);
_IntegerLiteralExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var token;
	var $this$0;
	$this$0 = this._expr;
	token = $this$0._token;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "" + token._value, token);
};


function _NumberLiteralExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_NumberLiteralExpressionEmitter], _ExpressionEmitter);
_NumberLiteralExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var token;
	var str;
	var $this$0;
	$this$0 = this._expr;
	token = $this$0._token;
	str = token._value;
	if (outerOpPrecedence === _PropertyExpressionEmitter._operatorPrecedence && str.indexOf(".") === -1) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "(" + str + ")", token);
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "" + str, token);
	}
};


function _StringLiteralExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_StringLiteralExpressionEmitter], _ExpressionEmitter);
_StringLiteralExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var token;
	var $this$0;
	$this$0 = this._expr;
	token = $this$0._token;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, token._value, token);
};


function _RegExpLiteralExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_RegExpLiteralExpressionEmitter], _ExpressionEmitter);
_RegExpLiteralExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var token;
	var $this$0;
	$this$0 = this._expr;
	token = $this$0._token;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, token._value, token);
};


function _ArrayLiteralExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_ArrayLiteralExpressionEmitter], _ExpressionEmitter);
_ArrayLiteralExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var exprs;
	var i;
	var $this$0;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "[ ", null);
	$this$0 = this._expr;
	exprs = $this$0._exprs;
	for (i = 0; i < exprs.length; ++ i) {
		if (i !== 0) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ", ", null);
		}
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, exprs[i]).emit$N(0);
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " ]", null);
};


function _MapLiteralExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_MapLiteralExpressionEmitter], _ExpressionEmitter);
_MapLiteralExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var elements;
	var i;
	var element;
	var $this$0;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "({ ", null);
	$this$0 = this._expr;
	elements = $this$0._elements;
	for (i = 0; i < elements.length; ++ i) {
		element = elements[i];
		if (i !== 0) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ", ", null);
		}
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, Token$getValue_0$LToken$(element._key), element._key);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ": ", null);
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, element._expr).emit$N(0);
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " })", null);
};


function _ThisExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_ThisExpressionEmitter], _ExpressionEmitter);
_ThisExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var emittingFunction;
	emittingFunction = this._emitter._emittingFunction;
	if ((emittingFunction._flags & 8) !== 0) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "$this", Expression$getToken_0$LExpression$(this._expr));
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "this", Expression$getToken_0$LExpression$(this._expr));
	}
};


function _AsExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_AsExpressionEmitter], _ExpressionEmitter);
_AsExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var srcType;
	var destType;
	var prec;
	var this$0;
	srcType = UnaryExpression$getExpr_0$LUnaryExpression$(this._expr).getType$();
	this$0 = this._expr;
	destType = this$0._type;
	if (srcType instanceof ObjectType || srcType.equals$LType$(Type.variantType)) {
		if (srcType.isConvertibleTo$LType$(destType)) {
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$(this._expr)).emit$N(outerOpPrecedence);
			return;
		}
		if (destType instanceof ObjectType || destType instanceof FunctionType) {
			new _AsNoConvertExpressionEmitter(this._emitter, new AsNoConvertExpression(Expression$getToken_0$LExpression$(this._expr), UnaryExpression$getExpr_0$LUnaryExpression$(this._expr), this._expr.getType$())).emit$N(outerOpPrecedence);
			return;
		}
	}
	if ((srcType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(srcType) : srcType).equals$LType$(Type.booleanType)) {
		if (destType.equals$LType$(Type.integerType) || destType.equals$LType$(Type.numberType)) {
			prec = _UnaryExpressionEmitter._operatorPrecedence["+"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, "+", null);
			return;
		}
		if (destType.equals$LType$(Type.stringType)) {
			prec = _AdditiveExpressionEmitter._operatorPrecedence;
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, null, " + \"\"");
			return;
		}
	}
	if ((srcType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(srcType) : srcType).equals$LType$(Type.integerType)) {
		if (destType.equals$LType$(Type.booleanType)) {
			prec = _UnaryExpressionEmitter._operatorPrecedence["!"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, "!! ", null);
			return;
		}
		if (destType.equals$LType$(Type.numberType)) {
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$(this._expr)).emit$N(outerOpPrecedence);
			return;
		}
		if (destType.equals$LType$(Type.stringType)) {
			prec = _AdditiveExpressionEmitter._operatorPrecedence;
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, null, " + \"\"");
			return;
		}
	}
	if ((srcType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(srcType) : srcType).equals$LType$(Type.numberType)) {
		if (destType.equals$LType$(Type.booleanType)) {
			prec = _UnaryExpressionEmitter._operatorPrecedence["!"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, "!! ", null);
			return;
		}
		if (destType.equals$LType$(Type.integerType)) {
			prec = _BinaryNumberExpressionEmitter._operatorPrecedence["|"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, null, " | 0");
			return;
		}
		if (destType.equals$LType$(Type.stringType)) {
			prec = _AdditiveExpressionEmitter._operatorPrecedence;
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, null, " + \"\"");
			return;
		}
	}
	if ((srcType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(srcType) : srcType).equals$LType$(Type.stringType)) {
		if (destType.equals$LType$(Type.booleanType)) {
			prec = _UnaryExpressionEmitter._operatorPrecedence["!"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, "!! ", null);
			return;
		}
		if (destType.equals$LType$(Type.integerType)) {
			prec = _BinaryNumberExpressionEmitter._operatorPrecedence["|"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, null, " | 0");
			return;
		}
		if (destType.equals$LType$(Type.numberType)) {
			prec = _UnaryExpressionEmitter._operatorPrecedence["+"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, "+", null);
			return;
		}
	}
	if (srcType.equals$LType$(Type.variantType)) {
		if (destType.equals$LType$(Type.booleanType)) {
			prec = _UnaryExpressionEmitter._operatorPrecedence["!"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, "!! ", null);
			return;
		}
		if (destType.equals$LType$(Type.integerType)) {
			prec = _BinaryNumberExpressionEmitter._operatorPrecedence["|"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, null, " | 0");
			return;
		}
		if (destType.equals$LType$(Type.numberType)) {
			prec = _UnaryExpressionEmitter._operatorPrecedence["+"];
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, "+", null);
			return;
		}
		if (destType.equals$LType$(Type.stringType)) {
			prec = _AdditiveExpressionEmitter._operatorPrecedence;
			_AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS(this, outerOpPrecedence, prec, prec, null, " + \"\"");
			return;
		}
	}
	if (srcType.isConvertibleTo$LType$(destType)) {
		if (srcType instanceof NullableType) {
			JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$(this._expr), outerOpPrecedence);
		} else {
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$(this._expr)).emit$N(outerOpPrecedence);
		}
		return;
	}
	throw new Error("explicit conversion logic unknown from " + srcType.toString() + " to " + destType.toString());
};


function _AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS($this, outerOpPrecedence, opPrecedence, innerOpPrecedence, prefix, postfix) {
	if (opPrecedence >= outerOpPrecedence) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "(", null);
	}
	if (prefix != null) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, prefix, Expression$getToken_0$LExpression$($this._expr));
	}
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N($this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$($this._expr), innerOpPrecedence);
	if (postfix != null) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, postfix, Expression$getToken_0$LExpression$($this._expr));
	}
	if (opPrecedence >= outerOpPrecedence) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ")", null);
	}
};

_AsExpressionEmitter._emitWithParens_0$L_AsExpressionEmitter$NNNUSUS = _AsExpressionEmitter$_emitWithParens_0$L_AsExpressionEmitter$NNNUSUS;

function _AsNoConvertExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_AsNoConvertExpressionEmitter], _ExpressionEmitter);
_AsNoConvertExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var $this = this;
	var emitWithAssertion;
	var srcType;
	var destType;
	var destClassDef;
	var this$0;
	if (this._emitter._enableRunTimeTypeCheck) {
		emitWithAssertion = (function (emitCheckExpr, message) {
			var token;
			var $this$0;
			var $this$1;
			$this$0 = $this._expr;
			token = $this$0._token;
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "(function ($v) {\n", token);
			$this$1 = $this._emitter;
			++ $this$1._indent;
			JavaScriptEmitter$_emitAssertion_0$LJavaScriptEmitter$F$V$LToken$S($this._emitter, emitCheckExpr, token, message);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "return $v;\n", token);
			JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this._emitter);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "}(", token);
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$($this._expr)).emit$N(0);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "))", token);
		});
		srcType = UnaryExpression$getExpr_0$LUnaryExpression$(this._expr).getType$();
		this$0 = this._expr;
		destType = this$0._type;
		if (srcType.equals$LType$(destType) || srcType.equals$LType$(destType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(destType) : destType)) {
		} else {
			if (destType instanceof VariantType) {
			} else {
				if (srcType instanceof ObjectType && srcType.isConvertibleTo$LType$(destType)) {
				} else {
					if (destType.equals$LType$(Type.booleanType)) {
						emitWithAssertion((function () {
							JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "typeof $v === \"boolean\"", Expression$getToken_0$LExpression$($this._expr));
						}), "detected invalid cast, value is not a boolean");
						return;
					} else {
						if ((destType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(destType) : destType).equals$LType$(Type.booleanType)) {
							emitWithAssertion((function () {
								JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$v == null || typeof $v === \"boolean\"", Expression$getToken_0$LExpression$($this._expr));
							}), "detected invalid cast, value is not a boolean nor null");
							return;
						} else {
							if (destType.equals$LType$(Type.numberType)) {
								emitWithAssertion((function () {
									JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "typeof $v === \"number\"", Expression$getToken_0$LExpression$($this._expr));
								}), "detected invalid cast, value is not a number");
								return;
							} else {
								if ((destType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(destType) : destType).equals$LType$(Type.numberType)) {
									emitWithAssertion((function () {
										JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$v == null || typeof $v === \"number\"", Expression$getToken_0$LExpression$($this._expr));
									}), "detected invalid cast, value is not a number nor nullable");
									return;
								} else {
									if (destType.equals$LType$(Type.integerType)) {
										emitWithAssertion((function () {
											JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "typeof $v === \"number\" && (! $__jsx_isFinite($v) || $v % 1 === 0)", Expression$getToken_0$LExpression$($this._expr));
										}), "detected invalid cast, value is not an int");
										return;
									} else {
										if ((destType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(destType) : destType).equals$LType$(Type.integerType)) {
											emitWithAssertion((function () {
												JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$v == null || typeof $v === \"number\" && (! $__jsx_isFinite($v) || $v % 1 === 0)", Expression$getToken_0$LExpression$($this._expr));
											}), "detected invalid cast, value is not an int nor null");
											return;
										} else {
											if (destType.equals$LType$(Type.stringType)) {
												emitWithAssertion((function () {
													JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "typeof $v === \"string\"", Expression$getToken_0$LExpression$($this._expr));
												}), "detected invalid cast, value is not a string");
												return;
											} else {
												if ((destType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(destType) : destType).equals$LType$(Type.stringType)) {
													emitWithAssertion((function () {
														JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$v == null || typeof $v === \"string\"", Expression$getToken_0$LExpression$($this._expr));
													}), "detected invalid cast, value is not a string nor null");
													return;
												} else {
													if (destType instanceof FunctionType) {
														emitWithAssertion((function () {
															JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$v == null || typeof $v === \"function\"", Expression$getToken_0$LExpression$($this._expr));
														}), "detected invalid cast, value is not a function or null");
														return;
													} else {
														if (destType instanceof ObjectType) {
															destClassDef = destType.getClassDef$();
															if ((destClassDef.flags$() & 256) !== 0) {
															} else {
																if (destClassDef instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(destClassDef) === "Array") {
																	emitWithAssertion((function () {
																		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$v == null || $v instanceof Array", Expression$getToken_0$LExpression$($this._expr));
																	}), "detected invalid cast, value is not an Array or null");
																	return;
																} else {
																	if (destClassDef instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(destClassDef) === "Map") {
																		if (srcType.equals$LType$(Type.variantType)) {
																			emitWithAssertion((function () {
																				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$v == null || typeof $v === \"object\" || typeof $v === \"function\"", Expression$getToken_0$LExpression$($this._expr));
																			}), "detected invalid cast, value is not a Map or null");
																		} else {
																			emitWithAssertion((function () {
																				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$v == null || typeof $v === \"object\"", Expression$getToken_0$LExpression$($this._expr));
																			}), "detected invalid cast, value is not a Map or null");
																		}
																		return;
																	} else {
																		if ((destClassDef.flags$() & 192) === 0) {
																			emitWithAssertion((function () {
																				var _emitter$0;
																				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(_emitter$0 = $this._emitter, "$v == null || $v instanceof " + JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(_emitter$0).getNameOfClass$LClassDefinition$(destClassDef), Expression$getToken_0$LExpression$($this._expr));
																			}), "detected invalid cast, value is not an instance of the designated type or null");
																			return;
																		} else {
																			emitWithAssertion((function () {
																				var _emitter$0;
																				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(_emitter$0 = $this._emitter, "$v == null || $v.$__jsx_implements_" + JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(_emitter$0).getNameOfClass$LClassDefinition$(destClassDef), Expression$getToken_0$LExpression$($this._expr));
																			}), "detected invalid cast, value is not an instance of the designated type or null");
																			return;
																		}
																	}
																}
															}
														} else {
															throw new Error("Hmm");
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$(this._expr)).emit$N(outerOpPrecedence);
	return;
};


function _OperatorExpressionEmitter() {
};

$__jsx_extend([_OperatorExpressionEmitter], _ExpressionEmitter);
_OperatorExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var $this = this;
	_ExpressionEmitter$emitWithPrecedence_0$L_ExpressionEmitter$NNF$V$(this, outerOpPrecedence, this._getPrecedence$(), (function () {
		$this._emit$();
	}));
};


_OperatorExpressionEmitter.prototype._emit$ = function () {
};


function _UnaryExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_UnaryExpressionEmitter], _OperatorExpressionEmitter);
_UnaryExpressionEmitter.prototype._emit$ = function () {
	var opToken;
	var $this$0;
	$this$0 = this._expr;
	opToken = $this$0._token;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, opToken._value + " ", opToken);
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$(this._expr)).emit$N(this._getPrecedence$());
};


_UnaryExpressionEmitter.prototype._getPrecedence$ = function () {
	return _UnaryExpressionEmitter._operatorPrecedence[Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(this._expr))];
};


function _UnaryExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_UnaryExpressionEmitter._operatorPrecedence[op] = precedence;
};

_UnaryExpressionEmitter._setOperatorPrecedence$SN = _UnaryExpressionEmitter$_setOperatorPrecedence$SN;

function _PostfixExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_PostfixExpressionEmitter], _UnaryExpressionEmitter);
_PostfixExpressionEmitter.prototype._emit$ = function () {
	var opToken;
	var $this$0;
	var _expr$0;
	$this$0 = _expr$0 = this._expr;
	opToken = $this$0._token;
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$(_expr$0)).emit$N(_PostfixExpressionEmitter._operatorPrecedence[Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(this._expr))]);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, opToken._value, opToken);
};


_PostfixExpressionEmitter.prototype._getPrecedence$ = function () {
	return _PostfixExpressionEmitter._operatorPrecedence[Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(this._expr))];
};


function _PostfixExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_PostfixExpressionEmitter._operatorPrecedence[op] = precedence;
};

_PostfixExpressionEmitter._setOperatorPrecedence$SN = _PostfixExpressionEmitter$_setOperatorPrecedence$SN;

function _InstanceofExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_InstanceofExpressionEmitter], _ExpressionEmitter);
_InstanceofExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var $this = this;
	var expectedType;
	var $this$0;
	$this$0 = this._expr;
	expectedType = $this$0._expectedType;
	if (expectedType.getClassDef$() instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(expectedType.getClassDef$()) === "Array") {
		_ExpressionEmitter$emitWithPrecedence_0$L_ExpressionEmitter$NNF$V$(this, outerOpPrecedence, _InstanceofExpressionEmitter._operatorPrecedence, (function () {
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$($this._expr)).emit$N(_InstanceofExpressionEmitter._operatorPrecedence);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, " instanceof Array", Expression$getToken_0$LExpression$($this._expr));
		}));
	} else {
		if (expectedType.getClassDef$() instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(expectedType.getClassDef$()) === "Map") {
			_ExpressionEmitter$emitWithPrecedence_0$L_ExpressionEmitter$NNF$V$(this, outerOpPrecedence, _InstanceofExpressionEmitter._operatorPrecedence, (function () {
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "(typeof(", Expression$getToken_0$LExpression$($this._expr));
				JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$($this._expr)).emit$N(_InstanceofExpressionEmitter._operatorPrecedence);
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ") === \"object\")", Expression$getToken_0$LExpression$($this._expr));
			}));
		} else {
			if ((expectedType.getClassDef$().flags$() & 192) === 0) {
				_ExpressionEmitter$emitWithPrecedence_0$L_ExpressionEmitter$NNF$V$(this, outerOpPrecedence, _InstanceofExpressionEmitter._operatorPrecedence, (function () {
					JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$($this._expr)).emit$N(_InstanceofExpressionEmitter._operatorPrecedence);
					JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, " instanceof " + _InstanceofExpressionEmitter$getInstanceofNameFromClassDef_0$L_InstanceofExpressionEmitter$LClassDefinition$($this, expectedType.getClassDef$()), Expression$getToken_0$LExpression$($this._expr));
				}));
			} else {
				_ExpressionEmitter$emitWithPrecedence_0$L_ExpressionEmitter$NNF$V$(this, outerOpPrecedence, _CallExpressionEmitter._operatorPrecedence, (function () {
					var _emitter$0;
					JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(_emitter$0 = $this._emitter, "(function (o) { return !! (o && o.$__jsx_implements_" + JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(_emitter$0).getNameOfClass$LClassDefinition$(expectedType.getClassDef$()) + "); })(", Expression$getToken_0$LExpression$($this._expr));
					JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, UnaryExpression$getExpr_0$LUnaryExpression$($this._expr)).emit$N(0);
					JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ")", Expression$getToken_0$LExpression$($this._expr));
				}));
			}
		}
	}
};


function _InstanceofExpressionEmitter$getInstanceofNameFromClassDef_0$L_InstanceofExpressionEmitter$LClassDefinition$($this, classDef) {
	var name;
	var $this$0;
	var this$0$0;
	if (classDef instanceof InstantiatedClassDefinition) {
		$this$0 = classDef;
		this$0$0 = $this$0._templateClassDef;
		name = this$0$0._className;
		if (name === "Map") {
			name = "Object";
		}
	} else {
		name = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$($this._emitter).getNameOfClass$LClassDefinition$(classDef);
	}
	return name;
};

_InstanceofExpressionEmitter.getInstanceofNameFromClassDef_0$L_InstanceofExpressionEmitter$LClassDefinition$ = _InstanceofExpressionEmitter$getInstanceofNameFromClassDef_0$L_InstanceofExpressionEmitter$LClassDefinition$;

function _InstanceofExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_InstanceofExpressionEmitter._operatorPrecedence = precedence;
};

_InstanceofExpressionEmitter._setOperatorPrecedence$SN = _InstanceofExpressionEmitter$_setOperatorPrecedence$SN;

function _PropertyExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_PropertyExpressionEmitter], _UnaryExpressionEmitter);
_PropertyExpressionEmitter.prototype._emit$ = function () {
	var expr;
	var exprType;
	var identifierToken;
	var classDef;
	var name;
	var exprType$0;
	var exprType$1;
	expr = this._expr;
	exprType = expr._type;
	identifierToken = expr._identifierToken;
	if (expr._expr.isClassSpecifier$() && expr._expr.getType$().getClassDef$() == Type.numberType.getClassDef$()) {
		switch (identifierToken._value) {
		case "parseInt":
		case "parseFloat":
		case "isNaN":
		case "isFinite":
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, '$__jsx_' + identifierToken._value, identifierToken);
			return;
		}
	} else {
		if (expr._expr.isClassSpecifier$() && expr._expr.getType$().getClassDef$() == Type.stringType.getClassDef$()) {
			switch (identifierToken._value) {
			case "encodeURIComponent":
			case "decodeURIComponent":
			case "encodeURI":
			case "decodeURI":
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, '$__jsx_' + identifierToken._value, identifierToken);
				return;
			}
		}
	}
	classDef = expr.getHolderType$().getClassDef$();
	if (expr._expr.isClassSpecifier$()) {
		name = identifierToken._value;
		exprType$0 = expr._type;
		if (! (exprType$0 instanceof FunctionType) ? false : exprType$0.isAssignable$() ? false : true) {
			name = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfStaticFunction$LClassDefinition$SALType$(classDef, name, ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(exprType));
		} else {
			name = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfClass$LClassDefinition$(classDef) + "." + JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfStaticVariable$LClassDefinition$S(classDef, name);
		}
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, name, identifierToken);
	} else {
		name = identifierToken._value;
		exprType$1 = expr._type;
		if (! (exprType$1 instanceof FunctionType) ? false : exprType$1.isAssignable$() ? false : true) {
			name = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfMethod$LClassDefinition$SALType$(classDef, name, ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(exprType));
		} else {
			name = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfProperty$LClassDefinition$S(classDef, name);
		}
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, expr._expr).emit$N(_PropertyExpressionEmitter._operatorPrecedence);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "." + name, identifierToken);
	}
};


_PropertyExpressionEmitter.prototype._getPrecedence$ = function () {
	return _PropertyExpressionEmitter._operatorPrecedence;
};


function _PropertyExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_PropertyExpressionEmitter._operatorPrecedence = precedence;
};

_PropertyExpressionEmitter._setOperatorPrecedence$SN = _PropertyExpressionEmitter$_setOperatorPrecedence$SN;

function _FunctionExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_FunctionExpressionEmitter], _OperatorExpressionEmitter);
_FunctionExpressionEmitter.prototype._emit$ = function () {
	var $this = this;
	var funcDef;
	var funcLocal;
	var $this$0;
	$this$0 = this._expr;
	funcDef = $this$0._funcDef;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "(", funcDef._token);
	funcLocal = funcDef._funcLocal;
	JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).enterScope$LLocalVariable$F$V$(funcLocal, (function () {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "function " + (funcLocal != null ? JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$($this._emitter).getNameOfLocalVariable$LLocalVariable$(funcLocal) : "") + "(", funcDef._token);
		JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$($this._emitter).enterFunction$LMemberFunctionDefinition$F$V$(funcDef, (function () {
			var args;
			var i;
			args = MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$(funcDef);
			for (i = 0; i < args.length; ++ i) {
				if (i !== 0) {
					JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ", ", MemberDefinition$getToken_0$LMemberDefinition$(funcDef));
				}
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$($this._emitter).getNameOfLocalVariable$LLocalVariable$(args[i]), MemberDefinition$getToken_0$LMemberDefinition$(funcDef));
			}
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ") {\n", MemberDefinition$getToken_0$LMemberDefinition$(funcDef));
			JavaScriptEmitter$_advanceIndent_0$LJavaScriptEmitter$($this._emitter);
			JavaScriptEmitter$_emitFunctionBody_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this._emitter, funcDef);
			JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this._emitter);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "}", MemberDefinition$getToken_0$LMemberDefinition$(funcDef));
		}));
	}));
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ")", funcDef._token);
};


_FunctionExpressionEmitter.prototype._getPrecedence$ = function () {
	return _FunctionExpressionEmitter._operatorPrecedence;
};


function _FunctionExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_FunctionExpressionEmitter._operatorPrecedence = precedence;
};

_FunctionExpressionEmitter._setOperatorPrecedence$SN = _FunctionExpressionEmitter$_setOperatorPrecedence$SN;

function _AdditiveExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_AdditiveExpressionEmitter], _OperatorExpressionEmitter);
_AdditiveExpressionEmitter.prototype._emit$ = function () {
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, BinaryExpression$getFirstExpr_0$LBinaryExpression$(this._expr), _AdditiveExpressionEmitter._operatorPrecedence);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " + ", Expression$getToken_0$LExpression$(this._expr));
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, BinaryExpression$getSecondExpr_0$LBinaryExpression$(this._expr), _AdditiveExpressionEmitter._operatorPrecedence - 1);
};


_AdditiveExpressionEmitter.prototype._getPrecedence$ = function () {
	return _AdditiveExpressionEmitter._operatorPrecedence;
};


function _AdditiveExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_AdditiveExpressionEmitter._operatorPrecedence = precedence;
};

_AdditiveExpressionEmitter._setOperatorPrecedence$SN = _AdditiveExpressionEmitter$_setOperatorPrecedence$SN;

function _AssignmentExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_AssignmentExpressionEmitter], _OperatorExpressionEmitter);
_AssignmentExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	if (Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(this._expr)) === "/=" && Type$resolveIfNullable_0$LType$(BinaryExpression$getFirstExpr_0$LBinaryExpression$(this._expr).getType$()).equals$LType$(Type.integerType)) {
		_AssignmentExpressionEmitter$_emitDivAssignToInt_0$L_AssignmentExpressionEmitter$N(this, outerOpPrecedence);
		return;
	}
	_OperatorExpressionEmitter.prototype.emit$N.call(this, outerOpPrecedence);
};


_AssignmentExpressionEmitter.prototype._emit$ = function () {
	var op;
	var $this$0;
	var $this$1;
	var _expr$0;
	$this$1 = _expr$0 = this._expr;
	$this$0 = $this$1._token;
	op = $this$0._value;
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, BinaryExpression$getFirstExpr_0$LBinaryExpression$(_expr$0)).emit$N(_AssignmentExpressionEmitter._operatorPrecedence[op]);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " " + op + " ", Expression$getToken_0$LExpression$(this._expr));
	JavaScriptEmitter$_emitRHSOfAssignment_0$LJavaScriptEmitter$LExpression$LType$(this._emitter, BinaryExpression$getSecondExpr_0$LBinaryExpression$(this._expr), BinaryExpression$getFirstExpr_0$LBinaryExpression$(this._expr).getType$());
};


function _AssignmentExpressionEmitter$_emitDivAssignToInt_0$L_AssignmentExpressionEmitter$N($this, outerOpPrecedence) {
	var firstExpr;
	var secondExpr;
	var propertyExpr;
	var name;
	var classDef;
	var $this$0;
	var $this$1;
	var _expr$0;
	$this$0 = _expr$0 = $this._expr;
	firstExpr = $this$0._expr1;
	$this$1 = _expr$0;
	secondExpr = $this$1._expr2;
	if (firstExpr instanceof PropertyExpression || firstExpr instanceof ArrayExpression) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "$__jsx_div_assign(", Expression$getToken_0$LExpression$($this._expr));
		if (firstExpr instanceof PropertyExpression) {
			propertyExpr = firstExpr;
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, propertyExpr._expr).emit$N(0);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ", ", Expression$getToken_0$LExpression$($this._expr));
			if (propertyExpr._expr.isClassSpecifier$()) {
				classDef = propertyExpr.getHolderType$().getClassDef$();
				name = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$($this._emitter).getNameOfClass$LClassDefinition$(classDef) + "." + JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$($this._emitter).getNameOfStaticVariable$LClassDefinition$S(classDef, Token$getValue_0$LToken$(propertyExpr._identifierToken));
			} else {
				name = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$($this._emitter).getNameOfProperty$LClassDefinition$S(propertyExpr.getHolderType$().getClassDef$(), Token$getValue_0$LToken$(propertyExpr._identifierToken));
			}
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, Util$encodeStringLiteral$S(name), propertyExpr._identifierToken);
		} else {
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, BinaryExpression$getFirstExpr_0$LBinaryExpression$(firstExpr)).emit$N(0);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ", ", Expression$getToken_0$LExpression$($this._expr));
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, BinaryExpression$getSecondExpr_0$LBinaryExpression$(firstExpr)).emit$N(0);
		}
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ", ", Expression$getToken_0$LExpression$($this._expr));
		JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N($this._emitter, secondExpr, 0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ")", Expression$getToken_0$LExpression$($this._expr));
	} else {
		_ExpressionEmitter$emitWithPrecedence_0$L_ExpressionEmitter$NNF$V$($this, outerOpPrecedence, _AssignmentExpressionEmitter._operatorPrecedence["="], (function () {
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, firstExpr).emit$N(_AssignmentExpressionEmitter._operatorPrecedence["="]);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, " = (", Expression$getToken_0$LExpression$($this._expr));
			JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N($this._emitter, firstExpr, _BinaryNumberExpressionEmitter._operatorPrecedence["/"]);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, " / ", Expression$getToken_0$LExpression$($this._expr));
			JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N($this._emitter, secondExpr, _BinaryNumberExpressionEmitter._operatorPrecedence["/"] - 1);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ") | 0", Expression$getToken_0$LExpression$($this._expr));
		}));
	}
};

_AssignmentExpressionEmitter._emitDivAssignToInt_0$L_AssignmentExpressionEmitter$N = _AssignmentExpressionEmitter$_emitDivAssignToInt_0$L_AssignmentExpressionEmitter$N;

_AssignmentExpressionEmitter.prototype._getPrecedence$ = function () {
	return _AssignmentExpressionEmitter._operatorPrecedence[Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(this._expr))];
};


function _AssignmentExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_AssignmentExpressionEmitter._operatorPrecedence[op] = precedence;
};

_AssignmentExpressionEmitter._setOperatorPrecedence$SN = _AssignmentExpressionEmitter$_setOperatorPrecedence$SN;

function _EqualityExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_EqualityExpressionEmitter], _OperatorExpressionEmitter);
_EqualityExpressionEmitter.prototype._emit$ = function () {
	var op;
	var emitOp;
	var $this$0;
	var $this$1;
	var _expr$0;
	$this$1 = _expr$0 = this._expr;
	$this$0 = $this$1._token;
	op = $this$0._value;
	emitOp = op;
	if (BinaryExpression$getFirstExpr_0$LBinaryExpression$(_expr$0).getType$() instanceof PrimitiveType && BinaryExpression$getSecondExpr_0$LBinaryExpression$(this._expr).getType$() instanceof PrimitiveType) {
		emitOp += "=";
	}
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, BinaryExpression$getFirstExpr_0$LBinaryExpression$(this._expr)).emit$N(_EqualityExpressionEmitter._operatorPrecedence[op] - 1);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " " + emitOp + " ", Expression$getToken_0$LExpression$(this._expr));
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, BinaryExpression$getSecondExpr_0$LBinaryExpression$(this._expr)).emit$N(_EqualityExpressionEmitter._operatorPrecedence[op] - 1);
};


_EqualityExpressionEmitter.prototype._getPrecedence$ = function () {
	return _EqualityExpressionEmitter._operatorPrecedence[Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(this._expr))];
};


function _EqualityExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_EqualityExpressionEmitter._operatorPrecedence[op] = precedence;
};

_EqualityExpressionEmitter._setOperatorPrecedence$SN = _EqualityExpressionEmitter$_setOperatorPrecedence$SN;

function _InExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_InExpressionEmitter], _OperatorExpressionEmitter);
_InExpressionEmitter.prototype._emit$ = function () {
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, BinaryExpression$getFirstExpr_0$LBinaryExpression$(this._expr), _InExpressionEmitter._operatorPrecedence);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " in ", Expression$getToken_0$LExpression$(this._expr));
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, BinaryExpression$getSecondExpr_0$LBinaryExpression$(this._expr)).emit$N(_InExpressionEmitter._operatorPrecedence);
};


_InExpressionEmitter.prototype._getPrecedence$ = function () {
	return _InExpressionEmitter._operatorPrecedence;
};


function _InExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_InExpressionEmitter._operatorPrecedence = precedence;
};

_InExpressionEmitter._setOperatorPrecedence$SN = _InExpressionEmitter$_setOperatorPrecedence$SN;

function _LogicalExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_LogicalExpressionEmitter], _OperatorExpressionEmitter);
_LogicalExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var $this$0;
	var logicalExpr$0;
	$this$0 = this._emitter;
	logicalExpr$0 = this._expr;
	if (JavaScriptEmitter$getStash_0$LJavaScriptEmitter$LStashable$($this$0, logicalExpr$0).shouldBooleanize) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "!! (", Expression$getToken_0$LExpression$(this._expr));
		_OperatorExpressionEmitter.prototype.emit$N.call(this, 0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ")", Expression$getToken_0$LExpression$(this._expr));
		return;
	}
	_OperatorExpressionEmitter.prototype.emit$N.call(this, outerOpPrecedence);
};


_LogicalExpressionEmitter.prototype._emit$ = function () {
	var op;
	var $this$0;
	var $this$1;
	var _expr$0;
	$this$1 = _expr$0 = this._expr;
	$this$0 = $this$1._token;
	op = $this$0._value;
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, BinaryExpression$getFirstExpr_0$LBinaryExpression$(_expr$0)).emit$N(_LogicalExpressionEmitter._operatorPrecedence[op]);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " " + op + " ", Expression$getToken_0$LExpression$(this._expr));
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, BinaryExpression$getSecondExpr_0$LBinaryExpression$(this._expr)).emit$N(_LogicalExpressionEmitter._operatorPrecedence[op] - 1);
};


_LogicalExpressionEmitter.prototype._getPrecedence$ = function () {
	return _LogicalExpressionEmitter._operatorPrecedence[Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(this._expr))];
};


function _LogicalExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_LogicalExpressionEmitter._operatorPrecedence[op] = precedence;
};

_LogicalExpressionEmitter._setOperatorPrecedence$SN = _LogicalExpressionEmitter$_setOperatorPrecedence$SN;

function _ShiftExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_ShiftExpressionEmitter], _OperatorExpressionEmitter);
_ShiftExpressionEmitter.prototype._emit$ = function () {
	var op;
	var $this$0;
	var $this$1;
	var _expr$0;
	$this$1 = _expr$0 = this._expr;
	$this$0 = $this$1._token;
	op = $this$0._value;
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, BinaryExpression$getFirstExpr_0$LBinaryExpression$(_expr$0), _ShiftExpressionEmitter._operatorPrecedence[op]);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " " + op + " ", Expression$getToken_0$LExpression$(this._expr));
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, BinaryExpression$getSecondExpr_0$LBinaryExpression$(this._expr), _ShiftExpressionEmitter._operatorPrecedence[op] - 1);
};


_ShiftExpressionEmitter.prototype._getPrecedence$ = function () {
	return _ShiftExpressionEmitter._operatorPrecedence[Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(this._expr))];
};


function _ShiftExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_ShiftExpressionEmitter._operatorPrecedence[op] = precedence;
};

_ShiftExpressionEmitter._setOperatorPrecedence$SN = _ShiftExpressionEmitter$_setOperatorPrecedence$SN;

function _BinaryNumberExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_BinaryNumberExpressionEmitter], _OperatorExpressionEmitter);
_BinaryNumberExpressionEmitter.prototype._emit$ = function () {
	var op;
	var $this$0;
	var $this$1;
	var _expr$0;
	$this$1 = _expr$0 = this._expr;
	$this$0 = $this$1._token;
	op = $this$0._value;
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, BinaryExpression$getFirstExpr_0$LBinaryExpression$(_expr$0), _BinaryNumberExpressionEmitter._operatorPrecedence[op]);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " " + op + " ", Expression$getToken_0$LExpression$(this._expr));
	JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N(this._emitter, BinaryExpression$getSecondExpr_0$LBinaryExpression$(this._expr), _BinaryNumberExpressionEmitter._operatorPrecedence[op] - 1);
};


_BinaryNumberExpressionEmitter.prototype._getPrecedence$ = function () {
	return _BinaryNumberExpressionEmitter._operatorPrecedence[Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(this._expr))];
};


function _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_BinaryNumberExpressionEmitter._operatorPrecedence[op] = precedence;
};

_BinaryNumberExpressionEmitter._setOperatorPrecedence$SN = _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN;

function _ArrayExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_ArrayExpressionEmitter], _OperatorExpressionEmitter);
_ArrayExpressionEmitter.prototype._emit$ = function () {
	var secondExpr;
	var emitted;
	var propertyName;
	var $this$0;
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, BinaryExpression$getFirstExpr_0$LBinaryExpression$(this._expr)).emit$N(_ArrayExpressionEmitter._operatorPrecedence);
	$this$0 = this._expr;
	secondExpr = $this$0._expr2;
	emitted = false;
	if (secondExpr instanceof StringLiteralExpression) {
		propertyName = Util$decodeStringLiteral$S(Token$getValue_0$LToken$(secondExpr._token));
		if (propertyName.match(/^[\$_A-Za-z][\$_0-9A-Za-z]*$/) != null && ! $__jsx_ObjectHasOwnProperty.call(Util._ecma262reserved, propertyName)) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ".", Expression$getToken_0$LExpression$(this._expr));
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, propertyName, secondExpr._token);
			emitted = true;
		}
	}
	if (! emitted) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "[", Expression$getToken_0$LExpression$(this._expr));
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, secondExpr).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "]", null);
	}
};


_ArrayExpressionEmitter.prototype._getPrecedence$ = function () {
	return _ArrayExpressionEmitter._operatorPrecedence;
};


function _ArrayExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_ArrayExpressionEmitter._operatorPrecedence = precedence;
};

_ArrayExpressionEmitter._setOperatorPrecedence$SN = _ArrayExpressionEmitter$_setOperatorPrecedence$SN;

function _ConditionalExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_ConditionalExpressionEmitter], _OperatorExpressionEmitter);
_ConditionalExpressionEmitter.prototype._emit$ = function () {
	var precedence;
	var ifTrueExpr;
	var $this$0;
	precedence = (ConditionalExpression$getIfTrueExpr_0$LConditionalExpression$(this._expr) != null ? _ConditionalExpressionEmitter._operatorPrecedence : _LogicalExpressionEmitter._operatorPrecedence["||"]);
	$this$0 = this._expr;
	ifTrueExpr = $this$0._ifTrueExpr;
	if (ifTrueExpr != null) {
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, ConditionalExpression$getCondExpr_0$LConditionalExpression$(this._expr)).emit$N(precedence - 1);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " ? ", null);
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, ifTrueExpr).emit$N(precedence);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " : ", null);
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, ConditionalExpression$getIfFalseExpr_0$LConditionalExpression$(this._expr)).emit$N(precedence);
	} else {
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, ConditionalExpression$getCondExpr_0$LConditionalExpression$(this._expr)).emit$N(precedence - 1);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, " || ", null);
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, ConditionalExpression$getIfFalseExpr_0$LConditionalExpression$(this._expr)).emit$N(precedence - 1);
	}
};


_ConditionalExpressionEmitter.prototype._getPrecedence$ = function () {
	return (ConditionalExpression$getIfTrueExpr_0$LConditionalExpression$(this._expr) != null ? _ConditionalExpressionEmitter._operatorPrecedence : _LogicalExpressionEmitter._operatorPrecedence["||"]);
};


function _ConditionalExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_ConditionalExpressionEmitter._operatorPrecedence = precedence;
};

_ConditionalExpressionEmitter._setOperatorPrecedence$SN = _ConditionalExpressionEmitter$_setOperatorPrecedence$SN;

function _CallExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_CallExpressionEmitter], _OperatorExpressionEmitter);
_CallExpressionEmitter.prototype._emit$ = function () {
	var calleeExpr;
	var $this$0;
	if (_CallExpressionEmitter$_emitSpecial_0$L_CallExpressionEmitter$(this)) {
		return;
	}
	$this$0 = this._expr;
	calleeExpr = $this$0._expr;
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, calleeExpr).emit$N(_CallExpressionEmitter._operatorPrecedence);
	JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$(this._emitter, Expression$getToken_0$LExpression$(this._expr), "(", CallExpression$getArguments_0$LCallExpression$(this._expr), ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(Type$resolveIfNullable_0$LType$(CallExpression$getExpr_0$LCallExpression$(this._expr).getType$())));
};


_CallExpressionEmitter.prototype._getPrecedence$ = function () {
	return _CallExpressionEmitter._operatorPrecedence;
};


function _CallExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_CallExpressionEmitter._operatorPrecedence = precedence;
};

_CallExpressionEmitter._setOperatorPrecedence$SN = _CallExpressionEmitter$_setOperatorPrecedence$SN;

function _CallExpressionEmitter$_emitSpecial_0$L_CallExpressionEmitter$($this) {
	var calleeExpr;
	var $this$0;
	$this$0 = $this._expr;
	calleeExpr = $this$0._expr;
	if (! (calleeExpr instanceof PropertyExpression)) {
		return false;
	}
	if (_CallExpressionEmitter$_emitIfJsInvoke_0$L_CallExpressionEmitter$LPropertyExpression$($this, calleeExpr)) {
		return true;
	}
	if (_CallExpressionEmitter$_emitIfJsEval_0$L_CallExpressionEmitter$LPropertyExpression$($this, calleeExpr)) {
		return true;
	} else {
		if (_CallExpressionEmitter$_emitCallsToMap_0$L_CallExpressionEmitter$LPropertyExpression$($this, calleeExpr)) {
			return true;
		} else {
			if (_CallExpressionEmitter$_emitIfMathAbs_0$L_CallExpressionEmitter$LPropertyExpression$($this, calleeExpr)) {
				return true;
			}
		}
	}
	return false;
};

_CallExpressionEmitter._emitSpecial_0$L_CallExpressionEmitter$ = _CallExpressionEmitter$_emitSpecial_0$L_CallExpressionEmitter$;

function _CallExpressionEmitter$_emitIfJsEval_0$L_CallExpressionEmitter$LPropertyExpression$($this, calleeExpr) {
	var classDef;
	var args;
	var $this$0;
	if (! (calleeExpr._type instanceof StaticFunctionType)) {
		return false;
	}
	if (Token$getValue_0$LToken$(calleeExpr._identifierToken) !== "eval") {
		return false;
	}
	classDef = calleeExpr._expr.getType$().getClassDef$();
	if (! JavaScriptEmitter$isJsModule_0$LJavaScriptEmitter$LClassDefinition$($this._emitter, classDef)) {
		return false;
	}
	$this$0 = $this._expr;
	args = $this$0._args;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "eval(", calleeExpr._token);
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, args[0]).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ")", calleeExpr._token);
	return true;
};

_CallExpressionEmitter._emitIfJsEval_0$L_CallExpressionEmitter$LPropertyExpression$ = _CallExpressionEmitter$_emitIfJsEval_0$L_CallExpressionEmitter$LPropertyExpression$;

function _CallExpressionEmitter$_emitIfJsInvoke_0$L_CallExpressionEmitter$LPropertyExpression$($this, calleeExpr) {
	var classDef;
	var args;
	var $this$0;
	if (! (calleeExpr._type instanceof StaticFunctionType)) {
		return false;
	}
	if (Token$getValue_0$LToken$(calleeExpr._identifierToken) !== "invoke") {
		return false;
	}
	classDef = calleeExpr._expr.getType$().getClassDef$();
	if (! JavaScriptEmitter$isJsModule_0$LJavaScriptEmitter$LClassDefinition$($this._emitter, classDef)) {
		return false;
	}
	$this$0 = $this._expr;
	args = $this$0._args;
	if (args[2] instanceof ArrayLiteralExpression) {
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, args[0]).emit$N(_PropertyExpressionEmitter._operatorPrecedence);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "[", calleeExpr._token);
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, args[1]).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "]", calleeExpr._token);
		JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$($this._emitter, Expression$getToken_0$LExpression$($this._expr), "(", ArrayLiteralExpression$getExprs_0$LArrayLiteralExpression$(args[2]), null);
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "(function (o, p, a) { return o[p].apply(o, a); }(", calleeExpr._token);
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, args[0]).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ", ", Expression$getToken_0$LExpression$($this._expr));
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, args[1]).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ", ", Expression$getToken_0$LExpression$($this._expr));
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, args[2]).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "))", Expression$getToken_0$LExpression$($this._expr));
	}
	return true;
};

_CallExpressionEmitter._emitIfJsInvoke_0$L_CallExpressionEmitter$LPropertyExpression$ = _CallExpressionEmitter$_emitIfJsInvoke_0$L_CallExpressionEmitter$LPropertyExpression$;

function _CallExpressionEmitter$_emitCallsToMap_0$L_CallExpressionEmitter$LPropertyExpression$($this, calleeExpr) {
	var classDef;
	if (calleeExpr._type instanceof StaticFunctionType) {
		return false;
	}
	classDef = calleeExpr._expr.getType$().getClassDef$();
	if (! (classDef instanceof InstantiatedClassDefinition)) {
		return false;
	}
	if (InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) !== "Map") {
		return false;
	}
	switch (Token$getValue_0$LToken$(calleeExpr._identifierToken)) {
	case "toString":
		JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$($this._emitter, calleeExpr._token, "$__jsx_ObjectToString.call(", [ calleeExpr._expr ], [ new ObjectType(classDef) ]);
		return true;
	case "hasOwnProperty":
		JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$($this._emitter, calleeExpr._token, "$__jsx_ObjectHasOwnProperty.call(", [ calleeExpr._expr, CallExpression$getArguments_0$LCallExpression$($this._expr)[0] ], [ new ObjectType(classDef), Type.stringType ]);
		return true;
	case "keys":
		JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$($this._emitter, calleeExpr._token, "Object.keys(", [ calleeExpr._expr ], [ new ObjectType(classDef) ]);
		return true;
	default:
		return false;
	}
};

_CallExpressionEmitter._emitCallsToMap_0$L_CallExpressionEmitter$LPropertyExpression$ = _CallExpressionEmitter$_emitCallsToMap_0$L_CallExpressionEmitter$LPropertyExpression$;

function _CallExpressionEmitter$_emitIfMathAbs_0$L_CallExpressionEmitter$LPropertyExpression$($this, calleeExpr) {
	var argExpr;
	if (! (! (calleeExpr._type instanceof StaticFunctionType) ? false : Token$getValue_0$LToken$(calleeExpr._identifierToken) !== "abs" ? false : calleeExpr._expr.getType$().getClassDef$().className$() !== "Math" ? false : true)) {
		return false;
	}
	argExpr = CallExpression$getArguments_0$LCallExpression$($this._expr)[0];
	if (argExpr instanceof LeafExpression) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "(", Expression$getToken_0$LExpression$($this._expr));
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, argExpr).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, " >= 0 ? ", Expression$getToken_0$LExpression$($this._expr));
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, argExpr).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, " : - ", Expression$getToken_0$LExpression$($this._expr));
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, argExpr).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ")", Expression$getToken_0$LExpression$($this._expr));
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "(($math_abs_t = ", Expression$getToken_0$LExpression$($this._expr));
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, argExpr).emit$N(_AssignmentExpressionEmitter._operatorPrecedence["="]);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ") >= 0 ? $math_abs_t : -$math_abs_t)", Expression$getToken_0$LExpression$($this._expr));
	}
	return true;
};

_CallExpressionEmitter._emitIfMathAbs_0$L_CallExpressionEmitter$LPropertyExpression$ = _CallExpressionEmitter$_emitIfMathAbs_0$L_CallExpressionEmitter$LPropertyExpression$;

function _CallExpressionEmitter$_calleeIsMathAbs$LPropertyExpression$(calleeExpr) {
	return (! (calleeExpr._type instanceof StaticFunctionType) ? false : Token$getValue_0$LToken$(calleeExpr._identifierToken) !== "abs" ? false : calleeExpr._expr.getType$().getClassDef$().className$() !== "Math" ? false : true);
};

_CallExpressionEmitter._calleeIsMathAbs$LPropertyExpression$ = _CallExpressionEmitter$_calleeIsMathAbs$LPropertyExpression$;

function _CallExpressionEmitter$mathAbsUsesTemporary$LMemberFunctionDefinition$(funcDef) {
	return ! MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(funcDef, (function onStatement(statement) {
		return (! Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function onExpr(expr) {
			var calleeExpr;
			if (expr instanceof CallExpression && (calleeExpr = CallExpression$getExpr_0$LCallExpression$(expr)) instanceof PropertyExpression && _CallExpressionEmitter$_calleeIsMathAbs$LPropertyExpression$(calleeExpr) && ! (CallExpression$getArguments_0$LCallExpression$(expr)[0] instanceof LeafExpression)) {
				return false;
			}
			return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
		})) ? false : statement.forEachStatement$F$LStatement$B$(onStatement));
	}));
};

_CallExpressionEmitter.mathAbsUsesTemporary$LMemberFunctionDefinition$ = _CallExpressionEmitter$mathAbsUsesTemporary$LMemberFunctionDefinition$;

function _SuperExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_SuperExpressionEmitter], _OperatorExpressionEmitter);
_SuperExpressionEmitter.prototype._emit$ = function () {
	var funcType;
	var classDef;
	var methodName;
	var argTypes;
	var mangledFuncName;
	var $this$0;
	var $this$1;
	var $this$2;
	$this$0 = this._expr;
	funcType = $this$0._funcType;
	classDef = funcType._objectType.getClassDef$();
	$this$2 = this._expr;
	$this$1 = $this$2._name;
	methodName = $this$1._value;
	argTypes = funcType._argTypes;
	mangledFuncName = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfMethod$LClassDefinition$SALType$(classDef, methodName, argTypes);
	JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$(this._emitter, Expression$getToken_0$LExpression$(this._expr), JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfClass$LClassDefinition$(classDef) + ".prototype." + mangledFuncName + ".call(this", SuperExpression$getArguments_0$LSuperExpression$(this._expr), argTypes);
};


_SuperExpressionEmitter.prototype._getPrecedence$ = function () {
	return _CallExpressionEmitter._operatorPrecedence;
};


function _SuperExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_SuperExpressionEmitter._operatorPrecedence = precedence;
};

_SuperExpressionEmitter._setOperatorPrecedence$SN = _SuperExpressionEmitter$_setOperatorPrecedence$SN;

function _NewExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_NewExpressionEmitter], _OperatorExpressionEmitter);
_NewExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var $this = this;
	var getInliner;
	var classDef;
	var ctor;
	var argTypes;
	var callingFuncDef;
	var inliner;
	var $this$0;
	function getInliner(funcDef) {
		var stash;
		stash = funcDef.getStash$S("unclassify");
		return (stash ? stash.inliner : null);
	}
	classDef = this._expr.getType$().getClassDef$();
	$this$0 = this._expr;
	ctor = $this$0._constructor;
	argTypes = ctor._argTypes;
	callingFuncDef = Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, "constructor", argTypes, false);
	if (callingFuncDef == null) {
		throw new Error("logic flaw");
	}
	inliner = getInliner(callingFuncDef);
	if (inliner) {
		_NewExpressionEmitter$_emitAsObjectLiteral_0$L_NewExpressionEmitter$LClassDefinition$ALExpression$(this, classDef, inliner(this._expr));
	} else {
		if (classDef instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) === "Array" && argTypes.length === 0) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "[]", Expression$getToken_0$LExpression$(this._expr));
		} else {
			if (classDef instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) === "Map") {
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "{}", Expression$getToken_0$LExpression$(this._expr));
			} else {
				JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$(this._emitter, Expression$getToken_0$LExpression$(this._expr), "new " + JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(this._emitter).getNameOfConstructor$LClassDefinition$ALType$(classDef, argTypes) + "(", NewExpression$getArguments_0$LNewExpression$(this._expr), argTypes);
			}
		}
	}
};


function _NewExpressionEmitter$_emitAsObjectLiteral_0$L_NewExpressionEmitter$LClassDefinition$ALExpression$($this, classDef, propertyExprs) {
	var propertyIndex;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "({", Expression$getToken_0$LExpression$($this._expr));
	propertyIndex = 0;
	ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDef, (function (member) {
		var _emitter$0;
		if ((member._flags & 8) === 0) {
			if (propertyIndex !== 0) {
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, ", ", Expression$getToken_0$LExpression$($this._expr));
			}
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(_emitter$0 = $this._emitter, JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$(_emitter$0).getNameOfProperty$LClassDefinition$S(classDef, MemberDefinition$name_0$LMemberDefinition$(member)) + ": ", Expression$getToken_0$LExpression$($this._expr));
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this._emitter, propertyExprs[propertyIndex++]).emit$N(_AssignmentExpressionEmitter._operatorPrecedence["="]);
		}
		return true;
	}));
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this._emitter, "})", Expression$getToken_0$LExpression$($this._expr));
};

_NewExpressionEmitter._emitAsObjectLiteral_0$L_NewExpressionEmitter$LClassDefinition$ALExpression$ = _NewExpressionEmitter$_emitAsObjectLiteral_0$L_NewExpressionEmitter$LClassDefinition$ALExpression$;

_NewExpressionEmitter.prototype._getPrecedence$ = function () {
	return _NewExpressionEmitter._operatorPrecedence;
};


function _NewExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_NewExpressionEmitter._operatorPrecedence = precedence;
};

_NewExpressionEmitter._setOperatorPrecedence$SN = _NewExpressionEmitter$_setOperatorPrecedence$SN;

function _CommaExpressionEmitter(emitter, expr) {
	this._emitter = emitter;
	this._expr = expr;
};

$__jsx_extend([_CommaExpressionEmitter], _ExpressionEmitter);
_CommaExpressionEmitter.prototype.emit$N = function (outerOpPrecedence) {
	var useBrackets;
	useBrackets = outerOpPrecedence !== _CommaExpressionEmitter._operatorPrecedence;
	if (useBrackets) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, "(", null);
	}
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, CommaExpression$getFirstExpr_0$LCommaExpression$(this._expr)).emit$N(_CommaExpressionEmitter._operatorPrecedence);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ", ", null);
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$(this._emitter, CommaExpression$getSecondExpr_0$LCommaExpression$(this._expr)).emit$N(_CommaExpressionEmitter._operatorPrecedence);
	if (useBrackets) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$(this._emitter, ")", null);
	}
};


function _CommaExpressionEmitter$_setOperatorPrecedence$SN(op, precedence) {
	_CommaExpressionEmitter._operatorPrecedence = precedence;
};

_CommaExpressionEmitter._setOperatorPrecedence$SN = _CommaExpressionEmitter$_setOperatorPrecedence$SN;

function _BootstrapBuilder() {
};

$__jsx_extend([_BootstrapBuilder], Object);
function _BootstrapBuilder$addBootstrap_0$L_BootstrapBuilder$S($this, code) {
	var args;
	var callEntryPoint;
	var wrapper$0;
	var _platform$0;
	var _platform$1;
	code += (_platform$0 = $this._emitter._platform).load$S(_platform$0.getRoot$() + "/src/js/launcher.js");
	switch ($this._executableFor) {
	case "node":
		args = "process.argv.slice(2)";
		break;
	case "commonjs":
		args = "require('system').args.slice(1)";
		break;
	default:
		args = "[]";
		break;
	}
	callEntryPoint = Util$format$SAS("JSX.%1(%2, %3)", [ $this._getLauncher$(), JSON.stringify(Platform$encodeFilename_0$LPlatform$S($this._emitter._platform, $this._entrySourceFile)), args ]);
	if ($this._executableFor === "web") {
		wrapper$0 = (_platform$1 = $this._emitter._platform).load$S(_platform$1.getRoot$() + "/src/js/web-launcher.js");
		callEntryPoint = wrapper$0.replace(/\/\/--CODE--\/\//, callEntryPoint);
	}
	return code + callEntryPoint + "\n";
};

_BootstrapBuilder.addBootstrap_0$L_BootstrapBuilder$S = _BootstrapBuilder$addBootstrap_0$L_BootstrapBuilder$S;

function _ExecutableBootstrapBuilder() {
};

$__jsx_extend([_ExecutableBootstrapBuilder], _BootstrapBuilder);
function _TestBootstrapBuilder() {
};

$__jsx_extend([_TestBootstrapBuilder], _BootstrapBuilder);
function Util() {
};

$__jsx_extend([Util], Object);
function Util$repeat$SN(c, n) {
	var s;
	var i;
	s = "";
	for (i = 0; i < n; ++ i) {
		s += c;
	}
	return s;
};

Util.repeat$SN = Util$repeat$SN;

function Util$format$SAS(fmt, args) {
	return fmt.replace(/%(\d+|%)/g, (function (m) {
		var arg;
		if (m === "%%") {
			return "%";
		} else {
			arg = args[(m.substring(1) | 0) - 1];
			return (arg == null ? "null" : arg);
		}
	}));
};

Util.format$SAS = Util$format$SAS;

function Util$instantiateTemplate$LAnalysisContext$LToken$SALType$(context, token, className, typeArguments) {
	return Parser$lookupTemplate_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$(context.parser, context.errors, ({_token: token, _className: className, _typeArgs: typeArguments}), context.postInstantiationCallback);
};

Util.instantiateTemplate$LAnalysisContext$LToken$SALType$ = Util$instantiateTemplate$LAnalysisContext$LToken$SALType$;

function Util$analyzeArgs$LAnalysisContext$ALExpression$LExpression$AALType$(context, args, parentExpr, expectedTypes) {
	var argTypes;
	var i;
	var funcDef;
	var expectedCallbackType;
	var j;
	var arrayExpr;
	var expectedArrayType;
	var mapExpr;
	var expectedMapType;
	var $this$0;
	var expectedTypes$len$0;
	argTypes = [  ];
	for (i = 0; i < args.length; ++ i) {
		if (args[i] instanceof FunctionExpression && ! FunctionExpression$argumentTypesAreIdentified_0$LFunctionExpression$(args[i])) {
			$this$0 = args[i];
			funcDef = $this$0._funcDef;
			expectedCallbackType = null;
			for ((j = 0, expectedTypes$len$0 = expectedTypes.length); j < expectedTypes$len$0; ++ j) {
				if (expectedTypes[j][i] != null && expectedTypes[j][i] instanceof FunctionType && ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(expectedTypes[j][i]).length === funcDef._args.length) {
					if (expectedCallbackType == null) {
						expectedCallbackType = expectedTypes[j][i];
					} else {
						if (Util$typesAreEqual$ALType$ALType$(ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(expectedCallbackType), ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(expectedTypes[j][i])) && ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(expectedCallbackType).equals$LType$(ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(expectedTypes[j][i]))) {
						} else {
							break;
						}
					}
				}
			}
			if (j !== expectedTypes.length) {
			} else {
				if (expectedCallbackType != null) {
					if (! FunctionExpression$deductTypeIfUnknown_0$LFunctionExpression$LAnalysisContext$LResolvedFunctionType$(args[i], context, expectedCallbackType)) {
						return null;
					}
				}
			}
		} else {
			if (args[i] instanceof ArrayLiteralExpression && ArrayLiteralExpression$getExprs_0$LArrayLiteralExpression$(args[i]).length === 0 && args[i].getType$() == null) {
				arrayExpr = args[i];
				expectedArrayType = null;
				for (j = 0; j < expectedTypes.length; ++ j) {
					if (expectedTypes[j][i] != null && expectedTypes[j][i] instanceof ObjectType && expectedTypes[j][i].getClassDef$() instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(expectedTypes[j][i].getClassDef$()) === 'Array') {
						if (expectedArrayType == null) {
							expectedArrayType = expectedTypes[j][i];
						} else {
							if (expectedArrayType.equals$LType$(expectedTypes[j][i])) {
							} else {
								break;
							}
						}
					}
				}
				if (j !== expectedTypes.length) {
				} else {
					if (expectedArrayType != null) {
						arrayExpr._type = expectedArrayType;
					}
				}
			} else {
				if (args[i] instanceof MapLiteralExpression && MapLiteralExpression$getElements_0$LMapLiteralExpression$(args[i]).length === 0 && args[i].getType$() == null) {
					mapExpr = args[i];
					expectedMapType = null;
					for (j = 0; j < expectedTypes.length; ++ j) {
						if (expectedTypes[j][i] != null && expectedTypes[j][i] instanceof ObjectType && expectedTypes[j][i].getClassDef$() instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(expectedTypes[j][i].getClassDef$()) === 'Map') {
							if (expectedMapType == null) {
								expectedMapType = expectedTypes[j][i];
							} else {
								if (expectedMapType.equals$LType$(expectedTypes[j][i])) {
								} else {
									break;
								}
							}
						}
					}
					if (j !== expectedTypes.length) {
					} else {
						if (expectedMapType != null) {
							mapExpr._type = expectedMapType;
						}
					}
				}
			}
		}
		if (! args[i].analyze$LAnalysisContext$LExpression$(context, parentExpr)) {
			return null;
		}
		argTypes[i] = args[i].getType$();
	}
	return argTypes;
};

Util.analyzeArgs$LAnalysisContext$ALExpression$LExpression$AALType$ = Util$analyzeArgs$LAnalysisContext$ALExpression$LExpression$AALType$;

function Util$typesAreEqual$ALType$ALType$(x, y) {
	var i;
	var x$len$0;
	if (x.length !== y.length) {
		return false;
	}
	for ((i = 0, x$len$0 = x.length); i < x$len$0; ++ i) {
		if (! x[i].equals$LType$(y[i])) {
			return false;
		}
	}
	return true;
};

Util.typesAreEqual$ALType$ALType$ = Util$typesAreEqual$ALType$ALType$;

function Util$forEachStatement$F$LStatement$B$ALStatement$(cb, statements) {
	var i;
	var statements$len$0;
	if (statements != null) {
		for ((i = 0, statements$len$0 = statements.length); i < statements$len$0; ++ i) {
			if (! cb(statements[i])) {
				return false;
			}
		}
	}
	return true;
};

Util.forEachStatement$F$LStatement$B$ALStatement$ = Util$forEachStatement$F$LStatement$B$ALStatement$;

function Util$forEachExpression$F$LExpression$B$ALExpression$(cb, exprs) {
	return Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$((function (expr, _) {
		return cb(expr);
	}), exprs);
};

Util.forEachExpression$F$LExpression$B$ALExpression$ = Util$forEachExpression$F$LExpression$B$ALExpression$;

function Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(cb, exprs) {
	var i;
	var exprs$len$0;
	if (exprs != null) {
		for ((i = 0, exprs$len$0 = exprs.length); i < exprs$len$0; ++ i) {
			if (! cb(exprs[i], (function (exprs, index) {
				return (function (expr) {
					exprs[index] = expr;
				});
			})(exprs, i))) {
				return false;
			}
		}
	}
	return true;
};

Util.forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$ = Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$;

function Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, funcName, argTypes, isStatic) {
	var found;
	found = null;
	ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDef, (function (funcDef) {
		if (isStatic === ((funcDef._flags & 8) !== 0) && MemberDefinition$name_0$LMemberDefinition$(funcDef) === funcName && Util$typesAreEqual$ALType$ALType$(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef), argTypes)) {
			found = funcDef;
			return false;
		}
		return true;
	}));
	return found;
};

Util.findFunctionInClass$LClassDefinition$SALType$B = Util$findFunctionInClass$LClassDefinition$SALType$B;

function Util$findVariableInClass$LClassDefinition$SB(classDef, name, isStatic) {
	var found;
	found = null;
	ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDef, (function (def) {
		if (isStatic === ((def._flags & 8) !== 0) && MemberDefinition$name_0$LMemberDefinition$(def) === name) {
			found = def;
			return false;
		}
		return true;
	}));
	return found;
};

Util.findVariableInClass$LClassDefinition$SB = Util$findVariableInClass$LClassDefinition$SB;

function Util$memberRootIsNative$LClassDefinition$SALType$B(classDef, name, argTypes, isStatic) {
	var rootIsNativeNonStatic;
	if (isStatic) {
		return (classDef.flags$() & 272) !== 0;
	}
	function rootIsNativeNonStatic(classDef, name, argTypes) {
		var found;
		found = (argTypes != null ? Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, name, argTypes, false) : Util$findVariableInClass$LClassDefinition$SB(classDef, name, false));
		return (found != null && (found._flags & 32) === 0 ? (classDef.flags$() & 272) !== 0 : classDef._extendType == null ? false : rootIsNativeNonStatic(classDef._extendType.getClassDef$(), name, argTypes));
	}
	return rootIsNativeNonStatic(classDef, name, argTypes);
};

Util.memberRootIsNative$LClassDefinition$SALType$B = Util$memberRootIsNative$LClassDefinition$SALType$B;

function Util$memberIsExported$LClassDefinition$SALType$B(classDef, name, argTypes, isStatic) {
	var found;
	var check;
	if (isStatic) {
		found = (argTypes != null ? Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, name, argTypes, true) : Util$findVariableInClass$LClassDefinition$SB(classDef, name, true));
		return (found._flags & 16384) !== 0;
	}
	function check(classDef) {
		var found;
		var isExportedInImpl;
		var this$0;
		var i$0;
		if ((classDef.flags$() & 16) !== 0) {
			return false;
		}
		found = (argTypes != null ? Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, name, argTypes, false) : Util$findVariableInClass$LClassDefinition$SB(classDef, name, false));
		if (found != null && (found._flags & 16384) !== 0) {
			return true;
		}
		if (classDef._extendType != null) {
			if (check(classDef._extendType.getClassDef$())) {
				return true;
			}
		}
		isExportedInImpl = false;
		this$0 = classDef._implementTypes;
		for (i$0 in this$0) {
			(function (implType) {
				if (check(implType._classDef)) {
					isExportedInImpl = true;
				}
			})(this$0[i$0]);
		}
		return isExportedInImpl;
	}
	return check(classDef);
};

Util.memberIsExported$LClassDefinition$SALType$B = Util$memberIsExported$LClassDefinition$SALType$B;

function Util$encodeStringLiteral$S(str) {
	var escaped;
	escaped = str.replace(/[\0-\x19\\'"\u007f-\uffff]/g, (function (ch) {
		var t;
		if (ch in Util._stringLiteralEncodingMap) {
			return Util._stringLiteralEncodingMap[ch];
		} else {
			t = "000" + ch.charCodeAt(0).toString(16);
			t = t.substring(t.length - 4);
			return "\\u" + t;
		}
	}));
	return "\"" + escaped + "\"";
};

Util.encodeStringLiteral$S = Util$encodeStringLiteral$S;

function Util$decodeStringLiteral$S(literal) {
	var matched;
	var src;
	var decoded;
	var pos;
	var backslashAt;
	var escapeChar;
	matched = literal.match(/^([\'\"]).*([\'\"])$/);
	if (matched == null || matched[1] != matched[2]) {
		throw new Error("input string is not quoted properly: " + literal);
	}
	src = literal.substring(1, literal.length - 1);
	decoded = "";
	pos = 0;
	while ((backslashAt = src.indexOf("\\", pos)) !== -1) {
		decoded += src.substring(pos, backslashAt);
		pos = backslashAt + 1;
		if (pos === src.length) {
			throw new Error("last character within a string literal cannot be a backslash: " + literal);
		}
		escapeChar = src.charAt(pos++);
		switch (escapeChar) {
		case "'":
		case "\"":
		case "\\":
			decoded += escapeChar;
			break;
		case "b":
			decoded += "\b";
			break;
		case "f":
			decoded += "\f";
			break;
		case "n":
			decoded += "\n";
			break;
		case "r":
			decoded += "\r";
			break;
		case "t":
			decoded += "\t";
			break;
		case "v":
			decoded += "\v";
			break;
		case "u":
			matched = src.substring(pos).match(/^([0-9A-Fa-f]{4})/);
			if (matched == null) {
				throw new Error("expected four hexdigits after \\u: " + literal);
			}
			decoded += String.fromCharCode($__jsx_parseInt(matched[1], 16));
			pos += 4;
			break;
		case "0":
			if (pos === src.length || src.charAt(pos).match(/[0-9]/) == null) {
				decoded += "\0";
			} else {
				throw new Error("found a digit after '\\0': " + literal);
			}
			break;
		}
	}
	decoded += src.substring(pos);
	return decoded;
};

Util.decodeStringLiteral$S = Util$decodeStringLiteral$S;

function Util$_resolvedPathParts$S(path) {
	var tokens;
	var i;
	tokens = path.split(/[\\\/]+/);
	if (tokens.length === 1) {
		return tokens;
	}
	for (i = 0; i < tokens.length; ) {
		if (tokens[i] == ".") {
			tokens.splice(i, 1);
		} else {
			if (tokens[i] == ".." && i !== 0 && tokens[i - 1] != "..") {
				tokens.splice(i - 1, 2);
				i -= 1;
			} else {
				i++;
			}
		}
	}
	return tokens;
};

Util._resolvedPathParts$S = Util$_resolvedPathParts$S;

function Util$resolvePath$S(path) {
	return Util$_resolvedPathParts$S(path).join("/");
};

Util.resolvePath$S = Util$resolvePath$S;

function Util$toOrdinal$N(n) {
	if (10 < n && n < 14) {
		return (n + "") + 'th';
	}
	switch (n % 10) {
	case 1:
		return (n + "") + 'st';
	case 2:
		return (n + "") + 'nd';
	case 3:
		return (n + "") + 'rd';
	default:
		return (n + "") + 'th';
	}
};

Util.toOrdinal$N = Util$toOrdinal$N;

function Util$makeErrorMessage$LPlatform$SUSNNN(platform, message, filename, lineNumber, columnNumber, size) {
	var content;
	var sourceLine;
	var TAB_WIDTH;
	var tabs;
	if (filename == null) {
		return message + "\n";
	}
	content = platform.load$S(filename);
	sourceLine = content.split(/\n/)[lineNumber - 1] + "\n";
	TAB_WIDTH = 4;
	tabs = sourceLine.slice(0, columnNumber).match(/\t/g);
	if (tabs != null) {
		columnNumber += (TAB_WIDTH - 1) * tabs.length;
	}
	sourceLine = sourceLine.replace(/\t/g, Util$repeat$SN(" ", TAB_WIDTH));
	sourceLine += Util$repeat$SN(" ", columnNumber);
	sourceLine += Util$repeat$SN("^", size);
	return Util$format$SAS("[%1:%2:%3] %4\n%5\n", [ filename, lineNumber + "", columnNumber + "", message, sourceLine ]);
};

Util.makeErrorMessage$LPlatform$SUSNNN = Util$makeErrorMessage$LPlatform$SUSNNN;

function Util$isArrayOf$LClassDefinition$LType$(classDef, expectedElementType) {
	var instantiatedClassDef;
	if (! (classDef instanceof InstantiatedClassDefinition)) {
		return false;
	}
	instantiatedClassDef = classDef;
	return (InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(instantiatedClassDef) !== "Array" ? false : ! instantiatedClassDef._typeArguments[0].equals$LType$(expectedElementType) ? false : true);
};

Util.isArrayOf$LClassDefinition$LType$ = Util$isArrayOf$LClassDefinition$LType$;

function Util$asSet$AS(array) {
	var set;
	var i;
	set = {};
	for (i = 0; i < array.length; ++ i) {
		set[array[i]] = true;
	}
	return set;
};

Util.asSet$AS = Util$asSet$AS;

function TypedMap$LocalVariable$boolean$E() {
	var $this = this;
	this._list = [];
	this._equalsCallback = (function (x, y) {
		return x == y;
	});
};

$__jsx_extend([TypedMap$LocalVariable$boolean$E], Object);
function TypedMap$LocalVariable$boolean$E$set_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$B($this, key, val) {
	var i;
	for (i = 0; i < $this._list.length; ++ i) {
		if ($this._equalsCallback($this._list[i].first, key)) {
			$this._list[i].second = val;
			return;
		}
	}
	$this._list.push(({first: key, second: val}));
};

TypedMap$LocalVariable$boolean$E.set_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$B = TypedMap$LocalVariable$boolean$E$set_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$B;

function TypedMap$LocalVariable$boolean$E$get_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$($this, key) {
	var i;
	for (i = 0; i < $this._list.length; ++ i) {
		if ($this._equalsCallback($this._list[i].first, key)) {
			return $this._list[i].second;
		}
	}
	return null;
};

TypedMap$LocalVariable$boolean$E.get_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$ = TypedMap$LocalVariable$boolean$E$get_0$LTypedMap$LocalVariable$boolean$E$LLocalVariable$;

function Pair$LocalVariable$boolean$E(first, second) {
	this.first = first;
	this.second = second;
};

$__jsx_extend([Pair$LocalVariable$boolean$E], Object);
function TypedMap$LocalVariable$Expression$E() {
	var $this = this;
	this._list = [];
	this._equalsCallback = (function (x, y) {
		return x == y;
	});
};

$__jsx_extend([TypedMap$LocalVariable$Expression$E], Object);
function TypedMap$LocalVariable$Expression$E$set_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$LExpression$($this, key, val) {
	var i;
	for (i = 0; i < $this._list.length; ++ i) {
		if ($this._equalsCallback($this._list[i].first, key)) {
			$this._list[i].second = val;
			return;
		}
	}
	$this._list.push(({first: key, second: val}));
};

TypedMap$LocalVariable$Expression$E.set_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$LExpression$ = TypedMap$LocalVariable$Expression$E$set_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$LExpression$;

function TypedMap$LocalVariable$Expression$E$get_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$($this, key) {
	var i;
	for (i = 0; i < $this._list.length; ++ i) {
		if ($this._equalsCallback($this._list[i].first, key)) {
			return $this._list[i].second;
		}
	}
	return null;
};

TypedMap$LocalVariable$Expression$E.get_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$ = TypedMap$LocalVariable$Expression$E$get_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$;

function TypedMap$LocalVariable$Expression$E$delete_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$($this, key) {
	var i;
	for (i = 0; i < $this._list.length; ++ i) {
		if ($this._equalsCallback($this._list[i].first, key)) {
			$this._list.splice(i, 1);
			return;
		}
	}
};

TypedMap$LocalVariable$Expression$E.delete_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$ = TypedMap$LocalVariable$Expression$E$delete_0$LTypedMap$LocalVariable$Expression$E$LLocalVariable$;

function TypedMap$LocalVariable$Expression$E$reversedForEach_0$LTypedMap$LocalVariable$Expression$E$F$LLocalVariable$LExpression$B$($this, cb) {
	var i;
	var e;
	for (i = $this._list.length - 1; i >= 0; -- i) {
		e = $this._list[i];
		if (! cb(e.first, e.second)) {
			return false;
		}
	}
	return true;
};

TypedMap$LocalVariable$Expression$E.reversedForEach_0$LTypedMap$LocalVariable$Expression$E$F$LLocalVariable$LExpression$B$ = TypedMap$LocalVariable$Expression$E$reversedForEach_0$LTypedMap$LocalVariable$Expression$E$F$LLocalVariable$LExpression$B$;

function Pair$LocalVariable$Expression$E(first, second) {
	this.first = first;
	this.second = second;
};

$__jsx_extend([Pair$LocalVariable$Expression$E], Object);
function Triple$LocalVariable$AssignmentExpression$function$$$$Expression$$$$void$E(first, second, third) {
	this.first = first;
	this.second = second;
	this.third = third;
};

$__jsx_extend([Triple$LocalVariable$AssignmentExpression$function$$$$Expression$$$$void$E], Object);
function Pair$AssignmentExpression$function$$$$Expression$$$$void$E(first, second) {
	this.first = first;
	this.second = second;
};

$__jsx_extend([Pair$AssignmentExpression$function$$$$Expression$$$$void$E], Object);
function Serializer$Type$E() {
};

$__jsx_extend([Serializer$Type$E], Object);
function Serializer$Type$E$serializeNullable$LType$(v) {
	return (v == null ? null : v.toString());
};

Serializer$Type$E.serializeNullable$LType$ = Serializer$Type$E$serializeNullable$LType$;

function Serializer$Token$E() {
};

$__jsx_extend([Serializer$Token$E], Object);
function Serializer$Token$E$serializeArray$ALToken$(a) {
	var ret;
	var i;
	var $this$0;
	if (a == null) {
		return null;
	}
	ret = [  ];
	for (i = 0; i < a.length; ++ i) {
		$this$0 = a[i];
		ret[i] = [ $this$0._value, $this$0._isIdentifier, $this$0._filename, $this$0._lineNumber, $this$0._columnNumber ];
	}
	return ret;
};

Serializer$Token$E.serializeArray$ALToken$ = Serializer$Token$E$serializeArray$ALToken$;

function Serializer$Token$E$serializeNullable$LToken$(v) {
	return (v == null ? null : [ v._value, v._isIdentifier, v._filename, v._lineNumber, v._columnNumber ]);
};

Serializer$Token$E.serializeNullable$LToken$ = Serializer$Token$E$serializeNullable$LToken$;

function Serializer$Import$E() {
};

$__jsx_extend([Serializer$Import$E], Object);
function Serializer$Import$E$serializeNullable$LImport$(v) {
	return (v == null ? null : [ "Import", Serializer$Token$E$serializeNullable$LToken$(v._filenameToken), Serializer$Token$E$serializeNullable$LToken$(v._aliasToken), Serializer$Token$E$serializeArray$ALToken$(v._classNames) ]);
};

Serializer$Import$E.serializeNullable$LImport$ = Serializer$Import$E$serializeNullable$LImport$;

function Serializer$ParsedObjectType$E() {
};

$__jsx_extend([Serializer$ParsedObjectType$E], Object);
function Serializer$ParsedObjectType$E$serializeArray$ALParsedObjectType$(a) {
	var ret;
	var i;
	var $this$0;
	if (a == null) {
		return null;
	}
	ret = [  ];
	for (i = 0; i < a.length; ++ i) {
		$this$0 = a[i];
		ret[i] = $this$0.toString();
	}
	return ret;
};

Serializer$ParsedObjectType$E.serializeArray$ALParsedObjectType$ = Serializer$ParsedObjectType$E$serializeArray$ALParsedObjectType$;

function Serializer$ParsedObjectType$E$serializeNullable$LParsedObjectType$(v) {
	return (v == null ? null : v.toString());
};

Serializer$ParsedObjectType$E.serializeNullable$LParsedObjectType$ = Serializer$ParsedObjectType$E$serializeNullable$LParsedObjectType$;

function Serializer$MemberDefinition$E() {
};

$__jsx_extend([Serializer$MemberDefinition$E], Object);
function Serializer$MemberDefinition$E$serializeArray$ALMemberDefinition$(a) {
	var ret;
	var i;
	if (a == null) {
		return null;
	}
	ret = [  ];
	for (i = 0; i < a.length; ++ i) {
		ret[i] = a[i].serialize$();
	}
	return ret;
};

Serializer$MemberDefinition$E.serializeArray$ALMemberDefinition$ = Serializer$MemberDefinition$E$serializeArray$ALMemberDefinition$;

function Serializer$Expression$E() {
};

$__jsx_extend([Serializer$Expression$E], Object);
function Serializer$Expression$E$serializeArray$ALExpression$(a) {
	var ret;
	var i;
	if (a == null) {
		return null;
	}
	ret = [  ];
	for (i = 0; i < a.length; ++ i) {
		ret[i] = a[i].serialize$();
	}
	return ret;
};

Serializer$Expression$E.serializeArray$ALExpression$ = Serializer$Expression$E$serializeArray$ALExpression$;

function Serializer$Expression$E$serializeNullable$LExpression$(v) {
	return (v == null ? null : v.serialize$());
};

Serializer$Expression$E.serializeNullable$LExpression$ = Serializer$Expression$E$serializeNullable$LExpression$;

function Cloner$Statement$E() {
};

$__jsx_extend([Cloner$Statement$E], Object);
function Cloner$Statement$E$cloneArray$ALStatement$(a) {
	var r;
	var i;
	r = [  ];
	for (i = 0; i < a.length; ++ i) {
		r[i] = a[i].clone$();
	}
	return r;
};

Cloner$Statement$E.cloneArray$ALStatement$ = Cloner$Statement$E$cloneArray$ALStatement$;

function Serializer$ArgumentDeclaration$E() {
};

$__jsx_extend([Serializer$ArgumentDeclaration$E], Object);
function Serializer$ArgumentDeclaration$E$serializeArray$ALArgumentDeclaration$(a) {
	var ret;
	var i;
	var $this$0;
	if (a == null) {
		return null;
	}
	ret = [  ];
	for (i = 0; i < a.length; ++ i) {
		$this$0 = a[i];
		ret[i] = [ $this$0._name, Serializer$Type$E$serializeNullable$LType$($this$0._type) ];
	}
	return ret;
};

Serializer$ArgumentDeclaration$E.serializeArray$ALArgumentDeclaration$ = Serializer$ArgumentDeclaration$E$serializeArray$ALArgumentDeclaration$;

function Serializer$LocalVariable$E() {
};

$__jsx_extend([Serializer$LocalVariable$E], Object);
function Serializer$LocalVariable$E$serializeArray$ALLocalVariable$(a) {
	var ret;
	var i;
	var $this$0;
	if (a == null) {
		return null;
	}
	ret = [  ];
	for (i = 0; i < a.length; ++ i) {
		$this$0 = a[i];
		ret[i] = [ $this$0._name, Serializer$Type$E$serializeNullable$LType$($this$0._type) ];
	}
	return ret;
};

Serializer$LocalVariable$E.serializeArray$ALLocalVariable$ = Serializer$LocalVariable$E$serializeArray$ALLocalVariable$;

function Serializer$Statement$E() {
};

$__jsx_extend([Serializer$Statement$E], Object);
function Serializer$Statement$E$serializeArray$ALStatement$(a) {
	var ret;
	var i;
	if (a == null) {
		return null;
	}
	ret = [  ];
	for (i = 0; i < a.length; ++ i) {
		ret[i] = a[i].serialize$();
	}
	return ret;
};

Serializer$Statement$E.serializeArray$ALStatement$ = Serializer$Statement$E$serializeArray$ALStatement$;

function TypedMap$Array$Type$E$MemberFunctionDefinition$E(equalsCallback) {
	this._list = [];
	this._equalsCallback = equalsCallback;
};

$__jsx_extend([TypedMap$Array$Type$E$MemberFunctionDefinition$E], Object);
function TypedMap$Array$Type$E$MemberFunctionDefinition$E$set_0$LTypedMap$Array$Type$E$MemberFunctionDefinition$E$ALType$LMemberFunctionDefinition$($this, key, val) {
	var i;
	for (i = 0; i < $this._list.length; ++ i) {
		if ($this._equalsCallback($this._list[i].first, key)) {
			$this._list[i].second = val;
			return;
		}
	}
	$this._list.push(({first: key, second: val}));
};

TypedMap$Array$Type$E$MemberFunctionDefinition$E.set_0$LTypedMap$Array$Type$E$MemberFunctionDefinition$E$ALType$LMemberFunctionDefinition$ = TypedMap$Array$Type$E$MemberFunctionDefinition$E$set_0$LTypedMap$Array$Type$E$MemberFunctionDefinition$E$ALType$LMemberFunctionDefinition$;

function TypedMap$Array$Type$E$MemberFunctionDefinition$E$get_0$LTypedMap$Array$Type$E$MemberFunctionDefinition$E$ALType$($this, key) {
	var i;
	for (i = 0; i < $this._list.length; ++ i) {
		if ($this._equalsCallback($this._list[i].first, key)) {
			return $this._list[i].second;
		}
	}
	return null;
};

TypedMap$Array$Type$E$MemberFunctionDefinition$E.get_0$LTypedMap$Array$Type$E$MemberFunctionDefinition$E$ALType$ = TypedMap$Array$Type$E$MemberFunctionDefinition$E$get_0$LTypedMap$Array$Type$E$MemberFunctionDefinition$E$ALType$;

function Pair$Array$Type$E$MemberFunctionDefinition$E(first, second) {
	this.first = first;
	this.second = second;
};

$__jsx_extend([Pair$Array$Type$E$MemberFunctionDefinition$E], Object);
function Cloner$Expression$E() {
};

$__jsx_extend([Cloner$Expression$E], Object);
function Cloner$Expression$E$cloneArray$ALExpression$(a) {
	var r;
	var i;
	r = [  ];
	for (i = 0; i < a.length; ++ i) {
		r[i] = a[i].clone$();
	}
	return r;
};

Cloner$Expression$E.cloneArray$ALExpression$ = Cloner$Expression$E$cloneArray$ALExpression$;

function Cloner$Expression$E$cloneNullable$LExpression$(o) {
	return (o == null ? null : o.clone$());
};

Cloner$Expression$E.cloneNullable$LExpression$ = Cloner$Expression$E$cloneNullable$LExpression$;

function Serializer$MapLiteralElement$E() {
};

$__jsx_extend([Serializer$MapLiteralElement$E], Object);
function Serializer$MapLiteralElement$E$serializeArray$ALMapLiteralElement$(a) {
	var ret;
	var i;
	var $this$0;
	if (a == null) {
		return null;
	}
	ret = [  ];
	for (i = 0; i < a.length; ++ i) {
		$this$0 = a[i];
		ret[i] = [ Token$serialize_0$LToken$($this$0._key), $this$0._expr.serialize$() ];
	}
	return ret;
};

Serializer$MapLiteralElement$E.serializeArray$ALMapLiteralElement$ = Serializer$MapLiteralElement$E$serializeArray$ALMapLiteralElement$;

function Serializer$ClassDefinition$E() {
};

$__jsx_extend([Serializer$ClassDefinition$E], Object);
function Serializer$ClassDefinition$E$serializeNullable$LClassDefinition$(v) {
	return (v == null ? null : ({ "token": v._token, "name": v._className, "flags": v._flags, "extends": Serializer$ParsedObjectType$E$serializeNullable$LParsedObjectType$(v._extendType), "implements": Serializer$ParsedObjectType$E$serializeArray$ALParsedObjectType$(v._implementTypes), "members": Serializer$MemberDefinition$E$serializeArray$ALMemberDefinition$(v._members) }));
};

Serializer$ClassDefinition$E.serializeNullable$LClassDefinition$ = Serializer$ClassDefinition$E$serializeNullable$LClassDefinition$;

function Cloner$CatchStatement$E() {
};

$__jsx_extend([Cloner$CatchStatement$E], Object);
function Cloner$CatchStatement$E$cloneArray$ALCatchStatement$(a) {
	var r;
	var i;
	r = [  ];
	for (i = 0; i < a.length; ++ i) {
		r[i] = a[i].clone$();
	}
	return r;
};

Cloner$CatchStatement$E.cloneArray$ALCatchStatement$ = Cloner$CatchStatement$E$cloneArray$ALCatchStatement$;

function Serializer$CatchStatement$E() {
};

$__jsx_extend([Serializer$CatchStatement$E], Object);
function Serializer$CatchStatement$E$serializeArray$ALCatchStatement$(a) {
	var ret;
	var i;
	var this$0;
	if (a == null) {
		return null;
	}
	ret = [  ];
	for (i = 0; i < a.length; ++ i) {
		this$0 = a[i];
		ret[i] = [ "CatchStatement", Token$serialize_0$LToken$(this$0._token), LocalVariable$serialize_0$LLocalVariable$(this$0._local), Serializer$Statement$E$serializeArray$ALStatement$(this$0._statements) ];
	}
	return ret;
};

Serializer$CatchStatement$E.serializeArray$ALCatchStatement$ = Serializer$CatchStatement$E$serializeArray$ALCatchStatement$;

function TypedMap$ClassDefinition$string$E() {
};

$__jsx_extend([TypedMap$ClassDefinition$string$E], Object);
function Pair$ClassDefinition$string$E() {
};

$__jsx_extend([Pair$ClassDefinition$string$E], Object);
function Platform() {
};

$__jsx_extend([Platform], Object);
Platform.prototype.log$S = function (s) {
	console.log(s);
};


Platform.prototype.error$S = function (s) {
	console.error(s);
};


function Platform$encodeFilename_0$LPlatform$S($this, filename) {
	var rootDir;
	rootDir = $this.getRoot$() + "/";
	if (filename.indexOf(rootDir) === 0) {
		filename = "system:" + filename.substring(rootDir.length);
	}
	return filename;
};

Platform.encodeFilename_0$LPlatform$S = Platform$encodeFilename_0$LPlatform$S;

function BrowserPlatform() {
	this.fileContent = {};
	this._errors = [];
	this._root = BrowserPlatform$_rootPath_0$LBrowserPlatform$(this);
	this._prefix = dom.window.location.pathname.replace(/\/[^\/]*$/, "");
	this._tree = JSON.parse(this.load$S(this._root + "/tree.generated.json"));
	BrowserPlatform$debug_0$LBrowserPlatform$X(this, Util$format$SAS("[D] prefix=%1, root=%2", [ this._prefix, this._root ]));
};

$__jsx_extend([BrowserPlatform], Platform);
function BrowserPlatform$_rootPath_0$LBrowserPlatform$($this) {
	var root;
	var matched;
	root = "..";
	try {
		matched = dom.window.location.pathname.match(/^(.*\/try(?:-on-web)?)\/.*$/);
		root = matched[1];
	} catch ($__jsx_catch_0) {
		if ($__jsx_catch_0 instanceof Error) {
			BrowserPlatform$debug_0$LBrowserPlatform$X($this, $__jsx_catch_0.toString());
		} else {
			throw $__jsx_catch_0;
		}
	}
	return root;
};

BrowserPlatform._rootPath_0$LBrowserPlatform$ = BrowserPlatform$_rootPath_0$LBrowserPlatform$;

BrowserPlatform.prototype.getRoot$ = function () {
	return this._root;
};


function BrowserPlatform$_findPath_0$LBrowserPlatform$S($this, path) {
	var resolvedPath;
	var parts;
	var cur;
	var t;
	resolvedPath = (path.indexOf($this._root + "/") !== -1 ? path.slice($this._root.length + 1) : path);
	BrowserPlatform$debug_0$LBrowserPlatform$X($this, Util$format$SAS("[D] find path=%1 (resolvedPath=%2)", [ path, resolvedPath ]));
	parts = resolvedPath.split('/');
	if (parts[0] == "") {
		parts.shift();
	}
	cur = $this._tree;
	while (parts.length > 0) {
		t = cur[parts.shift()];
		if (t == null) {
			BrowserPlatform$debug_0$LBrowserPlatform$X($this, "[D] find path --> (not found)");
			return null;
		}
		cur = t;
	}
	BrowserPlatform$debug_0$LBrowserPlatform$X($this, Util$format$SAS("[D] find path --> %1", [ JSON.stringify(cur) ]));
	return cur;
};

BrowserPlatform._findPath_0$LBrowserPlatform$S = BrowserPlatform$_findPath_0$LBrowserPlatform$S;

BrowserPlatform.prototype.fileExists$S = function (path) {
	return BrowserPlatform$_findPath_0$LBrowserPlatform$S(this, path) != null;
};


BrowserPlatform.prototype.getFilesInDirectory$S = function (path) {
	var d;
	var a;
	var k;
	d = BrowserPlatform$_findPath_0$LBrowserPlatform$S(this, path);
	if (typeof d === 'object') {
		a = [];
		for (k in d) {
			if (typeof d[k] === "string") {
				a.push(k);
			}
		}
		return a;
	} else {
		if (d == null) {
			throw new Error("no such file or directory");
		} else {
			throw new Error("not a directory");
		}
	}
};


BrowserPlatform.prototype.load$S = function (name) {
	var content;
	var err;
	var xhr;
	if ($__jsx_ObjectHasOwnProperty.call(this.fileContent, name)) {
		return this.fileContent[name];
	}
	content = "";
	err = "";
	try {
		BrowserPlatform$debug_0$LBrowserPlatform$X(this, "[D] XHR: " + name);
		xhr = new XMLHttpRequest();
		xhr.open("GET", name, false);
		xhr.send(null);
		if (xhr.status === 200 || xhr.status === 0) {
			content = xhr.responseText;
		} else {
			err = (xhr.status + "") + " " + xhr.statusText + ": " + name;
		}
	} catch ($__jsx_catch_0) {
		{
			err = "XMLHttpRequest failed for " + name + ": " + ($__jsx_catch_0 + "");
		}
	}
	if (err) {
		throw new Error(err);
	}
	return this.fileContent[name] = content;
};


BrowserPlatform.prototype.error$S = function (s) {
	console.error(s);
	this._errors.push(s);
};


function BrowserPlatform$debug_0$LBrowserPlatform$X($this, content) {
	if (BrowserPlatform.debug) {
		console.log(content);
	}
};

BrowserPlatform.debug_0$LBrowserPlatform$X = BrowserPlatform$debug_0$LBrowserPlatform$X;

function BrowserPlatform$applyClosureCompiler_0$LBrowserPlatform$SSB($this, sourceText, level, minify) {
	var URL;
	var xhr;
	var param;
	var params;
	var key;
	URL = 'http://closure-compiler.appspot.com/compile';
	xhr = new XMLHttpRequest();
	xhr.open("POST", URL, false);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	param = ({ js_code: sourceText, compilation_level: level, output_format: "text", output_info: "compiled_code" });
	if (! minify) {
		param.formatting = "pretty_print";
	}
	if (level === "ADVANCED_OPTIMIZATIONS") {
		param.js_externs = "";
	}
	params = [];
	for (key in param) {
		params.push($__jsx_encodeURIComponent(key) + "=" + $__jsx_encodeURIComponent(param[key]));
	}
	xhr.send(params.join("&"));
	return xhr.responseText;
};

BrowserPlatform.applyClosureCompiler_0$LBrowserPlatform$SSB = BrowserPlatform$applyClosureCompiler_0$LBrowserPlatform$SSB;

function InstantiationContext(errors, typemap) {
	this.errors = errors;
	this.typemap = typemap;
	this.objectTypesUsed = [];
};

$__jsx_extend([InstantiationContext], Object);
function TemplateInstantiationRequest(token, className, typeArgs) {
	this._token = token;
	this._className = className;
	this._typeArgs = typeArgs;
};

$__jsx_extend([TemplateInstantiationRequest], Object);
function Block() {
};

$__jsx_extend([Block], Object);
Block.prototype.$__jsx_implements_Block = true;

function BlockContext(localVariableStatuses, block) {
	this.localVariableStatuses = localVariableStatuses;
	this.block = block;
};

$__jsx_extend([BlockContext], Object);
function AnalysisContext(errors, parser, postInstantiationCallback) {
	this.errors = errors;
	this.parser = parser;
	this.postInstantiationCallback = postInstantiationCallback;
	this.funcDef = null;
	this.blockStack = null;
	this.statement = null;
};

$__jsx_extend([AnalysisContext], Object);
function Stash() {
};

$__jsx_extend([Stash], Object);
function _JSEmitterStash() {
	this.shouldBooleanize = false;
	this.returnsBoolean = false;
};

$__jsx_extend([_JSEmitterStash], Stash);
_JSEmitterStash.prototype.clone$ = function () {
	throw new Error("logic flaw");
};


function Stashable() {
};

$__jsx_extend([Stashable], Object);
Stashable.prototype.$__jsx_implements_Stashable = true;

Stashable.prototype.setStash$SLStash$ = function (id, stash) {
	return this._stash[id] = stash;
};


Stashable.prototype.getStash$S = function (id) {
	return this._stash[id];
};


function Emitter() {
};

$__jsx_extend([Emitter], Object);
$__jsx_merge_interface(Emitter, Stashable);

Emitter.prototype.$__jsx_implements_Emitter = true;

function JavaScriptEmitter(platform) {
	this._stash = {};
	this._fileHeader = "var JSX = {};\n(function (JSX) {\n";
	this._fileFooter = "})(JSX);\n";
	this._runenv = "";
	this._output = "";
	this._outputEndsWithReturn = false;
	this._outputFile = null;
	this._indent = 0;
	this._emittingClass = null;
	this._emittingFunction = null;
	this._enableProfiler = false;
	this._enableMinifier = false;
	this._enableRunTimeTypeCheck = true;
	this._bootstrapBuilder = null;
	this._sourceMapper = null;
	this._mangler = ({});
	this._namer = null;
	JavaScriptEmitter$_initialize$();
	this._platform = platform;
};

$__jsx_extend([JavaScriptEmitter], Object);
$__jsx_merge_interface(JavaScriptEmitter, Emitter);

function JavaScriptEmitter$isJsModule_0$LJavaScriptEmitter$LClassDefinition$($this, classDef) {
	return classDef.className$() === "js" && Token$getFilename_0$LToken$(classDef.getToken$()) == Util$resolvePath$S($this._platform.getRoot$() + "/lib/js/js.jsx");
};

JavaScriptEmitter.isJsModule_0$LJavaScriptEmitter$LClassDefinition$ = JavaScriptEmitter$isJsModule_0$LJavaScriptEmitter$LClassDefinition$;

JavaScriptEmitter.prototype.getSearchPaths$ = function () {
	return [ this._platform.getRoot$() + "/lib/js" ];
};


function JavaScriptEmitter$getMangler_0$LJavaScriptEmitter$($this) {
	return $this._mangler;
};

JavaScriptEmitter.getMangler_0$LJavaScriptEmitter$ = JavaScriptEmitter$getMangler_0$LJavaScriptEmitter$;

function JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$($this) {
	return $this._namer;
};

JavaScriptEmitter.getNamer_0$LJavaScriptEmitter$ = JavaScriptEmitter$getNamer_0$LJavaScriptEmitter$;

JavaScriptEmitter.prototype.emit$ALClassDefinition$ = function (classDefs) {
	var minifier;
	var $this$0$0;
	var emitter$0$0$0;
	var $this$0$1;
	var emitter$0$0$1;
	var $this$0;
	_Util$0$setOutputClassNames$ALClassDefinition$(classDefs);
	if (this._enableMinifier) {
		minifier = new _Minifier(this, classDefs);
		$this$0$0 = new _Minifier$C_MinifyingNamer();
		$this$0$0._minifier = minifier;
		emitter$0$0$0 = minifier._emitter;
		$this$0$0._emitter = emitter$0$0$0;
		this._namer = $this$0$0;
		JavaScriptEmitter$_emitInit_0$LJavaScriptEmitter$(this);
		JavaScriptEmitter$_emitCore_0$LJavaScriptEmitter$ALClassDefinition$(this, classDefs);
		_Minifier$_minifyProperties_0$L_Minifier$(minifier);
		_Minifier$_minifyStaticVariables_0$L_Minifier$(minifier);
		_Minifier$_minifyGlobals_0$L_Minifier$(minifier);
		$this$0$1 = new _Minifier$C_MinifyingNamer();
		$this$0$1._minifier = minifier;
		emitter$0$0$1 = minifier._emitter;
		$this$0$1._emitter = emitter$0$0$1;
		this._namer = $this$0$1;
		JavaScriptEmitter$_emitInit_0$LJavaScriptEmitter$(this);
		JavaScriptEmitter$_emitCore_0$LJavaScriptEmitter$ALClassDefinition$(this, classDefs);
	} else {
		$this$0 = new _Namer();
		$this$0._emitter = this;
		this._namer = $this$0;
		JavaScriptEmitter$_emitInit_0$LJavaScriptEmitter$(this);
		JavaScriptEmitter$_emitCore_0$LJavaScriptEmitter$ALClassDefinition$(this, classDefs);
	}
	JavaScriptEmitter$_emitClassMap_0$LJavaScriptEmitter$ALClassDefinition$(this, classDefs);
};


function JavaScriptEmitter$_emitInit_0$LJavaScriptEmitter$($this) {
	var stash;
	var _platform$0;
	$this._output = "";
	$this._outputEndsWithReturn = true;
	$this._indent = 0;
	$this._emittingClass = null;
	$this._emittingFunction = null;
	$this._output += "// generatedy by JSX compiler 0.9.47 (2013-06-28 14:31:45 -0700; 517cd62770065c815b4ea9886d407afeac3c7579)\n";
	$this._output += $this._fileHeader;
	$this._output += (_platform$0 = $this._platform).load$S(_platform$0.getRoot$() + "/src/js/bootstrap.js");
	stash = $this.getStash$S("no-debug");
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "JSX.DEBUG = " + (stash == null || stash.debugValue ? "true" : "false") + ";\n", null);
};

JavaScriptEmitter._emitInit_0$LJavaScriptEmitter$ = JavaScriptEmitter$_emitInit_0$LJavaScriptEmitter$;

function JavaScriptEmitter$_emitCore_0$LJavaScriptEmitter$ALClassDefinition$($this, classDefs) {
	var i;
	var onFuncDef;
	for (i = 0; i < classDefs.length; ++ i) {
		function onFuncDef(funcDef) {
			MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(funcDef, onFuncDef);
			JavaScriptEmitter$_setupBooleanizeFlags_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef);
			return true;
		}
		ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(classDefs[i], onFuncDef);
		ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDefs[i], (function (varDef) {
			if ((varDef._flags & 8) !== 0 && varDef._initialValue != null) {
				JavaScriptEmitter$_setupBooleanizeFlags_0$LJavaScriptEmitter$LExpression$($this, varDef._initialValue);
			}
			return true;
		}));
	}
	for (i = 0; i < classDefs.length; ++ i) {
		JavaScriptEmitter$_emitClassDefinition_0$LJavaScriptEmitter$LClassDefinition$($this, classDefs[i]);
	}
	for (i = 0; i < classDefs.length; ++ i) {
		JavaScriptEmitter$_emitStaticInitializationCode_0$LJavaScriptEmitter$LClassDefinition$($this, classDefs[i]);
	}
};

JavaScriptEmitter._emitCore_0$LJavaScriptEmitter$ALClassDefinition$ = JavaScriptEmitter$_emitCore_0$LJavaScriptEmitter$ALClassDefinition$;

function JavaScriptEmitter$getStash_0$LJavaScriptEmitter$LStashable$($this, stashable) {
	var stash;
	stash = stashable.getStash$S("jsemitter");
	if (stash == null) {
		stash = stashable.setStash$SLStash$("jsemitter", new _JSEmitterStash());
	}
	return stash;
};

JavaScriptEmitter.getStash_0$LJavaScriptEmitter$LStashable$ = JavaScriptEmitter$getStash_0$LJavaScriptEmitter$LStashable$;

function JavaScriptEmitter$_setupBooleanizeFlags_0$LJavaScriptEmitter$LExpression$($this, expr) {
	var exprReturnsBoolean;
	var parentExpr;
	var onExpr;
	exprReturnsBoolean = (function (expr) {
		return (expr instanceof LogicalExpression ? JavaScriptEmitter$getStash_0$LJavaScriptEmitter$LStashable$($this, expr).returnsBoolean : expr.getType$().equals$LType$(Type.booleanType));
	});
	parentExpr = [];
	onExpr = (function (expr) {
		var shouldBooleanize;
		var returnsBoolean;
		parentExpr.unshift(expr);
		Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
		parentExpr.shift();
		if (expr instanceof LogicalExpression) {
			shouldBooleanize = true;
			returnsBoolean = false;
			if (exprReturnsBoolean(BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr)) && exprReturnsBoolean(BinaryExpression$getSecondExpr_0$LBinaryExpression$(expr))) {
				returnsBoolean = true;
				shouldBooleanize = false;
			} else {
				if (parentExpr.length === 0) {
				} else {
					if (parentExpr[0] instanceof LogicalExpression || parentExpr[0] instanceof LogicalNotExpression) {
						shouldBooleanize = false;
					} else {
						if (parentExpr[0] instanceof ConditionalExpression && ConditionalExpression$getCondExpr_0$LConditionalExpression$(parentExpr[0]) == expr) {
							shouldBooleanize = false;
						}
					}
				}
			}
			JavaScriptEmitter$getStash_0$LJavaScriptEmitter$LStashable$($this, expr).shouldBooleanize = shouldBooleanize;
			JavaScriptEmitter$getStash_0$LJavaScriptEmitter$LStashable$($this, expr).returnsBoolean = returnsBoolean;
		}
		return true;
	});
	onExpr(expr);
};

JavaScriptEmitter._setupBooleanizeFlags_0$LJavaScriptEmitter$LExpression$ = JavaScriptEmitter$_setupBooleanizeFlags_0$LJavaScriptEmitter$LExpression$;

function JavaScriptEmitter$_setupBooleanizeFlags_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef) {
	Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
		Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function (expr) {
			JavaScriptEmitter$_setupBooleanizeFlags_0$LJavaScriptEmitter$LExpression$($this, expr);
			if (statement instanceof ExpressionStatement || statement instanceof IfStatement || statement instanceof DoWhileStatement || statement instanceof WhileStatement || statement instanceof ForStatement) {
				JavaScriptEmitter$getStash_0$LJavaScriptEmitter$LStashable$($this, expr).shouldBooleanize = false;
			}
			return true;
		}));
		return statement.forEachStatement$F$LStatement$B$(onStatement);
	}), funcDef._statements);
};

JavaScriptEmitter._setupBooleanizeFlags_0$LJavaScriptEmitter$LMemberFunctionDefinition$ = JavaScriptEmitter$_setupBooleanizeFlags_0$LJavaScriptEmitter$LMemberFunctionDefinition$;

function JavaScriptEmitter$_emitClassDefinition_0$LJavaScriptEmitter$LClassDefinition$($this, classDef) {
	var ctors;
	var i;
	var members;
	var member;
	if ((classDef.flags$() & 16) !== 0) {
		if (classDef._nativeSource != null) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "var " + $this._namer.getNameOfClass$LClassDefinition$(classDef) + " = " + Util$decodeStringLiteral$S(Token$getValue_0$LToken$(classDef._nativeSource)) + ";\n", classDef._nativeSource);
		}
		return;
	}
	$this._emittingClass = classDef;
	try {
		ctors = _Util$0$findFunctions$LClassDefinition$SB(classDef, "constructor", false);
		for (i = 0; i < ctors.length; ++ i) {
			JavaScriptEmitter$_emitConstructor_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, ctors[i]);
		}
		JavaScriptEmitter$_emitClassObjectAmendments_0$LJavaScriptEmitter$LClassDefinition$ALMemberFunctionDefinition$($this, classDef, ctors);
		members = classDef._members;
		for (i = 0; i < members.length; ++ i) {
			member = members[i];
			if (member instanceof MemberFunctionDefinition) {
				if (! (MemberDefinition$name_0$LMemberDefinition$(member) === "constructor" && (member._flags & 8) === 0) && MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$(member) != null) {
					if (member instanceof TemplateFunctionDefinition) {
					} else {
						JavaScriptEmitter$_emitFunction_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, member);
					}
				}
			}
		}
	} finally {
		$this._emittingClass = null;
	}
};

JavaScriptEmitter._emitClassDefinition_0$LJavaScriptEmitter$LClassDefinition$ = JavaScriptEmitter$_emitClassDefinition_0$LJavaScriptEmitter$LClassDefinition$;

function JavaScriptEmitter$_emitStaticInitializationCode_0$LJavaScriptEmitter$LClassDefinition$($this, classDef) {
	var members;
	var i;
	var member;
	if (classDef.className$() === "js" && Token$getFilename_0$LToken$(classDef.getToken$()) == Util$resolvePath$S($this._platform.getRoot$() + "/lib/js/js.jsx")) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "var js = { global: function () { return this; }() };\n", null);
		return;
	}
	if ((classDef.flags$() & 16) !== 0) {
		return;
	}
	members = classDef._members;
	for (i = 0; i < members.length; ++ i) {
		member = members[i];
		if (member instanceof MemberVariableDefinition && (member._flags & 24) === 8) {
			JavaScriptEmitter$_emitStaticMemberVariable_0$LJavaScriptEmitter$LMemberVariableDefinition$($this, member);
		}
	}
};

JavaScriptEmitter._emitStaticInitializationCode_0$LJavaScriptEmitter$LClassDefinition$ = JavaScriptEmitter$_emitStaticInitializationCode_0$LJavaScriptEmitter$LClassDefinition$;

function JavaScriptEmitter$_emitClassMap_0$LJavaScriptEmitter$ALClassDefinition$($this, classDefs) {
	var i;
	var isFirstEntry;
	var list;
	var pushClass;
	var filename;
	var escapedFilename;
	var $this$0;
	classDefs = classDefs.concat([]);
	for (i = 0; i < classDefs.length; ) {
		if (classDefs[i].getToken$() == null || (classDefs[i].flags$() & 16) !== 0) {
			classDefs.splice(i, 1);
		} else {
			++ i;
		}
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "\nvar $__jsx_classMap = {", null);
	isFirstEntry = true;
	while (classDefs.length !== 0) {
		list = [];
		pushClass = (function (classDef) {
			var ctors;
			var exportedCtor;
			var i;
			var push;
			var ctors$len$0;
			ctors = _Util$0$findFunctions$LClassDefinition$SB(classDef, "constructor", false);
			if ((classDef.flags$() & 16384) !== 0) {
				exportedCtor = null;
				for ((i = 0, ctors$len$0 = ctors.length); i < ctors$len$0; ++ i) {
					if ((MemberDefinition$flags_0$LMemberDefinition$(ctors[i]) & 16384) !== 0) {
						exportedCtor = ctors[i];
					}
				}
				if (exportedCtor == null) {
					exportedCtor = ctors[0];
				}
				list.push([ classDef._outerClassDef != null ? ClassDefinition$classFullName_0$LClassDefinition$(classDef._outerClassDef) + "." + classDef._className : classDef.className$(), $this._namer.getNameOfConstructor$LClassDefinition$ALType$(classDef, MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(exportedCtor)) ]);
			}
			if (! $this._enableMinifier) {
				if ((classDef.flags$() & 16384) === 0) {
					list.push([ classDef._outerClassDef != null ? ClassDefinition$classFullName_0$LClassDefinition$(classDef._outerClassDef) + "." + classDef._className : classDef.className$(), $this._namer.getNameOfClass$LClassDefinition$(classDef) ]);
				}
				push = (function (argTypes) {
					list.push([ ClassDefinition$classFullName_0$LClassDefinition$(classDef) + _Mangler$mangleFunctionArguments_0$L_Mangler$ALType$($this._mangler, argTypes), $this._namer.getNameOfConstructor$LClassDefinition$ALType$(classDef, argTypes) ]);
				});
				if (ctors.length === 0) {
					push([]);
				} else {
					for (i = 0; i < ctors.length; ++ i) {
						push(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(ctors[i]));
					}
				}
			}
		});
		$this$0 = classDefs[0].getToken$();
		filename = $this$0._filename;
		pushClass(classDefs.shift());
		for (i = 0; i < classDefs.length; ) {
			if (Token$getFilename_0$LToken$(classDefs[i].getToken$()) == filename) {
				pushClass(classDefs[i]);
				classDefs.splice(i, 1);
			} else {
				++ i;
			}
		}
		if (list.length !== 0 || ! $this._enableMinifier) {
			if (isFirstEntry) {
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "\n", null);
				++ $this._indent;
				isFirstEntry = false;
			} else {
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ",\n", null);
			}
			escapedFilename = JSON.stringify(Platform$encodeFilename_0$LPlatform$S($this._platform, filename));
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, escapedFilename + ": ", null);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "{\n", null);
			++ $this._indent;
			for (i = 0; i < list.length; ++ i) {
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, _Util$0$encodeObjectLiteralKey$S(list[i][0]) + ": " + list[i][1], null);
				if (i !== list.length - 1) {
					JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ",", null);
				}
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "\n", null);
			}
			JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "}", null);
		}
	}
	if (! isFirstEntry) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "\n", null);
		JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this);
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "};\n\n", null);
};

JavaScriptEmitter._emitClassMap_0$LJavaScriptEmitter$ALClassDefinition$ = JavaScriptEmitter$_emitClassMap_0$LJavaScriptEmitter$ALClassDefinition$;

JavaScriptEmitter.prototype.getOutput$ = function () {
	var output;
	var $this$0;
	var ast$0;
	var _platform$0;
	output = "";
	if (this._sourceMapper) {
		$this$0 = this._sourceMapper;
		output += $this$0._header;
	}
	output += this._output + "\n";
	if (this._enableProfiler) {
		output += (_platform$0 = this._platform).load$S(_platform$0.getRoot$() + "/src/js/profiler.js");
	}
	if (this._bootstrapBuilder != null) {
		output = _BootstrapBuilder$addBootstrap_0$L_BootstrapBuilder$S(this._bootstrapBuilder, output);
	}
	output += this._fileFooter;
	if (this._sourceMapper) {
		output += SourceMapper$getSourceMapFooter_0$LSourceMapper$(this._sourceMapper);
	}
	if (this._enableMinifier) {
		ast$0 = esprima.parse(output);
		ast$0 = esmangle.mangle(ast$0, ({ destructive: true }));
		output = escodegen.generate(ast$0, ({ format: ({ renumber: true, hexadecimal: true, escapeless: true, compact: true, semicolons: false, parentheses: false }), directive: true }));
	}
	return output;
};


function JavaScriptEmitter$_emitClassObjectAmendments_0$LJavaScriptEmitter$LClassDefinition$ALMemberFunctionDefinition$($this, classDef, constructors) {
	var extendClassDef;
	var i;
	var implementTypes;
	var unresolvedExports;
	var this$0;
	if (classDef._extendType != null) {
		this$0 = classDef._extendType;
		extendClassDef = this$0._classDef;
	} else {
		extendClassDef = null;
	}
	if (constructors.length !== 0) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "$__jsx_extend([", null);
		for (i = 0; i < constructors.length; ++ i) {
			if (i !== 0) {
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ", ", null);
			}
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfConstructor$LClassDefinition$ALType$(classDef, MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(constructors[i])), null);
		}
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "], " + (extendClassDef != null ? $this._namer.getNameOfClass$LClassDefinition$(extendClassDef) : "Object") + ");\n", null);
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "function " + $this._namer.getNameOfClass$LClassDefinition$(classDef) + "() {}\n", null);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "$__jsx_extend([" + $this._namer.getNameOfClass$LClassDefinition$(classDef) + "], " + (extendClassDef != null ? $this._namer.getNameOfClass$LClassDefinition$(extendClassDef) : "Object") + ");\n", null);
	}
	implementTypes = classDef._implementTypes;
	if (implementTypes.length !== 0) {
		for (i = 0; i < implementTypes.length; ++ i) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "$__jsx_merge_interface(" + $this._namer.getNameOfClass$LClassDefinition$(classDef) + ", " + $this._namer.getNameOfClass$LClassDefinition$(implementTypes[i].getClassDef$()) + ");\n", null);
		}
		unresolvedExports = {};
		(function buildUnresolvedExports(baseClassDef) {
			var this$0;
			var i$0;
			var implType$0;
			if (baseClassDef._extendType != null) {
				buildUnresolvedExports(baseClassDef._extendType.getClassDef$());
			}
			this$0 = baseClassDef._implementTypes;
			for (i$0 in this$0) {
				implType$0 = this$0[i$0];
				buildUnresolvedExports(implType$0._classDef);
			}
			ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$(baseClassDef, (function (funcDef) {
				if ((MemberDefinition$flags_0$LMemberDefinition$(funcDef) & (ClassDefinition.IS_STATIC | ClassDefinition.IS_EXPORT)) === ClassDefinition.IS_EXPORT && MemberDefinition$name_0$LMemberDefinition$(funcDef) !== "constructor") {
					if (classDef == baseClassDef && MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$(funcDef) != null) {
						delete unresolvedExports[MemberDefinition$name_0$LMemberDefinition$(funcDef)];
					} else {
						unresolvedExports[MemberDefinition$name_0$LMemberDefinition$(funcDef)] = MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef);
					}
				}
				return true;
			}));
		})(classDef);
		for (i = implementTypes.length - 1; i >= 0 && Object.keys(unresolvedExports).length !== 0; -- i) {
			ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$(implementTypes[i].getClassDef$(), (function (baseClassDef) {
				var name;
				for (name in unresolvedExports) {
					if (Util$findFunctionInClass$LClassDefinition$SALType$B(baseClassDef, name, unresolvedExports[name], false)) {
						JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfClass$LClassDefinition$(classDef) + ".prototype." + name + " = " + $this._namer.getNameOfClass$LClassDefinition$(classDef) + ".prototype." + $this._namer.getNameOfMethod$LClassDefinition$SALType$(classDef, name, unresolvedExports[name]) + ";\n", null);
						delete unresolvedExports[name];
					}
				}
				return Object.keys(unresolvedExports).length !== 0;
			}));
		}
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "\n", null);
	}
	if ((classDef.flags$() & 192) !== 0) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfClass$LClassDefinition$(classDef) + ".prototype.$__jsx_implements_" + $this._namer.getNameOfClass$LClassDefinition$(classDef) + " = true;\n\n", null);
	}
};

JavaScriptEmitter._emitClassObjectAmendments_0$LJavaScriptEmitter$LClassDefinition$ALMemberFunctionDefinition$ = JavaScriptEmitter$_emitClassObjectAmendments_0$LJavaScriptEmitter$LClassDefinition$ALMemberFunctionDefinition$;

function JavaScriptEmitter$_emitConstructor_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef) {
	var funcName;
	funcName = $this._namer.getNameOfConstructor$LClassDefinition$ALType$(funcDef._classDef, MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef));
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "function ", null);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, funcName + "(", funcDef._classDef.getToken$());
	$this._namer.enterFunction$LMemberFunctionDefinition$F$V$(funcDef, (function () {
		JavaScriptEmitter$_emitFunctionArguments_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ") {\n", null);
		++ $this._indent;
		JavaScriptEmitter$_emitFunctionBody_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef);
		JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "};\n\n", null);
	}));
};

JavaScriptEmitter._emitConstructor_0$LJavaScriptEmitter$LMemberFunctionDefinition$ = JavaScriptEmitter$_emitConstructor_0$LJavaScriptEmitter$LMemberFunctionDefinition$;

function JavaScriptEmitter$_emitFunction_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef) {
	var isStatic;
	isStatic = (funcDef._flags & 8) !== 0;
	if (isStatic) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "function " + $this._namer.getNameOfStaticFunction$LClassDefinition$SALType$(funcDef._classDef, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef)) + "(", funcDef._nameToken);
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfClass$LClassDefinition$(funcDef._classDef) + ".prototype." + $this._namer.getNameOfMethod$LClassDefinition$SALType$(funcDef._classDef, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef)) + " = function (", funcDef._nameToken);
	}
	$this._namer.enterFunction$LMemberFunctionDefinition$F$V$(funcDef, (function () {
		JavaScriptEmitter$_emitFunctionArguments_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ") {\n", null);
		++ $this._indent;
		JavaScriptEmitter$_emitFunctionBody_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef);
		JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "};\n\n", null);
	}));
	if (isStatic) {
		if (Util$memberIsExported$LClassDefinition$SALType$B(funcDef._classDef, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef), true)) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfClass$LClassDefinition$(funcDef._classDef) + "." + MemberDefinition$name_0$LMemberDefinition$(funcDef) + " = " + $this._namer.getNameOfStaticFunction$LClassDefinition$SALType$(funcDef._classDef, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef)) + ";\n", null);
		}
		if (! $this._enableMinifier) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfClass$LClassDefinition$(funcDef._classDef) + "." + MemberDefinition$name_0$LMemberDefinition$(funcDef) + _Mangler$mangleFunctionArguments_0$L_Mangler$ALType$($this._mangler, MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef)) + " = " + $this._namer.getNameOfStaticFunction$LClassDefinition$SALType$(funcDef._classDef, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef)) + ";\n", null);
		}
	} else {
		if (Util$memberIsExported$LClassDefinition$SALType$B(funcDef._classDef, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef), false)) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfClass$LClassDefinition$(funcDef._classDef) + ".prototype." + MemberDefinition$name_0$LMemberDefinition$(funcDef) + " = " + $this._namer.getNameOfClass$LClassDefinition$(funcDef._classDef) + ".prototype." + $this._namer.getNameOfMethod$LClassDefinition$SALType$(funcDef._classDef, MemberDefinition$name_0$LMemberDefinition$(funcDef), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(funcDef)) + ";\n", null);
		}
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "\n", null);
};

JavaScriptEmitter._emitFunction_0$LJavaScriptEmitter$LMemberFunctionDefinition$ = JavaScriptEmitter$_emitFunction_0$LJavaScriptEmitter$LMemberFunctionDefinition$;

function JavaScriptEmitter$_emitFunctionArguments_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef) {
	var args;
	var i;
	args = funcDef._args;
	for (i = 0; i < args.length; ++ i) {
		if (i !== 0) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ", ", null);
		}
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfLocalVariable$LLocalVariable$(args[i]), LocalVariable$getName_0$LLocalVariable$(args[i]));
	}
};

JavaScriptEmitter._emitFunctionArguments_0$LJavaScriptEmitter$LMemberFunctionDefinition$ = JavaScriptEmitter$_emitFunctionArguments_0$LJavaScriptEmitter$LMemberFunctionDefinition$;

function JavaScriptEmitter$_emitFunctionBody_0$LJavaScriptEmitter$LMemberFunctionDefinition$($this, funcDef) {
	var prevEmittingFunction;
	var locals;
	var i;
	var type;
	var statements;
	var $this$0;
	var statement$0;
	var emitter$0;
	prevEmittingFunction = $this._emittingFunction;
	try {
		$this._emittingFunction = funcDef;
		if ($this._enableProfiler) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "var $__jsx_profiler_ctx = $__jsx_profiler.enter(" + Util$encodeStringLiteral$S(funcDef.getNotation$()) + ");\n", null);
		}
		if (funcDef._closures.length !== 0 && (funcDef._flags & 8) === 0) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "var $this = this;\n", null);
		}
		if (_CallExpressionEmitter$mathAbsUsesTemporary$LMemberFunctionDefinition$(funcDef)) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "var $math_abs_t;\n", null);
		}
		locals = funcDef._locals;
		for (i = 0; i < locals.length; ++ i) {
			$this$0 = locals[i];
			type = $this$0._type;
			if (type == null) {
				continue;
			}
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "var " + $this._namer.getNameOfLocalVariable$LLocalVariable$(locals[i]) + ";\n", null);
		}
		statements = funcDef._statements;
		for (i = 0; i < statements.length; ++ i) {
			statement$0 = statements[i];
			emitter$0 = JavaScriptEmitter$_getStatementEmitterFor_0$LJavaScriptEmitter$LStatement$($this, statement$0);
			emitter$0.emit$();
		}
		if ($this._enableProfiler) {
			if (statements.length === 0 || ! (statements[statements.length - 1] instanceof ReturnStatement)) {
				JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "$__jsx_profiler.exit();\n", null);
			}
		}
	} finally {
		$this._emittingFunction = prevEmittingFunction;
	}
};

JavaScriptEmitter._emitFunctionBody_0$LJavaScriptEmitter$LMemberFunctionDefinition$ = JavaScriptEmitter$_emitFunctionBody_0$LJavaScriptEmitter$LMemberFunctionDefinition$;

function JavaScriptEmitter$_emitStaticMemberVariable_0$LJavaScriptEmitter$LMemberVariableDefinition$($this, variable) {
	var initialValue;
	initialValue = variable._initialValue;
	if (initialValue != null && ! (initialValue instanceof NullExpression || initialValue instanceof BooleanLiteralExpression || initialValue instanceof IntegerLiteralExpression || initialValue instanceof NumberLiteralExpression || initialValue instanceof StringLiteralExpression || initialValue instanceof RegExpLiteralExpression)) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "$__jsx_lazy_init(", variable._nameToken);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfClass$LClassDefinition$(variable._classDef) + ", \"" + $this._namer.getNameOfStaticVariable$LClassDefinition$S(variable._classDef, MemberDefinition$name_0$LMemberDefinition$(variable)) + "\", function () {\n", variable._nameToken);
		++ $this._indent;
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "return ", variable._nameToken);
		JavaScriptEmitter$_emitRHSOfAssignment_0$LJavaScriptEmitter$LExpression$LType$($this, initialValue, variable.getType$());
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ";\n", variable._nameToken);
		JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "});\n", variable._nameToken);
	} else {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, $this._namer.getNameOfClass$LClassDefinition$(variable._classDef) + "." + $this._namer.getNameOfStaticVariable$LClassDefinition$S(variable._classDef, MemberDefinition$name_0$LMemberDefinition$(variable)) + " = ", variable._nameToken);
		JavaScriptEmitter$_emitRHSOfAssignment_0$LJavaScriptEmitter$LExpression$LType$($this, initialValue, variable.getType$());
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ";\n", initialValue._token);
	}
};

JavaScriptEmitter._emitStaticMemberVariable_0$LJavaScriptEmitter$LMemberVariableDefinition$ = JavaScriptEmitter$_emitStaticMemberVariable_0$LJavaScriptEmitter$LMemberVariableDefinition$;

function JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$($this, statements) {
	var i;
	var statement$0;
	var emitter$0;
	++ $this._indent;
	for (i = 0; i < statements.length; ++ i) {
		statement$0 = statements[i];
		emitter$0 = JavaScriptEmitter$_getStatementEmitterFor_0$LJavaScriptEmitter$LStatement$($this, statement$0);
		emitter$0.emit$();
	}
	JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this);
};

JavaScriptEmitter._emitStatements_0$LJavaScriptEmitter$ALStatement$ = JavaScriptEmitter$_emitStatements_0$LJavaScriptEmitter$ALStatement$;

function JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, str, token) {
	if (str === "") {
		return;
	}
	if ($this._outputEndsWithReturn && $this._indent !== 0) {
		$this._output += JavaScriptEmitter$_getIndent_0$LJavaScriptEmitter$($this);
		$this._outputEndsWithReturn = false;
	}
	if ($this._sourceMapper != null && token != null) {
		SourceMapper$add_0$LSourceMapper$SNNUSUS($this._sourceMapper, $this._output, token._lineNumber, token._columnNumber, token._isIdentifier ? token._value : null, token._filename);
	}
	str = str.replace(/\n(.)/g, (function (m) {
		return "\n" + JavaScriptEmitter$_getIndent_0$LJavaScriptEmitter$($this) + m.substring(1);
	}));
	$this._output += str;
	$this._outputEndsWithReturn = str.charAt(str.length - 1) === "\n";
};

JavaScriptEmitter._emit_0$LJavaScriptEmitter$SLToken$ = JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$;

function JavaScriptEmitter$_advanceIndent_0$LJavaScriptEmitter$($this) {
	++ $this._indent;
};

JavaScriptEmitter._advanceIndent_0$LJavaScriptEmitter$ = JavaScriptEmitter$_advanceIndent_0$LJavaScriptEmitter$;

function JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this) {
	if (-- $this._indent < 0) {
		throw new Error("indent mistach");
	}
};

JavaScriptEmitter._reduceIndent_0$LJavaScriptEmitter$ = JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$;

function JavaScriptEmitter$_getIndent_0$LJavaScriptEmitter$($this) {
	var s;
	var i;
	s = "";
	for (i = 0; i < $this._indent; ++ i) {
		s += "\t";
	}
	return s;
};

JavaScriptEmitter._getIndent_0$LJavaScriptEmitter$ = JavaScriptEmitter$_getIndent_0$LJavaScriptEmitter$;

function JavaScriptEmitter$_getStatementEmitterFor_0$LJavaScriptEmitter$LStatement$($this, statement) {
	if (statement instanceof ConstructorInvocationStatement) {
		return new _ConstructorInvocationStatementEmitter($this, statement);
	} else {
		if (statement instanceof ExpressionStatement) {
			return new _ExpressionStatementEmitter($this, statement);
		} else {
			if (statement instanceof FunctionStatement) {
				return new _FunctionStatementEmitter($this, statement);
			} else {
				if (statement instanceof ReturnStatement) {
					return new _ReturnStatementEmitter($this, statement);
				} else {
					if (statement instanceof DeleteStatement) {
						return new _DeleteStatementEmitter($this, statement);
					} else {
						if (statement instanceof BreakStatement) {
							return new _BreakStatementEmitter($this, statement);
						} else {
							if (statement instanceof ContinueStatement) {
								return new _ContinueStatementEmitter($this, statement);
							} else {
								if (statement instanceof DoWhileStatement) {
									return new _DoWhileStatementEmitter($this, statement);
								} else {
									if (statement instanceof ForInStatement) {
										return new _ForInStatementEmitter($this, statement);
									} else {
										if (statement instanceof ForStatement) {
											return new _ForStatementEmitter($this, statement);
										} else {
											if (statement instanceof IfStatement) {
												return new _IfStatementEmitter($this, statement);
											} else {
												if (statement instanceof SwitchStatement) {
													return new _SwitchStatementEmitter($this, statement);
												} else {
													if (statement instanceof CaseStatement) {
														return new _CaseStatementEmitter($this, statement);
													} else {
														if (statement instanceof DefaultStatement) {
															return new _DefaultStatementEmitter($this, statement);
														} else {
															if (statement instanceof WhileStatement) {
																return new _WhileStatementEmitter($this, statement);
															} else {
																if (statement instanceof TryStatement) {
																	return new _TryStatementEmitter($this, statement);
																} else {
																	if (statement instanceof CatchStatement) {
																		return new _CatchStatementEmitter($this, statement);
																	} else {
																		if (statement instanceof ThrowStatement) {
																			return new _ThrowStatementEmitter($this, statement);
																		} else {
																			if (statement instanceof AssertStatement) {
																				return new _AssertStatementEmitter($this, statement);
																			} else {
																				if (statement instanceof LogStatement) {
																					return new _LogStatementEmitter($this, statement);
																				} else {
																					if (statement instanceof DebuggerStatement) {
																						return new _DebuggerStatementEmitter($this, statement);
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	throw new Error("got unexpected type of statement: " + JSON.stringify(statement.serialize$()));
};

JavaScriptEmitter._getStatementEmitterFor_0$LJavaScriptEmitter$LStatement$ = JavaScriptEmitter$_getStatementEmitterFor_0$LJavaScriptEmitter$LStatement$;

function JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this, expr) {
	if (expr instanceof LocalExpression) {
		return new _LocalExpressionEmitter($this, expr);
	} else {
		if (expr instanceof ClassExpression) {
			return new _ClassExpressionEmitter($this, expr);
		} else {
			if (expr instanceof NullExpression) {
				return new _NullExpressionEmitter($this, expr);
			} else {
				if (expr instanceof BooleanLiteralExpression) {
					return new _BooleanLiteralExpressionEmitter($this, expr);
				} else {
					if (expr instanceof IntegerLiteralExpression) {
						return new _IntegerLiteralExpressionEmitter($this, expr);
					} else {
						if (expr instanceof NumberLiteralExpression) {
							return new _NumberLiteralExpressionEmitter($this, expr);
						} else {
							if (expr instanceof StringLiteralExpression) {
								return new _StringLiteralExpressionEmitter($this, expr);
							} else {
								if (expr instanceof RegExpLiteralExpression) {
									return new _RegExpLiteralExpressionEmitter($this, expr);
								} else {
									if (expr instanceof ArrayLiteralExpression) {
										return new _ArrayLiteralExpressionEmitter($this, expr);
									} else {
										if (expr instanceof MapLiteralExpression) {
											return new _MapLiteralExpressionEmitter($this, expr);
										} else {
											if (expr instanceof ThisExpression) {
												return new _ThisExpressionEmitter($this, expr);
											} else {
												if (expr instanceof BitwiseNotExpression) {
													return new _UnaryExpressionEmitter($this, expr);
												} else {
													if (expr instanceof InstanceofExpression) {
														return new _InstanceofExpressionEmitter($this, expr);
													} else {
														if (expr instanceof AsExpression) {
															return new _AsExpressionEmitter($this, expr);
														} else {
															if (expr instanceof AsNoConvertExpression) {
																return new _AsNoConvertExpressionEmitter($this, expr);
															} else {
																if (expr instanceof LogicalNotExpression) {
																	return new _UnaryExpressionEmitter($this, expr);
																} else {
																	if (expr instanceof TypeofExpression) {
																		return new _UnaryExpressionEmitter($this, expr);
																	} else {
																		if (expr instanceof PostIncrementExpression) {
																			return new _PostfixExpressionEmitter($this, expr);
																		} else {
																			if (expr instanceof PreIncrementExpression) {
																				return new _UnaryExpressionEmitter($this, expr);
																			} else {
																				if (expr instanceof PropertyExpression) {
																					return new _PropertyExpressionEmitter($this, expr);
																				} else {
																					if (expr instanceof SignExpression) {
																						return new _UnaryExpressionEmitter($this, expr);
																					} else {
																						if (expr instanceof AdditiveExpression) {
																							return new _AdditiveExpressionEmitter($this, expr);
																						} else {
																							if (expr instanceof ArrayExpression) {
																								return new _ArrayExpressionEmitter($this, expr);
																							} else {
																								if (expr instanceof AssignmentExpression) {
																									return new _AssignmentExpressionEmitter($this, expr);
																								} else {
																									if (expr instanceof BinaryNumberExpression) {
																										return new _BinaryNumberExpressionEmitter($this, expr);
																									} else {
																										if (expr instanceof EqualityExpression) {
																											return new _EqualityExpressionEmitter($this, expr);
																										} else {
																											if (expr instanceof InExpression) {
																												return new _InExpressionEmitter($this, expr);
																											} else {
																												if (expr instanceof LogicalExpression) {
																													return new _LogicalExpressionEmitter($this, expr);
																												} else {
																													if (expr instanceof ShiftExpression) {
																														return new _ShiftExpressionEmitter($this, expr);
																													} else {
																														if (expr instanceof ConditionalExpression) {
																															return new _ConditionalExpressionEmitter($this, expr);
																														} else {
																															if (expr instanceof CallExpression) {
																																return new _CallExpressionEmitter($this, expr);
																															} else {
																																if (expr instanceof SuperExpression) {
																																	return new _SuperExpressionEmitter($this, expr);
																																} else {
																																	if (expr instanceof NewExpression) {
																																		return new _NewExpressionEmitter($this, expr);
																																	} else {
																																		if (expr instanceof FunctionExpression) {
																																			return new _FunctionExpressionEmitter($this, expr);
																																		} else {
																																			if (expr instanceof CommaExpression) {
																																				return new _CommaExpressionEmitter($this, expr);
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	throw new Error("got unexpected type of expression: " + (expr != null ? JSON.stringify(expr.serialize$()) : expr.toString()));
};

JavaScriptEmitter._getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$ = JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$;

function JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$($this, token, prefix, args, argTypes) {
	var i;
	var argType;
	var $this$0;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, prefix, token);
	for (i = 0; i < args.length; ++ i) {
		if (i !== 0 || prefix.charAt(prefix.length - 1) !== '(') {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ", ", null);
		}
		argType = null;
		if (argTypes != null) {
			if (i < argTypes.length) {
				argType = argTypes[i];
			} else {
				if (argTypes.length !== 0 && argTypes[argTypes.length - 1] instanceof VariableLengthArgumentType) {
					argType = argTypes[argTypes.length - 1];
				}
			}
			if (argType instanceof VariableLengthArgumentType) {
				$this$0 = argType;
				argType = $this$0._baseType;
			}
		}
		if (argType != null && ! Type.nullType.isConvertibleTo$LType$(argType)) {
			JavaScriptEmitter$_emitRHSOfAssignment_0$LJavaScriptEmitter$LExpression$LType$($this, args[i], argType);
		} else {
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this, args[i]).emit$N(0);
		}
	}
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ")", token);
};

JavaScriptEmitter._emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$ = JavaScriptEmitter$_emitCallArguments_0$LJavaScriptEmitter$LToken$SALExpression$ALType$;

function JavaScriptEmitter$_emitAssertion_0$LJavaScriptEmitter$F$V$LToken$S($this, emitTestExpr, token, message) {
	var s;
	var err;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "if (! (", token);
	emitTestExpr();
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ")) {\n", null);
	++ $this._indent;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "debugger;\n", null);
	s = Util$makeErrorMessage$LPlatform$SUSNNN($this._platform, message, token._filename, token._lineNumber, token._columnNumber, token._value.length);
	err = Util$format$SAS('throw new Error(%1);\n', [ Util$encodeStringLiteral$S(s) ]);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, err, token);
	JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "}\n", null);
};

JavaScriptEmitter._emitAssertion_0$LJavaScriptEmitter$F$V$LToken$S = JavaScriptEmitter$_emitAssertion_0$LJavaScriptEmitter$F$V$LToken$S;

function JavaScriptEmitter$_emitAssertionWithMsg_0$LJavaScriptEmitter$F$V$LToken$SLExpression$($this, emitTestExpr, token, message, msgExpr) {
	var s;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "if (! (", token);
	emitTestExpr();
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ")) {\n", null);
	++ $this._indent;
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "debugger;\n", null);
	s = Util$makeErrorMessage$LPlatform$SUSNNN($this._platform, message + ": {MSG}", token._filename, token._lineNumber, token._columnNumber, token._value.length).split("{MSG}");
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, Util$format$SAS('throw new Error(%1 + ', [ Util$encodeStringLiteral$S(s[0]) ]), token);
	JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this, msgExpr).emit$N(0);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, Util$format$SAS(' + %1);\n', [ Util$encodeStringLiteral$S(s[1]) ]), token);
	JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this);
	JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "}\n", null);
};

JavaScriptEmitter._emitAssertionWithMsg_0$LJavaScriptEmitter$F$V$LToken$SLExpression$ = JavaScriptEmitter$_emitAssertionWithMsg_0$LJavaScriptEmitter$F$V$LToken$SLExpression$;

function JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N($this, expr, outerOpPrecedence) {
	var token;
	if ($this._enableRunTimeTypeCheck && expr.getType$() instanceof NullableType) {
		token = expr._token;
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "(function (v) {\n", token);
		++ $this._indent;
		JavaScriptEmitter$_emitAssertion_0$LJavaScriptEmitter$F$V$LToken$S($this, (function () {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "v != null", token);
		}), token, "null access");
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "return v;\n", token);
		JavaScriptEmitter$_reduceIndent_0$LJavaScriptEmitter$($this);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "}(", token);
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this, expr).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "))", token);
	} else {
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this, expr).emit$N(outerOpPrecedence);
	}
};

JavaScriptEmitter._emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N = JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N;

function JavaScriptEmitter$_emitRHSOfAssignment_0$LJavaScriptEmitter$LExpression$LType$($this, expr, lhsType) {
	var exprType;
	exprType = expr.getType$();
	if ((lhsType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(lhsType) : lhsType).equals$LType$(Type.integerType) && exprType.equals$LType$(Type.numberType)) {
		if (expr instanceof NumberLiteralExpression || expr instanceof IntegerLiteralExpression) {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, (Token$getValue_0$LToken$(expr._token) | 0).toString(), expr._token);
		} else {
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "(", expr._token);
			JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this, expr).emit$N(_BinaryNumberExpressionEmitter._operatorPrecedence["|"]);
			JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, " | 0)", expr._token);
		}
		return;
	}
	if (lhsType.equals$LType$(Type.integerType) && (exprType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(exprType) : exprType).equals$LType$(Type.numberType)) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "(", expr._token);
		JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N($this, expr, _BinaryNumberExpressionEmitter._operatorPrecedence["|"]);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, " | 0)", expr._token);
		return;
	}
	if (lhsType instanceof NullableType && NullableType$getBaseType_0$LNullableType$(lhsType).equals$LType$(Type.integerType) && (exprType instanceof NullableType && NullableType$getBaseType_0$LNullableType$(exprType).equals$LType$(Type.numberType))) {
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, "(function (v) { return v != null ? v | 0 : v; })(", expr._token);
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this, expr).emit$N(0);
		JavaScriptEmitter$_emit_0$LJavaScriptEmitter$SLToken$($this, ")", expr._token);
		return;
	}
	if (lhsType.equals$LType$(Type.variantType) || lhsType instanceof NullableType) {
		JavaScriptEmitter$_getExpressionEmitterFor_0$LJavaScriptEmitter$LExpression$($this, expr).emit$N(_AssignmentExpressionEmitter._operatorPrecedence["="]);
	} else {
		JavaScriptEmitter$_emitWithNullableGuard_0$LJavaScriptEmitter$LExpression$N($this, expr, _AssignmentExpressionEmitter._operatorPrecedence["="]);
	}
};

JavaScriptEmitter._emitRHSOfAssignment_0$LJavaScriptEmitter$LExpression$LType$ = JavaScriptEmitter$_emitRHSOfAssignment_0$LJavaScriptEmitter$LExpression$LType$;

function JavaScriptEmitter$_initialize$() {
	var precedence;
	var i;
	var opTypeList;
	var j;
	var key;
	if (JavaScriptEmitter._initialized) {
		return;
	}
	JavaScriptEmitter._initialized = true;
	precedence = [ [ ({ "new": _NewExpressionEmitter$_setOperatorPrecedence$SN }), ({ "[": _ArrayExpressionEmitter$_setOperatorPrecedence$SN }), ({ ".": _PropertyExpressionEmitter$_setOperatorPrecedence$SN }), ({ "(": _CallExpressionEmitter$_setOperatorPrecedence$SN }), ({ "super": _SuperExpressionEmitter$_setOperatorPrecedence$SN }), ({ "function": _FunctionExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "++": _PostfixExpressionEmitter$_setOperatorPrecedence$SN }), ({ "--": _PostfixExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "void": _UnaryExpressionEmitter$_setOperatorPrecedence$SN }), ({ "typeof": _UnaryExpressionEmitter$_setOperatorPrecedence$SN }), ({ "++": _UnaryExpressionEmitter$_setOperatorPrecedence$SN }), ({ "--": _UnaryExpressionEmitter$_setOperatorPrecedence$SN }), ({ "+": _UnaryExpressionEmitter$_setOperatorPrecedence$SN }), ({ "-": _UnaryExpressionEmitter$_setOperatorPrecedence$SN }), ({ "~": _UnaryExpressionEmitter$_setOperatorPrecedence$SN }), ({ "!": _UnaryExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "*": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }), ({ "/": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }), ({ "%": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "+": _AdditiveExpressionEmitter$_setOperatorPrecedence$SN }), ({ "-": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "<<": _ShiftExpressionEmitter$_setOperatorPrecedence$SN }), ({ ">>": _ShiftExpressionEmitter$_setOperatorPrecedence$SN }), ({ ">>>": _ShiftExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "<": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }), ({ ">": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }), ({ "<=": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }), ({ ">=": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }), ({ "instanceof": _InstanceofExpressionEmitter$_setOperatorPrecedence$SN }), ({ "in": _InExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "==": _EqualityExpressionEmitter$_setOperatorPrecedence$SN }), ({ "!=": _EqualityExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "&": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "^": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "|": _BinaryNumberExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "&&": _LogicalExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "||": _LogicalExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ "*=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ "/=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ "%=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ "+=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ "-=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ "<<=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ ">>=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ ">>>=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ "&=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ "^=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }), ({ "|=": _AssignmentExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ "?": _ConditionalExpressionEmitter$_setOperatorPrecedence$SN }) ], [ ({ ",": _CommaExpressionEmitter$_setOperatorPrecedence$SN }) ] ];
	for (i = 0; i < precedence.length; ++ i) {
		opTypeList = precedence[i];
		for (j = 0; j < opTypeList.length; ++ j) {
			for (key in opTypeList[j]) {
				opTypeList[j][key](key, - (precedence.length - i));
			}
		}
	}
};

JavaScriptEmitter._initialize$ = JavaScriptEmitter$_initialize$;

function LocalVariable(name, type) {
	this._stash = {};
	this.isInstantiated = false;
	this._name = name;
	this._type = type;
	this._instantiated = [];
};

$__jsx_extend([LocalVariable], Object);
$__jsx_merge_interface(LocalVariable, Stashable);

LocalVariable.prototype.serialize$ = function () {
	return [ this._name, Serializer$Type$E$serializeNullable$LType$(this._type) ];
};


function LocalVariable$serialize_0$LLocalVariable$($this) {
	return [ $this._name, Serializer$Type$E$serializeNullable$LType$($this._type) ];
};

LocalVariable.serialize_0$LLocalVariable$ = LocalVariable$serialize_0$LLocalVariable$;

function LocalVariable$getName_0$LLocalVariable$($this) {
	return $this._name;
};

LocalVariable.getName_0$LLocalVariable$ = LocalVariable$getName_0$LLocalVariable$;

LocalVariable.prototype.getType$ = function () {
	return this._type;
};


function LocalVariable$getType_0$LLocalVariable$($this) {
	return $this._type;
};

LocalVariable.getType_0$LLocalVariable$ = LocalVariable$getType_0$LLocalVariable$;

function LocalVariable$setType_0$LLocalVariable$LType$($this, type) {
	if ($this._type != null) {
		throw new Error("type is already set for " + (Token$getValue_0$LToken$($this._name) + " : " + $this._type.toString()));
	}
	if (type.equals$LType$(Type.integerType)) {
		type = Type.numberType;
	}
	$this._type = type;
};

LocalVariable.setType_0$LLocalVariable$LType$ = LocalVariable$setType_0$LLocalVariable$LType$;

LocalVariable.prototype.touchVariable$LAnalysisContext$LToken$B = function (context, token, isAssignment) {
	var blockStack$0;
	var blockStack$1;
	if (isAssignment) {
		LocalVariableStatuses$setStatus_0$LLocalVariableStatuses$LLocalVariable$((blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses, this);
	} else {
		switch (LocalVariableStatuses$getStatus_0$LLocalVariableStatuses$LLocalVariable$((blockStack$1 = context.blockStack)[blockStack$1.length - 1].localVariableStatuses, this)) {
		case -1:
			context.errors.push(new CompileError(token, "the return type of recursive function needs to be explicitly declared"));
			return false;
		case 1:
			break;
		case 0:
			context.errors.push(new CompileError(token, "variable is not initialized"));
			return false;
		case 2:
			context.errors.push(new CompileError(token, "variable may not be initialized"));
			return false;
		default:
			throw new Error("logic flaw");
		}
	}
	return true;
};


LocalVariable.prototype.toString = function () {
	return Token$getValue_0$LToken$(this._name) + " : " + this._type.toString();
};


function LocalVariable$getInstantiated_0$LLocalVariable$($this) {
	var _instantiated$0;
	if ($this._instantiated.length === 0) {
		throw new Error("logic flaw, no instantiation for " + Token$getValue_0$LToken$($this._name) + "," + ($this.isInstantiated + ""));
	}
	return (_instantiated$0 = $this._instantiated)[_instantiated$0.length - 1];
};

LocalVariable.getInstantiated_0$LLocalVariable$ = LocalVariable$getInstantiated_0$LLocalVariable$;

LocalVariable.prototype.instantiateAndPush$LInstantiationContext$ = function (instantiationContext) {
	var instantiated;
	instantiated = this._instantiate$LInstantiationContext$(instantiationContext);
	instantiated.isInstantiated = true;
	this._instantiated.push(instantiated);
	return instantiated;
};


LocalVariable.prototype._instantiate$LInstantiationContext$ = function (instantiationContext) {
	var type;
	type = (this._type != null ? this._type.instantiate$LInstantiationContext$(instantiationContext) : null);
	return new LocalVariable(this._name, type);
};


function CaughtVariable(name, type) {
	this._stash = {};
	this.isInstantiated = false;
	this._name = name;
	this._type = type;
	this._instantiated = [];
};

$__jsx_extend([CaughtVariable], LocalVariable);
CaughtVariable.prototype.clone$ = function () {
	return new CaughtVariable(this._name, this._type);
};


function CaughtVariable$clone_0$LCaughtVariable$($this) {
	return new CaughtVariable($this._name, $this._type);
};

CaughtVariable.clone_0$LCaughtVariable$ = CaughtVariable$clone_0$LCaughtVariable$;

CaughtVariable.prototype.touchVariable$LAnalysisContext$LToken$B = function (context, token, isAssignment) {
	return true;
};


CaughtVariable.prototype._instantiate$LInstantiationContext$ = function (instantiationContext) {
	return new CaughtVariable(this._name, this._type.instantiate$LInstantiationContext$(instantiationContext));
};


CaughtVariable.prototype.instantiateAndPush$LInstantiationContext$ = function (instantiationContext) {
	return LocalVariable.prototype.instantiateAndPush$LInstantiationContext$.call(this, instantiationContext);
};


function ArgumentDeclaration(name, type) {
	this._stash = {};
	this.isInstantiated = false;
	this._name = name;
	this._type = type;
	this._instantiated = [];
	this._defaultValue = null;
};

function ArgumentDeclaration$0(name, type, defaultValue) {
	this._stash = {};
	this.isInstantiated = false;
	this._name = name;
	this._type = type;
	this._instantiated = [];
	this._defaultValue = defaultValue;
};

$__jsx_extend([ArgumentDeclaration, ArgumentDeclaration$0], LocalVariable);
ArgumentDeclaration.prototype.clone$ = function () {
	return new ArgumentDeclaration$0(this._name, this._type, this._defaultValue);
};


function ArgumentDeclaration$clone_0$LArgumentDeclaration$($this) {
	return new ArgumentDeclaration$0($this._name, $this._type, $this._defaultValue);
};

ArgumentDeclaration.clone_0$LArgumentDeclaration$ = ArgumentDeclaration$clone_0$LArgumentDeclaration$;

function ArgumentDeclaration$getDefaultValue_0$LArgumentDeclaration$($this) {
	return $this._defaultValue;
};

ArgumentDeclaration.getDefaultValue_0$LArgumentDeclaration$ = ArgumentDeclaration$getDefaultValue_0$LArgumentDeclaration$;

ArgumentDeclaration.prototype._instantiate$LInstantiationContext$ = function (instantiationContext) {
	var type;
	type = (this._type != null ? this._type.instantiate$LInstantiationContext$(instantiationContext) : null);
	return new ArgumentDeclaration$0(this._name, type, this._defaultValue);
};


ArgumentDeclaration.prototype.instantiateAndPush$LInstantiationContext$ = function (instantiationContext) {
	return LocalVariable.prototype.instantiateAndPush$LInstantiationContext$.call(this, instantiationContext);
};


function LocalVariableStatuses(funcDef, base) {
	var k;
	var args;
	var i;
	var locals;
	this._isReachable = false;
	this._statuses = {};
	if (base != null) {
		for (k in base._statuses) {
			this._statuses[k] = (base._statuses[k] == 0 ? 2 : base._statuses[k]);
		}
	}
	args = funcDef._args;
	for (i = 0; i < args.length; ++ i) {
		this._statuses[Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(args[i]))] = 1;
	}
	locals = funcDef._locals;
	for (i = 0; i < locals.length; ++ i) {
		this._statuses[Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(locals[i]))] = 0;
	}
	this._isReachable = true;
};

function LocalVariableStatuses$0(srcStatus) {
	this._isReachable = false;
	this._statuses = {};
	LocalVariableStatuses$_copyFrom_0$LLocalVariableStatuses$LLocalVariableStatuses$(this, srcStatus);
	this._isReachable = srcStatus._isReachable;
};

$__jsx_extend([LocalVariableStatuses, LocalVariableStatuses$0], Object);
LocalVariableStatuses.prototype.clone$ = function () {
	return new LocalVariableStatuses$0(this);
};


function LocalVariableStatuses$clone_0$LLocalVariableStatuses$($this) {
	return new LocalVariableStatuses$0($this);
};

LocalVariableStatuses.clone_0$LLocalVariableStatuses$ = LocalVariableStatuses$clone_0$LLocalVariableStatuses$;

function LocalVariableStatuses$merge_0$LLocalVariableStatuses$LLocalVariableStatuses$($this, that) {
	var ret;
	var k;
	if ($this._isReachable !== that._isReachable) {
		if ($this._isReachable) {
			return new LocalVariableStatuses$0($this);
		} else {
			return new LocalVariableStatuses$0(that);
		}
	}
	ret = new LocalVariableStatuses$0($this);
	for (k in ret._statuses) {
		if (ret._statuses[k] == 0 && that._statuses[k] == 0) {
		} else {
			if (ret._statuses[k] == 1 && that._statuses[k] == 1) {
			} else {
				ret._statuses[k] = 2;
			}
		}
	}
	return ret;
};

LocalVariableStatuses.merge_0$LLocalVariableStatuses$LLocalVariableStatuses$ = LocalVariableStatuses$merge_0$LLocalVariableStatuses$LLocalVariableStatuses$;

function LocalVariableStatuses$mergeFinally_0$LLocalVariableStatuses$LLocalVariableStatuses$($this, postFinallyStats) {
	var ret;
	var k;
	ret = new LocalVariableStatuses$0($this);
	for (k in ret._statuses) {
		switch (postFinallyStats._statuses[k]) {
		case 1:
			ret._statuses[k] = 1;
			break;
		case 2:
			if (ret._statuses[k] != 1) {
				ret._statuses[k] = 2;
			}
			break;
		}
	}
	if (! postFinallyStats._isReachable) {
		ret._isReachable = false;
	}
	return ret;
};

LocalVariableStatuses.mergeFinally_0$LLocalVariableStatuses$LLocalVariableStatuses$ = LocalVariableStatuses$mergeFinally_0$LLocalVariableStatuses$LLocalVariableStatuses$;

function LocalVariableStatuses$setStatus_0$LLocalVariableStatuses$LLocalVariable$($this, local) {
	var name;
	var $this$0;
	$this$0 = local._name;
	name = $this$0._value;
	if ($this._statuses[name] == null) {
		throw new Error("logic flaw, could not find status for local variable: " + name);
	}
	$this._statuses[name] = 1;
};

LocalVariableStatuses.setStatus_0$LLocalVariableStatuses$LLocalVariable$ = LocalVariableStatuses$setStatus_0$LLocalVariableStatuses$LLocalVariable$;

function LocalVariableStatuses$getStatus_0$LLocalVariableStatuses$LLocalVariable$($this, local) {
	var name;
	var $this$0;
	$this$0 = local._name;
	name = $this$0._value;
	if ($this._statuses[name] == null) {
		throw new Error("logic flaw, could not find status for local variable: " + name);
	}
	return $this._statuses[name];
};

LocalVariableStatuses.getStatus_0$LLocalVariableStatuses$LLocalVariable$ = LocalVariableStatuses$getStatus_0$LLocalVariableStatuses$LLocalVariable$;

function LocalVariableStatuses$isReachable_0$LLocalVariableStatuses$($this) {
	return $this._isReachable;
};

LocalVariableStatuses.isReachable_0$LLocalVariableStatuses$ = LocalVariableStatuses$isReachable_0$LLocalVariableStatuses$;

function LocalVariableStatuses$_copyFrom_0$LLocalVariableStatuses$LLocalVariableStatuses$($this, that) {
	var k;
	for (k in that._statuses) {
		$this._statuses[k] = that._statuses[k];
	}
};

LocalVariableStatuses._copyFrom_0$LLocalVariableStatuses$LLocalVariableStatuses$ = LocalVariableStatuses$_copyFrom_0$LLocalVariableStatuses$LLocalVariableStatuses$;

function CompileIssue(token, message) {
	this._filename = null;
	this._lineNumber = 0;
	this._columnNumber = 0;
	this._message = "";
	this._size = 0;
	if (token != null) {
		this._filename = token._filename;
		this._lineNumber = token._lineNumber;
		this._columnNumber = token._columnNumber;
		this._size = token._value.length;
		this._message = message;
	} else {
		this._filename = null;
		this._lineNumber = 0;
		this._columnNumber = -1;
		this._message = message;
		this._size = 1;
	}
};

$__jsx_extend([CompileIssue], Object);
function CompileIssue$format_0$LCompileIssue$LPlatform$($this, platform) {
	return Util$makeErrorMessage$LPlatform$SUSNNN(platform, $this.getPrefix$() + $this._message, $this._filename, $this._lineNumber, $this._columnNumber, $this._size);
};

CompileIssue.format_0$LCompileIssue$LPlatform$ = CompileIssue$format_0$LCompileIssue$LPlatform$;

function CompileError(token, message) {
	CompileIssue.call(this, token, message);
	this._notes = [];
};

function CompileError$0(filename, lineNumber, columnNumber, message) {
	this._filename = filename;
	this._lineNumber = lineNumber;
	this._columnNumber = columnNumber;
	this._message = message;
	this._size = 1;
	this._notes = [];
};

$__jsx_extend([CompileError, CompileError$0], CompileIssue);
function CompileError$addCompileNote_0$LCompileError$LCompileNote$($this, note) {
	$this._notes.push(note);
	return $this;
};

CompileError.addCompileNote_0$LCompileError$LCompileNote$ = CompileError$addCompileNote_0$LCompileError$LCompileNote$;

function CompileError$addCompileNotes_0$LCompileError$ALCompileNote$($this, notes) {
	var i$0;
	var note$0;
	for (i$0 in notes) {
		note$0 = notes[i$0];
		$this._notes.push(note$0);
	}
};

CompileError.addCompileNotes_0$LCompileError$ALCompileNote$ = CompileError$addCompileNotes_0$LCompileError$ALCompileNote$;

CompileError.prototype.getPrefix$ = function () {
	return "";
};


function CompileWarning(token, message) {
	CompileError.call(this, token, message);
};

$__jsx_extend([CompileWarning], CompileError);
CompileWarning.prototype.getPrefix$ = function () {
	return "Warning: ";
};


function DeprecatedWarning(filename, lineNumber, columnNumber, message) {
	this._filename = filename;
	this._lineNumber = lineNumber;
	this._columnNumber = columnNumber;
	this._message = message;
	this._size = 1;
	this._notes = [];
};

$__jsx_extend([DeprecatedWarning], CompileWarning);
function CompileNote(token, message) {
	CompileIssue.call(this, token, message);
};

$__jsx_extend([CompileNote], CompileIssue);
CompileNote.prototype.getPrefix$ = function () {
	return "Note: ";
};


function Token(value, isIdentifier, filename, lineNumber, columnNumber) {
	this._value = value;
	this._isIdentifier = isIdentifier;
	this._filename = filename;
	this._lineNumber = lineNumber;
	this._columnNumber = columnNumber;
};

function Token$0(value, isIdentifier) {
	Token.call(this, value, isIdentifier, null, NaN, NaN);
};

$__jsx_extend([Token, Token$0], Object);
function Token$getValue_0$LToken$($this) {
	return $this._value;
};

Token.getValue_0$LToken$ = Token$getValue_0$LToken$;

function Token$getFilename_0$LToken$($this) {
	return $this._filename;
};

Token.getFilename_0$LToken$ = Token$getFilename_0$LToken$;

function Token$getLineNumber_0$LToken$($this) {
	return $this._lineNumber;
};

Token.getLineNumber_0$LToken$ = Token$getLineNumber_0$LToken$;

function Token$getColumnNumber_0$LToken$($this) {
	return $this._columnNumber;
};

Token.getColumnNumber_0$LToken$ = Token$getColumnNumber_0$LToken$;

function Token$serialize_0$LToken$($this) {
	return [ $this._value, $this._isIdentifier, $this._filename, $this._lineNumber, $this._columnNumber ];
};

Token.serialize_0$LToken$ = Token$serialize_0$LToken$;

function _Lexer() {
};

$__jsx_extend([_Lexer], Object);
function _Lexer$makeAlt$AS(patterns) {
	return "(?: \n" + patterns.join("\n | \n") + "\n)\n";
};

_Lexer.makeAlt$AS = _Lexer$makeAlt$AS;

function _Lexer$rx$S(pat) {
	return new RegExp(pat.replace(/[ \t\r\n]/g, ""));
};

_Lexer.rx$S = _Lexer$rx$S;

function Import(parser) {
	this._filenameToken = null;
	this._aliasToken = null;
	this._classNames = null;
	this._sourceParsers = [ parser ];
};

function Import$0(filenameToken, aliasToken, classNames) {
	this._filenameToken = filenameToken;
	this._aliasToken = aliasToken;
	this._classNames = classNames;
	this._sourceParsers = [  ];
};

$__jsx_extend([Import, Import$0], Object);
function Import$getFilenameToken_0$LImport$($this) {
	return $this._filenameToken;
};

Import.getFilenameToken_0$LImport$ = Import$getFilenameToken_0$LImport$;

function Import$getAlias_0$LImport$($this) {
	return ($this._aliasToken ? Token$getValue_0$LToken$($this._aliasToken) : null);
};

Import.getAlias_0$LImport$ = Import$getAlias_0$LImport$;

Import.prototype.serialize$ = function () {
	return [ "Import", Serializer$Token$E$serializeNullable$LToken$(this._filenameToken), Serializer$Token$E$serializeNullable$LToken$(this._aliasToken), Serializer$Token$E$serializeArray$ALToken$(this._classNames) ];
};


function Import$checkNameConflict_0$LImport$ALCompileError$LToken$($this, errors, nameToken) {
	var i;
	if ($this._aliasToken != null) {
		if (Token$getValue_0$LToken$($this._aliasToken) === nameToken._value) {
			errors.push(new CompileError(nameToken, "an alias with the same name is already declared"));
			return false;
		}
	} else {
		if ($this._classNames != null) {
			for (i = 0; i < $this._classNames.length; ++ i) {
				if (Token$getValue_0$LToken$($this._classNames[i]) === nameToken._value) {
					errors.push(new CompileError(nameToken, "a class with the same name has already been explicitely imported"));
					return false;
				}
			}
		}
	}
	return true;
};

Import.checkNameConflict_0$LImport$ALCompileError$LToken$ = Import$checkNameConflict_0$LImport$ALCompileError$LToken$;

function Import$assertExistenceOfNamedClasses_0$LImport$ALCompileError$($this, errors) {
	var allClassNames;
	var i;
	var countNumberOfClassesByName;
	var _classNames$0;
	var _classNames$1;
	if ($this._classNames == null) {
		return;
	}
	allClassNames = [];
	for (i = 0; i < $this._sourceParsers.length; ++ i) {
		allClassNames = allClassNames.concat(Parser$getClassDefs_0$LParser$($this._sourceParsers[i]).map((function (classDef) {
			return classDef.className$();
		})));
		allClassNames = allClassNames.concat(Parser$getTemplateClassDefs_0$LParser$($this._sourceParsers[i]).map((function (classDef) {
			return classDef._className;
		})));
	}
	function countNumberOfClassesByName(className) {
		var num;
		var i;
		var allClassNames$len$0;
		num = 0;
		for ((i = 0, allClassNames$len$0 = allClassNames.length); i < allClassNames$len$0; ++ i) {
			if (allClassNames[i] == className) {
				++ num;
			}
		}
		return num;
	}
	for (i = 0; i < $this._classNames.length; ++ i) {
		switch (countNumberOfClassesByName(Token$getValue_0$LToken$($this._classNames[i]))) {
		case 0:
			errors.push(new CompileError((_classNames$0 = $this._classNames)[i], "no definition for class '" + Token$getValue_0$LToken$(_classNames$0[i]) + "'"));
			break;
		case 1:
			break;
		default:
			errors.push(new CompileError((_classNames$1 = $this._classNames)[i], "multiple candidates for class '" + Token$getValue_0$LToken$(_classNames$1[i]) + "'"));
			break;
		}
	}
};

Import.assertExistenceOfNamedClasses_0$LImport$ALCompileError$ = Import$assertExistenceOfNamedClasses_0$LImport$ALCompileError$;

function Import$getClasses_0$LImport$S($this, name) {
	var found;
	var i;
	var classDefs;
	var j;
	var classDef;
	var $this$0;
	if (! Import$_classIsImportable_0$LImport$S($this, name)) {
		return [  ];
	}
	found = [  ];
	for (i = 0; i < $this._sourceParsers.length; ++ i) {
		$this$0 = $this._sourceParsers[i];
		classDefs = $this$0._classDefs;
		for (j = 0; j < classDefs.length; ++ j) {
			classDef = classDefs[j];
			if (classDef.className$() === name) {
				found.push(classDef);
				break;
			}
		}
	}
	return found;
};

Import.getClasses_0$LImport$S = Import$getClasses_0$LImport$S;

function Import$createGetTemplateClassCallbacks_0$LImport$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this, errors, request, postInstantiationCallback) {
	var callbacks;
	var i;
	var callback;
	if (! Import$_classIsImportable_0$LImport$S($this, request._className)) {
		return [];
	}
	callbacks = [];
	for (i = 0; i < $this._sourceParsers.length; ++ i) {
		callback = Parser$createGetTemplateClassCallback_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this._sourceParsers[i], errors, request, postInstantiationCallback);
		if (callback != null) {
			callbacks.push(callback);
		}
	}
	return callbacks;
};

Import.createGetTemplateClassCallbacks_0$LImport$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$ = Import$createGetTemplateClassCallbacks_0$LImport$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$;

function Import$_classIsImportable_0$LImport$S($this, name) {
	var i;
	if ($this._classNames != null) {
		for (i = 0; i < $this._classNames.length; ++ i) {
			if (Token$getValue_0$LToken$($this._classNames[i]) === name) {
				break;
			}
		}
		if (i === $this._classNames.length) {
			return false;
		}
	} else {
		if (name.charAt(0) === '_') {
			return false;
		}
	}
	return true;
};

Import._classIsImportable_0$LImport$S = Import$_classIsImportable_0$LImport$S;

function Import$create$ALCompileError$LToken$LToken$ALToken$(errors, filenameToken, aliasToken, classNames) {
	var filename;
	var match;
	filename = Util$decodeStringLiteral$S(filenameToken._value);
	if (filename.indexOf("*") !== -1) {
		match = filename.match(/^([^\*]*)\/\*(\.[^\/\*]*)$/);
		if (match == null) {
			errors.push(new CompileError(filenameToken, "invalid use of wildcard"));
			return null;
		}
		return new WildcardImport(filenameToken, aliasToken, classNames, match[1], match[2]);
	}
	return new Import$0(filenameToken, aliasToken, classNames);
};

Import.create$ALCompileError$LToken$LToken$ALToken$ = Import$create$ALCompileError$LToken$LToken$ALToken$;

function WildcardImport(filenameToken, aliasToken, classNames, directory, suffix) {
	this._filenameToken = filenameToken;
	this._aliasToken = aliasToken;
	this._classNames = classNames;
	this._sourceParsers = [  ];
	this._directory = directory;
	this._suffix = suffix;
};

$__jsx_extend([WildcardImport], Import);
function QualifiedName(token) {
	this._token = token;
	this._import = null;
	this._enclosingType = null;
};

function QualifiedName$0(token, imprt) {
	this._token = token;
	this._import = imprt;
	this._enclosingType = null;
};

function QualifiedName$1(token, enclosingType) {
	this._token = token;
	this._import = null;
	this._enclosingType = enclosingType;
};

$__jsx_extend([QualifiedName, QualifiedName$0, QualifiedName$1], Object);
QualifiedName.prototype.getToken$ = function () {
	return this._token;
};


function QualifiedName$getToken_0$LQualifiedName$($this) {
	return $this._token;
};

QualifiedName.getToken_0$LQualifiedName$ = QualifiedName$getToken_0$LQualifiedName$;

function QualifiedName$getEnclosingType_0$LQualifiedName$($this) {
	return $this._enclosingType;
};

QualifiedName.getEnclosingType_0$LQualifiedName$ = QualifiedName$getEnclosingType_0$LQualifiedName$;

QualifiedName.prototype.serialize$ = function () {
	return [ "QualifiedName", Token$serialize_0$LToken$(this._token), Serializer$Import$E$serializeNullable$LImport$(this._import), Serializer$ParsedObjectType$E$serializeNullable$LParsedObjectType$(this._enclosingType) ];
};


function QualifiedName$getClass_0$LQualifiedName$LAnalysisContext$ALType$($this, context, typeArguments) {
	var classDef;
	var classDefs;
	var callbacks;
	var enclosingClassDef;
	var _token$0;
	var _token$1;
	var _token$2;
	var _token$3;
	classDef = null;
	if ($this._import != null) {
		if (typeArguments.length === 0) {
			classDefs = Import$getClasses_0$LImport$S($this._import, Token$getValue_0$LToken$($this._token));
			switch (classDefs.length) {
			case 1:
				classDef = classDefs[0];
				break;
			case 0:
				context.errors.push(new CompileError($this._token, "no definition for class '" + ($this._enclosingType != null ? $this._enclosingType.toString() + "." + Token$getValue_0$LToken$($this._token) : Token$getValue_0$LToken$($this._token)) + "' in file '" + Token$getValue_0$LToken$(Import$getFilenameToken_0$LImport$($this._import)) + "'"));
				return null;
			default:
				context.errors.push(new CompileError($this._token, "multiple candidates"));
				return null;
			}
		} else {
			callbacks = Import$createGetTemplateClassCallbacks_0$LImport$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this._import, context.errors, ({_token: _token$0 = $this._token, _className: Token$getValue_0$LToken$(_token$0), _typeArgs: typeArguments}), (function (parser, classDef) {
				return null;
			}));
			switch (callbacks.length) {
			case 1:
				return callbacks[0](null, null, null);
			case 0:
				context.errors.push(new CompileError($this._token, "no definition for template class '" + ($this._enclosingType != null ? $this._enclosingType.toString() + "." + Token$getValue_0$LToken$($this._token) : Token$getValue_0$LToken$($this._token)) + "' in file '" + Token$getValue_0$LToken$(Import$getFilenameToken_0$LImport$($this._import)) + "'"));
				return null;
			default:
				context.errors.push(new CompileError($this._token, "multiple canditates"));
				return null;
			}
		}
	} else {
		if ($this._enclosingType != null) {
			$this._enclosingType.resolveType$LAnalysisContext$(context);
			if ((enclosingClassDef = $this._enclosingType.getClassDef$()) == null) {
				return null;
			}
			if (typeArguments.length === 0) {
				if ((classDef = ClassDefinition$lookupInnerClass_0$LClassDefinition$S(enclosingClassDef, Token$getValue_0$LToken$($this._token))) == null) {
					context.errors.push(new CompileError($this._token, "no class definition for '" + ($this._enclosingType != null ? $this._enclosingType.toString() + "." + Token$getValue_0$LToken$($this._token) : Token$getValue_0$LToken$($this._token)) + "'"));
					return null;
				}
			} else {
				if ((classDef = ClassDefinition$lookupTemplateInnerClass_0$LClassDefinition$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$(enclosingClassDef, context.errors, ({_token: _token$1 = $this._token, _className: Token$getValue_0$LToken$(_token$1), _typeArgs: typeArguments}), (function (parser, classDef) {
					return null;
				}))) == null) {
					context.errors.push(new CompileError($this._token, "failed to instantiate class"));
					return null;
				}
			}
		} else {
			if (typeArguments.length === 0) {
				if ((classDef = Parser$lookup_0$LParser$ALCompileError$LToken$S(context.parser, context.errors, _token$2 = $this._token, Token$getValue_0$LToken$(_token$2))) == null) {
					context.errors.push(new CompileError($this._token, "no class definition for '" + ($this._enclosingType != null ? $this._enclosingType.toString() + "." + Token$getValue_0$LToken$($this._token) : Token$getValue_0$LToken$($this._token)) + "'"));
					return null;
				}
			} else {
				if ((classDef = Parser$lookupTemplate_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$(context.parser, context.errors, ({_token: _token$3 = $this._token, _className: Token$getValue_0$LToken$(_token$3), _typeArgs: typeArguments}), (function (parser, classDef) {
					return null;
				}))) == null) {
					context.errors.push(new CompileError($this._token, "failed to instantiate class"));
					return null;
				}
			}
		}
	}
	return classDef;
};

QualifiedName.getClass_0$LQualifiedName$LAnalysisContext$ALType$ = QualifiedName$getClass_0$LQualifiedName$LAnalysisContext$ALType$;

QualifiedName.prototype.toString = function () {
	return (this._enclosingType != null ? this._enclosingType.toString() + "." + Token$getValue_0$LToken$(this._token) : Token$getValue_0$LToken$(this._token));
};


function ParserState(lineNumber, columnNumber, docComment, tokenLength, isGenerator, numErrors, numClosures, numObjectTypesUsed, numTemplateInstantiationRequests) {
	this.lineNumber = lineNumber;
	this.columnOffset = columnNumber;
	this.docComment = docComment;
	this.tokenLength = tokenLength;
	this.isGenerator = isGenerator;
	this.numErrors = numErrors;
	this.numClosures = numClosures;
	this.numObjectTypesUsed = numObjectTypesUsed;
	this.numTemplateInstantiationRequests = numTemplateInstantiationRequests;
};

$__jsx_extend([ParserState], Object);
function ClassState(outer, classType, typeArgs, extendType, implementTypes, objectTypesUsed, classFlags, inners, templateInners) {
	this.outer = outer;
	this.classType = classType;
	this.typeArgs = typeArgs;
	this.extendType = extendType;
	this.implementTypes = implementTypes;
	this.objectTypesUsed = objectTypesUsed;
	this.classFlags = classFlags;
	this.inners = inners;
	this.templateInners = templateInners;
};

$__jsx_extend([ClassState], Object);
function Scope(prev, locals, funcLocal, args, statements, closures, isGenerator) {
	this.prev = prev;
	this.locals = locals;
	this.funcLocal = funcLocal;
	this.arguments = args;
	this.statements = statements;
	this.closures = closures;
	this.isGenerator = isGenerator;
};

$__jsx_extend([Scope], Object);
function Parser(sourceToken, filename, completionRequest) {
	this._input = "";
	this._lines = null;
	this._tokenLength = 0;
	this._lineNumber = 0;
	this._columnOffset = 0;
	this._fileLevelDocComment = null;
	this._docComment = null;
	this._errors = null;
	this._templateClassDefs = null;
	this._classDefs = null;
	this._imports = null;
	this._isGenerator = false;
	this._locals = null;
	this._statements = null;
	this._closures = null;
	this._outerClass = null;
	this._classType = null;
	this._extendType = null;
	this._implementTypes = null;
	this._objectTypesUsed = null;
	this._inners = null;
	this._templateInners = null;
	this._templateInstantiationRequests = null;
	this._prevScope = null;
	this._funcLocal = null;
	this._arguments = null;
	this._classFlags = 0;
	this._typeArgs = null;
	this._sourceToken = sourceToken;
	this._filename = filename;
	this._completionRequest = completionRequest;
};

$__jsx_extend([Parser], Object);
function Parser$parse_0$LParser$SALCompileError$($this, input, errors) {
	var compLineNumber;
	var line;
	var importToken;
	var value1$0;
	var value2$0;
	var $this$0;
	var _input$0;
	_input$0 = $this._input = input;
	$this._lines = _input$0.split(_Lexer.rxNewline);
	$this._tokenLength = 0;
	$this._lineNumber = 1;
	$this._columnOffset = 0;
	$this._fileLevelDocComment = null;
	$this._docComment = null;
	if ($this._completionRequest != null) {
		$this$0 = $this._completionRequest;
		value1$0 = $this$0._lineNumber;
		value2$0 = $this._lines.length + 1;
		compLineNumber = (value1$0 <= value2$0 ? value1$0 : value2$0);
		line = $this._lines[compLineNumber - 1] || '';
		$this._lines[compLineNumber - 1] = line.substring(0, CompletionRequest$getColumnOffset_0$LCompletionRequest$($this._completionRequest)) + "Q," + line.substring(CompletionRequest$getColumnOffset_0$LCompletionRequest$($this._completionRequest));
	}
	$this._errors = errors;
	$this._templateClassDefs = [];
	$this._classDefs = [];
	$this._imports = [];
	$this._isGenerator = false;
	$this._locals = null;
	$this._statements = null;
	$this._closures = null;
	$this._classType = null;
	$this._extendType = null;
	$this._implementTypes = null;
	$this._objectTypesUsed = [];
	$this._inners = [];
	$this._templateInners = [];
	$this._templateInstantiationRequests = [];
	while (! Parser$_isEOF_0$LParser$($this)) {
		importToken = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "import" ], null);
		if (importToken == null) {
			break;
		}
		Parser$_importStatement_0$LParser$LToken$($this, importToken);
	}
	while (! Parser$_isEOF_0$LParser$($this)) {
		if (Parser$_classDefinition_0$LParser$($this) == null) {
			return false;
		}
	}
	return ($this._errors.length !== 0 ? false : true);
};

Parser.parse_0$LParser$SALCompileError$ = Parser$parse_0$LParser$SALCompileError$;

function Parser$_getInputByLength_0$LParser$N($this, length) {
	var _columnOffset$0;
	return $this._lines[$this._lineNumber - 1].substring(_columnOffset$0 = $this._columnOffset, _columnOffset$0 + length);
};

Parser._getInputByLength_0$LParser$N = Parser$_getInputByLength_0$LParser$N;

function Parser$_forwardPos_0$LParser$N($this, len) {
	$this._columnOffset += len;
};

Parser._forwardPos_0$LParser$N = Parser$_forwardPos_0$LParser$N;

function Parser$getPath_0$LParser$($this) {
	return $this._filename;
};

Parser.getPath_0$LParser$ = Parser$getPath_0$LParser$;

function Parser$getClassDefs_0$LParser$($this) {
	return $this._classDefs;
};

Parser.getClassDefs_0$LParser$ = Parser$getClassDefs_0$LParser$;

function Parser$getTemplateClassDefs_0$LParser$($this) {
	return $this._templateClassDefs;
};

Parser.getTemplateClassDefs_0$LParser$ = Parser$getTemplateClassDefs_0$LParser$;

function Parser$registerBuiltinImports_0$LParser$ALParser$($this, parsers) {
	var i;
	for (i = parsers.length - 1; i >= 0; -- i) {
		$this._imports.unshift(new Import(parsers[i]));
	}
};

Parser.registerBuiltinImports_0$LParser$ALParser$ = Parser$registerBuiltinImports_0$LParser$ALParser$;

function Parser$lookupImportAlias_0$LParser$S($this, name) {
	var i;
	var alias;
	var $this$0;
	for (i = 0; i < $this._imports.length; ++ i) {
		$this$0 = $this._imports[i];
		alias = ($this$0._aliasToken ? Token$getValue_0$LToken$($this$0._aliasToken) : null);
		if (alias != null && alias == name) {
			return $this._imports[i];
		}
	}
	return null;
};

Parser.lookupImportAlias_0$LParser$S = Parser$lookupImportAlias_0$LParser$S;

function Parser$lookup_0$LParser$ALCompileError$LToken$S($this, errors, contextToken, className) {
	var i;
	var classDef;
	var found;
	for (i = 0; i < $this._classDefs.length; ++ i) {
		classDef = $this._classDefs[i];
		if (classDef.className$() === className) {
			return classDef;
		}
	}
	found = [];
	for (i = 0; i < $this._imports.length; ++ i) {
		if (Import$getAlias_0$LImport$($this._imports[i]) == null) {
			found = found.concat(Import$getClasses_0$LImport$S($this._imports[i], className));
		}
	}
	if (found.length === 1) {
		return found[0];
	}
	if (found.length >= 2) {
		errors.push(new CompileError(contextToken, "multiple candidates exist for class name '" + className + "'"));
	}
	return null;
};

Parser.lookup_0$LParser$ALCompileError$LToken$S = Parser$lookup_0$LParser$ALCompileError$LToken$S;

function Parser$lookupTemplate_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this, errors, request, postInstantiationCallback) {
	var instantiateCallback;
	var candidateCallbacks;
	var i;
	instantiateCallback = Parser$createGetTemplateClassCallback_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this, errors, request, postInstantiationCallback);
	if (instantiateCallback != null) {
		return instantiateCallback(errors, request, postInstantiationCallback);
	}
	candidateCallbacks = [];
	for (i = 0; i < $this._imports.length; ++ i) {
		candidateCallbacks = candidateCallbacks.concat(Import$createGetTemplateClassCallbacks_0$LImport$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this._imports[i], errors, request, postInstantiationCallback));
	}
	if (candidateCallbacks.length === 0) {
		errors.push(new CompileError(request._token, "could not find definition for template class: '" + request._className + "'"));
		return null;
	} else {
		if (candidateCallbacks.length >= 2) {
			errors.push(new CompileError(request._token, "multiple candidates exist for template class name '" + request._className + "'"));
			return null;
		}
	}
	return candidateCallbacks[0](null, null, null);
};

Parser.lookupTemplate_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$ = Parser$lookupTemplate_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$;

function Parser$createGetTemplateClassCallback_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this, errors, request, postInstantiationCallback) {
	var i;
	var classDef;
	var templateDef;
	for (i = 0; i < $this._classDefs.length; ++ i) {
		classDef = $this._classDefs[i];
		if (classDef instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) === request._className && Util$typesAreEqual$ALType$ALType$(InstantiatedClassDefinition$getTypeArguments_0$LInstantiatedClassDefinition$(classDef), request._typeArgs)) {
			return (function (_, __, ___) {
				return classDef;
			});
		}
	}
	for (i = 0; i < $this._templateClassDefs.length; ++ i) {
		templateDef = $this._templateClassDefs[i];
		if (templateDef._className === request._className) {
			return (function (_, __, ___) {
				var classDef;
				classDef = TemplateClassDefinition$instantiateTemplateClass_0$LTemplateClassDefinition$ALCompileError$LTemplateInstantiationRequest$(templateDef, errors, request);
				if (classDef == null) {
					return null;
				}
				$this._classDefs.push(classDef);
				classDef._parser = $this;
				ClassDefinition$resolveTypes_0$LClassDefinition$LAnalysisContext$(classDef, ({errors: errors, parser: $this, postInstantiationCallback: null, funcDef: null, blockStack: null, statement: null}));
				postInstantiationCallback($this, classDef);
				return classDef;
			});
		}
	}
	return null;
};

Parser.createGetTemplateClassCallback_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$ = Parser$createGetTemplateClassCallback_0$LParser$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$;

function Parser$_popClassState_0$LParser$($this) {
	var _outerClass$0;
	$this._classType = (_outerClass$0 = $this._outerClass).classType;
	$this._typeArgs = _outerClass$0.typeArgs;
	$this._extendType = _outerClass$0.extendType;
	$this._implementTypes = _outerClass$0.implementTypes;
	$this._objectTypesUsed = _outerClass$0.objectTypesUsed;
	$this._classFlags = _outerClass$0.classFlags;
	$this._inners = _outerClass$0.inners;
	$this._templateInners = _outerClass$0.templateInners;
	$this._outerClass = _outerClass$0.outer;
};

Parser._popClassState_0$LParser$ = Parser$_popClassState_0$LParser$;

function Parser$_pushScope_0$LParser$LLocalVariable$ALArgumentDeclaration$($this, funcLocal, args) {
	$this._prevScope = ({prev: $this._prevScope, locals: $this._locals, funcLocal: $this._funcLocal, arguments: $this._arguments, statements: $this._statements, closures: $this._closures, isGenerator: $this._isGenerator});
	$this._locals = [];
	$this._funcLocal = funcLocal;
	$this._arguments = args;
	$this._statements = [];
	$this._closures = [];
	$this._isGenerator = false;
};

Parser._pushScope_0$LParser$LLocalVariable$ALArgumentDeclaration$ = Parser$_pushScope_0$LParser$LLocalVariable$ALArgumentDeclaration$;

function Parser$_popScope_0$LParser$($this) {
	var _prevScope$0;
	$this._locals = (_prevScope$0 = $this._prevScope).locals;
	$this._funcLocal = _prevScope$0.funcLocal;
	$this._arguments = _prevScope$0.arguments;
	$this._statements = _prevScope$0.statements;
	$this._closures = _prevScope$0.closures;
	$this._isGenerator = _prevScope$0.isGenerator;
	$this._prevScope = _prevScope$0.prev;
};

Parser._popScope_0$LParser$ = Parser$_popScope_0$LParser$;

function Parser$_registerLocal_0$LParser$LToken$LType$($this, identifierToken, type) {
	var isEqualTo;
	var i;
	var newLocal;
	var message$0;
	function isEqualTo(local) {
		var message$0;
		var _type$0;
		if (Token$getValue_0$LToken$(local._name) === identifierToken._value) {
			if (type != null && (_type$0 = local._type) != null && ! _type$0.equals$LType$(type)) {
				message$0 = "conflicting types for variable " + identifierToken._value;
				$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, message$0));
			}
			return true;
		}
		return false;
	}
	if ($this._arguments == null) {
		message$0 = Util$format$SAS("cannot declare variable %1 outside of a function", [ identifierToken._value ]);
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, message$0));
		return null;
	}
	if ($this._funcLocal != null) {
		if (isEqualTo($this._funcLocal)) {
			return $this._funcLocal;
		}
	}
	for (i = 0; i < $this._arguments.length; ++ i) {
		if (isEqualTo($this._arguments[i])) {
			return $this._arguments[i];
		}
	}
	for (i = 0; i < $this._locals.length; i++) {
		if (isEqualTo($this._locals[i])) {
			return $this._locals[i];
		}
	}
	newLocal = new LocalVariable(identifierToken, type);
	$this._locals.push(newLocal);
	return newLocal;
};

Parser._registerLocal_0$LParser$LToken$LType$ = Parser$_registerLocal_0$LParser$LToken$LType$;

function Parser$_restoreState_0$LParser$LParserState$($this, state) {
	var _closures$0;
	var numClosures$0;
	var _objectTypesUsed$0;
	var numObjectTypesUsed$0;
	var _templateInstantiationRequests$0;
	var numTemplateInstantiationRequests$0;
	$this._lineNumber = state.lineNumber;
	$this._columnOffset = state.columnOffset;
	$this._docComment = state.docComment;
	$this._tokenLength = state.tokenLength;
	$this._isGenerator = state.isGenerator;
	$this._errors.length = state.numErrors;
	if ($this._closures != null) {
		(_closures$0 = $this._closures).splice(numClosures$0 = state.numClosures, _closures$0.length - numClosures$0);
	}
	(_objectTypesUsed$0 = $this._objectTypesUsed).splice(numObjectTypesUsed$0 = state.numObjectTypesUsed, _objectTypesUsed$0.length - numObjectTypesUsed$0);
	(_templateInstantiationRequests$0 = $this._templateInstantiationRequests).splice(numTemplateInstantiationRequests$0 = state.numTemplateInstantiationRequests, _templateInstantiationRequests$0.length - numTemplateInstantiationRequests$0);
};

Parser._restoreState_0$LParser$LParserState$ = Parser$_restoreState_0$LParser$LParserState$;

function Parser$_advanceToken_0$LParser$($this) {
	var matched;
	var fileLevelDocComment;
	var len$0;
	var _columnOffset$0;
	var _columnOffset$1;
	var _columnOffset$2;
	if ($this._tokenLength !== 0) {
		len$0 = $this._tokenLength;
		$this._columnOffset += len$0;
		$this._tokenLength = 0;
		$this._docComment = null;
	}
	while (true) {
		while (true) {
			matched = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(/^[ \t]+/);
			if (matched != null) {
				Parser$_forwardPos_0$LParser$N($this, matched[0].length);
			}
			if ($this._columnOffset !== $this._lines[$this._lineNumber - 1].length) {
				break;
			}
			if ($this._lineNumber === $this._lines.length) {
				break;
			}
			$this._lineNumber++;
			$this._columnOffset = 0;
		}
		switch ($this._lines[$this._lineNumber - 1].substring(_columnOffset$2 = $this._columnOffset, _columnOffset$2 + 2)) {
		case "/*":
			if ($this._lines[$this._lineNumber - 1].substring(_columnOffset$1 = $this._columnOffset, _columnOffset$1 + 4) === "/***") {
				$this._columnOffset += 3;
				fileLevelDocComment = Parser$_parseDocComment_0$LParser$($this);
				if (fileLevelDocComment == null) {
					return;
				}
				if ($this._fileLevelDocComment == null) {
					$this._fileLevelDocComment = fileLevelDocComment;
				}
			} else {
				if ($this._lines[$this._lineNumber - 1].substring(_columnOffset$0 = $this._columnOffset, _columnOffset$0 + 3) === "/**") {
					$this._columnOffset += 2;
					if (($this._docComment = Parser$_parseDocComment_0$LParser$($this)) == null) {
						return;
					}
				} else {
					$this._columnOffset += 2;
					$this._docComment = null;
					if (! Parser$_skipMultilineComment_0$LParser$($this)) {
						return;
					}
				}
			}
			break;
		case "//":
			$this._docComment = null;
			if ($this._lineNumber === $this._lines.length) {
				$this._columnOffset = $this._lines[$this._lineNumber - 1].length;
			} else {
				$this._lineNumber++;
				$this._columnOffset = 0;
			}
			break;
		default:
			return;
		}
	}
};

Parser._advanceToken_0$LParser$ = Parser$_advanceToken_0$LParser$;

function Parser$_skipMultilineComment_0$LParser$($this) {
	var startLineNumber;
	var startColumnOffset;
	var endAt;
	var len$0;
	startLineNumber = $this._lineNumber;
	startColumnOffset = $this._columnOffset;
	while (true) {
		endAt = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).indexOf("*/");
		if (endAt !== -1) {
			len$0 = endAt + 2;
			$this._columnOffset += len$0;
			return true;
		}
		if ($this._lineNumber === $this._lines.length) {
			$this._columnOffset = $this._lines[$this._lineNumber - 1].length;
			$this._errors.push(new CompileError$0($this._filename, startLineNumber, startColumnOffset, "could not find the end of the comment"));
			return false;
		}
		++ $this._lineNumber;
		$this._columnOffset = 0;
	}
	return false;
};

Parser._skipMultilineComment_0$LParser$ = Parser$_skipMultilineComment_0$LParser$;

function Parser$_parseDocComment_0$LParser$($this) {
	var docComment;
	var node;
	var tagMatch;
	var tag;
	var nameMatch;
	var token;
	var endAt;
	var len$0;
	var _columnOffset$0;
	var _columnOffset$1;
	var _lineNumber$0;
	var _columnOffset$2;
	docComment = new DocComment();
	node = docComment;
	while (true) {
		Parser$_parseDocCommentAdvanceWhiteSpace_0$LParser$($this);
		if ($this._lines[$this._lineNumber - 1].substring(_columnOffset$1 = $this._columnOffset, _columnOffset$1 + 2) === "*/") {
			$this._columnOffset += 2;
			return docComment;
		} else {
			if ($this._lines[$this._lineNumber - 1].substring(_columnOffset$0 = $this._columnOffset, _columnOffset$0 + 1) === "*") {
				$this._columnOffset += 1;
				Parser$_parseDocCommentAdvanceWhiteSpace_0$LParser$($this);
			}
		}
		tagMatch = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(/^\@([0-9A-Za-z_]+)[ \t]*/);
		if (tagMatch != null) {
			Parser$_forwardPos_0$LParser$N($this, tagMatch[0].length);
			tag = tagMatch[1];
			switch (tag) {
			case "param":
				nameMatch = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(/[0-9A-Za-z_]+/);
				if (nameMatch != null) {
					token = ({_value: nameMatch[0], _isIdentifier: false, _filename: $this._filename, _lineNumber: $this._lineNumber, _columnNumber: $this._columnOffset});
					Parser$_forwardPos_0$LParser$N($this, nameMatch[0].length);
					node = new DocCommentParameter(token);
					docComment._params.push(node);
				} else {
					$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "name of the parameter not found after @param"));
					node = null;
				}
				break;
			default:
				node = new DocCommentTag(tag);
				docComment._tags.push(node);
				break;
			}
		}
		endAt = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).indexOf("*/");
		if (endAt !== -1) {
			if (node != null) {
				DocCommentNode$appendDescription_0$LDocCommentNode$S(node, $this._lines[$this._lineNumber - 1].substring($this._columnOffset).substring(0, endAt));
			}
			len$0 = endAt + 2;
			$this._columnOffset += len$0;
			return docComment;
		}
		if (node != null) {
			DocCommentNode$appendDescription_0$LDocCommentNode$S(node, $this._lines[$this._lineNumber - 1].substring($this._columnOffset));
		}
		if ($this._lineNumber === $this._lines.length) {
			_columnOffset$2 = $this._columnOffset = $this._lines[(_lineNumber$0 = $this._lineNumber) - 1].length;
			$this._errors.push(new CompileError$0($this._filename, _lineNumber$0, _columnOffset$2, "could not find the end of the doccomment"));
			return null;
		}
		++ $this._lineNumber;
		$this._columnOffset = 0;
	}
	return null;
};

Parser._parseDocComment_0$LParser$ = Parser$_parseDocComment_0$LParser$;

function Parser$_parseDocCommentAdvanceWhiteSpace_0$LParser$($this) {
	var ch;
	var _columnOffset$0;
	while (true) {
		ch = $this._lines[$this._lineNumber - 1].substring(_columnOffset$0 = $this._columnOffset, _columnOffset$0 + 1);
		if (ch === " " || ch === "\t") {
			$this._columnOffset += 1;
		} else {
			break;
		}
	}
};

Parser._parseDocCommentAdvanceWhiteSpace_0$LParser$ = Parser$_parseDocCommentAdvanceWhiteSpace_0$LParser$;

function Parser$_isEOF_0$LParser$($this) {
	var _lines$0;
	Parser$_advanceToken_0$LParser$($this);
	return $this._lineNumber === (_lines$0 = $this._lines).length && $this._columnOffset === _lines$0[_lines$0.length - 1].length;
};

Parser._isEOF_0$LParser$ = Parser$_isEOF_0$LParser$;

function Parser$_expectIsNotEOF_0$LParser$($this) {
	var _lines$0;
	Parser$_advanceToken_0$LParser$($this);
	if ($this._lineNumber === (_lines$0 = $this._lines).length && $this._columnOffset === _lines$0[_lines$0.length - 1].length) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "unexpected EOF"));
		return false;
	}
	return true;
};

Parser._expectIsNotEOF_0$LParser$ = Parser$_expectIsNotEOF_0$LParser$;

function Parser$_expectOpt_0$LParser$AS($this, expected) {
	return Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected, null);
};

Parser._expectOpt_0$LParser$AS = Parser$_expectOpt_0$LParser$AS;

function Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected, excludePattern) {
	var i;
	var offset;
	var $this$0;
	var $this$1;
	var prefix$0;
	var _columnOffset$0;
	Parser$_advanceToken_0$LParser$($this);
	for (i = 0; i < expected.length; ++ i) {
		if ($this._completionRequest != null) {
			offset = CompletionRequest$isInRange_0$LCompletionRequest$NNN($this._completionRequest, $this._lineNumber, $this._columnOffset, expected[i].length);
			if (offset !== -1) {
				$this$0 = $this._completionRequest;
				$this$1 = new KeywordCompletionCandidate(expected[i]);
				prefix$0 = $this._lines[$this._lineNumber - 1].substring(_columnOffset$0 = $this._columnOffset, _columnOffset$0 + offset);
				$this$1._prefix = prefix$0;
				$this$0._candidates.push($this$1);
			}
		}
		if (Parser$_getInputByLength_0$LParser$N($this, expected[i].length) == expected[i]) {
			if (expected[i].match(_Lexer.rxIdent) != null && $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(_Lexer.rxIdent)[0].length !== expected[i].length) {
			} else {
				if (excludePattern != null && $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(excludePattern) != null) {
				} else {
					$this._tokenLength = expected[i].length;
					return ({_value: expected[i], _isIdentifier: false, _filename: $this._filename, _lineNumber: $this._lineNumber, _columnNumber: $this._columnOffset});
				}
			}
		}
	}
	return null;
};

Parser._expectOpt_0$LParser$ASLRegExp$ = Parser$_expectOpt_0$LParser$ASLRegExp$;

function Parser$_expect_0$LParser$AS($this, expected) {
	return Parser$_expect_0$LParser$ASLRegExp$($this, expected, null);
};

Parser._expect_0$LParser$AS = Parser$_expect_0$LParser$AS;

function Parser$_expect_0$LParser$ASLRegExp$($this, expected, excludePattern) {
	var token;
	var message$0;
	token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected, excludePattern);
	if (token == null) {
		message$0 = "expected keyword: " + expected.join(" ");
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, message$0));
		return null;
	}
	return token;
};

Parser._expect_0$LParser$ASLRegExp$ = Parser$_expect_0$LParser$ASLRegExp$;

function Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, completionCb) {
	var matched;
	var offset;
	var $this$0;
	var lineNumber$0;
	var columnOffset$0;
	var length$0;
	var $this$1;
	var $this$2;
	var prefix$0;
	Parser$_advanceToken_0$LParser$($this);
	matched = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(_Lexer.rxIdent);
	if (completionCb != null && $this._completionRequest != null) {
		$this$0 = $this._completionRequest;
		lineNumber$0 = $this._lineNumber;
		columnOffset$0 = $this._columnOffset;
		length$0 = (matched != null ? matched[0].length : 0);
		offset = (lineNumber$0 !== $this$0._lineNumber ? -1 : columnOffset$0 <= $this$0._columnOffest && $this$0._columnOffest <= columnOffset$0 + length$0 ? $this$0._columnOffest - columnOffset$0 : -1);
		if (offset !== -1) {
			$this$1 = $this._completionRequest;
			$this$2 = completionCb($this);
			prefix$0 = matched[0].substring(0, offset);
			$this$2._prefix = prefix$0;
			$this$1._candidates.push($this$2);
		}
	}
	if (matched == null) {
		return null;
	}
	if ($__jsx_ObjectHasOwnProperty.call(_Lexer.keywords, matched[0])) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "expected an identifier but found a keyword"));
		return null;
	}
	if ($__jsx_ObjectHasOwnProperty.call(_Lexer.reserved, matched[0])) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "expected an identifier but found a reserved word"));
		return null;
	}
	$this._tokenLength = matched[0].length;
	return ({_value: matched[0], _isIdentifier: true, _filename: $this._filename, _lineNumber: $this._lineNumber, _columnNumber: $this._columnOffset});
};

Parser._expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$ = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$;

function Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, completionCb) {
	var token;
	token = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, completionCb);
	if (token != null) {
		return token;
	}
	$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "expected an identifier"));
	return null;
};

Parser._expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$ = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$;

function Parser$_expectStringLiteralOpt_0$LParser$($this) {
	var matched;
	Parser$_advanceToken_0$LParser$($this);
	matched = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(_Lexer.rxStringLiteral);
	if (matched == null) {
		return null;
	}
	$this._tokenLength = matched[0].length;
	return ({_value: matched[0], _isIdentifier: false, _filename: $this._filename, _lineNumber: $this._lineNumber, _columnNumber: $this._columnOffset});
};

Parser._expectStringLiteralOpt_0$LParser$ = Parser$_expectStringLiteralOpt_0$LParser$;

function Parser$_expectStringLiteral_0$LParser$($this) {
	var token;
	token = Parser$_expectStringLiteralOpt_0$LParser$($this);
	if (token != null) {
		return token;
	}
	$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "expected a string literal"));
	return null;
};

Parser._expectStringLiteral_0$LParser$ = Parser$_expectStringLiteral_0$LParser$;

function Parser$_expectNumberLiteralOpt_0$LParser$($this) {
	var matched;
	Parser$_advanceToken_0$LParser$($this);
	matched = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(_Lexer.rxIntegerLiteral);
	if (matched == null) {
		matched = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(_Lexer.rxNumberLiteral);
	}
	if (matched == null) {
		return null;
	}
	$this._tokenLength = matched[0].length;
	return ({_value: matched[0], _isIdentifier: false, _filename: $this._filename, _lineNumber: $this._lineNumber, _columnNumber: $this._columnOffset});
};

Parser._expectNumberLiteralOpt_0$LParser$ = Parser$_expectNumberLiteralOpt_0$LParser$;

function Parser$_expectRegExpLiteralOpt_0$LParser$($this) {
	var matched;
	Parser$_advanceToken_0$LParser$($this);
	matched = $this._lines[$this._lineNumber - 1].substring($this._columnOffset).match(_Lexer.rxRegExpLiteral);
	if (matched == null) {
		return null;
	}
	$this._tokenLength = matched[0].length;
	return ({_value: matched[0], _isIdentifier: false, _filename: $this._filename, _lineNumber: $this._lineNumber, _columnNumber: $this._columnOffset});
};

Parser._expectRegExpLiteralOpt_0$LParser$ = Parser$_expectRegExpLiteralOpt_0$LParser$;

function Parser$_skipStatement_0$LParser$($this) {
	var advanced;
	var _columnOffset$0;
	advanced = false;
	while (! Parser$_isEOF_0$LParser$($this)) {
		switch ($this._lines[$this._lineNumber - 1].substring(_columnOffset$0 = $this._columnOffset, _columnOffset$0 + 1)) {
		case ";":
			$this._tokenLength = 1;
			Parser$_advanceToken_0$LParser$($this);
			return;
		case "{":
			if (! advanced) {
				$this._tokenLength = 1;
				Parser$_advanceToken_0$LParser$($this);
			}
			return;
		case "}":
			return;
		}
		$this._tokenLength = 1;
		Parser$_advanceToken_0$LParser$($this);
		advanced = true;
	}
};

Parser._skipStatement_0$LParser$ = Parser$_skipStatement_0$LParser$;

function Parser$_importStatement_0$LParser$LToken$($this, importToken) {
	var classes;
	var token;
	var filenameToken;
	var alias;
	var success;
	var i;
	var j;
	var imprt;
	var classes$len$0;
	classes = null;
	token = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (token != null) {
		classes = [ token ];
		while (true) {
			if ((token = Parser$_expect_0$LParser$AS($this, [ ",", "from" ])) == null) {
				return false;
			}
			if (token._value === "from") {
				break;
			}
			if ((token = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null)) == null) {
				return false;
			}
			classes.push(token);
		}
	}
	filenameToken = Parser$_expectStringLiteral_0$LParser$($this);
	if (filenameToken == null) {
		return false;
	}
	alias = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "into" ], null) != null) {
		if ((alias = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null)) == null) {
			return false;
		}
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	if (alias != null && Parser$_isReservedClassName$S(alias._value)) {
		$this._errors.push(new CompileError(alias, "cannot use name of a built-in class as an alias"));
		return false;
	}
	if (classes != null) {
		success = true;
		for (i = 0; i < $this._imports.length; ++ i) {
			for ((j = 0, classes$len$0 = classes.length); j < classes$len$0; ++ j) {
				if (! Import$checkNameConflict_0$LImport$ALCompileError$LToken$($this._imports[i], $this._errors, classes[j])) {
					success = false;
				}
			}
		}
		if (! success) {
			return false;
		}
	} else {
		for (i = 0; i < $this._imports.length; ++ i) {
			if (alias == null) {
				if (Import$getAlias_0$LImport$($this._imports[i]) == null && Token$getValue_0$LToken$(Import$getFilenameToken_0$LImport$($this._imports[i])) === filenameToken._value) {
					$this._errors.push(new CompileError(filenameToken, "cannot import the same file more than once (unless using an alias)"));
					return false;
				}
			} else {
				if (! Import$checkNameConflict_0$LImport$ALCompileError$LToken$($this._imports[i], $this._errors, alias)) {
					return false;
				}
			}
		}
	}
	imprt = Import$create$ALCompileError$LToken$LToken$ALToken$($this._errors, filenameToken, alias, classes);
	if (imprt == null) {
		return false;
	}
	$this._imports.push(imprt);
	return true;
};

Parser._importStatement_0$LParser$LToken$ = Parser$_importStatement_0$LParser$LToken$;

function Parser$_expectClassDefOpt_0$LParser$($this) {
	var state;
	var token;
	var expected$0;
	var _value$0;
	state = ({lineNumber: $this._lineNumber, columnOffset: $this._columnOffset, docComment: $this._docComment, tokenLength: $this._tokenLength, isGenerator: $this._isGenerator, numErrors: $this._errors.length, numClosures: ($this._closures != null ? $this._closures.length : 0), numObjectTypesUsed: $this._objectTypesUsed.length, numTemplateInstantiationRequests: $this._templateInstantiationRequests.length});
	try {
		while (true) {
			expected$0 = [ "class", "interface", "mixin", "abstract", "final" ];
			token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected$0, null);
			if (token == null) {
				return false;
			}
			if ((_value$0 = token._value) === "class" || _value$0 === "interface" || _value$0 === "mixin") {
				return true;
			}
		}
	} finally {
		Parser$_restoreState_0$LParser$LParserState$($this, state);
	}
	return true;
};

Parser._expectClassDefOpt_0$LParser$ = Parser$_expectClassDefOpt_0$LParser$;

function Parser$_classDefinition_0$LParser$($this) {
	var nativeSource;
	var docComment;
	var token;
	var newFlag;
	var className;
	var implementType;
	var members;
	var success;
	var member;
	var i;
	var classDef;
	var templateClassDef;
	var expected$0;
	var _extendType$0;
	var _classType$0;
	$this._classType = null;
	$this._extendType = null;
	$this._implementTypes = [];
	$this._objectTypesUsed = [];
	$this._inners = [];
	$this._templateInners = [];
	$this._classFlags = 0;
	nativeSource = null;
	docComment = null;
	while (true) {
		expected$0 = [ "class", "interface", "mixin", "abstract", "final", "native", "__fake__", "__export__" ];
		token = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
		if (token == null) {
			return null;
		}
		if ($this._classFlags === 0) {
			docComment = $this._docComment;
		}
		if (token._value === "class") {
			break;
		} else {
			if (token._value === "interface") {
				if (($this._classFlags & 20) !== 0) {
					$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "interface cannot have final or native attribute set"));
					return null;
				}
				$this._classFlags |= 64;
				break;
			} else {
				if (token._value === "mixin") {
					if (($this._classFlags & 16404) !== 0) {
						$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "mixin cannot have final, native, or __export__ attribute set"));
						return null;
					}
					$this._classFlags |= 128;
					break;
				}
			}
		}
		newFlag = 0;
		switch (token._value) {
		case "abstract":
			newFlag = 2;
			break;
		case "final":
			newFlag = 4;
			break;
		case "native":
			if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "(" ], null) != null) {
				nativeSource = Parser$_expectStringLiteral_0$LParser$($this);
				Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null);
			}
			newFlag = 16;
			break;
		case "__fake__":
			newFlag = 256;
			break;
		case "__export__":
			newFlag = 16384;
			break;
		default:
			throw new Error("logic flaw");
		}
		if (($this._classFlags & newFlag) !== 0) {
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "same attribute cannot be specified more than once"));
			return null;
		}
		$this._classFlags |= newFlag;
	}
	className = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (className == null) {
		return null;
	}
	if (($this._typeArgs = Parser$_formalTypeArguments_0$LParser$($this)) == null) {
		return null;
	}
	_classType$0 = $this._classType = new ParsedObjectType(new QualifiedName$1(className, $this._outerClass != null ? $this._outerClass.classType : null), $this._typeArgs.map((function (token) {
		return new ParsedObjectType(new QualifiedName(token), []);
	})));
	$this._objectTypesUsed.push(_classType$0);
	if (($this._classFlags & 192) === 0) {
		if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "extends" ], null) != null) {
			$this._extendType = Parser$_objectTypeDeclaration_0$LParser$LToken$BF$LClassDefinition$B$($this, null, true, (function (classDef) {
				return (classDef.flags$() & 196) === 0;
			}));
		}
		if ($this._extendType == null && className._value !== "Object") {
			_extendType$0 = $this._extendType = new ParsedObjectType(new QualifiedName(new Token$0("Object", true)), []);
			$this._objectTypesUsed.push(_extendType$0);
		}
	} else {
		if (($this._classFlags & 22) !== 0) {
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "interface or mixin cannot have attributes: 'abstract', 'final', 'native"));
			$this._classFlags &= ~ 22;
		}
	}
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "implements" ], null) != null) {
		do {
			implementType = Parser$_objectTypeDeclaration_0$LParser$LToken$BF$LClassDefinition$B$($this, null, true, (function (classDef) {
				return (classDef.flags$() & 192) !== 0;
			}));
			if (implementType != null) {
				$this._implementTypes.push(implementType);
			}
		} while (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "," ], null) != null);
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "{" ], null) == null) {
		return null;
	}
	members = [];
	success = true;
	while (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "}" ], null) == null) {
		if (! Parser$_expectIsNotEOF_0$LParser$($this)) {
			break;
		}
		if (Parser$_expectClassDefOpt_0$LParser$($this)) {
			$this._outerClass = ({outer: $this._outerClass, classType: $this._classType, typeArgs: $this._typeArgs, extendType: $this._extendType, implementTypes: $this._implementTypes, objectTypesUsed: $this._objectTypesUsed, classFlags: $this._classFlags, inners: $this._inners, templateInners: $this._templateInners});
			if (Parser$_classDefinition_0$LParser$($this) == null) {
				Parser$_skipStatement_0$LParser$($this);
			}
			Parser$_popClassState_0$LParser$($this);
			continue;
		}
		member = Parser$_memberDefinition_0$LParser$($this);
		if (member != null) {
			members.push(member);
		} else {
			Parser$_skipStatement_0$LParser$($this);
		}
	}
	if (($this._classFlags & 16) === 0 && Parser$_isReservedClassName$S(className._value)) {
		$this._errors.push(new CompileError(className, "cannot re-define a built-in class"));
		success = false;
	} else {
		if ($this._outerClass != null) {
			for (i = 0; i < $this._outerClass.inners.length; ++ i) {
				if ($this._outerClass.inners[i].className$() === className._value) {
					$this._errors.push(new CompileError(className, "a non-template inner class with the same name has been already declared"));
					success = false;
					break;
				}
			}
			for (i = 0; i < $this._outerClass.templateInners.length; ++ i) {
				if ($this._outerClass.templateInners[i].className$() === className._value) {
					$this._errors.push(new CompileError(className, "a non-template inner class with the same name has been already declared"));
					success = false;
					break;
				}
			}
		} else {
			for (i = 0; i < $this._imports.length; ++ i) {
				if (! Import$checkNameConflict_0$LImport$ALCompileError$LToken$($this._imports[i], $this._errors, className)) {
					success = false;
				}
			}
			for (i = 0; i < $this._classDefs.length; ++ i) {
				if ($this._classDefs[i].className$() === className._value) {
					$this._errors.push(new CompileError(className, "a non-template class with the same name has been already declared"));
					success = false;
					break;
				}
			}
			for (i = 0; i < $this._templateClassDefs.length; ++ i) {
				if ($this._templateClassDefs[i].className$() === className._value) {
					$this._errors.push(new CompileError(className, "a template class with the name same has been already declared"));
					success = false;
					break;
				}
			}
		}
	}
	if (! success) {
		return null;
	}
	if ($this._typeArgs.length !== 0) {
		templateClassDef = new TemplateClassDefinition(className, className._value, $this._classFlags, $this._typeArgs, $this._extendType, $this._implementTypes, members, $this._inners, $this._templateInners, $this._objectTypesUsed, docComment);
		if ($this._outerClass != null) {
			$this._outerClass.templateInners.push(templateClassDef);
		} else {
			$this._templateClassDefs.push(templateClassDef);
		}
		classDef = templateClassDef;
	} else {
		classDef = new ClassDefinition(className, className._value, $this._classFlags, $this._extendType, $this._implementTypes, members, $this._inners, $this._templateInners, $this._objectTypesUsed, docComment);
		if ($this._outerClass != null) {
			$this._outerClass.inners.push(classDef);
		} else {
			$this._classDefs.push(classDef);
		}
	}
	if (nativeSource != null) {
		classDef._nativeSource = nativeSource;
	}
	classDef._parser = $this;
	return classDef;
};

Parser._classDefinition_0$LParser$ = Parser$_classDefinition_0$LParser$;

function Parser$_memberDefinition_0$LParser$($this) {
	var flags;
	var isNoExport;
	var docComment;
	var token;
	var newFlag;
	var shouldExport;
	var name;
	var type;
	var initialValue;
	var closures;
	var expected$0;
	var _value$0;
	flags = 0;
	isNoExport = false;
	docComment = null;
	while (true) {
		expected$0 = [ "function", "var", "static", "abstract", "override", "final", "const", "native", "__readonly__", "inline", "__pure__", "delete", "__export__", "__noexport__" ];
		token = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
		if (token == null) {
			return null;
		}
		if (flags === 0) {
			docComment = $this._docComment;
		}
		if (token._value === "const") {
			if ((flags & 8) === 0) {
				$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "constants must be static"));
				return null;
			}
			flags |= 1;
			break;
		} else {
			if ((_value$0 = token._value) === "function" || _value$0 === "var") {
				break;
			} else {
				if (token._value === "__noexport__") {
					if (isNoExport) {
						$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "same attribute cannot be specified more than once"));
						return null;
					} else {
						if ((flags & 16384) !== 0) {
							$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "cannot set the attribute, already declared as __export__"));
							return null;
						}
					}
					isNoExport = true;
				} else {
					newFlag = 0;
					switch (token._value) {
					case "static":
						if (($this._classFlags & 192) !== 0) {
							$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "interfaces and mixins cannot have static members"));
							return null;
						}
						newFlag = 8;
						break;
					case "abstract":
						newFlag = 2;
						break;
					case "override":
						if (($this._classFlags & 64) !== 0) {
							$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "functions of an interface cannot have 'override' attribute set"));
							return null;
						}
						newFlag = 32;
						break;
					case "final":
						if (($this._classFlags & 64) !== 0) {
							$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "functions of an interface cannot have 'final' attribute set"));
							return null;
						}
						newFlag = 4;
						break;
					case "native":
						newFlag = 16;
						break;
					case "__readonly__":
						newFlag = 512;
						break;
					case "inline":
						newFlag = 1024;
						break;
					case "__pure__":
						newFlag = 2048;
						break;
					case "delete":
						newFlag = 4096;
						break;
					case "__export__":
						if (isNoExport) {
							$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "cannot set the attribute, already declared as __noexport__"));
							return null;
						}
						newFlag = 16384;
						break;
					default:
						throw new Error("logic flaw");
					}
					if ((flags & newFlag) !== 0) {
						$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "same attribute cannot be specified more than once"));
						return null;
					}
					flags |= newFlag;
				}
			}
		}
	}
	function shouldExport(name) {
		return (isNoExport ? false : ($this._classFlags & 16384) === 0 ? false : name.charAt(0) === "_" ? false : true);
	}
	if (($this._classFlags & 64) !== 0) {
		flags |= 2;
	}
	if (token._value === "function") {
		return Parser$_functionDefinition_0$LParser$LToken$NLDocComment$F$SB$($this, token, flags, docComment, shouldExport);
	}
	if ((flags & ~ 16907) !== 0) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "variables may only have attributes: static, abstract, const"));
		return null;
	}
	if ((flags & 512) !== 0 && ($this._classFlags & 16) === 0) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "only native classes may use the __readonly__ attribute"));
		return null;
	}
	name = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (name == null) {
		return null;
	}
	if (shouldExport(name._value)) {
		flags |= 16384;
	}
	type = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null) != null) {
		if ((type = Parser$_typeDeclaration_0$LParser$B($this, false)) == null) {
			return null;
		}
	}
	initialValue = null;
	closures = [];
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "=" ], null) != null) {
		if ((flags & 2) !== 0) {
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "abstract variable cannot have default value"));
			return null;
		}
		$this._closures = closures;
		initialValue = Parser$_assignExpr_0$LParser$B($this, false);
		$this._closures = null;
		if (initialValue == null) {
			return null;
		}
	}
	if (type == null && initialValue == null) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "variable declaration should either have type declaration or initial value"));
		return null;
	}
	if (! Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null)) {
		return null;
	}
	if ($this._typeArgs.length === 0 && initialValue == null && ($this._classFlags & 16) === 0) {
		initialValue = Expression$getDefaultValueExpressionOf$LType$(type);
	}
	return new MemberVariableDefinition(token, name, flags, type, initialValue, closures, docComment);
};

Parser._memberDefinition_0$LParser$ = Parser$_memberDefinition_0$LParser$;

function Parser$_functionDefinition_0$LParser$LToken$NLDocComment$F$SB$($this, token, flags, docComment, shouldExport) {
	var name;
	var typeArgs;
	var numObjectTypesUsed;
	var args;
	var returnType;
	var createDefinition;
	var endDeclToken;
	var lastToken;
	var funcDef;
	var expected$0;
	var _objectTypesUsed$0;
	var _typeArgs$0;
	name = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (name == null) {
		return null;
	}
	if (shouldExport(name._value)) {
		flags |= 16384;
	}
	if (name._value === "constructor") {
		if (($this._classFlags & 64) !== 0) {
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "interface cannot have a constructor"));
			return null;
		}
		if ((flags & 6) !== 0) {
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "constructor cannot be declared as 'abstract' or 'final'"));
			return null;
		}
		flags |= 4;
	}
	flags |= $this._classFlags & 20;
	typeArgs = Parser$_formalTypeArguments_0$LParser$($this);
	if (typeArgs == null) {
		return null;
	}
	if (typeArgs.length !== 0 && ($this._classFlags & 16) === 0) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "only native classes may have template functions (for the time being)"));
		return null;
	}
	$this._typeArgs = $this._typeArgs.concat(typeArgs);
	numObjectTypesUsed = $this._objectTypesUsed.length;
	try {
		if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
			return null;
		}
		args = Parser$_functionArgumentsExpr_0$LParser$BB($this, ($this._classFlags & 16) !== 0, true);
		if (args == null) {
			return null;
		}
		returnType = null;
		if (name._value === "constructor") {
			returnType = Type.voidType;
		} else {
			if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
				return null;
			}
			returnType = Parser$_typeDeclaration_0$LParser$B($this, true);
			if (returnType == null) {
				return null;
			}
		}
		if ((flags & 4096) !== 0) {
			if (name._value !== "constructor" || (flags & 8) !== 0) {
				$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "only constructors may have the \"delete\" attribute set"));
				return null;
			}
			if (args.length !== 0) {
				$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "cannot \"delete\" a constructor with one or more arguments"));
				return null;
			}
		}
		function createDefinition(locals, statements, closures, lastToken) {
			return (typeArgs.length !== 0 ? new TemplateFunctionDefinition(token, name, flags, typeArgs, returnType, args, locals, statements, closures, lastToken, docComment) : new MemberFunctionDefinition(token, name, flags, returnType, args, locals, statements, closures, lastToken, docComment));
		}
		if (($this._classFlags & 4160) !== 0) {
			if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
				return null;
			}
			return createDefinition(null, null, [], null);
		} else {
			if ((flags & 18) !== 0) {
				expected$0 = [ ";", "{" ];
				endDeclToken = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
				if (endDeclToken == null) {
					return null;
				}
				if (endDeclToken._value === ";") {
					return createDefinition(null, null, [], null);
				}
			} else {
				if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "{" ], null) == null) {
					return null;
				}
			}
		}
		$this._funcLocal = null;
		$this._arguments = args;
		$this._locals = [];
		$this._statements = [];
		$this._closures = [];
		$this._isGenerator = false;
		if (name._value === "constructor") {
			lastToken = Parser$_initializeBlock_0$LParser$($this);
		} else {
			lastToken = Parser$_block_0$LParser$($this);
		}
		if ($this._isGenerator) {
			flags |= 8192;
		}
		funcDef = createDefinition($this._locals, $this._statements, $this._closures, lastToken);
		$this._locals = null;
		$this._statements = null;
		$this._closures = null;
		return funcDef;
	} finally {
		(_typeArgs$0 = $this._typeArgs).splice(_typeArgs$0.length - typeArgs.length, _typeArgs$0.length);
		if (typeArgs.length !== 0) {
			(_objectTypesUsed$0 = $this._objectTypesUsed).splice(numObjectTypesUsed, _objectTypesUsed$0.length - numObjectTypesUsed);
		}
	}
};

Parser._functionDefinition_0$LParser$LToken$NLDocComment$F$SB$ = Parser$_functionDefinition_0$LParser$LToken$NLDocComment$F$SB$;

function Parser$_formalTypeArguments_0$LParser$($this) {
	var typeArgs;
	var typeArg;
	var token;
	var expected$0;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "." ], null) == null) {
		return [];
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "<" ], null) == null) {
		return null;
	}
	typeArgs = [];
	do {
		typeArg = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
		if (typeArg == null) {
			return null;
		}
		typeArgs.push(typeArg);
		expected$0 = [ ",", ">" ];
		token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected$0, null);
		if (token == null) {
			return null;
		}
	} while (token._value === ",");
	return typeArgs;
};

Parser._formalTypeArguments_0$LParser$ = Parser$_formalTypeArguments_0$LParser$;

function Parser$_actualTypeArguments_0$LParser$($this) {
	var types;
	var state;
	var type;
	var token;
	var expected$0;
	types = [];
	state = ({lineNumber: $this._lineNumber, columnOffset: $this._columnOffset, docComment: $this._docComment, tokenLength: $this._tokenLength, isGenerator: $this._isGenerator, numErrors: $this._errors.length, numClosures: ($this._closures != null ? $this._closures.length : 0), numObjectTypesUsed: $this._objectTypesUsed.length, numTemplateInstantiationRequests: $this._templateInstantiationRequests.length});
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "." ], null) == null) {
		return types;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "<" ], null) == null) {
		Parser$_restoreState_0$LParser$LParserState$($this, state);
		return types;
	}
	do {
		type = Parser$_typeDeclaration_0$LParser$B($this, false);
		if (type == null) {
			return null;
		}
		types.push(type);
		expected$0 = [ ">", "," ];
		token = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
		if (token == null) {
			return null;
		}
	} while (token._value === ",");
	return types;
};

Parser._actualTypeArguments_0$LParser$ = Parser$_actualTypeArguments_0$LParser$;

function Parser$_typeDeclaration_0$LParser$B($this, allowVoid) {
	var typeDecl;
	var arrayType$0;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "void" ], null) != null) {
		if (! allowVoid) {
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "'void' cannot be used here"));
			return null;
		}
		return Type.voidType;
	}
	typeDecl = Parser$_typeDeclarationNoArrayNoVoid_0$LParser$($this);
	if (typeDecl == null) {
		return null;
	}
	while (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "[" ], null) != null) {
		if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "]" ], null) == null) {
			return null;
		}
		if (typeDecl instanceof NullableType) {
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "Nullable.<T> cannot be an array, should be: T[]"));
			return null;
		}
		arrayType$0 = new ParsedObjectType(new QualifiedName(new Token$0("Array", true)), [ typeDecl ]);
		$this._objectTypesUsed.push(arrayType$0);
		typeDecl = arrayType$0;
	}
	return typeDecl;
};

Parser._typeDeclaration_0$LParser$B = Parser$_typeDeclaration_0$LParser$B;

function Parser$_typeDeclarationNoArrayNoVoid_0$LParser$($this) {
	var token;
	var expected$0;
	expected$0 = [ "MayBeUndefined", "Nullable", "variant" ];
	token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected$0, null);
	if (token == null) {
		return Parser$_primaryTypeDeclaration_0$LParser$($this);
	}
	switch (token._value) {
	case "MayBeUndefined":
		$this._errors.push(new DeprecatedWarning($this._filename, $this._lineNumber, $this._columnOffset, "use of 'MayBeUndefined' is deprecated, use 'Nullable' instead"));
	case "Nullable":
		return Parser$_nullableTypeDeclaration_0$LParser$($this);
	case "variant":
		return Type.variantType;
	default:
		throw new Error("logic flaw");
	}
};

Parser._typeDeclarationNoArrayNoVoid_0$LParser$ = Parser$_typeDeclarationNoArrayNoVoid_0$LParser$;

function Parser$_nullableTypeDeclaration_0$LParser$($this) {
	var baseType;
	var i;
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "." ], null) == null || Parser$_expect_0$LParser$ASLRegExp$($this, [ "<" ], null) == null) {
		return null;
	}
	baseType = Parser$_typeDeclaration_0$LParser$B($this, false);
	if (baseType == null) {
		return null;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ">" ], null) == null) {
		return null;
	}
	if (baseType.equals$LType$(Type.variantType)) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "variant cannot be declared as nullable (since it is always nullable)"));
		return null;
	}
	if (baseType instanceof NullableType) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "nested Nullable.<T> is forbidden"));
		return null;
	}
	if ($this._typeArgs != null) {
		for (i = 0; i < $this._typeArgs.length; ++ i) {
			if (baseType.equals$LType$(new ParsedObjectType(new QualifiedName($this._typeArgs[i]), []))) {
				return new NullableType(baseType);
			}
		}
	}
	return (baseType instanceof PrimitiveType ? new NullableType(baseType) : baseType);
};

Parser._nullableTypeDeclaration_0$LParser$ = Parser$_nullableTypeDeclaration_0$LParser$;

function Parser$_primaryTypeDeclaration_0$LParser$($this) {
	var token;
	var expected$0;
	expected$0 = [ "(", "function", "boolean", "int", "number", "string" ];
	token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected$0, null);
	if (token != null) {
		switch (token._value) {
		case "(":
			return Parser$_lightFunctionTypeDeclaration_0$LParser$LType$($this, null);
		case "function":
			return Parser$_functionTypeDeclaration_0$LParser$LType$($this, null);
		case "boolean":
			return Type.booleanType;
		case "int":
			return Type.integerType;
		case "number":
			return Type.numberType;
		case "string":
			return Type.stringType;
		default:
			throw new Error("logic flaw");
		}
	} else {
		return Parser$_objectTypeDeclaration_0$LParser$LToken$BF$LClassDefinition$B$($this, null, true, null);
	}
};

Parser._primaryTypeDeclaration_0$LParser$ = Parser$_primaryTypeDeclaration_0$LParser$;

function Parser$_objectTypeDeclaration_0$LParser$LToken$BF$LClassDefinition$B$($this, firstToken, allowInner, autoCompleteMatchCb) {
	var token;
	var imprt;
	var qualifiedName;
	var typeArgs;
	var objectType;
	var enclosingType;
	var _value$0;
	if (firstToken == null) {
		if ((token = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, (function (self) {
			return new CompletionCandidatesOfTopLevel(self, autoCompleteMatchCb);
		}))) == null) {
			return null;
		}
	} else {
		token = firstToken;
	}
	if (token._value === "variant") {
		$this._errors.push(new CompileError(token, "cannot use 'variant' as a class name"));
		return null;
	} else {
		if ((_value$0 = token._value) === "Nullable" || _value$0 === "MayBeUndefined") {
			$this._errors.push(new CompileError(token, "cannot use 'Nullable' (or MayBeUndefined) as a class name"));
			return null;
		}
	}
	imprt = Parser$lookupImportAlias_0$LParser$S($this, token._value);
	if (imprt != null) {
		if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "." ], null) == null) {
			return null;
		}
		token = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, (function (self) {
			return new _CompletionCandidatesOfNamespace(imprt, autoCompleteMatchCb);
		}));
		if (token == null) {
			return null;
		}
	}
	if (! allowInner) {
		qualifiedName = new QualifiedName$0(token, imprt);
		typeArgs = Parser$_actualTypeArguments_0$LParser$($this);
		if (typeArgs == null) {
			return null;
		} else {
			if (typeArgs.length !== 0) {
				return Parser$_templateTypeDeclaration_0$LParser$LQualifiedName$ALType$($this, qualifiedName, typeArgs);
			} else {
				objectType = new ParsedObjectType(qualifiedName, []);
				$this._objectTypesUsed.push(objectType);
				return objectType;
			}
		}
	} else {
		enclosingType = null;
		while (true) {
			qualifiedName = (enclosingType != null ? new QualifiedName$1(token, enclosingType) : new QualifiedName$0(token, imprt));
			typeArgs = Parser$_actualTypeArguments_0$LParser$($this);
			if (typeArgs == null) {
				return null;
			} else {
				if (typeArgs.length !== 0) {
					enclosingType = Parser$_templateTypeDeclaration_0$LParser$LQualifiedName$ALType$($this, qualifiedName, typeArgs);
				} else {
					objectType = new ParsedObjectType(qualifiedName, []);
					$this._objectTypesUsed.push(objectType);
					enclosingType = objectType;
				}
			}
			if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "." ], null) == null) {
				break;
			}
			token = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
			if (token == null) {
				return null;
			}
		}
		return enclosingType;
	}
};

Parser._objectTypeDeclaration_0$LParser$LToken$BF$LClassDefinition$B$ = Parser$_objectTypeDeclaration_0$LParser$LToken$BF$LClassDefinition$B$;

function Parser$_templateTypeDeclaration_0$LParser$LQualifiedName$ALType$($this, qualifiedName, typeArgs) {
	var className;
	var objectType;
	var $this$0;
	var message$0;
	$this$0 = qualifiedName._token;
	className = $this$0._value;
	if ((className === "Array" || className === "Map") && typeArgs[0] instanceof NullableType) {
		message$0 = "cannot declare " + className + ".<Nullable.<T>>, should be " + className + ".<T>";
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, message$0));
		return null;
	}
	objectType = new ParsedObjectType(qualifiedName, typeArgs);
	$this._objectTypesUsed.push(objectType);
	return objectType;
};

Parser._templateTypeDeclaration_0$LParser$LQualifiedName$ALType$ = Parser$_templateTypeDeclaration_0$LParser$LQualifiedName$ALType$;

function Parser$_lightFunctionTypeDeclaration_0$LParser$LType$($this, objectType) {
	var argTypes;
	var isVarArg;
	var argType;
	var token;
	var returnType;
	var expected$0;
	argTypes = [];
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
		do {
			isVarArg = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "..." ], null) != null;
			argType = Parser$_typeDeclaration_0$LParser$B($this, false);
			if (argType == null) {
				return null;
			}
			if (isVarArg) {
				argTypes.push(new VariableLengthArgumentType(argType));
				if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
					return null;
				}
				break;
			}
			argTypes.push(argType);
			expected$0 = [ ")", "," ];
			token = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
			if (token == null) {
				return null;
			}
		} while (token._value === ",");
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "->" ], null) == null) {
		return null;
	}
	returnType = Parser$_typeDeclaration_0$LParser$B($this, true);
	return (returnType == null ? null : objectType != null ? new MemberFunctionType(null, objectType, returnType, argTypes, true) : new StaticFunctionType(null, returnType, argTypes, true));
};

Parser._lightFunctionTypeDeclaration_0$LParser$LType$ = Parser$_lightFunctionTypeDeclaration_0$LParser$LType$;

function Parser$_functionTypeDeclaration_0$LParser$LType$($this, objectType) {
	var argTypes;
	var isVarArg;
	var argType;
	var token;
	var returnType;
	var expected$0;
	Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return null;
	}
	argTypes = [];
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
		do {
			isVarArg = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "..." ], null) != null;
			Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
			if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
				return null;
			}
			argType = Parser$_typeDeclaration_0$LParser$B($this, false);
			if (argType == null) {
				return null;
			}
			if (isVarArg) {
				argTypes.push(new VariableLengthArgumentType(argType));
				if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
					return null;
				}
				break;
			}
			argTypes.push(argType);
			expected$0 = [ ")", "," ];
			token = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
			if (token == null) {
				return null;
			}
		} while (token._value === ",");
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
		return null;
	}
	returnType = Parser$_typeDeclaration_0$LParser$B($this, true);
	return (returnType == null ? null : objectType != null ? new MemberFunctionType(null, objectType, returnType, argTypes, true) : new StaticFunctionType(null, returnType, argTypes, true));
};

Parser._functionTypeDeclaration_0$LParser$LType$ = Parser$_functionTypeDeclaration_0$LParser$LType$;

function Parser$_initializeBlock_0$LParser$($this) {
	var token;
	var state;
	while ((token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "}" ], null)) == null) {
		state = ({lineNumber: $this._lineNumber, columnOffset: $this._columnOffset, docComment: $this._docComment, tokenLength: $this._tokenLength, isGenerator: $this._isGenerator, numErrors: $this._errors.length, numClosures: ($this._closures != null ? $this._closures.length : 0), numObjectTypesUsed: $this._objectTypesUsed.length, numTemplateInstantiationRequests: $this._templateInstantiationRequests.length});
		if (! Parser$_constructorInvocationStatement_0$LParser$($this)) {
			Parser$_restoreState_0$LParser$LParserState$($this, state);
			return Parser$_block_0$LParser$($this);
		}
	}
	return token;
};

Parser._initializeBlock_0$LParser$ = Parser$_initializeBlock_0$LParser$;

function Parser$_block_0$LParser$($this) {
	var token;
	while ((token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "}" ], null)) == null) {
		if (! Parser$_expectIsNotEOF_0$LParser$($this)) {
			return null;
		}
		if (! Parser$_statement_0$LParser$($this)) {
			Parser$_skipStatement_0$LParser$($this);
		}
	}
	return token;
};

Parser._block_0$LParser$ = Parser$_block_0$LParser$;

function Parser$_statement_0$LParser$($this) {
	var state;
	var label;
	var token;
	var expr;
	var expected$0;
	state = ({lineNumber: $this._lineNumber, columnOffset: $this._columnOffset, docComment: $this._docComment, tokenLength: $this._tokenLength, isGenerator: $this._isGenerator, numErrors: $this._errors.length, numClosures: ($this._closures != null ? $this._closures.length : 0), numObjectTypesUsed: $this._objectTypesUsed.length, numTemplateInstantiationRequests: $this._templateInstantiationRequests.length});
	label = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (label != null && Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null) != null) {
	} else {
		Parser$_restoreState_0$LParser$LParserState$($this, state);
		label = null;
	}
	expected$0 = [ "{", "var", ";", "if", "do", "while", "for", "continue", "break", "return", "yield", "switch", "throw", "try", "assert", "log", "delete", "debugger", "function", "void" ];
	token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected$0, null);
	if (label != null) {
		if (! (token != null && token._value.match(/^(?:do|while|for|switch)$/) != null)) {
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "only blocks, iteration statements, and switch statements are allowed after a label"));
			return false;
		}
	}
	if (token != null) {
		switch (token._value) {
		case "{":
			return Parser$_block_0$LParser$($this) != null;
		case "var":
			return Parser$_variableStatement_0$LParser$($this);
		case ";":
			return true;
		case "if":
			return Parser$_ifStatement_0$LParser$LToken$($this, token);
		case "do":
			return Parser$_doWhileStatement_0$LParser$LToken$LToken$($this, token, label);
		case "while":
			return Parser$_whileStatement_0$LParser$LToken$LToken$($this, token, label);
		case "for":
			return Parser$_forStatement_0$LParser$LToken$LToken$($this, token, label);
		case "continue":
			return Parser$_continueStatement_0$LParser$LToken$($this, token);
		case "break":
			return Parser$_breakStatement_0$LParser$LToken$($this, token);
		case "return":
			return Parser$_returnStatement_0$LParser$LToken$($this, token);
		case "yield":
			return Parser$_yieldStatement_0$LParser$LToken$($this, token);
		case "switch":
			return Parser$_switchStatement_0$LParser$LToken$LToken$($this, token, label);
		case "throw":
			return Parser$_throwStatement_0$LParser$LToken$($this, token);
		case "try":
			return Parser$_tryStatement_0$LParser$LToken$($this, token);
		case "assert":
			return Parser$_assertStatement_0$LParser$LToken$($this, token);
		case "log":
			return Parser$_logStatement_0$LParser$LToken$($this, token);
		case "delete":
			return Parser$_deleteStatement_0$LParser$LToken$($this, token);
		case "debugger":
			$this._statements.push(new DebuggerStatement(token));
			return true;
		case "function":
			return Parser$_functionStatement_0$LParser$LToken$($this, token);
		case "void":
			break;
		default:
			throw new Error("logic flaw, got " + token._value);
		}
	}
	expr = Parser$_expr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	$this._statements.push(new ExpressionStatement(expr));
	return (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null ? false : true);
};

Parser._statement_0$LParser$ = Parser$_statement_0$LParser$;

function Parser$_constructorInvocationStatement_0$LParser$($this) {
	var token;
	var classType;
	var i;
	var args;
	var $this$0$0;
	var _extendType$0;
	if ((token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "super" ], null)) != null) {
		classType = $this._extendType;
	} else {
		if ((token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "this" ], null)) != null) {
			classType = $this._classType;
		} else {
			if ((classType = Parser$_objectTypeDeclaration_0$LParser$LToken$BF$LClassDefinition$B$($this, null, true, null)) == null) {
				return false;
			}
			$this$0$0 = classType._qualifiedName;
			token = $this$0$0._token;
			if ($this._classType.equals$LType$(classType)) {
			} else {
				if ((_extendType$0 = $this._extendType) != null && _extendType$0.equals$LType$(classType)) {
				} else {
					for (i = 0; i < $this._implementTypes.length; ++ i) {
						if ($this._implementTypes[i].equals$LType$(classType)) {
							break;
						}
					}
					if (i === $this._implementTypes.length) {
						return false;
					}
				}
			}
		}
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return false;
	}
	args = Parser$_argsExpr_0$LParser$($this);
	if (args == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	$this._statements.push(new ConstructorInvocationStatement(token, classType, args));
	return true;
};

Parser._constructorInvocationStatement_0$LParser$ = Parser$_constructorInvocationStatement_0$LParser$;

function Parser$_variableStatement_0$LParser$($this) {
	var succeeded;
	var expr;
	succeeded = [ false ];
	expr = Parser$_variableDeclarations_0$LParser$BAB($this, false, succeeded);
	if (! succeeded[0]) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	if (expr != null) {
		$this._statements.push(new ExpressionStatement(expr));
	}
	return true;
};

Parser._variableStatement_0$LParser$ = Parser$_variableStatement_0$LParser$;

function Parser$_functionStatement_0$LParser$LToken$($this, token) {
	var name;
	var args;
	var returnType;
	var funcLocal;
	var lastToken;
	var flags;
	var funcDef;
	name = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (name == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return false;
	}
	args = Parser$_functionArgumentsExpr_0$LParser$BB($this, false, true);
	if (args == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
		return false;
	}
	returnType = Parser$_typeDeclaration_0$LParser$B($this, true);
	if (returnType == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "{" ], null) == null) {
		return false;
	}
	funcLocal = Parser$_registerLocal_0$LParser$LToken$LType$($this, name, new StaticFunctionType(token, returnType, args.map((function (arg) {
		return arg._type;
	})), false));
	Parser$_pushScope_0$LParser$LLocalVariable$ALArgumentDeclaration$($this, funcLocal, args);
	lastToken = Parser$_block_0$LParser$($this);
	if (lastToken == null) {
		Parser$_popScope_0$LParser$($this);
		return false;
	}
	flags = 8;
	if ($this._isGenerator) {
		flags |= 8192;
	}
	funcDef = new MemberFunctionDefinition(token, name, flags, returnType, args, $this._locals, $this._statements, $this._closures, lastToken, null);
	Parser$_popScope_0$LParser$($this);
	$this._closures.push(funcDef);
	funcDef._funcLocal = funcLocal;
	$this._statements.push(new FunctionStatement(token, funcDef));
	return true;
};

Parser._functionStatement_0$LParser$LToken$ = Parser$_functionStatement_0$LParser$LToken$;

function Parser$_ifStatement_0$LParser$LToken$($this, token) {
	var expr;
	var onTrueStatements;
	var onFalseStatements;
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return false;
	}
	expr = Parser$_expr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
		return false;
	}
	onTrueStatements = Parser$_subStatements_0$LParser$($this);
	onFalseStatements = [];
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "else" ], null) != null) {
		onFalseStatements = Parser$_subStatements_0$LParser$($this);
	}
	$this._statements.push(new IfStatement(token, expr, onTrueStatements, onFalseStatements));
	return true;
};

Parser._ifStatement_0$LParser$LToken$ = Parser$_ifStatement_0$LParser$LToken$;

function Parser$_doWhileStatement_0$LParser$LToken$LToken$($this, token, label) {
	var statements;
	var expr;
	statements = Parser$_subStatements_0$LParser$($this);
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "while" ], null) == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return false;
	}
	expr = Parser$_expr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
		return false;
	}
	$this._statements.push(new DoWhileStatement(token, label, expr, statements));
	return true;
};

Parser._doWhileStatement_0$LParser$LToken$LToken$ = Parser$_doWhileStatement_0$LParser$LToken$LToken$;

function Parser$_whileStatement_0$LParser$LToken$LToken$($this, token, label) {
	var expr;
	var statements;
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return false;
	}
	expr = Parser$_expr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
		return false;
	}
	statements = Parser$_subStatements_0$LParser$($this);
	$this._statements.push(new WhileStatement(token, label, expr, statements));
	return true;
};

Parser._whileStatement_0$LParser$LToken$LToken$ = Parser$_whileStatement_0$LParser$LToken$LToken$;

function Parser$_forStatement_0$LParser$LToken$LToken$($this, token, label) {
	var state;
	var initExpr;
	var succeeded;
	var condExpr;
	var postExpr;
	var statements;
	state = ({lineNumber: $this._lineNumber, columnOffset: $this._columnOffset, docComment: $this._docComment, tokenLength: $this._tokenLength, isGenerator: $this._isGenerator, numErrors: $this._errors.length, numClosures: ($this._closures != null ? $this._closures.length : 0), numObjectTypesUsed: $this._objectTypesUsed.length, numTemplateInstantiationRequests: $this._templateInstantiationRequests.length});
	switch (Parser$_forInStatement_0$LParser$LToken$LToken$($this, token, label)) {
	case -1:
		break;
	case 0:
		return false;
	case 1:
		return true;
	}
	Parser$_restoreState_0$LParser$LParserState$($this, state);
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return false;
	}
	initExpr = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ";" ], null) != null) {
	} else {
		if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "var" ], null) != null) {
			succeeded = [ false ];
			initExpr = Parser$_variableDeclarations_0$LParser$BAB($this, true, succeeded);
			if (! succeeded[0]) {
				return false;
			}
			if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
				return false;
			}
		} else {
			if ((initExpr = Parser$_expr_0$LParser$B($this, true)) == null) {
				return false;
			}
			if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
				return false;
			}
		}
	}
	condExpr = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ";" ], null) != null) {
	} else {
		if ((condExpr = Parser$_expr_0$LParser$B($this, false)) == null) {
			return false;
		}
		if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
			return false;
		}
	}
	postExpr = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ")" ], null) != null) {
	} else {
		if ((postExpr = Parser$_expr_0$LParser$B($this, false)) == null) {
			return false;
		}
		if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
			return false;
		}
	}
	statements = Parser$_subStatements_0$LParser$($this);
	$this._statements.push(new ForStatement(token, label, initExpr, condExpr, postExpr, statements));
	return true;
};

Parser._forStatement_0$LParser$LToken$LToken$ = Parser$_forStatement_0$LParser$LToken$LToken$;

function Parser$_forInStatement_0$LParser$LToken$LToken$($this, token, label) {
	var lhsExpr;
	var listExpr;
	var statements;
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return 0;
	}
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "var" ], null) != null) {
		if ((lhsExpr = Parser$_variableDeclaration_0$LParser$B($this, true)) == null) {
			return -1;
		}
	} else {
		if ((lhsExpr = Parser$_lhsExpr_0$LParser$($this)) == null) {
			return -1;
		}
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "in" ], null) == null) {
		return -1;
	}
	listExpr = Parser$_expr_0$LParser$B($this, false);
	if (listExpr == null) {
		return 0;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
		return 0;
	}
	statements = Parser$_subStatements_0$LParser$($this);
	$this._statements.push(new ForInStatement(token, label, lhsExpr, listExpr, statements));
	return 1;
};

Parser._forInStatement_0$LParser$LToken$LToken$ = Parser$_forInStatement_0$LParser$LToken$LToken$;

function Parser$_continueStatement_0$LParser$LToken$($this, token) {
	var label;
	label = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	$this._statements.push(new ContinueStatement(token, label));
	return true;
};

Parser._continueStatement_0$LParser$LToken$ = Parser$_continueStatement_0$LParser$LToken$;

function Parser$_breakStatement_0$LParser$LToken$($this, token) {
	var label;
	label = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	$this._statements.push(new BreakStatement(token, label));
	return true;
};

Parser._breakStatement_0$LParser$LToken$ = Parser$_breakStatement_0$LParser$LToken$;

function Parser$_returnStatement_0$LParser$LToken$($this, token) {
	var expr;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ";" ], null) != null) {
		$this._statements.push(new ReturnStatement(token, null));
		return true;
	}
	expr = Parser$_expr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	$this._statements.push(new ReturnStatement(token, expr));
	return (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null ? false : true);
};

Parser._returnStatement_0$LParser$LToken$ = Parser$_returnStatement_0$LParser$LToken$;

function Parser$_yieldStatement_0$LParser$LToken$($this, token) {
	var expr;
	expr = Parser$_expr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	$this._statements.push(new YieldStatement(token, expr));
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	$this._isGenerator = true;
	return true;
};

Parser._yieldStatement_0$LParser$LToken$ = Parser$_yieldStatement_0$LParser$LToken$;

function Parser$_switchStatement_0$LParser$LToken$LToken$($this, token, label) {
	var expr;
	var foundCaseLabel;
	var foundDefaultLabel;
	var startStatementIndex;
	var caseOrDefaultToken;
	var labelExpr;
	var expected$0;
	var _statements$0;
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return false;
	}
	expr = Parser$_expr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null || Parser$_expect_0$LParser$ASLRegExp$($this, [ "{" ], null) == null) {
		return null;
	}
	foundCaseLabel = false;
	foundDefaultLabel = false;
	startStatementIndex = $this._statements.length;
	while (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "}" ], null) == null) {
		if (! Parser$_expectIsNotEOF_0$LParser$($this)) {
			return false;
		}
		if (! foundCaseLabel && ! foundDefaultLabel) {
			if ((caseOrDefaultToken = Parser$_expect_0$LParser$AS($this, [ "case", "default" ])) == null) {
				Parser$_skipStatement_0$LParser$($this);
				continue;
			}
		} else {
			expected$0 = [ "case", "default" ];
			caseOrDefaultToken = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected$0, null);
		}
		if (caseOrDefaultToken != null) {
			if (caseOrDefaultToken._value === "case") {
				labelExpr = Parser$_expr_0$LParser$B($this, false);
				if (labelExpr == null) {
					Parser$_skipStatement_0$LParser$($this);
					continue;
				}
				if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
					Parser$_skipStatement_0$LParser$($this);
					continue;
				}
				$this._statements.push(new CaseStatement(caseOrDefaultToken, labelExpr));
				foundCaseLabel = true;
			} else {
				if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
					Parser$_skipStatement_0$LParser$($this);
					continue;
				}
				if (foundDefaultLabel) {
					$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "cannot have more than one default statement within one switch block"));
					Parser$_skipStatement_0$LParser$($this);
					continue;
				}
				$this._statements.push(new DefaultStatement(caseOrDefaultToken));
				foundDefaultLabel = true;
			}
		} else {
			if (! Parser$_statement_0$LParser$($this)) {
				Parser$_skipStatement_0$LParser$($this);
			}
		}
	}
	(_statements$0 = $this._statements).push(new SwitchStatement(token, label, expr, _statements$0.splice(startStatementIndex, _statements$0.length - startStatementIndex)));
	return true;
};

Parser._switchStatement_0$LParser$LToken$LToken$ = Parser$_switchStatement_0$LParser$LToken$LToken$;

function Parser$_throwStatement_0$LParser$LToken$($this, token) {
	var expr;
	expr = Parser$_expr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	$this._statements.push(new ThrowStatement(token, expr));
	return true;
};

Parser._throwStatement_0$LParser$LToken$ = Parser$_throwStatement_0$LParser$LToken$;

function Parser$_tryStatement_0$LParser$LToken$($this, tryToken) {
	var startIndex;
	var tryStatements;
	var catchStatements;
	var catchOrFinallyToken;
	var catchIdentifier;
	var catchType;
	var caughtVariable;
	var finallyStatements;
	var expected$0;
	var _statements$0;
	var _locals$0;
	var _statements$1;
	var _statements$2;
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "{" ], null) == null) {
		return false;
	}
	startIndex = $this._statements.length;
	if (Parser$_block_0$LParser$($this) == null) {
		return false;
	}
	tryStatements = (_statements$0 = $this._statements).splice(startIndex, _statements$0.length - startIndex);
	catchStatements = [];
	expected$0 = [ "catch", "finally" ];
	catchOrFinallyToken = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
	if (catchOrFinallyToken == null) {
		return false;
	}
	for (; catchOrFinallyToken != null && catchOrFinallyToken._value === "catch"; catchOrFinallyToken = Parser$_expectOpt_0$LParser$AS($this, [ "catch", "finally" ])) {
		if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null || (catchIdentifier = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null)) == null || Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null || (catchType = Parser$_typeDeclaration_0$LParser$B($this, false)) == null || Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null || Parser$_expect_0$LParser$ASLRegExp$($this, [ "{" ], null) == null) {
			return false;
		}
		caughtVariable = new CaughtVariable(catchIdentifier, catchType);
		$this._locals.push(caughtVariable);
		try {
			if (Parser$_block_0$LParser$($this) == null) {
				return false;
			}
		} finally {
			(_locals$0 = $this._locals).splice(_locals$0.indexOf(caughtVariable), 1);
		}
		catchStatements.push(new CatchStatement(catchOrFinallyToken, caughtVariable, (_statements$1 = $this._statements).splice(startIndex, _statements$1.length - startIndex)));
	}
	if (catchOrFinallyToken != null) {
		if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "{" ], null) == null) {
			return false;
		}
		if (Parser$_block_0$LParser$($this) == null) {
			return false;
		}
		finallyStatements = (_statements$2 = $this._statements).splice(startIndex, _statements$2.length - startIndex);
	} else {
		finallyStatements = [];
	}
	$this._statements.push(new TryStatement(tryToken, tryStatements, catchStatements, finallyStatements));
	return true;
};

Parser._tryStatement_0$LParser$LToken$ = Parser$_tryStatement_0$LParser$LToken$;

function Parser$_assertStatement_0$LParser$LToken$($this, token) {
	var expr;
	var msgExpr;
	expr = Parser$_assignExpr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	msgExpr = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "," ], null) != null) {
		msgExpr = Parser$_assignExpr_0$LParser$B($this, false);
		if (msgExpr == null) {
			return false;
		}
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	$this._statements.push(new AssertStatement(token, expr, msgExpr));
	return true;
};

Parser._assertStatement_0$LParser$LToken$ = Parser$_assertStatement_0$LParser$LToken$;

function Parser$_logStatement_0$LParser$LToken$($this, token) {
	var exprs;
	var expr;
	exprs = [];
	do {
		expr = Parser$_assignExpr_0$LParser$B($this, false);
		if (expr == null) {
			return false;
		}
		exprs.push(expr);
	} while (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "," ], null) != null);
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	if (exprs.length === 0) {
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "no arguments"));
		return false;
	}
	$this._statements.push(new LogStatement(token, exprs));
	return true;
};

Parser._logStatement_0$LParser$LToken$ = Parser$_logStatement_0$LParser$LToken$;

function Parser$_deleteStatement_0$LParser$LToken$($this, token) {
	var expr;
	expr = Parser$_expr_0$LParser$B($this, false);
	if (expr == null) {
		return false;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ";" ], null) == null) {
		return false;
	}
	$this._statements.push(new DeleteStatement(token, expr));
	return true;
};

Parser._deleteStatement_0$LParser$LToken$ = Parser$_deleteStatement_0$LParser$LToken$;

function Parser$_subStatements_0$LParser$($this) {
	var statementIndex;
	var _statements$0;
	statementIndex = $this._statements.length;
	if (! Parser$_statement_0$LParser$($this)) {
		Parser$_skipStatement_0$LParser$($this);
	}
	return (_statements$0 = $this._statements).splice(statementIndex, _statements$0.length - statementIndex);
};

Parser._subStatements_0$LParser$ = Parser$_subStatements_0$LParser$;

function Parser$_variableDeclarations_0$LParser$BAB($this, noIn, isSuccess) {
	var expr;
	var commaToken;
	var declExpr;
	isSuccess[0] = false;
	expr = null;
	commaToken = null;
	do {
		declExpr = Parser$_variableDeclaration_0$LParser$B($this, noIn);
		if (declExpr == null) {
			return null;
		}
		if (! (declExpr instanceof LocalExpression)) {
			expr = (expr != null ? new CommaExpression(commaToken, expr, declExpr) : declExpr);
		}
	} while ((commaToken = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "," ], null)) != null);
	isSuccess[0] = true;
	return expr;
};

Parser._variableDeclarations_0$LParser$BAB = Parser$_variableDeclarations_0$LParser$BAB;

function Parser$_variableDeclaration_0$LParser$B($this, noIn) {
	var identifier;
	var type;
	var local;
	var initialValue;
	var assignToken;
	var expr;
	identifier = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (identifier == null) {
		return null;
	}
	type = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null)) {
		if ((type = Parser$_typeDeclaration_0$LParser$B($this, false)) == null) {
			return null;
		}
	}
	local = Parser$_registerLocal_0$LParser$LToken$LType$($this, identifier, type);
	initialValue = null;
	if ((assignToken = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "=" ], null)) != null) {
		if ((initialValue = Parser$_assignExpr_0$LParser$B($this, noIn)) == null) {
			return null;
		}
	}
	expr = new LocalExpression(identifier, local);
	if (initialValue != null) {
		expr = new AssignmentExpression(assignToken, expr, initialValue);
	}
	return expr;
};

Parser._variableDeclaration_0$LParser$B = Parser$_variableDeclaration_0$LParser$B;

function Parser$_expr_0$LParser$B($this, noIn) {
	var expr;
	var commaToken;
	var assignExpr;
	expr = Parser$_assignExpr_0$LParser$B($this, noIn);
	if (expr == null) {
		return null;
	}
	while ((commaToken = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "," ], null)) != null) {
		assignExpr = Parser$_assignExpr_0$LParser$B($this, noIn);
		if (assignExpr == null) {
			break;
		}
		expr = new CommaExpression(commaToken, expr, assignExpr);
	}
	return expr;
};

Parser._expr_0$LParser$B = Parser$_expr_0$LParser$B;

function Parser$_assignExpr_0$LParser$B($this, noIn) {
	var state;
	var lhsExpr;
	var op;
	var assignExpr;
	state = ({lineNumber: $this._lineNumber, columnOffset: $this._columnOffset, docComment: $this._docComment, tokenLength: $this._tokenLength, isGenerator: $this._isGenerator, numErrors: $this._errors.length, numClosures: ($this._closures != null ? $this._closures.length : 0), numObjectTypesUsed: $this._objectTypesUsed.length, numTemplateInstantiationRequests: $this._templateInstantiationRequests.length});
	lhsExpr = Parser$_lhsExpr_0$LParser$($this);
	if (lhsExpr != null) {
		op = Parser$_expect_0$LParser$ASLRegExp$($this, [ "=", "*=", "/=", "%=", "+=", "-=", "<<=", ">>=", ">>>=", "&=", "^=", "|=" ], /^==/);
		if (op != null) {
			assignExpr = Parser$_assignExpr_0$LParser$B($this, noIn);
			if (assignExpr == null) {
				return null;
			}
			return new AssignmentExpression(op, lhsExpr, assignExpr);
		}
	}
	Parser$_restoreState_0$LParser$LParserState$($this, state);
	return Parser$_condExpr_0$LParser$B($this, noIn);
};

Parser._assignExpr_0$LParser$B = Parser$_assignExpr_0$LParser$B;

function Parser$_condExpr_0$LParser$B($this, noIn) {
	var lorExpr;
	var operatorToken;
	var ifTrueExpr;
	var ifFalseExpr;
	lorExpr = Parser$_lorExpr_0$LParser$B($this, noIn);
	if (lorExpr == null) {
		return null;
	}
	if ((operatorToken = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "?" ], null)) == null) {
		return lorExpr;
	}
	ifTrueExpr = null;
	ifFalseExpr = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
		ifTrueExpr = Parser$_assignExpr_0$LParser$B($this, noIn);
		if (ifTrueExpr == null) {
			return null;
		}
		if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
			return null;
		}
	}
	ifFalseExpr = Parser$_assignExpr_0$LParser$B($this, noIn);
	return (ifFalseExpr == null ? null : new ConditionalExpression(operatorToken, lorExpr, ifTrueExpr, ifFalseExpr));
};

Parser._condExpr_0$LParser$B = Parser$_condExpr_0$LParser$B;

function Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, ops, excludePattern, parseFunc, noIn, builderFunc) {
	var expr;
	var op;
	var rightExpr;
	expr = parseFunc(noIn);
	if (expr == null) {
		return null;
	}
	while (true) {
		op = Parser$_expectOpt_0$LParser$ASLRegExp$($this, ops, excludePattern);
		if (op == null) {
			break;
		}
		rightExpr = parseFunc(false);
		if (rightExpr == null) {
			return null;
		}
		expr = builderFunc(op, expr, rightExpr);
	}
	return expr;
};

Parser._binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$ = Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$;

function Parser$_lorExpr_0$LParser$B($this, noIn) {
	return Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, [ "||" ], null, (function (noIn) {
		return Parser$_landExpr_0$LParser$B($this, noIn);
	}), noIn, (function (op, e1, e2) {
		return new LogicalExpression(op, e1, e2);
	}));
};

Parser._lorExpr_0$LParser$B = Parser$_lorExpr_0$LParser$B;

function Parser$_landExpr_0$LParser$B($this, noIn) {
	return Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, [ "&&" ], null, (function (noIn) {
		return Parser$_borExpr_0$LParser$B($this, noIn);
	}), noIn, (function (op, e1, e2) {
		return new LogicalExpression(op, e1, e2);
	}));
};

Parser._landExpr_0$LParser$B = Parser$_landExpr_0$LParser$B;

function Parser$_borExpr_0$LParser$B($this, noIn) {
	return Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, [ "|" ], /^\|\|/, (function (noIn) {
		return Parser$_bxorExpr_0$LParser$B($this, noIn);
	}), noIn, (function (op, e1, e2) {
		return new BinaryNumberExpression(op, e1, e2);
	}));
};

Parser._borExpr_0$LParser$B = Parser$_borExpr_0$LParser$B;

function Parser$_bxorExpr_0$LParser$B($this, noIn) {
	return Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, [ "^" ], null, (function (noIn) {
		return Parser$_bandExpr_0$LParser$B($this, noIn);
	}), noIn, (function (op, e1, e2) {
		return new BinaryNumberExpression(op, e1, e2);
	}));
};

Parser._bxorExpr_0$LParser$B = Parser$_bxorExpr_0$LParser$B;

function Parser$_bandExpr_0$LParser$B($this, noIn) {
	return Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, [ "&" ], /^&&/, (function (noIn) {
		return Parser$_eqExpr_0$LParser$B($this, noIn);
	}), noIn, (function (op, e1, e2) {
		return new BinaryNumberExpression(op, e1, e2);
	}));
};

Parser._bandExpr_0$LParser$B = Parser$_bandExpr_0$LParser$B;

function Parser$_eqExpr_0$LParser$B($this, noIn) {
	return Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, [ "==", "!=" ], null, (function (noIn) {
		return Parser$_relExpr_0$LParser$B($this, noIn);
	}), noIn, (function (op, e1, e2) {
		return new EqualityExpression(op, e1, e2);
	}));
};

Parser._eqExpr_0$LParser$B = Parser$_eqExpr_0$LParser$B;

function Parser$_relExpr_0$LParser$B($this, noIn) {
	var ops;
	ops = [ "<=", ">=", "<", ">" ];
	if (! noIn) {
		ops.push("in");
	}
	return Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, ops, null, (function (noIn) {
		return Parser$_shiftExpr_0$LParser$($this);
	}), noIn, (function (op, e1, e2) {
		return (op._value === "in" ? new InExpression(op, e1, e2) : new BinaryNumberExpression(op, e1, e2));
	}));
};

Parser._relExpr_0$LParser$B = Parser$_relExpr_0$LParser$B;

function Parser$_shiftExpr_0$LParser$($this) {
	var expr;
	expr = Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, [ ">>>", "<<", ">>" ], null, (function (noIn) {
		return Parser$_addExpr_0$LParser$($this);
	}), false, (function (op, e1, e2) {
		return new ShiftExpression(op, e1, e2);
	}));
	return expr;
};

Parser._shiftExpr_0$LParser$ = Parser$_shiftExpr_0$LParser$;

function Parser$_addExpr_0$LParser$($this) {
	return Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, [ "+", "-" ], /^[+-]{2}/, (function (noIn) {
		return Parser$_mulExpr_0$LParser$($this);
	}), false, (function (op, e1, e2) {
		return (op._value === "+" ? new AdditiveExpression(op, e1, e2) : new BinaryNumberExpression(op, e1, e2));
	}));
};

Parser._addExpr_0$LParser$ = Parser$_addExpr_0$LParser$;

function Parser$_mulExpr_0$LParser$($this) {
	return Parser$_binaryOpExpr_0$LParser$ASLRegExp$F$BLExpression$$BF$LToken$LExpression$LExpression$LExpression$$($this, [ "*", "/", "%" ], null, (function (noIn) {
		return Parser$_unaryExpr_0$LParser$($this);
	}), false, (function (op, e1, e2) {
		return new BinaryNumberExpression(op, e1, e2);
	}));
};

Parser._mulExpr_0$LParser$ = Parser$_mulExpr_0$LParser$;

function Parser$_unaryExpr_0$LParser$($this) {
	var op;
	var expr;
	var expected$0;
	expected$0 = [ "++", "--", "+", "-", "~", "!", "typeof" ];
	op = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected$0, null);
	if (op == null) {
		return Parser$_asExpr_0$LParser$($this);
	}
	expr = Parser$_unaryExpr_0$LParser$($this);
	if (expr == null) {
		return null;
	}
	switch (op._value) {
	case "++":
	case "--":
		return new PreIncrementExpression(op, expr);
	case "+":
	case "-":
		return new SignExpression(op, expr);
	case "~":
		return new BitwiseNotExpression(op, expr);
	case "!":
		return new LogicalNotExpression(op, expr);
	case "typeof":
		return new TypeofExpression(op, expr);
	default:
		throw new Error("logic flaw");
	}
};

Parser._unaryExpr_0$LParser$ = Parser$_unaryExpr_0$LParser$;

function Parser$_asExpr_0$LParser$($this) {
	var expr;
	var token;
	var noConvert;
	var type;
	expr = Parser$_postfixExpr_0$LParser$($this);
	if (expr == null) {
		return null;
	}
	while ((token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "as" ], null)) != null) {
		noConvert = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "__noconvert__" ], null);
		type = Parser$_typeDeclaration_0$LParser$B($this, false);
		if (type == null) {
			return null;
		}
		expr = (noConvert ? new AsNoConvertExpression(token, expr, type) : new AsExpression(token, expr, type));
	}
	return expr;
};

Parser._asExpr_0$LParser$ = Parser$_asExpr_0$LParser$;

function Parser$_postfixExpr_0$LParser$($this) {
	var expr;
	var op;
	var type;
	var expected$0;
	expr = Parser$_lhsExpr_0$LParser$($this);
	expected$0 = [ "++", "--", "instanceof" ];
	op = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected$0, null);
	if (op == null) {
		return expr;
	}
	switch (op._value) {
	case "instanceof":
		type = Parser$_typeDeclaration_0$LParser$B($this, false);
		if (type == null) {
			return null;
		}
		return new InstanceofExpression(op, expr, type);
	default:
		return new PostIncrementExpression(op, expr);
	}
};

Parser._postfixExpr_0$LParser$ = Parser$_postfixExpr_0$LParser$;

function Parser$_lhsExpr_0$LParser$($this) {
	var state;
	var expr;
	var token;
	var args;
	var index;
	var identifier;
	var typeArgs;
	var expected$0;
	state = ({lineNumber: $this._lineNumber, columnOffset: $this._columnOffset, docComment: $this._docComment, tokenLength: $this._tokenLength, isGenerator: $this._isGenerator, numErrors: $this._errors.length, numClosures: ($this._closures != null ? $this._closures.length : 0), numObjectTypesUsed: $this._objectTypesUsed.length, numTemplateInstantiationRequests: $this._templateInstantiationRequests.length});
	expected$0 = [ "new", "super", "(", "function" ];
	token = Parser$_expectOpt_0$LParser$ASLRegExp$($this, expected$0, null);
	if (token != null) {
		switch (token._value) {
		case "super":
			return Parser$_superExpr_0$LParser$($this);
		case "(":
			expr = Parser$_lambdaExpr_0$LParser$LToken$($this, token);
			if (expr == null) {
				Parser$_restoreState_0$LParser$LParserState$($this, state);
				expr = Parser$_primaryExpr_0$LParser$($this);
				if (expr == null) {
					return null;
				}
			}
			break;
		case "function":
			expr = Parser$_functionExpr_0$LParser$LToken$($this, token);
			break;
		case "new":
			expr = Parser$_newExpr_0$LParser$LToken$($this, token);
			break;
		default:
			throw new Error("logic flaw");
		}
	} else {
		expr = Parser$_primaryExpr_0$LParser$($this);
	}
	if (expr == null) {
		return null;
	}
	while ((token = Parser$_expectOpt_0$LParser$AS($this, [ "(", "[", "." ])) != null) {
		switch (token._value) {
		case "(":
			if ((args = Parser$_argsExpr_0$LParser$($this)) == null) {
				return null;
			}
			expr = new CallExpression(token, expr, args);
			break;
		case "[":
			index = Parser$_expr_0$LParser$B($this, false);
			if (index == null) {
				return null;
			}
			if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "]" ], null) == null) {
				return null;
			}
			expr = new ArrayExpression(token, expr, index);
			break;
		case ".":
			identifier = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, (function (self) {
				return new _CompletionCandidatesOfProperty(expr);
			}));
			if (identifier == null) {
				return null;
			}
			typeArgs = Parser$_actualTypeArguments_0$LParser$($this);
			if (typeArgs == null) {
				return null;
			}
			expr = new PropertyExpression(token, expr, identifier, typeArgs);
			break;
		}
	}
	return expr;
};

Parser._lhsExpr_0$LParser$ = Parser$_lhsExpr_0$LParser$;

function Parser$_newExpr_0$LParser$LToken$($this, newToken) {
	var type;
	var lengthExpr;
	var args;
	var arrayType$0;
	var message$0;
	type = Parser$_typeDeclarationNoArrayNoVoid_0$LParser$($this);
	if (type == null) {
		return null;
	}
	while (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "[" ], null) != null) {
		if (type instanceof NullableType) {
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "cannot instantiate an array of an Nullable type"));
			return null;
		}
		arrayType$0 = new ParsedObjectType(new QualifiedName(new Token$0("Array", true)), [ type ]);
		$this._objectTypesUsed.push(arrayType$0);
		type = arrayType$0;
		if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "]" ], null) == null) {
			lengthExpr = Parser$_assignExpr_0$LParser$B($this, false);
			if (lengthExpr == null) {
				return null;
			}
			if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "]" ], null) == null) {
				return null;
			}
			return new NewExpression(newToken, type, [ lengthExpr ]);
		}
	}
	if (! (type instanceof ParsedObjectType)) {
		message$0 = "cannot instantiate a primitive type '" + type.toString() + "' using 'new'";
		$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, message$0));
		return null;
	}
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "(" ], null) != null) {
		args = Parser$_argsExpr_0$LParser$($this);
		if (args == null) {
			return null;
		}
	} else {
		args = [];
	}
	return new NewExpression(newToken, type, args);
};

Parser._newExpr_0$LParser$LToken$ = Parser$_newExpr_0$LParser$LToken$;

function Parser$_superExpr_0$LParser$($this) {
	var identifier;
	var token;
	var args;
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "." ], null) == null) {
		return null;
	}
	identifier = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (identifier == null) {
		return null;
	}
	token = Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null);
	if (token == null) {
		return null;
	}
	args = Parser$_argsExpr_0$LParser$($this);
	return (args == null ? null : new SuperExpression(token, identifier, args));
};

Parser._superExpr_0$LParser$ = Parser$_superExpr_0$LParser$;

function Parser$_lambdaExpr_0$LParser$LToken$($this, token) {
	var args;
	var returnType;
	var funcDef;
	args = Parser$_functionArgumentsExpr_0$LParser$BB($this, false, false);
	if (args == null) {
		return null;
	}
	returnType = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null) != null) {
		if ((returnType = Parser$_typeDeclaration_0$LParser$B($this, true)) == null) {
			return null;
		}
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "->" ], null) == null) {
		return null;
	}
	funcDef = Parser$_lambdaBody_0$LParser$LToken$ALArgumentDeclaration$LType$($this, token, args, returnType);
	if (funcDef == null) {
		return null;
	}
	$this._closures.push(funcDef);
	return new FunctionExpression(token, funcDef);
};

Parser._lambdaExpr_0$LParser$LToken$ = Parser$_lambdaExpr_0$LParser$LToken$;

function Parser$_lambdaBody_0$LParser$LToken$ALArgumentDeclaration$LType$($this, token, args, returnType) {
	var openBlock;
	var flags;
	var expr;
	var lastToken;
	openBlock = Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "{" ], null);
	Parser$_pushScope_0$LParser$LLocalVariable$ALArgumentDeclaration$($this, null, args);
	try {
		flags = 8;
		if (openBlock == null) {
			expr = Parser$_expr_0$LParser$B($this, false);
			$this._statements.push(new ReturnStatement(token, expr));
			return new MemberFunctionDefinition(token, null, flags, returnType, args, $this._locals, $this._statements, $this._closures, null, null);
		} else {
			lastToken = Parser$_block_0$LParser$($this);
			if (lastToken == null) {
				return null;
			}
			if ($this._isGenerator) {
				flags |= 8192;
			}
			return new MemberFunctionDefinition(token, null, flags, returnType, args, $this._locals, $this._statements, $this._closures, lastToken, null);
		}
	} finally {
		Parser$_popScope_0$LParser$($this);
	}
};

Parser._lambdaBody_0$LParser$LToken$ALArgumentDeclaration$LType$ = Parser$_lambdaBody_0$LParser$LToken$ALArgumentDeclaration$LType$;

function Parser$_functionExpr_0$LParser$LToken$($this, token) {
	var name;
	var args;
	var returnType;
	var type;
	var argTypes;
	var funcLocal;
	var lastToken;
	var flags;
	var funcDef;
	name = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "(" ], null) == null) {
		return null;
	}
	args = Parser$_functionArgumentsExpr_0$LParser$BB($this, false, false);
	if (args == null) {
		return null;
	}
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null) != null) {
		returnType = Parser$_typeDeclaration_0$LParser$B($this, true);
		if (returnType == null) {
			return null;
		}
	} else {
		returnType = null;
	}
	if (Parser$_expect_0$LParser$ASLRegExp$($this, [ "{" ], null) == null) {
		return null;
	}
	type = null;
	if (returnType != null) {
		argTypes = args.map((function (arg) {
			return arg._type;
		}));
		type = new StaticFunctionType(token, returnType, argTypes, false);
	}
	funcLocal = null;
	if (name != null) {
		funcLocal = new LocalVariable(name, type);
	}
	Parser$_pushScope_0$LParser$LLocalVariable$ALArgumentDeclaration$($this, funcLocal, args);
	lastToken = Parser$_block_0$LParser$($this);
	if (lastToken == null) {
		Parser$_popScope_0$LParser$($this);
		return null;
	}
	flags = 8;
	if ($this._isGenerator) {
		flags |= 8192;
	}
	funcDef = new MemberFunctionDefinition(token, name, flags, returnType, args, $this._locals, $this._statements, $this._closures, lastToken, null);
	Parser$_popScope_0$LParser$($this);
	$this._closures.push(funcDef);
	funcDef._funcLocal = funcLocal;
	return new FunctionExpression(token, funcDef);
};

Parser._functionExpr_0$LParser$LToken$ = Parser$_functionExpr_0$LParser$LToken$;

function Parser$_forEachScope_0$LParser$F$LLocalVariable$ALLocalVariable$ALArgumentDeclaration$B$($this, cb) {
	var scope;
	var locals$0;
	if ($this._locals != null) {
		if (! cb($this._funcLocal, $this._locals, $this._arguments)) {
			return false;
		}
		for (scope = $this._prevScope; scope != null; scope = scope.prev) {
			if ((locals$0 = scope.locals) && ! cb(scope.funcLocal, locals$0, scope.arguments)) {
				return false;
			}
		}
	}
	return true;
};

Parser._forEachScope_0$LParser$F$LLocalVariable$ALLocalVariable$ALArgumentDeclaration$B$ = Parser$_forEachScope_0$LParser$F$LLocalVariable$ALLocalVariable$ALArgumentDeclaration$B$;

function Parser$_findLocal_0$LParser$S($this, name) {
	var found;
	found = null;
	Parser$_forEachScope_0$LParser$F$LLocalVariable$ALLocalVariable$ALArgumentDeclaration$B$($this, (function (funcLocal, locals, args) {
		var i;
		var locals$len$0;
		var args$len$0;
		if (funcLocal != null && Token$getValue_0$LToken$(funcLocal._name) === name) {
			found = funcLocal;
			return false;
		}
		for ((i = 0, locals$len$0 = locals.length); i < locals$len$0; ++ i) {
			if (Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(locals[i])) === name) {
				found = locals[i];
				return false;
			}
		}
		if (args != null) {
			for ((i = 0, args$len$0 = args.length); i < args$len$0; ++ i) {
				if (Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(args[i])) === name) {
					found = args[i];
					return false;
				}
			}
		}
		return true;
	}));
	return found;
};

Parser._findLocal_0$LParser$S = Parser$_findLocal_0$LParser$S;

function Parser$_primaryExpr_0$LParser$($this) {
	var token;
	var expr;
	var local;
	var parsedType;
	if ((token = Parser$_expectOpt_0$LParser$AS($this, [ "this", "undefined", "null", "false", "true", "[", "{", "(" ])) != null) {
		switch (token._value) {
		case "this":
			return new ThisExpression(token, null);
		case "undefined":
			$this._errors.push(new DeprecatedWarning($this._filename, $this._lineNumber, $this._columnOffset, "use of 'undefined' is deprerated, use 'null' instead"));
		case "null":
			return Parser$_nullLiteral_0$LParser$LToken$($this, token);
		case "false":
			return new BooleanLiteralExpression(token);
		case "true":
			return new BooleanLiteralExpression(token);
		case "[":
			return Parser$_arrayLiteral_0$LParser$LToken$($this, token);
		case "{":
			return Parser$_hashLiteral_0$LParser$LToken$($this, token);
		case "(":
			expr = Parser$_expr_0$LParser$B($this, false);
			if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
				return null;
			}
			return expr;
		default:
			throw new Error("logic flaw");
		}
	} else {
		if ((token = Parser$_expectNumberLiteralOpt_0$LParser$($this)) != null) {
			return new NumberLiteralExpression(token);
		} else {
			if ((token = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, (function (self) {
				return new _CompletionCandidatesWithLocal(self);
			}))) != null) {
				local = Parser$_findLocal_0$LParser$S($this, token._value);
				if (local != null) {
					return new LocalExpression(token, local);
				} else {
					parsedType = Parser$_objectTypeDeclaration_0$LParser$LToken$BF$LClassDefinition$B$($this, token, false, null);
					if (parsedType == null) {
						return null;
					}
					return new ClassExpression(ParsedObjectType$getToken_0$LParsedObjectType$(parsedType), parsedType);
				}
			} else {
				if ((token = Parser$_expectStringLiteralOpt_0$LParser$($this)) != null) {
					return new StringLiteralExpression(token);
				} else {
					if ((token = Parser$_expectRegExpLiteralOpt_0$LParser$($this)) != null) {
						return new RegExpLiteralExpression(token);
					} else {
						$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "expected primary expression"));
						return null;
					}
				}
			}
		}
	}
};

Parser._primaryExpr_0$LParser$ = Parser$_primaryExpr_0$LParser$;

function Parser$_nullLiteral_0$LParser$LToken$($this, token) {
	var type;
	var message$0;
	type = Type.nullType;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null) != null) {
		if ((type = Parser$_typeDeclaration_0$LParser$B($this, false)) == null) {
			return null;
		}
		if (type instanceof PrimitiveType) {
			message$0 = "type '" + type.toString() + "' is not nullable";
			$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, message$0));
			return null;
		}
	}
	return new NullExpression(token, type);
};

Parser._nullLiteral_0$LParser$LToken$ = Parser$_nullLiteral_0$LParser$LToken$;

function Parser$_arrayLiteral_0$LParser$LToken$($this, token) {
	var exprs;
	var expr;
	var type;
	var expected$0;
	exprs = [];
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "]" ], null) == null) {
		do {
			expr = Parser$_assignExpr_0$LParser$B($this, false);
			if (expr == null) {
				return null;
			}
			exprs.push(expr);
			expected$0 = [ ",", "]" ];
			token = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
			if (token == null) {
				return null;
			}
		} while (token._value === ",");
	}
	type = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null) != null) {
		if ((type = Parser$_typeDeclaration_0$LParser$B($this, false)) == null) {
			return null;
		}
	}
	return new ArrayLiteralExpression(token, exprs, type);
};

Parser._arrayLiteral_0$LParser$LToken$ = Parser$_arrayLiteral_0$LParser$LToken$;

function Parser$_hashLiteral_0$LParser$LToken$($this, token) {
	var elements;
	var keyToken;
	var expr;
	var type;
	var message$0;
	elements = [];
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "}" ], null) == null) {
		do {
			if ((keyToken = Parser$_expectIdentifierOpt_0$LParser$F$LParser$LCompletionCandidates$$($this, null)) != null || (keyToken = Parser$_expectNumberLiteralOpt_0$LParser$($this)) != null || (keyToken = Parser$_expectStringLiteralOpt_0$LParser$($this)) != null) {
			} else {
				message$0 = "expected identifier, number or string but got '" + token._value + "'";
				$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, message$0));
			}
			if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
				return null;
			}
			expr = Parser$_assignExpr_0$LParser$B($this, false);
			if (expr == null) {
				return null;
			}
			elements.push(({_key: keyToken, _expr: expr}));
			if ((token = Parser$_expect_0$LParser$AS($this, [ ",", "}" ])) == null) {
				return null;
			}
		} while (token._value === ",");
	}
	type = null;
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null) != null) {
		if ((type = Parser$_typeDeclaration_0$LParser$B($this, false)) == null) {
			return null;
		}
	}
	return new MapLiteralExpression(token, elements, type);
};

Parser._hashLiteral_0$LParser$LToken$ = Parser$_hashLiteral_0$LParser$LToken$;

function Parser$_functionArgumentsExpr_0$LParser$BB($this, allowVarArgs, requireTypeDeclaration) {
	var args;
	var token;
	var isVarArg;
	var argName;
	var argType;
	var i;
	var defaultValue;
	var expected$0;
	args = [];
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
		token = null;
		do {
			isVarArg = allowVarArgs && Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "..." ], null) != null;
			argName = Parser$_expectIdentifier_0$LParser$F$LParser$LCompletionCandidates$$($this, null);
			if (argName == null) {
				return null;
			}
			argType = null;
			if (requireTypeDeclaration) {
				if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ":" ], null) == null) {
					$this._errors.push(new CompileError$0($this._filename, $this._lineNumber, $this._columnOffset, "type declarations are mandatory for non-expression function definition"));
					return null;
				}
				if ((argType = Parser$_typeDeclaration_0$LParser$B($this, false)) == null) {
					return null;
				}
			} else {
				if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ":" ], null) != null) {
					if ((argType = Parser$_typeDeclaration_0$LParser$B($this, false)) == null) {
						return null;
					}
				}
			}
			for (i = 0; i < args.length; ++ i) {
				if (Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(args[i])) === argName._value) {
					$this._errors.push(new CompileError(argName, "cannot declare an argument with the same name twice"));
					return null;
				}
			}
			if (isVarArg) {
				if (argType == null && isVarArg) {
					throw new Error("not yet implemented!");
				}
				args.push(new ArgumentDeclaration(argName, new VariableLengthArgumentType(argType)));
				if (Parser$_expect_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
					return null;
				}
				break;
			}
			defaultValue = null;
			if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ "=" ], null) != null) {
				if ((defaultValue = Parser$_assignExpr_0$LParser$B($this, true)) == null) {
					return null;
				}
			} else {
				if (args.length !== 0 && ArgumentDeclaration$getDefaultValue_0$LArgumentDeclaration$(args[args.length - 1]) != null) {
					$this._errors.push(new CompileError(argName, "required argument cannot be declared after an optional argument"));
					return null;
				}
			}
			args.push(new ArgumentDeclaration$0(argName, argType, defaultValue));
			expected$0 = [ ")", "," ];
			token = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
			if (token == null) {
				return null;
			}
		} while (token._value === ",");
	}
	return args;
};

Parser._functionArgumentsExpr_0$LParser$BB = Parser$_functionArgumentsExpr_0$LParser$BB;

function Parser$_argsExpr_0$LParser$($this) {
	var args;
	var token;
	var arg;
	var expected$0;
	args = [];
	if (Parser$_expectOpt_0$LParser$ASLRegExp$($this, [ ")" ], null) == null) {
		token = null;
		do {
			arg = Parser$_assignExpr_0$LParser$B($this, false);
			if (arg == null) {
				return null;
			}
			args.push(arg);
			expected$0 = [ ")", "," ];
			token = Parser$_expect_0$LParser$ASLRegExp$($this, expected$0, null);
			if (token == null) {
				return null;
			}
		} while (token._value === ",");
	}
	return args;
};

Parser._argsExpr_0$LParser$ = Parser$_argsExpr_0$LParser$;

function Parser$_isReservedClassName$S(name) {
	return name.match(/^(Array|Boolean|Date|Function|Map|Number|Object|RegExp|String|Error|EvalError|RangeError|ReferenceError|SyntaxError|TypeError|JSX)$/) != null;
};

Parser._isReservedClassName$S = Parser$_isReservedClassName$S;

function TemplateDefinition() {
};

$__jsx_extend([TemplateDefinition], Object);
TemplateDefinition.prototype.$__jsx_implements_TemplateDefinition = true;

TemplateDefinition.prototype.buildInstantiationContext$ALCompileError$LToken$ALToken$ALType$ = function (errors, token, formalTypeArgs, actualTypeArgs) {
	var typemap;
	var i;
	if (formalTypeArgs.length !== actualTypeArgs.length) {
		errors.push(new CompileError(token, "wrong number of template arguments (expected " + (formalTypeArgs.length + "") + ", got " + (actualTypeArgs.length + "") + ")"));
		return null;
	}
	typemap = {};
	for (i = 0; i < formalTypeArgs.length; ++ i) {
		typemap[Token$getValue_0$LToken$(formalTypeArgs[i])] = actualTypeArgs[i];
	}
	return ({errors: errors, typemap: typemap, objectTypesUsed: []});
};


function ClassDefinition(token, className, flags, extendType, implementTypes, members, inners, templateInners, objectTypesUsed, docComment) {
	this._stash = {};
	this._baseClassDef = null;
	this._outerClassDef = null;
	this._nativeSource = null;
	this._parser = null;
	this._token = token;
	this._className = className;
	this._flags = flags;
	this._extendType = extendType;
	this._implementTypes = implementTypes;
	this._members = members;
	this._inners = inners;
	this._templateInners = templateInners;
	this._objectTypesUsed = objectTypesUsed;
	this._docComment = docComment;
	ClassDefinition$_resetMembersClassDef_0$LClassDefinition$(this);
};

$__jsx_extend([ClassDefinition], Object);
$__jsx_merge_interface(ClassDefinition, Stashable);

ClassDefinition.prototype.serialize$ = function () {
	return ({ "token": this._token, "name": this._className, "flags": this._flags, "extends": Serializer$ParsedObjectType$E$serializeNullable$LParsedObjectType$(this._extendType), "implements": Serializer$ParsedObjectType$E$serializeArray$ALParsedObjectType$(this._implementTypes), "members": Serializer$MemberDefinition$E$serializeArray$ALMemberDefinition$(this._members) });
};


function ClassDefinition$getParser_0$LClassDefinition$($this) {
	return $this._parser;
};

ClassDefinition.getParser_0$LClassDefinition$ = ClassDefinition$getParser_0$LClassDefinition$;

function ClassDefinition$getNativeSource_0$LClassDefinition$($this) {
	return $this._nativeSource;
};

ClassDefinition.getNativeSource_0$LClassDefinition$ = ClassDefinition$getNativeSource_0$LClassDefinition$;

ClassDefinition.prototype.getToken$ = function () {
	return this._token;
};


ClassDefinition.prototype.className$ = function () {
	return this._className;
};


function ClassDefinition$classFullName_0$LClassDefinition$($this) {
	return ($this._outerClassDef != null ? ClassDefinition$classFullName_0$LClassDefinition$($this._outerClassDef) + "." + $this._className : $this.className$());
};

ClassDefinition.classFullName_0$LClassDefinition$ = ClassDefinition$classFullName_0$LClassDefinition$;

ClassDefinition.prototype.flags$ = function () {
	return this._flags;
};


function ClassDefinition$setFlags_0$LClassDefinition$N($this, flags) {
	$this._flags = flags;
};

ClassDefinition.setFlags_0$LClassDefinition$N = ClassDefinition$setFlags_0$LClassDefinition$N;

function ClassDefinition$extendType_0$LClassDefinition$($this) {
	return $this._extendType;
};

ClassDefinition.extendType_0$LClassDefinition$ = ClassDefinition$extendType_0$LClassDefinition$;

function ClassDefinition$implementTypes_0$LClassDefinition$($this) {
	return $this._implementTypes;
};

ClassDefinition.implementTypes_0$LClassDefinition$ = ClassDefinition$implementTypes_0$LClassDefinition$;

function ClassDefinition$members_0$LClassDefinition$($this) {
	return $this._members;
};

ClassDefinition.members_0$LClassDefinition$ = ClassDefinition$members_0$LClassDefinition$;

function ClassDefinition$getOuterClassDef_0$LClassDefinition$($this) {
	return $this._outerClassDef;
};

ClassDefinition.getOuterClassDef_0$LClassDefinition$ = ClassDefinition$getOuterClassDef_0$LClassDefinition$;

function ClassDefinition$getInnerClasses_0$LClassDefinition$($this) {
	return $this._inners;
};

ClassDefinition.getInnerClasses_0$LClassDefinition$ = ClassDefinition$getInnerClasses_0$LClassDefinition$;

function ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$($this, cb) {
	var i;
	if (! cb($this)) {
		return false;
	}
	for (i = $this._implementTypes.length - 1; i >= 0; -- i) {
		if (! cb($this._implementTypes[i].getClassDef$())) {
			return false;
		}
	}
	if ($this._extendType != null) {
		if (! ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$($this._extendType.getClassDef$(), cb)) {
			return false;
		}
	}
	return true;
};

ClassDefinition.forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$ = ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$;

function ClassDefinition$forEachClassFromBase_0$LClassDefinition$F$LClassDefinition$B$($this, cb) {
	var i;
	if ($this._extendType != null) {
		if (! ClassDefinition$forEachClassFromBase_0$LClassDefinition$F$LClassDefinition$B$($this._extendType.getClassDef$(), cb)) {
			return false;
		}
	}
	for (i = 0; i < $this._implementTypes.length; ++ i) {
		if (! cb($this._implementTypes[i].getClassDef$())) {
			return false;
		}
	}
	return (! cb($this) ? false : true);
};

ClassDefinition.forEachClassFromBase_0$LClassDefinition$F$LClassDefinition$B$ = ClassDefinition$forEachClassFromBase_0$LClassDefinition$F$LClassDefinition$B$;

function ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$($this, cb) {
	var i;
	for (i = 0; i < $this._members.length; ++ i) {
		if (! cb($this._members[i])) {
			return false;
		}
	}
	return true;
};

ClassDefinition.forEachMember_0$LClassDefinition$F$LMemberDefinition$B$ = ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$;

function ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$($this, cb) {
	var i;
	for (i = 0; i < $this._members.length; ++ i) {
		if ($this._members[i] instanceof MemberVariableDefinition) {
			if (! cb($this._members[i])) {
				return false;
			}
		}
	}
	return true;
};

ClassDefinition.forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$ = ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$;

function ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$($this, cb) {
	var i;
	for (i = 0; i < $this._members.length; ++ i) {
		if ($this._members[i] instanceof MemberFunctionDefinition) {
			if (! cb($this._members[i])) {
				return false;
			}
		}
	}
	return true;
};

ClassDefinition.forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$ = ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$;

function ClassDefinition$forEachInnerClass_0$LClassDefinition$F$LClassDefinition$B$($this, cb) {
	var i;
	for (i = 0; i < $this._inners.length; ++ i) {
		if (! cb($this._inners[i])) {
			return false;
		}
	}
	return true;
};

ClassDefinition.forEachInnerClass_0$LClassDefinition$F$LClassDefinition$B$ = ClassDefinition$forEachInnerClass_0$LClassDefinition$F$LClassDefinition$B$;

function ClassDefinition$_resetMembersClassDef_0$LClassDefinition$($this) {
	var i;
	var $this$0;
	var $this$1;
	var $this$2;
	var _members$0;
	var _inners$0;
	for (i = 0; i < $this._members.length; ++ i) {
		$this$0 = (_members$0 = $this._members)[i];
		$this$0._classDef = $this;
		MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(_members$0[i], (function setClassDef(funcDef) {
			funcDef._classDef = $this;
			return MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$(funcDef, setClassDef);
		}));
	}
	for (i = 0; i < $this._inners.length; ++ i) {
		$this$1 = (_inners$0 = $this._inners)[i];
		$this$1._outerClassDef = $this;
		ClassDefinition$_resetMembersClassDef_0$LClassDefinition$(_inners$0[i]);
	}
	for (i = 0; i < $this._templateInners.length; ++ i) {
		$this$2 = $this._templateInners[i];
		$this$2._outerClassDef = $this;
	}
};

ClassDefinition._resetMembersClassDef_0$LClassDefinition$ = ClassDefinition$_resetMembersClassDef_0$LClassDefinition$;

function ClassDefinition$getMemberTypeByName_0$LClassDefinition$ALCompileError$LToken$SBALType$N($this, errors, token, name, isStatic, typeArgs, mode) {
	var types;
	var pushMatchingMember;
	types = [];
	function pushMatchingMember(classDef) {
		var i;
		var member;
		var type;
		var j;
		if (mode !== 2) {
			for (i = 0; i < classDef._members.length; ++ i) {
				member = classDef._members[i];
				if ((member._flags & 4096) !== 0) {
				} else {
					if (((member._flags & 8) !== 0) === isStatic && name === MemberDefinition$name_0$LMemberDefinition$(member)) {
						if (member instanceof MemberVariableDefinition) {
							if ((member._flags & 32) === 0) {
								type = member.getType$();
								if (type != null && types.length === 0) {
									types[0] = type;
								}
							}
						} else {
							if (member instanceof MemberFunctionDefinition) {
								if (member instanceof InstantiatedMemberFunctionDefinition) {
								} else {
									if (member instanceof TemplateFunctionDefinition) {
										if ((member = TemplateFunctionDefinition$instantiateTemplateFunction_0$LTemplateFunctionDefinition$ALCompileError$LToken$ALType$(member, errors, token, typeArgs)) == null) {
											return;
										}
									}
									if (MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$(member) != null || mode !== 3 || (member._flags & 18) === 16) {
										for (j = 0; j < types.length; ++ j) {
											if (Util$typesAreEqual$ALType$ALType$(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(member), ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(types[j]))) {
												break;
											}
										}
										if (j === types.length) {
											types.push(member.getType$());
										}
									}
								}
							} else {
								throw new Error("logic flaw");
							}
						}
					}
				}
			}
		} else {
			mode = 3;
		}
		if (mode !== 1) {
			if (classDef._extendType != null) {
				pushMatchingMember(classDef._extendType.getClassDef$());
			}
			for (i = 0; i < classDef._implementTypes.length; ++ i) {
				pushMatchingMember(classDef._implementTypes[i].getClassDef$());
			}
		}
	}
	pushMatchingMember($this);
	switch (types.length) {
	case 0:
		return null;
	case 1:
		return types[0];
	default:
		return new FunctionChoiceType(types.map((function (t) {
			return t;
		})));
	}
};

ClassDefinition.getMemberTypeByName_0$LClassDefinition$ALCompileError$LToken$SBALType$N = ClassDefinition$getMemberTypeByName_0$LClassDefinition$ALCompileError$LToken$SBALType$N;

function ClassDefinition$lookupInnerClass_0$LClassDefinition$S($this, className) {
	var i;
	var inner;
	for (i = 0; i < $this._inners.length; ++ i) {
		inner = $this._inners[i];
		if (inner.className$() === className) {
			return inner;
		}
	}
	return null;
};

ClassDefinition.lookupInnerClass_0$LClassDefinition$S = ClassDefinition$lookupInnerClass_0$LClassDefinition$S;

function ClassDefinition$lookupTemplateInnerClass_0$LClassDefinition$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this, errors, request, postInstantiationCallback) {
	var instantiateCallback;
	instantiateCallback = ClassDefinition$createGetTemplateClassCallback_0$LClassDefinition$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this, errors, request, postInstantiationCallback);
	return (instantiateCallback != null ? instantiateCallback(errors, request, postInstantiationCallback) : null);
};

ClassDefinition.lookupTemplateInnerClass_0$LClassDefinition$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$ = ClassDefinition$lookupTemplateInnerClass_0$LClassDefinition$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$;

function ClassDefinition$createGetTemplateClassCallback_0$LClassDefinition$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$($this, errors, request, postInstantiationCallback) {
	var i;
	var classDef;
	var templateDef;
	for (i = 0; i < $this._inners.length; ++ i) {
		classDef = $this._inners[i];
		if (classDef instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) === request._className && Util$typesAreEqual$ALType$ALType$(InstantiatedClassDefinition$getTypeArguments_0$LInstantiatedClassDefinition$(classDef), request._typeArgs)) {
			return (function (_, __, ___) {
				return classDef;
			});
		}
	}
	for (i = 0; i < $this._templateInners.length; ++ i) {
		templateDef = $this._templateInners[i];
		if (templateDef._className === request._className) {
			return (function (_, __, ___) {
				var classDef;
				var parser$0;
				var _parser$0;
				classDef = TemplateClassDefinition$instantiateTemplateClass_0$LTemplateClassDefinition$ALCompileError$LTemplateInstantiationRequest$(templateDef, errors, request);
				if (classDef == null) {
					return null;
				}
				$this._inners.push(classDef);
				parser$0 = _parser$0 = $this._parser;
				classDef._parser = parser$0;
				ClassDefinition$resolveTypes_0$LClassDefinition$LAnalysisContext$(classDef, ({errors: errors, parser: _parser$0, postInstantiationCallback: null, funcDef: null, blockStack: null, statement: null}));
				postInstantiationCallback($this._parser, classDef);
				return classDef;
			});
		}
	}
	return null;
};

ClassDefinition.createGetTemplateClassCallback_0$LClassDefinition$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$ = ClassDefinition$createGetTemplateClassCallback_0$LClassDefinition$ALCompileError$LTemplateInstantiationRequest$F$LParser$LClassDefinition$LClassDefinition$$;

ClassDefinition.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var context;
	var succeeded;
	var members;
	var i;
	var member;
	var inners;
	var inner;
	var templateInners;
	var templateInner;
	var extendType;
	var type;
	var implementTypes;
	context = ({errors: instantiationContext.errors, typemap: instantiationContext.typemap, objectTypesUsed: []});
	succeeded = true;
	members = [];
	for (i = 0; i < this._members.length; ++ i) {
		member = this._members[i].instantiate$LInstantiationContext$(context);
		if (member == null) {
			succeeded = false;
		}
		members[i] = member;
	}
	inners = [];
	for (i = 0; i < this._inners.length; ++ i) {
		inner = this._inners[i].instantiate$LInstantiationContext$(context);
		if (inner == null) {
			succeeded = false;
		}
		inners[i] = inner;
	}
	templateInners = [];
	for (i = 0; i < this._templateInners.length; ++ i) {
		templateInner = this._templateInners[i].instantiate$LInstantiationContext$(context);
		if (templateInner == null) {
			succeeded = false;
		}
		templateInners[i] = templateInner;
	}
	if (! succeeded) {
		return null;
	}
	extendType = null;
	if (this._extendType != null) {
		type = this._extendType.instantiate$LInstantiationContext$(instantiationContext);
		if (! (type instanceof ParsedObjectType)) {
			instantiationContext.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$(this._extendType), "non-object type is not extensible"));
			return null;
		}
		extendType = type;
	}
	implementTypes = [];
	for (i = 0; i < this._implementTypes.length; ++ i) {
		type = this._implementTypes[i].instantiate$LInstantiationContext$(instantiationContext);
		if (! (type instanceof ParsedObjectType)) {
			instantiationContext.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$(this._implementTypes[i]), "non-object type is not extensible"));
			return null;
		}
		implementTypes[i] = type;
	}
	return new ClassDefinition(this._token, this._className, this._flags, extendType, implementTypes, members, inners, templateInners, context.objectTypesUsed, this._docComment);
};


function ClassDefinition$normalizeClassDefs_0$LClassDefinition$ALCompileError$($this, errors) {
	var x;
	var y;
	var errorMsg;
	var error;
	var note$0;
	var _members$0;
	ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$($this, (function (funcDef) {
		MemberFunctionDefinition$generateWrappersForDefaultParameters_0$LMemberFunctionDefinition$ALCompileError$(funcDef, errors);
		return true;
	}));
	for (x = 0; x < $this._members.length; ++ x) {
		for (y = 0; y < x; ++ y) {
			if (MemberDefinition$name_0$LMemberDefinition$($this._members[x]) === MemberDefinition$name_0$LMemberDefinition$($this._members[y]) && (MemberDefinition$flags_0$LMemberDefinition$($this._members[x]) & 8) === (MemberDefinition$flags_0$LMemberDefinition$($this._members[y]) & 8)) {
				errorMsg = null;
				if ((_members$0 = $this._members)[x] instanceof MemberFunctionDefinition && _members$0[y] instanceof MemberFunctionDefinition) {
					if (Util$typesAreEqual$ALType$ALType$(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this._members[x]), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this._members[y]))) {
						errorMsg = "a " + ((MemberDefinition$flags_0$LMemberDefinition$($this._members[x]) & 8) !== 0 ? "static" : "member") + " function with same name and arguments is already defined";
						errorMsg += ":" + (x + "") + ":" + (MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this._members[x]).length + "");
						errorMsg += ":" + (y + "") + ":" + (MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this._members[y]).length + "");
					}
				} else {
					errorMsg = "a property with same name already exists (note: only functions may be overloaded)";
				}
				if (errorMsg != null) {
					error = new CompileError(MemberDefinition$getNameToken_0$LMemberDefinition$($this._members[x]), errorMsg);
					note$0 = new CompileNote(MemberDefinition$getNameToken_0$LMemberDefinition$($this._members[y]), "conflicting definition found here");
					error._notes.push(note$0);
					errors.push(error);
					break;
				}
			}
		}
	}
};

ClassDefinition.normalizeClassDefs_0$LClassDefinition$ALCompileError$ = ClassDefinition$normalizeClassDefs_0$LClassDefinition$ALCompileError$;

function ClassDefinition$resolveTypes_0$LClassDefinition$LAnalysisContext$($this, context) {
	var i;
	var baseClass;
	var j;
	var isNative;
	var func;
	var this$0;
	var this$1;
	for (i = 0; i < $this._objectTypesUsed.length; ++ i) {
		$this._objectTypesUsed[i].resolveType$LAnalysisContext$(context);
	}
	for (i = 0; i < $this._inners.length; ++ i) {
		ClassDefinition$resolveTypes_0$LClassDefinition$LAnalysisContext$($this._inners[i], context);
	}
	if ($this._extendType != null) {
		this$0 = $this._extendType;
		baseClass = this$0._classDef;
		if (baseClass != null) {
			if ((baseClass.flags$() & 4) !== 0) {
				context.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$($this._extendType), "cannot extend a final class"));
			} else {
				if ((baseClass.flags$() & 64) !== 0) {
					context.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$($this._extendType), "cannot extend an interface, use the 'implements' keyword"));
				} else {
					if ((baseClass.flags$() & 128) !== 0) {
						context.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$($this._extendType), "cannot extend an mixin, use the 'implements' keyword"));
					}
				}
			}
		}
	}
	for (i = 0; i < $this._implementTypes.length; ++ i) {
		this$1 = $this._implementTypes[i];
		baseClass = this$1._classDef;
		if (baseClass != null) {
			if ((baseClass.flags$() & 192) === 0) {
				context.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$($this._implementTypes[i]), "cannot implement a class (only interfaces can be implemented)"));
			} else {
				for (j = i + 1; j < $this._implementTypes.length; ++ j) {
					if ($this._implementTypes[j].getClassDef$() == baseClass) {
						context.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$($this._implementTypes[i]), "cannot implement the same interface more than once"));
						break;
					}
				}
			}
		}
	}
	if (ClassDefinition$forEachMemberFunction_0$LClassDefinition$F$LMemberFunctionDefinition$B$($this, (function (funcDef) {
		return MemberDefinition$name_0$LMemberDefinition$(funcDef) !== "constructor";
	}))) {
		isNative = ($this.flags$() & 16) !== 0;
		func = new MemberFunctionDefinition($this._token, new Token$0("constructor", true), 4 | $this.flags$() & 16400, Type.voidType, [], isNative ? null : [], isNative ? null : [], [], $this._token, null);
		func._classDef = $this;
		$this._members.push(func);
	}
};

ClassDefinition.resolveTypes_0$LClassDefinition$LAnalysisContext$ = ClassDefinition$resolveTypes_0$LClassDefinition$LAnalysisContext$;

function ClassDefinition$setAnalysisContextOfVariables_0$LClassDefinition$LAnalysisContext$($this, context) {
	var i;
	var member;
	var $this$0;
	var $this$0$0$0;
	var funcDef$0$0$0;
	for (i = 0; i < $this._members.length; ++ i) {
		member = $this._members[i];
		if (member instanceof MemberVariableDefinition) {
			$this$0 = member;
			$this$0$0$0 = ({errors: context.errors, parser: context.parser, postInstantiationCallback: context.postInstantiationCallback, funcDef: null, blockStack: null, statement: null});
			funcDef$0$0$0 = context.funcDef;
			$this$0$0$0.funcDef = funcDef$0$0$0;
			$this$0._analysisContext = $this$0$0$0;
		}
	}
};

ClassDefinition.setAnalysisContextOfVariables_0$LClassDefinition$LAnalysisContext$ = ClassDefinition$setAnalysisContextOfVariables_0$LClassDefinition$LAnalysisContext$;

function ClassDefinition$analyze_0$LClassDefinition$LAnalysisContext$($this, context) {
	var token;
	var srcPos;
	try {
		ClassDefinition$_analyzeClassDef_0$LClassDefinition$LAnalysisContext$($this, context);
	} catch ($__jsx_catch_0) {
		if ($__jsx_catch_0 instanceof Error) {
			token = $this.getToken$();
			srcPos = (token != null ? Util$format$SAS(" at file %1, line %2", [ token._filename, token._lineNumber + "" ]) : "");
			$__jsx_catch_0.message = Util$format$SAS("fatal error while analyzing class %1%2\n%3", [ $this.className$(), srcPos, $__jsx_catch_0.message ]);
			throw $__jsx_catch_0;
		} else {
			throw $__jsx_catch_0;
		}
	}
	ClassDefinition$_analyzeMembers_0$LClassDefinition$LAnalysisContext$($this, context);
};

ClassDefinition.analyze_0$LClassDefinition$LAnalysisContext$ = ClassDefinition$analyze_0$LClassDefinition$LAnalysisContext$;

function ClassDefinition$_analyzeClassDef_0$LClassDefinition$LAnalysisContext$($this, context) {
	var implementClassDefs;
	var i;
	var allMixins;
	var interfaceDef;
	var j;
	var theMixin;
	var overrideFunctions;
	var done;
	var k;
	var abstractMembers;
	var msg;
	var usedNames;
	var this$0;
	var this$1;
	var _members$0;
	var _members$1;
	var abstractMembers$len$0;
	$this._baseClassDef = ($this._extendType != null ? $this._extendType.getClassDef$() : null);
	implementClassDefs = $this._implementTypes.map((function (type) {
		return type._classDef;
	}));
	if (($this.flags$() & 192) === 0) {
		if ($this._baseClassDef != null) {
			if (($this._baseClassDef.flags$() & 4) !== 0) {
				context.errors.push(new CompileError($this.getToken$(), "cannot extend final class '" + $this._baseClassDef.className$() + "'"));
				return;
			}
			if (($this._baseClassDef.flags$() & 192) !== 0) {
				context.errors.push(new CompileError($this.getToken$(), "interfaces (or mixins) should be implemented, not extended"));
				return;
			}
			if (! ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$($this._baseClassDef, (function (classDef) {
				if ($this == classDef) {
					context.errors.push(new CompileError($this.getToken$(), "class inheritance is in loop"));
					return false;
				}
				return true;
			}))) {
				return;
			}
		}
	} else {
		for (i = 0; i < implementClassDefs.length; ++ i) {
			if ((implementClassDefs[i].flags$() & 192) === 0) {
				context.errors.push(new CompileError($this.getToken$(), "class '" + implementClassDefs[i].className$() + "' can only be extended, not implemented"));
				return;
			}
			if (! ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$(implementClassDefs[i], (function (classDef) {
				if ($this == classDef) {
					context.errors.push(new CompileError($this.getToken$(), "class inheritance is in loop"));
					return false;
				}
				return true;
			}))) {
				return;
			}
		}
	}
	allMixins = [];
	if (! ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$($this, (function (classDef) {
		if ((classDef.flags$() & 128) !== 0) {
			if (allMixins.indexOf(classDef) !== -1) {
				context.errors.push(new CompileError($this.getToken$(), "mixin '" + classDef.className$() + "' is implemented twice"));
				return false;
			}
			allMixins.push(classDef);
		}
		return true;
	}))) {
		return;
	}
	for (i = 0; i < $this._members.length; ++ i) {
		ClassDefinition$_assertMemberIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberDefinition$LClassDefinition$LToken$($this, context, (_members$0 = $this._members)[i], $this, MemberDefinition$getToken_0$LMemberDefinition$(_members$0[i]));
	}
	for (i = 0; i < $this._implementTypes.length; ++ i) {
		this$0 = $this._implementTypes[i];
		interfaceDef = this$0._classDef;
		for (j = 0; j < interfaceDef._members.length; ++ j) {
			ClassDefinition$_assertMemberIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberDefinition$LClassDefinition$LToken$($this, context, interfaceDef._members[j], interfaceDef, ParsedObjectType$getToken_0$LParsedObjectType$($this._implementTypes[i]));
		}
	}
	if (($this._flags & 192) === 0) {
		for (i = 0; i < $this._members.length; ++ i) {
			if ((_members$1 = $this._members)[i] instanceof MemberFunctionDefinition && (MemberDefinition$flags_0$LMemberDefinition$(_members$1[i]) & 32) !== 0) {
				if (ClassDefinition$_assertFunctionIsOverridableInBaseClasses_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$($this, context, $this._members[i]) == null) {
					context.errors.push(new CompileError(MemberDefinition$getNameToken_0$LMemberDefinition$($this._members[i]), "could not find function definition in base classes / mixins to be overridden"));
				}
			}
		}
		for (i = 0; i < $this._implementTypes.length; ++ i) {
			if (($this._implementTypes[i].getClassDef$().flags$() & 128) === 0) {
				continue;
			}
			this$1 = $this._implementTypes[i];
			theMixin = this$1._classDef;
			overrideFunctions = [];
			ClassDefinition$_getMembers_0$LClassDefinition$ALMemberDefinition$BNN(theMixin, overrideFunctions, true, 32, 32);
			for (j = 0; j < overrideFunctions.length; ++ j) {
				done = false;
				if ($this._baseClassDef != null) {
					if (ClassDefinition$_assertFunctionIsOverridable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$($this._baseClassDef, context, overrideFunctions[j]) != null) {
						done = true;
					}
				}
				for (k = 0; k < i; ++ k) {
					if (ClassDefinition$_assertFunctionIsOverridable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$($this._implementTypes[k].getClassDef$(), context, overrideFunctions[j]) != null) {
						done = true;
						break;
					}
				}
				for (k = 0; k < theMixin._implementTypes.length; ++ k) {
					if (ClassDefinition$_assertFunctionIsOverridable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$(theMixin._implementTypes[k].getClassDef$(), context, overrideFunctions[j]) != null) {
						done = true;
						break;
					}
				}
				if (! done) {
					context.errors.push(new CompileError($this.getToken$(), "could not find function definition to be overridden by '" + overrideFunctions[j].getNotation$() + "'"));
				}
			}
		}
	}
	if (($this._flags & 194) === 0) {
		abstractMembers = [];
		ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$($this, (function (classDef) {
			return ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$(classDef, (function (member) {
				var i;
				if ((MemberDefinition$flags_0$LMemberDefinition$(member) & ClassDefinition.IS_ABSTRACT) !== 0) {
					for (i = 0; i < abstractMembers.length; ++ i) {
						if (ClassDefinition$membersAreEqual$LMemberDefinition$LMemberDefinition$(abstractMembers[i], member)) {
							break;
						}
					}
					if (i === abstractMembers.length) {
						abstractMembers[i] = member;
					}
				}
				return true;
			}));
		}));
		ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$($this, (function (classDef) {
			return ClassDefinition$forEachMember_0$LClassDefinition$F$LMemberDefinition$B$(classDef, (function (member) {
				var i;
				if (abstractMembers.length === 0) {
					return false;
				}
				if ((MemberDefinition$flags_0$LMemberDefinition$(member) & ClassDefinition.IS_ABSTRACT) === 0) {
					for (i = 0; i < abstractMembers.length; ++ i) {
						if (ClassDefinition$membersAreEqual$LMemberDefinition$LMemberDefinition$(abstractMembers[i], member)) {
							abstractMembers.splice(i, 1);
							break;
						}
					}
				}
				return true;
			}));
		}));
		if (abstractMembers.length !== 0) {
			msg = "class should be declared as 'abstract' since the following members do not have concrete definition: ";
			for ((i = 0, abstractMembers$len$0 = abstractMembers.length); i < abstractMembers$len$0; ++ i) {
				if (i !== 0) {
					msg += ", ";
				}
				msg += abstractMembers[i].getNotation$();
			}
			context.errors.push(new CompileError($this.getToken$(), msg));
		}
	}
	usedNames = {};
	ClassDefinition$_getMembers_0$LClassDefinition$ALMemberDefinition$F$LMemberDefinition$B$($this, [  ], (function (member) {
		var existingDef;
		var errMsg;
		if (! (member instanceof MemberFunctionDefinition)) {
			return false;
		}
		if ((member._flags & 16392) !== 16384) {
			return false;
		}
		if (! $__jsx_ObjectHasOwnProperty.call(usedNames, MemberDefinition$name_0$LMemberDefinition$(member))) {
			usedNames[MemberDefinition$name_0$LMemberDefinition$(member)] = member;
			return false;
		}
		existingDef = usedNames[MemberDefinition$name_0$LMemberDefinition$(member)];
		if (existingDef.getType$().equals$LType$(member.getType$())) {
			return false;
		}
		if (($this._flags & 16384) !== 0 && MemberDefinition$name_0$LMemberDefinition$(member) === "constructor") {
			errMsg = "only one constructor is exportable, please mark others using the __noexport__ attribute";
		} else {
			errMsg = "methods with __export__ attribute cannot be overloaded";
		}
		context.errors.push(CompileError$addCompileNote_0$LCompileError$LCompileNote$(new CompileError(member._token, errMsg), new CompileNote(MemberDefinition$getToken_0$LMemberDefinition$(usedNames[MemberDefinition$name_0$LMemberDefinition$(member)]), "previously defined here")));
		return false;
	}));
};

ClassDefinition._analyzeClassDef_0$LClassDefinition$LAnalysisContext$ = ClassDefinition$_analyzeClassDef_0$LClassDefinition$LAnalysisContext$;

function ClassDefinition$_analyzeMembers_0$LClassDefinition$LAnalysisContext$($this, context) {
	var i;
	var member;
	var varDef;
	var initialValue$0;
	for (i = 0; i < $this._members.length; ++ i) {
		member = $this._members[i];
		if (member instanceof MemberFunctionDefinition) {
			if (! (member instanceof TemplateFunctionDefinition)) {
				MemberFunctionDefinition$analyze_0$LMemberFunctionDefinition$LAnalysisContext$(member, context);
			}
		} else {
			varDef = member;
			if (varDef._initialValue == null && ($this.flags$() & 16) !== 16) {
				initialValue$0 = Expression$getDefaultValueExpressionOf$LType$(varDef.getType$());
				varDef._initialValue = initialValue$0;
			}
		}
	}
};

ClassDefinition._analyzeMembers_0$LClassDefinition$LAnalysisContext$ = ClassDefinition$_analyzeMembers_0$LClassDefinition$LAnalysisContext$;

function ClassDefinition$analyzeUnusedVariables_0$LClassDefinition$($this) {
	var i;
	var member;
	for (i = 0; i < $this._members.length; ++ i) {
		member = $this._members[i];
		if (member instanceof MemberVariableDefinition) {
			member.getType$();
		}
	}
};

ClassDefinition.analyzeUnusedVariables_0$LClassDefinition$ = ClassDefinition$analyzeUnusedVariables_0$LClassDefinition$;

function ClassDefinition$isConvertibleTo_0$LClassDefinition$LClassDefinition$($this, classDef) {
	var i;
	var _extendType$0;
	if ($this == classDef) {
		return true;
	}
	if (classDef.className$() === "Object") {
		return true;
	}
	if ((_extendType$0 = $this._extendType) != null && ClassDefinition$isConvertibleTo_0$LClassDefinition$LClassDefinition$(_extendType$0.getClassDef$(), classDef)) {
		return true;
	}
	for (i = 0; i < $this._implementTypes.length; ++ i) {
		if (ClassDefinition$isConvertibleTo_0$LClassDefinition$LClassDefinition$($this._implementTypes[i].getClassDef$(), classDef)) {
			return true;
		}
	}
	return false;
};

ClassDefinition.isConvertibleTo_0$LClassDefinition$LClassDefinition$ = ClassDefinition$isConvertibleTo_0$LClassDefinition$LClassDefinition$;

function ClassDefinition$_assertMemberIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberDefinition$LClassDefinition$LToken$($this, context, member, memberClassDef, token) {
	var numImplementsToCheck;
	var isCheckingSibling;
	var i;
	var isCheckingInterface;
	var _extendType$0;
	var _extendType$1;
	if ((member._flags & 8) !== 0) {
		return true;
	}
	for (numImplementsToCheck = 0; numImplementsToCheck < $this._implementTypes.length; ++ numImplementsToCheck) {
		if (memberClassDef == $this._implementTypes[numImplementsToCheck].getClassDef$()) {
			break;
		}
	}
	isCheckingSibling = numImplementsToCheck !== $this._implementTypes.length;
	if (member instanceof MemberVariableDefinition) {
		if ((_extendType$0 = $this._extendType) != null && ! ClassDefinition$_assertMemberVariableIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberVariableDefinition$LClassDefinition$LToken$(_extendType$0.getClassDef$(), context, member, memberClassDef, token)) {
			return false;
		}
		for (i = 0; i < numImplementsToCheck; ++ i) {
			if (! ClassDefinition$_assertMemberVariableIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberVariableDefinition$LClassDefinition$LToken$($this._implementTypes[i].getClassDef$(), context, member, memberClassDef, token)) {
				return false;
			}
		}
	} else {
		isCheckingInterface = (memberClassDef.flags$() & 64) !== 0;
		if ((_extendType$1 = $this._extendType) != null && ! ClassDefinition$_assertMemberFunctionIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$LClassDefinition$LToken$BB(_extendType$1.getClassDef$(), context, member, memberClassDef, token, false, isCheckingInterface)) {
			return false;
		}
		for (i = 0; i < numImplementsToCheck; ++ i) {
			if (memberClassDef != $this._implementTypes[i].getClassDef$() && ! ClassDefinition$_assertMemberFunctionIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$LClassDefinition$LToken$BB($this._implementTypes[i].getClassDef$(), context, member, memberClassDef, token, isCheckingSibling, isCheckingInterface)) {
				return false;
			}
		}
	}
	return true;
};

ClassDefinition._assertMemberIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberDefinition$LClassDefinition$LToken$ = ClassDefinition$_assertMemberIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberDefinition$LClassDefinition$LToken$;

function ClassDefinition$_assertMemberVariableIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberVariableDefinition$LClassDefinition$LToken$($this, context, member, memberClassDef, token) {
	var i;
	var _extendType$0;
	for (i = 0; i < $this._members.length; ++ i) {
		if (MemberDefinition$name_0$LMemberDefinition$($this._members[i]) === MemberDefinition$name_0$LMemberDefinition$(member)) {
			if ((MemberDefinition$flags_0$LMemberDefinition$($this._members[i]) & 2) === 0) {
				context.errors.push(new CompileError(member._nameToken, Util$format$SAS("cannot define property '%1', the name is already used in class '%2'", [ member.getNotation$(), $this.className$() ])));
				return false;
			}
			if (! $this._members[i].getType$().equals$LType$(member.getType$())) {
				context.errors.push(new CompileError(member._nameToken, Util$format$SAS("cannot override property '%1' of type '%2' with different type '%3'", [ member.getNotation$(), $this._members[i].getType$().toString(), member.getType$().toString() ])));
				return false;
			}
		}
	}
	if ((_extendType$0 = $this._extendType) != null && ! ClassDefinition$_assertMemberVariableIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberVariableDefinition$LClassDefinition$LToken$(_extendType$0.getClassDef$(), context, member, memberClassDef, token)) {
		return false;
	}
	for (i = 0; i < $this._implementTypes.length; ++ i) {
		if (! ClassDefinition$_assertMemberVariableIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberVariableDefinition$LClassDefinition$LToken$($this._implementTypes[i].getClassDef$(), context, member, memberClassDef, token)) {
			return false;
		}
	}
	return true;
};

ClassDefinition._assertMemberVariableIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberVariableDefinition$LClassDefinition$LToken$ = ClassDefinition$_assertMemberVariableIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberVariableDefinition$LClassDefinition$LToken$;

function ClassDefinition$_assertMemberFunctionIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$LClassDefinition$LToken$BB($this, context, member, memberClassDef, token, reportOverridesAsWell, isCheckingInterface) {
	var i;
	var error;
	var note$0;
	var _extendType$0;
	if (MemberDefinition$name_0$LMemberDefinition$(member) === "constructor") {
		return true;
	}
	for (i = 0; i < $this._members.length; ++ i) {
		if (MemberDefinition$name_0$LMemberDefinition$($this._members[i]) !== MemberDefinition$name_0$LMemberDefinition$(member)) {
			continue;
		}
		if ($this._members[i] instanceof MemberVariableDefinition) {
			error = new CompileError(member._nameToken, "definition of the function conflicts with property '" + Token$getValue_0$LToken$(MemberDefinition$getNameToken_0$LMemberDefinition$($this._members[i])) + "'");
			note$0 = new CompileNote(MemberDefinition$getNameToken_0$LMemberDefinition$($this._members[i]), "property with the same name has been found here");
			error._notes.push(note$0);
			context.errors.push(error);
			return false;
		}
		if (! Util$typesAreEqual$ALType$ALType$(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this._members[i]), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(member))) {
			continue;
		}
		if (! isCheckingInterface && (member._flags & 32) === 0) {
			context.errors.push(new CompileError(member._nameToken, "overriding functions must have 'override' attribute set (defined in base class '" + $this.className$() + "')"));
			return false;
		}
		if (reportOverridesAsWell && (MemberDefinition$flags_0$LMemberDefinition$($this._members[i]) & 32) !== 0) {
			context.errors.push(new CompileError(member._nameToken, "definition of the function conflicts with sibling mix-in '" + $this.className$() + "'"));
			return false;
		}
		return true;
	}
	if ((_extendType$0 = $this._extendType) != null && ! ClassDefinition$_assertMemberFunctionIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$LClassDefinition$LToken$BB(_extendType$0.getClassDef$(), context, member, memberClassDef, token, false, isCheckingInterface)) {
		return false;
	}
	for (i = 0; i < $this._implementTypes.length; ++ i) {
		if (! ClassDefinition$_assertMemberFunctionIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$LClassDefinition$LToken$BB($this._implementTypes[i].getClassDef$(), context, member, memberClassDef, token, false, isCheckingInterface)) {
			return false;
		}
	}
	return true;
};

ClassDefinition._assertMemberFunctionIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$LClassDefinition$LToken$BB = ClassDefinition$_assertMemberFunctionIsDefinable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$LClassDefinition$LToken$BB;

function ClassDefinition$_assertFunctionIsOverridable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$($this, context, overrideDef) {
	var i;
	var overrideReturnType;
	var memberReturnType;
	var $this$0;
	var _members$0;
	for (i = 0; i < $this._members.length; ++ i) {
		if (MemberDefinition$name_0$LMemberDefinition$($this._members[i]) === MemberDefinition$name_0$LMemberDefinition$(overrideDef) && (_members$0 = $this._members)[i] instanceof MemberFunctionDefinition && (MemberDefinition$flags_0$LMemberDefinition$(_members$0[i]) & 8) === 0 && Util$typesAreEqual$ALType$ALType$(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this._members[i]), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(overrideDef))) {
			if ((MemberDefinition$flags_0$LMemberDefinition$($this._members[i]) & 4) !== 0) {
				context.errors.push(new CompileError(overrideDef._token, "cannot override final function defined in class '" + $this.className$() + "'"));
				return false;
			}
			overrideReturnType = overrideDef._returnType;
			$this$0 = $this._members[i];
			memberReturnType = $this$0._returnType;
			if (! (overrideReturnType.equals$LType$(memberReturnType) || overrideReturnType.isConvertibleTo$LType$(memberReturnType)) || memberReturnType instanceof NullableType && ! (overrideReturnType instanceof NullableType)) {
				context.errors.push(new CompileError(overrideDef._token, "return type '" + overrideReturnType.toString() + "' is not convertible to '" + memberReturnType.toString() + "'"));
				return false;
			} else {
				return true;
			}
		}
	}
	return ClassDefinition$_assertFunctionIsOverridableInBaseClasses_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$($this, context, overrideDef);
};

ClassDefinition._assertFunctionIsOverridable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$ = ClassDefinition$_assertFunctionIsOverridable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$;

function ClassDefinition$_assertFunctionIsOverridableInBaseClasses_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$($this, context, member) {
	var ret;
	var i;
	if ($this._extendType != null) {
		ret = ClassDefinition$_assertFunctionIsOverridable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$($this._extendType.getClassDef$(), context, member);
		if (ret != null) {
			return ret;
		}
	}
	for (i = 0; i < $this._implementTypes.length; ++ i) {
		ret = ClassDefinition$_assertFunctionIsOverridable_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$($this._implementTypes[i].getClassDef$(), context, member);
		if (ret != null) {
			return ret;
		}
	}
	return null;
};

ClassDefinition._assertFunctionIsOverridableInBaseClasses_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$ = ClassDefinition$_assertFunctionIsOverridableInBaseClasses_0$LClassDefinition$LAnalysisContext$LMemberFunctionDefinition$;

function ClassDefinition$_getMembers_0$LClassDefinition$ALMemberDefinition$F$LMemberDefinition$B$($this, list, cb) {
	var i;
	if ($this._baseClassDef != null) {
		ClassDefinition$_getMembers_0$LClassDefinition$ALMemberDefinition$F$LMemberDefinition$B$($this._baseClassDef, list, cb);
	}
	for (i = 0; i < $this._implementTypes.length; ++ i) {
		ClassDefinition$_getMembers_0$LClassDefinition$ALMemberDefinition$F$LMemberDefinition$B$($this._implementTypes[i].getClassDef$(), list, cb);
	}
	for (i = 0; i < $this._members.length; ++ i) {
		if (cb($this._members[i])) {
			list.push($this._members[i]);
		}
	}
};

ClassDefinition._getMembers_0$LClassDefinition$ALMemberDefinition$F$LMemberDefinition$B$ = ClassDefinition$_getMembers_0$LClassDefinition$ALMemberDefinition$F$LMemberDefinition$B$;

function ClassDefinition$_getMembers_0$LClassDefinition$ALMemberDefinition$BNN($this, list, functionOnly, flagsMask, flagsMaskMatch) {
	ClassDefinition$_getMembers_0$LClassDefinition$ALMemberDefinition$F$LMemberDefinition$B$($this, list, (function (member) {
		var j;
		var list$len$0;
		if (functionOnly && ! (member instanceof MemberFunctionDefinition)) {
			return false;
		}
		if ((member._flags & flagsMask) !== flagsMaskMatch) {
			return false;
		}
		for ((j = 0, list$len$0 = list.length); j < list$len$0; ++ j) {
			if (MemberDefinition$name_0$LMemberDefinition$(list[j]) === MemberDefinition$name_0$LMemberDefinition$(member)) {
				if (list[j] instanceof MemberVariableDefinition || Util$typesAreEqual$ALType$ALType$(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(list[j]), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(member))) {
					return false;
				}
			}
		}
		return true;
	}));
};

ClassDefinition._getMembers_0$LClassDefinition$ALMemberDefinition$BNN = ClassDefinition$_getMembers_0$LClassDefinition$ALMemberDefinition$BNN;

function ClassDefinition$hasDefaultConstructor_0$LClassDefinition$($this) {
	var hasCtorWithArgs;
	var i;
	var member;
	hasCtorWithArgs = false;
	for (i = 0; i < $this._members.length; ++ i) {
		member = $this._members[i];
		if (MemberDefinition$name_0$LMemberDefinition$(member) === "constructor" && (member._flags & 8) === 0 && member instanceof MemberFunctionDefinition) {
			if (MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$(member).length === 0) {
				return true;
			}
			hasCtorWithArgs = true;
		}
	}
	return ! hasCtorWithArgs;
};

ClassDefinition.hasDefaultConstructor_0$LClassDefinition$ = ClassDefinition$hasDefaultConstructor_0$LClassDefinition$;

function ClassDefinition$membersAreEqual$LMemberDefinition$LMemberDefinition$(x, y) {
	if (MemberDefinition$name_0$LMemberDefinition$(x) !== MemberDefinition$name_0$LMemberDefinition$(y)) {
		return false;
	}
	if (x instanceof MemberFunctionDefinition) {
		if (! (y instanceof MemberFunctionDefinition)) {
			return false;
		}
		if (! Util$typesAreEqual$ALType$ALType$(MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(x), MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(y))) {
			return false;
		}
	} else {
		if (! (y instanceof MemberVariableDefinition)) {
			return false;
		}
	}
	return true;
};

ClassDefinition.membersAreEqual$LMemberDefinition$LMemberDefinition$ = ClassDefinition$membersAreEqual$LMemberDefinition$LMemberDefinition$;

function MemberDefinition(token, nameToken, flags, closures, docComment) {
	this._stash = {};
	this._token = token;
	this._nameToken = nameToken;
	this._flags = flags;
	this._closures = closures;
	this._docComment = docComment;
	this._classDef = null;
};

$__jsx_extend([MemberDefinition], Object);
$__jsx_merge_interface(MemberDefinition, Stashable);

MemberDefinition.prototype.getToken$ = function () {
	return this._token;
};


function MemberDefinition$getToken_0$LMemberDefinition$($this) {
	return $this._token;
};

MemberDefinition.getToken_0$LMemberDefinition$ = MemberDefinition$getToken_0$LMemberDefinition$;

function MemberDefinition$getNameToken_0$LMemberDefinition$($this) {
	return $this._nameToken;
};

MemberDefinition.getNameToken_0$LMemberDefinition$ = MemberDefinition$getNameToken_0$LMemberDefinition$;

function MemberDefinition$name_0$LMemberDefinition$($this) {
	var $this$0;
	$this$0 = $this._nameToken;
	return $this$0._value;
};

MemberDefinition.name_0$LMemberDefinition$ = MemberDefinition$name_0$LMemberDefinition$;

MemberDefinition.prototype.flags$ = function () {
	return this._flags;
};


function MemberDefinition$flags_0$LMemberDefinition$($this) {
	return $this._flags;
};

MemberDefinition.flags_0$LMemberDefinition$ = MemberDefinition$flags_0$LMemberDefinition$;

function MemberDefinition$setFlags_0$LMemberDefinition$N($this, flags) {
	$this._flags = flags;
};

MemberDefinition.setFlags_0$LMemberDefinition$N = MemberDefinition$setFlags_0$LMemberDefinition$N;

function MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$($this, cb) {
	var i;
	if ($this._closures != null) {
		for (i = 0; i < $this._closures.length; ++ i) {
			if (! cb($this._closures[i])) {
				return false;
			}
		}
	}
	return true;
};

MemberDefinition.forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$ = MemberDefinition$forEachClosure_0$LMemberDefinition$F$LMemberFunctionDefinition$B$;

MemberDefinition.prototype.getClassDef$ = function () {
	return this._classDef;
};


function MemberDefinition$_instantiateClosures_0$LMemberDefinition$LInstantiationContext$($this, instantiationContext) {
	var closures;
	var i;
	closures = [];
	for (i = 0; i < $this._closures.length; ++ i) {
		closures[i] = $this._closures[i].instantiate$LInstantiationContext$(instantiationContext);
	}
	return closures;
};

MemberDefinition._instantiateClosures_0$LMemberDefinition$LInstantiationContext$ = MemberDefinition$_instantiateClosures_0$LMemberDefinition$LInstantiationContext$;

function MemberDefinition$_updateLinkFromExpressionToClosuresUponInstantiation_0$LMemberDefinition$LExpression$ALMemberFunctionDefinition$($this, instantiatedExpr, instantiatedClosures) {
	var onExpr;
	function onExpr(expr) {
		var i;
		var $this$0;
		var funcDef$0;
		if (expr instanceof FunctionExpression) {
			for (i = 0; i < $this._closures.length; ++ i) {
				if ($this._closures[i] == FunctionExpression$getFuncDef_0$LFunctionExpression$(expr)) {
					break;
				}
			}
			if (i === $this._closures.length) {
				throw new Error("logic flaw, cannot find the closure");
			}
			$this$0 = expr;
			funcDef$0 = instantiatedClosures[i];
			$this$0._funcDef = funcDef$0;
		}
		return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
	}
	onExpr(instantiatedExpr);
};

MemberDefinition._updateLinkFromExpressionToClosuresUponInstantiation_0$LMemberDefinition$LExpression$ALMemberFunctionDefinition$ = MemberDefinition$_updateLinkFromExpressionToClosuresUponInstantiation_0$LMemberDefinition$LExpression$ALMemberFunctionDefinition$;

function MemberVariableDefinition(token, name, flags, type, initialValue, closures, docComment) {
	MemberDefinition.call(this, token, name, flags, closures, docComment);
	this._type = type;
	this._initialValue = initialValue;
	this._analyzeState = 0;
	this._analysisContext = null;
};

$__jsx_extend([MemberVariableDefinition], MemberDefinition);
MemberVariableDefinition.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var type;
	var initialValue;
	var closures;
	type = (this._type != null ? this._type.instantiate$LInstantiationContext$(instantiationContext) : null);
	initialValue = null;
	if (this._initialValue != null) {
		initialValue = this._initialValue.clone$();
		Expression$instantiate_0$LExpression$LInstantiationContext$(initialValue, instantiationContext);
		closures = MemberDefinition$_instantiateClosures_0$LMemberDefinition$LInstantiationContext$(this, instantiationContext);
		MemberDefinition$_updateLinkFromExpressionToClosuresUponInstantiation_0$LMemberDefinition$LExpression$ALMemberFunctionDefinition$(this, initialValue, closures);
	} else {
		closures = [  ];
	}
	return new MemberVariableDefinition(this._token, this._nameToken, this._flags, type, initialValue, closures, null);
};


MemberVariableDefinition.prototype.toString = function () {
	return MemberDefinition$name_0$LMemberDefinition$(this) + " : " + this._type.toString();
};


MemberVariableDefinition.prototype.serialize$ = function () {
	return ({ "token": Serializer$Token$E$serializeNullable$LToken$(this._token), "nameToken": Serializer$Token$E$serializeNullable$LToken$(this._nameToken), "flags": MemberDefinition$flags_0$LMemberDefinition$(this), "type": Serializer$Type$E$serializeNullable$LType$(this._type), "initialValue": Serializer$Expression$E$serializeNullable$LExpression$(this._initialValue) });
};


MemberVariableDefinition.prototype.getType$ = function () {
	var ivType;
	switch (this._analyzeState) {
	case 0:
		try {
			this._analyzeState = 1;
			if (this._initialValue != null) {
				if (! this._initialValue.analyze$LAnalysisContext$LExpression$(this._analysisContext, null)) {
					return null;
				}
				if (this._initialValue.isClassSpecifier$()) {
					this._analysisContext.errors.push(new CompileError(this._initialValue._token, "cannot assign a class"));
					return null;
				}
				ivType = this._initialValue.getType$();
				if (this._type == null) {
					if (ivType.equals$LType$(Type.nullType)) {
						this._analysisContext.errors.push(new CompileError(Expression$getToken_0$LExpression$(this._initialValue), "cannot assign null to an unknown type"));
						return null;
					}
					if (ivType.equals$LType$(Type.voidType)) {
						this._analysisContext.errors.push(new CompileError(Expression$getToken_0$LExpression$(this._initialValue), "cannot assign void"));
						return null;
					}
					this._type = ivType.asAssignableType$();
				} else {
					if (! ivType.isConvertibleTo$LType$(this._type)) {
						this._analysisContext.errors.push(new CompileError(this._nameToken, "the variable is declared as '" + this._type.toString() + "' but initial value is '" + ivType.toString() + "'"));
					}
				}
			}
			this._analyzeState = 2;
		} finally {
			if (this._analyzeState !== 2) {
				this._analyzeState = 3;
			}
		}
		break;
	case 1:
		this._analysisContext.errors.push(new CompileError(MemberDefinition$getNameToken_0$LMemberDefinition$(this), "please declare type of variable '" + MemberDefinition$name_0$LMemberDefinition$(this) + "' (detected recursion while trying to reduce type)"));
		break;
	default:
		break;
	}
	return this._type;
};


function MemberVariableDefinition$getInitialValue_0$LMemberVariableDefinition$($this) {
	return $this._initialValue;
};

MemberVariableDefinition.getInitialValue_0$LMemberVariableDefinition$ = MemberVariableDefinition$getInitialValue_0$LMemberVariableDefinition$;

function MemberVariableDefinition$setInitialValue_0$LMemberVariableDefinition$LExpression$($this, initialValue) {
	$this._initialValue = initialValue;
};

MemberVariableDefinition.setInitialValue_0$LMemberVariableDefinition$LExpression$ = MemberVariableDefinition$setInitialValue_0$LMemberVariableDefinition$LExpression$;

MemberVariableDefinition.prototype.getNotation$ = function () {
	var classDef;
	var s;
	var $this$0$0;
	classDef = this._classDef;
	s = (classDef != null ? classDef.className$() : "<<unknown>>");
	s += ((MemberDefinition$flags_0$LMemberDefinition$(this) & 8) !== 0 ? "." : "#");
	$this$0$0 = this._nameToken;
	s += $this$0$0._value;
	return s;
};


function MemberFunctionDefinition(token, name, flags, returnType, args, locals, statements, closures, lastTokenOfBody, docComment) {
	var i;
	var $this$0;
	MemberDefinition.call(this, token, name, flags, closures, docComment);
	this._returnType = returnType;
	this._args = args;
	this._locals = locals;
	this._statements = statements;
	this._lastTokenOfBody = lastTokenOfBody;
	this._parent = null;
	this._funcLocal = null;
	this._classDef = null;
	for (i = 0; i < this._closures.length; ++ i) {
		$this$0 = this._closures[i];
		$this$0._parent = this;
	}
};

$__jsx_extend([MemberFunctionDefinition], MemberDefinition);
$__jsx_merge_interface(MemberFunctionDefinition, Block);

function MemberFunctionDefinition$isGenerator_0$LMemberFunctionDefinition$($this) {
	return ($this._flags & 8192) !== 0;
};

MemberFunctionDefinition.isGenerator_0$LMemberFunctionDefinition$ = MemberFunctionDefinition$isGenerator_0$LMemberFunctionDefinition$;

MemberFunctionDefinition.prototype.getNotation$ = function () {
	var $this = this;
	var classDef;
	var s;
	classDef = this._classDef;
	s = (classDef != null ? classDef.className$() : "<<unknown>>");
	s += ((MemberDefinition$flags_0$LMemberDefinition$(this) & 8) !== 0 ? "." : "#");
	s += (MemberDefinition$getNameToken_0$LMemberDefinition$(this) != null ? MemberDefinition$name_0$LMemberDefinition$(this) : "$" + (Token$getLineNumber_0$LToken$(MemberDefinition$getToken_0$LMemberDefinition$(this)) + "") + "_" + (Token$getColumnNumber_0$LToken$(MemberDefinition$getToken_0$LMemberDefinition$(this)) + ""));
	s += "(";
	s += this._args.map((function (arg) {
		return ":" + arg._type.toString();
	})).join(",");
	s += ")";
	return s;
};


MemberFunctionDefinition.prototype.toString = function () {
	var $this = this;
	var argsText;
	argsText = this._args.map((function (arg) {
		return Token$getValue_0$LToken$(arg._name) + " : " + arg._type.toString();
	})).join(", ");
	return "function " + MemberDefinition$name_0$LMemberDefinition$(this) + "(" + argsText + ") : " + this._returnType.toString();
};


MemberFunctionDefinition.prototype.clone$ = function () {
	var $this = this;
	var stashesUsed;
	var getStash;
	var cloneFuncDef;
	var clonedFuncDef;
	var i;
	var stash;
	var stashesUsed$len$0;
	stashesUsed = [];
	function getStash(stashable) {
		var stash;
		stash = stashable.getStash$S("CLONE-FUNC-DEF");
		if (stash == null) {
			stash = stashable.setStash$SLStash$("CLONE-FUNC-DEF", new MemberFunctionDefinition$C_CloneStash());
		}
		stashesUsed.push(stash);
		return stash;
	}
	function cloneFuncDef(funcDef) {
		var statements;
		var closures;
		var funcLocal;
		var newFuncLocal;
		var args;
		var locals;
		var clonedFuncDef;
		statements = Cloner$Statement$E$cloneArray$ALStatement$(funcDef._statements);
		closures = funcDef._closures.map((function (funcDef) {
			var newFuncDef;
			newFuncDef = cloneFuncDef(funcDef);
			getStash(funcDef).newFuncDef = newFuncDef;
			return newFuncDef;
		}));
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			var newFuncDef;
			if (statement instanceof FunctionStatement) {
				if ((newFuncDef = getStash(FunctionStatement$getFuncDef_0$LFunctionStatement$(statement)).newFuncDef) != null) {
					FunctionStatement$setFuncDef_0$LFunctionStatement$LMemberFunctionDefinition$(statement, newFuncDef);
				}
				return true;
			}
			return statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
				var newFuncDef;
				if (expr instanceof FunctionExpression) {
					if ((newFuncDef = getStash(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr)).newFuncDef) != null) {
						FunctionExpression$setFuncDef_0$LFunctionExpression$LMemberFunctionDefinition$(expr, newFuncDef);
					}
					return true;
				}
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			})) && statement.forEachStatement$F$LStatement$B$(onStatement);
		}), statements);
		funcLocal = funcDef._funcLocal;
		if (funcLocal != null) {
			if ((newFuncLocal = getStash(funcLocal).newLocal) != null) {
			} else {
				newFuncLocal = new LocalVariable(funcLocal._name, funcLocal._type);
				getStash(funcLocal).newLocal = newFuncLocal;
			}
			funcLocal = newFuncLocal;
		}
		args = funcDef._args.map((function (arg) {
			var newArg;
			newArg = ArgumentDeclaration$clone_0$LArgumentDeclaration$(arg);
			getStash(arg).newLocal = newArg;
			return newArg;
		}));
		locals = funcDef._locals.map((function (local) {
			var newLocal;
			if ((newLocal = getStash(local).newLocal) != null) {
				return newLocal;
			}
			newLocal = new LocalVariable(LocalVariable$getName_0$LLocalVariable$(local), LocalVariable$getType_0$LLocalVariable$(local));
			getStash(local).newLocal = newLocal;
			return newLocal;
		}));
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			var caughtVar;
			if (statement instanceof CatchStatement) {
				caughtVar = CaughtVariable$clone_0$LCaughtVariable$(CatchStatement$getLocal_0$LCatchStatement$(statement));
				getStash(CatchStatement$getLocal_0$LCatchStatement$(statement)).newLocal = caughtVar;
				CatchStatement$setLocal_0$LCatchStatement$LCaughtVariable$(statement, caughtVar);
			} else {
				if (statement instanceof FunctionStatement) {
					MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionStatement$getFuncDef_0$LFunctionStatement$(statement), onStatement);
				}
			}
			return statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
				if (expr instanceof FunctionExpression) {
					return MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
				}
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			})) && statement.forEachStatement$F$LStatement$B$(onStatement);
		}), statements);
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			if (statement instanceof FunctionStatement) {
				MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionStatement$getFuncDef_0$LFunctionStatement$(statement), onStatement);
			}
			return statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
				var newLocal;
				if (expr instanceof LocalExpression) {
					if ((newLocal = getStash(LocalExpression$getLocal_0$LLocalExpression$(expr)).newLocal) != null) {
						LocalExpression$setLocal_0$LLocalExpression$LLocalVariable$(expr, newLocal);
					}
				} else {
					if (expr instanceof FunctionExpression) {
						return MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
					}
				}
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			})) && statement.forEachStatement$F$LStatement$B$(onStatement);
		}), statements);
		clonedFuncDef = new MemberFunctionDefinition(funcDef._token, funcDef._nameToken, funcDef._flags, funcDef._returnType, args, locals, statements, closures, funcDef._lastTokenOfBody, null);
		clonedFuncDef._funcLocal = funcLocal;
		return clonedFuncDef;
	}
	clonedFuncDef = cloneFuncDef(this);
	for ((i = 0, stashesUsed$len$0 = stashesUsed.length); i < stashesUsed$len$0; ++ i) {
		stash = stashesUsed[i];
		stash.newLocal = null;
		stash.newFuncDef = null;
	}
	return clonedFuncDef;
};


function MemberFunctionDefinition$clone_0$LMemberFunctionDefinition$($this) {
	var stashesUsed;
	var getStash;
	var cloneFuncDef;
	var clonedFuncDef;
	var i;
	var stash;
	var stashesUsed$len$0;
	stashesUsed = [];
	function getStash(stashable) {
		var stash;
		stash = stashable.getStash$S("CLONE-FUNC-DEF");
		if (stash == null) {
			stash = stashable.setStash$SLStash$("CLONE-FUNC-DEF", new MemberFunctionDefinition$C_CloneStash());
		}
		stashesUsed.push(stash);
		return stash;
	}
	function cloneFuncDef(funcDef) {
		var statements;
		var closures;
		var funcLocal;
		var newFuncLocal;
		var args;
		var locals;
		var clonedFuncDef;
		statements = Cloner$Statement$E$cloneArray$ALStatement$(funcDef._statements);
		closures = funcDef._closures.map((function (funcDef) {
			var newFuncDef;
			newFuncDef = cloneFuncDef(funcDef);
			getStash(funcDef).newFuncDef = newFuncDef;
			return newFuncDef;
		}));
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			var newFuncDef;
			if (statement instanceof FunctionStatement) {
				if ((newFuncDef = getStash(FunctionStatement$getFuncDef_0$LFunctionStatement$(statement)).newFuncDef) != null) {
					FunctionStatement$setFuncDef_0$LFunctionStatement$LMemberFunctionDefinition$(statement, newFuncDef);
				}
				return true;
			}
			return statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
				var newFuncDef;
				if (expr instanceof FunctionExpression) {
					if ((newFuncDef = getStash(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr)).newFuncDef) != null) {
						FunctionExpression$setFuncDef_0$LFunctionExpression$LMemberFunctionDefinition$(expr, newFuncDef);
					}
					return true;
				}
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			})) && statement.forEachStatement$F$LStatement$B$(onStatement);
		}), statements);
		funcLocal = funcDef._funcLocal;
		if (funcLocal != null) {
			if ((newFuncLocal = getStash(funcLocal).newLocal) != null) {
			} else {
				newFuncLocal = new LocalVariable(funcLocal._name, funcLocal._type);
				getStash(funcLocal).newLocal = newFuncLocal;
			}
			funcLocal = newFuncLocal;
		}
		args = funcDef._args.map((function (arg) {
			var newArg;
			newArg = ArgumentDeclaration$clone_0$LArgumentDeclaration$(arg);
			getStash(arg).newLocal = newArg;
			return newArg;
		}));
		locals = funcDef._locals.map((function (local) {
			var newLocal;
			if ((newLocal = getStash(local).newLocal) != null) {
				return newLocal;
			}
			newLocal = new LocalVariable(LocalVariable$getName_0$LLocalVariable$(local), LocalVariable$getType_0$LLocalVariable$(local));
			getStash(local).newLocal = newLocal;
			return newLocal;
		}));
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			var caughtVar;
			if (statement instanceof CatchStatement) {
				caughtVar = CaughtVariable$clone_0$LCaughtVariable$(CatchStatement$getLocal_0$LCatchStatement$(statement));
				getStash(CatchStatement$getLocal_0$LCatchStatement$(statement)).newLocal = caughtVar;
				CatchStatement$setLocal_0$LCatchStatement$LCaughtVariable$(statement, caughtVar);
			} else {
				if (statement instanceof FunctionStatement) {
					MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionStatement$getFuncDef_0$LFunctionStatement$(statement), onStatement);
				}
			}
			return statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
				if (expr instanceof FunctionExpression) {
					return MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
				}
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			})) && statement.forEachStatement$F$LStatement$B$(onStatement);
		}), statements);
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			if (statement instanceof FunctionStatement) {
				MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionStatement$getFuncDef_0$LFunctionStatement$(statement), onStatement);
			}
			return statement.forEachExpression$F$LExpression$F$LExpression$V$B$((function onExpr(expr, replaceCb) {
				var newLocal;
				if (expr instanceof LocalExpression) {
					if ((newLocal = getStash(LocalExpression$getLocal_0$LLocalExpression$(expr)).newLocal) != null) {
						LocalExpression$setLocal_0$LLocalExpression$LLocalVariable$(expr, newLocal);
					}
				} else {
					if (expr instanceof FunctionExpression) {
						return MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$(FunctionExpression$getFuncDef_0$LFunctionExpression$(expr), onStatement);
					}
				}
				return expr.forEachExpression$F$LExpression$F$LExpression$V$B$(onExpr);
			})) && statement.forEachStatement$F$LStatement$B$(onStatement);
		}), statements);
		clonedFuncDef = new MemberFunctionDefinition(funcDef._token, funcDef._nameToken, funcDef._flags, funcDef._returnType, args, locals, statements, closures, funcDef._lastTokenOfBody, null);
		clonedFuncDef._funcLocal = funcLocal;
		return clonedFuncDef;
	}
	clonedFuncDef = cloneFuncDef($this);
	for ((i = 0, stashesUsed$len$0 = stashesUsed.length); i < stashesUsed$len$0; ++ i) {
		stash = stashesUsed[i];
		stash.newLocal = null;
		stash.newFuncDef = null;
	}
	return clonedFuncDef;
};

MemberFunctionDefinition.clone_0$LMemberFunctionDefinition$ = MemberFunctionDefinition$clone_0$LMemberFunctionDefinition$;

MemberFunctionDefinition.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var $this = this;
	return MemberFunctionDefinition$_instantiateCore_0$LMemberFunctionDefinition$LInstantiationContext$F$LToken$LToken$NLType$ALArgumentDeclaration$ALLocalVariable$ALStatement$ALMemberFunctionDefinition$LToken$LDocComment$LMemberFunctionDefinition$$(this, instantiationContext, (function (token, name, flags, returnType, args, locals, statements, closures, lastTokenOfBody, docComment) {
		return new MemberFunctionDefinition(token, name, flags, returnType, args, locals, statements, closures, lastTokenOfBody, docComment);
	}));
};


function MemberFunctionDefinition$_instantiateCore_0$LMemberFunctionDefinition$LInstantiationContext$F$LToken$LToken$NLType$ALArgumentDeclaration$ALLocalVariable$ALStatement$ALMemberFunctionDefinition$LToken$LDocComment$LMemberFunctionDefinition$$($this, instantiationContext, constructCallback) {
	var args;
	var i;
	var locals;
	var caughtVariables;
	var statements;
	var closures;
	var returnType;
	var $this$0;
	var $this$1;
	args = [];
	for (i = 0; i < $this._args.length; ++ i) {
		args[i] = $this._args[i].instantiateAndPush$LInstantiationContext$(instantiationContext);
	}
	if ($this._statements != null) {
		locals = [];
		for (i = 0; i < $this._locals.length; ++ i) {
			locals[i] = $this._locals[i].instantiateAndPush$LInstantiationContext$(instantiationContext);
		}
		caughtVariables = [];
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			if (statement instanceof CatchStatement) {
				caughtVariables.push(CatchStatement$getLocal_0$LCatchStatement$(statement).instantiateAndPush$LInstantiationContext$(instantiationContext));
			}
			return statement.forEachStatement$F$LStatement$B$(onStatement);
		}), $this._statements);
		statements = [];
		for (i = 0; i < $this._statements.length; ++ i) {
			if ($this._statements[i] instanceof ConstructorInvocationStatement) {
				statements[i] = ConstructorInvocationStatement$instantiate_0$LConstructorInvocationStatement$LInstantiationContext$($this._statements[i], instantiationContext);
			} else {
				statements[i] = $this._statements[i].clone$();
			}
		}
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			var $this$0;
			var local$0;
			if (statement instanceof CatchStatement) {
				if (caughtVariables.length === 0) {
					throw new Error("logic flaw");
				}
				$this$0 = statement;
				local$0 = caughtVariables.shift();
				$this$0._local = local$0;
			}
			Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function (expr) {
				return Expression$instantiate_0$LExpression$LInstantiationContext$(expr, instantiationContext);
			}));
			return statement.forEachStatement$F$LStatement$B$(onStatement);
		}), statements);
		closures = MemberDefinition$_instantiateClosures_0$LMemberDefinition$LInstantiationContext$($this, instantiationContext);
		for (i = 0; i < $this._locals.length; ++ i) {
			if ($this._locals[i].isInstantiated) {
				throw new Error("logic flaw");
			}
			$this$0 = $this._locals[i];
			$this$0._instantiated.pop();
		}
		if (caughtVariables.length !== 0) {
			throw new Error("logic flaw");
		}
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			var $this$0;
			var $this$1;
			if (statement instanceof CatchStatement) {
				$this$1 = statement;
				$this$0 = $this$1._local;
				$this$0._instantiated.pop();
			}
			return statement.forEachStatement$F$LStatement$B$(onStatement);
		}), $this._statements);
		Util$forEachStatement$F$LStatement$B$ALStatement$((function onStatement(statement) {
			var i;
			var $this$0;
			var funcDef$0;
			if (statement instanceof FunctionStatement) {
				for (i = 0; i < $this._closures.length; ++ i) {
					if ($this._closures[i] == FunctionStatement$getFuncDef_0$LFunctionStatement$(statement)) {
						break;
					}
				}
				if (i === $this._closures.length) {
					throw new Error("logic flaw, cannot find the closure");
				}
				$this$0 = statement;
				funcDef$0 = closures[i];
				$this$0._funcDef = funcDef$0;
				return true;
			}
			Statement$forEachExpression_0$LStatement$F$LExpression$B$(statement, (function (expr) {
				MemberDefinition$_updateLinkFromExpressionToClosuresUponInstantiation_0$LMemberDefinition$LExpression$ALMemberFunctionDefinition$($this, expr, closures);
				return true;
			}));
			return statement.forEachStatement$F$LStatement$B$(onStatement);
		}), statements);
	} else {
		locals = null;
		statements = null;
		closures = [];
	}
	for (i = 0; i < $this._args.length; ++ i) {
		$this$1 = $this._args[i];
		$this$1._instantiated.pop();
	}
	if ($this._returnType != null) {
		returnType = $this._returnType.instantiate$LInstantiationContext$(instantiationContext);
		if (returnType == null) {
			return null;
		}
	} else {
		returnType = null;
	}
	return constructCallback($this._token, $this._nameToken, $this._flags, returnType, args, locals, statements, closures, $this._lastTokenOfBody, $this._docComment);
};

MemberFunctionDefinition._instantiateCore_0$LMemberFunctionDefinition$LInstantiationContext$F$LToken$LToken$NLType$ALArgumentDeclaration$ALLocalVariable$ALStatement$ALMemberFunctionDefinition$LToken$LDocComment$LMemberFunctionDefinition$$ = MemberFunctionDefinition$_instantiateCore_0$LMemberFunctionDefinition$LInstantiationContext$F$LToken$LToken$NLType$ALArgumentDeclaration$ALLocalVariable$ALStatement$ALMemberFunctionDefinition$LToken$LDocComment$LMemberFunctionDefinition$$;

MemberFunctionDefinition.prototype.serialize$ = function () {
	return ({ "token": Serializer$Token$E$serializeNullable$LToken$(this._token), "nameToken": Serializer$Token$E$serializeNullable$LToken$(this._nameToken), "flags": MemberDefinition$flags_0$LMemberDefinition$(this), "returnType": Serializer$Type$E$serializeNullable$LType$(this._returnType), "args": Serializer$ArgumentDeclaration$E$serializeArray$ALArgumentDeclaration$(this._args), "locals": Serializer$LocalVariable$E$serializeArray$ALLocalVariable$(this._locals), "statements": Serializer$Statement$E$serializeArray$ALStatement$(this._statements) });
};


function MemberFunctionDefinition$analyze_0$LMemberFunctionDefinition$LAnalysisContext$($this, outerContext) {
	var docComment;
	var args;
	var context;
	var i;
	var stack$0;
	var stack$1;
	var $this$1;
	var type$0;
	var $this$0$0;
	var blockStack$0;
	var blockStack$1;
	var blockStack$2;
	docComment = $this._docComment;
	if (docComment) {
		args = $this._args;
		docComment._params.forEach((function (docParam, i) {
			var args$len$0;
			for (args$len$0 = args.length; i < args$len$0; ++ i) {
				if (Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$(args[i])) === DocCommentParameter$getParamName_0$LDocCommentParameter$(docParam)) {
					return;
				}
			}
			outerContext.errors.push(new CompileError(docParam._token, 'invalid parameter name "' + DocCommentParameter$getParamName_0$LDocCommentParameter$(docParam) + '" for ' + MemberDefinition$name_0$LMemberDefinition$($this) + "()"));
		}));
	}
	if ($this._statements == null) {
		return;
	}
	$this$0$0 = ({errors: outerContext.errors, parser: outerContext.parser, postInstantiationCallback: outerContext.postInstantiationCallback, funcDef: null, blockStack: null, statement: null});
	$this$0$0.funcDef = $this;
	context = $this$0$0;
	if ($this._parent == null) {
		stack$0 = [ ({localVariableStatuses: new LocalVariableStatuses($this, null), block: $this}) ];
		context.blockStack = stack$0;
	} else {
		stack$1 = blockStack$1 = outerContext.blockStack;
		blockStack$0 = context.blockStack = stack$1;
		blockStack$0.push(({localVariableStatuses: new LocalVariableStatuses($this, blockStack$1[blockStack$1.length - 1].localVariableStatuses), block: $this}));
		if (! ($this._nameToken == null)) {
			if ($this._returnType != null) {
				context.blockStack[context.blockStack.length - 1].localVariableStatuses._statuses[MemberDefinition$name_0$LMemberDefinition$($this)] = 1;
			} else {
				context.blockStack[context.blockStack.length - 1].localVariableStatuses._statuses[MemberDefinition$name_0$LMemberDefinition$($this)] = -1;
			}
		}
	}
	try {
		for (i = 0; i < $this._statements.length; ++ i) {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$($this._statements[i], context)) {
				break;
			}
		}
		if ($this._returnType == null) {
			$this._returnType = Type.voidType;
		}
		if (($this._flags & 8192) !== 0) {
		} else {
			if (! $this._returnType.equals$LType$(Type.voidType) && LocalVariableStatuses$isReachable_0$LLocalVariableStatuses$((blockStack$2 = context.blockStack)[blockStack$2.length - 1].localVariableStatuses)) {
				context.errors.push(new CompileError($this._lastTokenOfBody, "missing return statement"));
			}
		}
		if ($this._parent == null && $this._nameToken != null && MemberDefinition$name_0$LMemberDefinition$($this) === "constructor") {
			MemberFunctionDefinition$_fixupConstructor_0$LMemberFunctionDefinition$LAnalysisContext$($this, context);
		}
	} finally {
		context.blockStack.pop();
	}
	if ($this._funcLocal != null) {
		$this$1 = $this._funcLocal;
		type$0 = $this.getType$();
		$this$1._type = type$0;
	}
};

MemberFunctionDefinition.analyze_0$LMemberFunctionDefinition$LAnalysisContext$ = MemberFunctionDefinition$analyze_0$LMemberFunctionDefinition$LAnalysisContext$;

function MemberFunctionDefinition$generateWrappersForDefaultParameters_0$LMemberFunctionDefinition$ALCompileError$($this, errors) {
	var origArgIndex;
	var formalArgs;
	var argExprs;
	var i;
	var defVal;
	var statement;
	var invocant;
	var methodRef;
	var callExpression;
	var wrapper;
	var $this$0;
	var classDef$0;
	var _classDef$0;
	for (origArgIndex = 0; origArgIndex !== $this._args.length; ++ origArgIndex) {
		if (ArgumentDeclaration$getDefaultValue_0$LArgumentDeclaration$($this._args[origArgIndex]) != null) {
			break;
		}
	}
	for (; origArgIndex !== $this._args.length; ++ origArgIndex) {
		formalArgs = $this._args.slice(0, origArgIndex).map((function (arg) {
			return new ArgumentDeclaration(arg._name, arg._type);
		}));
		argExprs = formalArgs.map((function (arg) {
			return new LocalExpression(arg._name, arg);
		}));
		for (i = origArgIndex; i !== $this._args.length; ++ i) {
			$this$0 = $this._args[i];
			defVal = $this$0._defaultValue;
			argExprs.push(defVal.clone$());
		}
		if (MemberDefinition$name_0$LMemberDefinition$($this) === "constructor") {
			statement = new ConstructorInvocationStatement(new Token$0("this", false), new ObjectType($this._classDef), argExprs);
		} else {
			invocant = (($this._flags & 8) === 0 ? new ThisExpression(new Token$0("this", false), $this._classDef) : new ClassExpression(new Token$0($this._classDef.className$(), true), new ObjectType($this._classDef)));
			methodRef = new PropertyExpression(new Token$0(".", false), invocant, $this._nameToken, MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this));
			callExpression = new CallExpression(new Token$0("(", false), methodRef, argExprs);
			if ($this._returnType != Type.voidType) {
				statement = new ReturnStatement(new Token$0("return", false), callExpression);
			} else {
				statement = new ExpressionStatement(callExpression);
			}
		}
		wrapper = new MemberFunctionDefinition($this._token, $this._nameToken, $this._flags | 1024, $this._returnType, formalArgs, [], [ statement ], [], $this._lastTokenOfBody, null);
		classDef$0 = _classDef$0 = $this._classDef;
		wrapper._classDef = classDef$0;
		ClassDefinition$members_0$LClassDefinition$(_classDef$0).push(wrapper);
	}
};

MemberFunctionDefinition.generateWrappersForDefaultParameters_0$LMemberFunctionDefinition$ALCompileError$ = MemberFunctionDefinition$generateWrappersForDefaultParameters_0$LMemberFunctionDefinition$ALCompileError$;

function MemberFunctionDefinition$_fixupConstructor_0$LMemberFunctionDefinition$LAnalysisContext$($this, context) {
	var success;
	var isAlternate;
	var stmtIndex;
	var baseIndex;
	var baseClassType;
	var ctorStmt;
	var normalStatementFromIndex;
	var initProperties;
	var i;
	var onExpr;
	var canContinue;
	var insertStmtAt;
	var _statements$0;
	var _statements$1;
	success = true;
	isAlternate = false;
	if (($this._flags & 8192) !== 0) {
		context.errors.push(new CompileError($this._token, "constructor must not be a generator"));
		return;
	}
	stmtIndex = 0;
	if (0 < (_statements$1 = $this._statements).length && _statements$1[0] instanceof ConstructorInvocationStatement && ConstructorInvocationStatement$getConstructingClassDef_0$LConstructorInvocationStatement$(_statements$1[0]) == $this._classDef) {
		isAlternate = true;
		++ stmtIndex;
	} else {
		for (baseIndex = 0; baseIndex <= ClassDefinition$implementTypes_0$LClassDefinition$($this._classDef).length; ++ baseIndex) {
			baseClassType = (baseIndex === 0 ? ClassDefinition$extendType_0$LClassDefinition$($this._classDef) : ClassDefinition$implementTypes_0$LClassDefinition$($this._classDef)[baseIndex - 1]);
			if (baseClassType != null) {
				if (stmtIndex < (_statements$0 = $this._statements).length && _statements$0[stmtIndex] instanceof ConstructorInvocationStatement && baseClassType._classDef == ConstructorInvocationStatement$getConstructingClassDef_0$LConstructorInvocationStatement$(_statements$0[stmtIndex])) {
					if (Token$getValue_0$LToken$(ParsedObjectType$getToken_0$LParsedObjectType$(baseClassType)) === "Object") {
						$this._statements.splice(stmtIndex, 1);
					} else {
						++ stmtIndex;
					}
				} else {
					if (baseClassType._classDef.className$() === "Object") {
					} else {
						if (ClassDefinition$hasDefaultConstructor_0$LClassDefinition$(baseClassType._classDef)) {
							ctorStmt = new ConstructorInvocationStatement($this._token, baseClassType, []);
							$this._statements.splice(stmtIndex, 0, ctorStmt);
							if (! Statement$analyze_0$LStatement$LAnalysisContext$(ctorStmt, context)) {
								throw new Error("logic flaw");
							}
							++ stmtIndex;
						} else {
							if (stmtIndex < $this._statements.length) {
								context.errors.push(new CompileError($this._statements[stmtIndex].getToken$(), "constructor of class '" + (baseClassType._typeArguments.length !== 0 ? Type$templateTypeToString$SALType$(Token$getValue_0$LToken$(QualifiedName$getToken_0$LQualifiedName$(baseClassType._qualifiedName)), baseClassType._typeArguments) : Token$getValue_0$LToken$(QualifiedName$getToken_0$LQualifiedName$(baseClassType._qualifiedName))) + "' should be called prior to the statement"));
							} else {
								context.errors.push(new CompileError($this._token, "super class '" + (baseClassType._typeArguments.length !== 0 ? Type$templateTypeToString$SALType$(Token$getValue_0$LToken$(QualifiedName$getToken_0$LQualifiedName$(baseClassType._qualifiedName)), baseClassType._typeArguments) : Token$getValue_0$LToken$(QualifiedName$getToken_0$LQualifiedName$(baseClassType._qualifiedName))) + "' should be initialized explicitely (no default constructor)"));
							}
							success = false;
						}
					}
				}
			}
		}
	}
	for (; stmtIndex < $this._statements.length; ++ stmtIndex) {
		if (! ($this._statements[stmtIndex] instanceof ConstructorInvocationStatement)) {
			break;
		}
		context.errors.push(new CompileError($this._statements[stmtIndex].getToken$(), "constructors should be invoked in the order they are implemented"));
		success = false;
	}
	if (! success) {
		return;
	}
	if (isAlternate) {
		return;
	}
	normalStatementFromIndex = stmtIndex;
	initProperties = {};
	ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$($this._classDef, (function (member) {
		if ((member._flags & 10) === 0) {
			initProperties[MemberDefinition$name_0$LMemberDefinition$(member)] = true;
		}
		return true;
	}));
	for (i = normalStatementFromIndex; i < $this._statements.length; ++ i) {
		if (! ($this._statements[i] instanceof ExpressionStatement)) {
			break;
		}
		function onExpr(expr) {
			var lhsExpr;
			if (expr instanceof AssignmentExpression && Token$getValue_0$LToken$(expr._token) === "=" && (lhsExpr = BinaryExpression$getFirstExpr_0$LBinaryExpression$(expr)) instanceof PropertyExpression && UnaryExpression$getExpr_0$LUnaryExpression$(lhsExpr) instanceof ThisExpression) {
				initProperties[Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(lhsExpr))] = false;
				return true;
			} else {
				if (expr instanceof ThisExpression || expr instanceof FunctionExpression) {
					return false;
				}
			}
			return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
		}
		canContinue = Statement$forEachExpression_0$LStatement$F$LExpression$B$($this._statements[i], onExpr);
		if (! canContinue) {
			break;
		}
	}
	insertStmtAt = normalStatementFromIndex;
	ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$($this._classDef, (function (member) {
		var stmt;
		if ((member._flags & 10) === 0) {
			if (initProperties[MemberDefinition$name_0$LMemberDefinition$(member)]) {
				stmt = new ExpressionStatement(new AssignmentExpression(new Token$0("=", false), new PropertyExpression$0(new Token$0(".", false), new ThisExpression(new Token$0("this", false), $this._classDef), member._nameToken, [], member.getType$()), member._initialValue));
				$this._statements.splice(insertStmtAt++, 0, stmt);
			}
		}
		return true;
	}));
};

MemberFunctionDefinition._fixupConstructor_0$LMemberFunctionDefinition$LAnalysisContext$ = MemberFunctionDefinition$_fixupConstructor_0$LMemberFunctionDefinition$LAnalysisContext$;

function MemberFunctionDefinition$getReturnType_0$LMemberFunctionDefinition$($this) {
	return $this._returnType;
};

MemberFunctionDefinition.getReturnType_0$LMemberFunctionDefinition$ = MemberFunctionDefinition$getReturnType_0$LMemberFunctionDefinition$;

function MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$($this) {
	return $this._args;
};

MemberFunctionDefinition.getArguments_0$LMemberFunctionDefinition$ = MemberFunctionDefinition$getArguments_0$LMemberFunctionDefinition$;

function MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this) {
	var argTypes;
	var i;
	var $this$0;
	argTypes = [];
	for (i = 0; i < $this._args.length; ++ i) {
		$this$0 = $this._args[i];
		argTypes[i] = $this$0._type;
	}
	return argTypes;
};

MemberFunctionDefinition.getArgumentTypes_0$LMemberFunctionDefinition$ = MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$;

function MemberFunctionDefinition$getFuncLocal_0$LMemberFunctionDefinition$($this) {
	return $this._funcLocal;
};

MemberFunctionDefinition.getFuncLocal_0$LMemberFunctionDefinition$ = MemberFunctionDefinition$getFuncLocal_0$LMemberFunctionDefinition$;

MemberFunctionDefinition.prototype.getStatements$ = function () {
	return this._statements;
};


function MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$($this) {
	return $this._statements;
};

MemberFunctionDefinition.getStatements_0$LMemberFunctionDefinition$ = MemberFunctionDefinition$getStatements_0$LMemberFunctionDefinition$;

MemberFunctionDefinition.prototype.getType$ = function () {
	return ((this._flags & 8) !== 0 ? new StaticFunctionType(this._token, this._returnType, MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(this), false) : new MemberFunctionType(this._token, new ObjectType(this._classDef), this._returnType, MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$(this), false));
};


function MemberFunctionDefinition$deductTypeIfUnknown_0$LMemberFunctionDefinition$LAnalysisContext$LResolvedFunctionType$($this, context, type) {
	var i;
	var $this$0;
	var type$0;
	var $this$1;
	var type$1;
	var $this$2;
	var type$2;
	var _args$0;
	for (i = 0; i < $this._args.length; ++ i) {
		if (LocalVariable$getType_0$LLocalVariable$($this._args[i]) == null) {
			break;
		}
	}
	if (i === $this._args.length && $this._returnType != null) {
		if ($this._funcLocal != null) {
			$this$0 = $this._funcLocal;
			type$0 = $this.getType$();
			$this$0._type = type$0;
		}
		return true;
	}
	if (type._argTypes.length !== $this._args.length) {
		context.errors.push(new CompileError($this._token, "expected the function to have " + (type._argTypes.length + "") + " arguments, but found " + ($this._args.length + "")));
		return false;
	} else {
		if ((_args$0 = $this._args).length !== 0 && type._argTypes[_args$0.length - 1] instanceof VariableLengthArgumentType) {
			context.errors.push(new CompileError($this._token, "could not deduct function argument (left hand expression is a function with an variable-length argument)"));
			return false;
		}
	}
	for (i = 0; i < $this._args.length; ++ i) {
		if (LocalVariable$getType_0$LLocalVariable$($this._args[i]) != null) {
			if (! LocalVariable$getType_0$LLocalVariable$($this._args[i]).equals$LType$(type._argTypes[i])) {
				context.errors.push(new CompileError($this._token, "detected type conflict for argument '" + Token$getValue_0$LToken$(LocalVariable$getName_0$LLocalVariable$($this._args[i])) + "' (expected '" + type._argTypes[i].toString() + "' but found '" + LocalVariable$getType_0$LLocalVariable$($this._args[i]).toString() + "'"));
				return false;
			}
		} else {
			$this$1 = $this._args[i];
			type$1 = type._argTypes[i];
			$this$1._type = type$1;
		}
	}
	if ($this._returnType != null) {
		if (! $this._returnType.equals$LType$(type._returnType)) {
			context.errors.push(new CompileError($this._token, "detected return type conflict, expected '" + type._returnType.toString() + "' but found '" + $this._returnType.toString() + "'"));
			return false;
		}
	} else {
		$this._returnType = type._returnType;
	}
	if ($this._funcLocal != null) {
		$this$2 = $this._funcLocal;
		type$2 = $this.getType$();
		$this$2._type = type$2;
	}
	return true;
};

MemberFunctionDefinition.deductTypeIfUnknown_0$LMemberFunctionDefinition$LAnalysisContext$LResolvedFunctionType$ = MemberFunctionDefinition$deductTypeIfUnknown_0$LMemberFunctionDefinition$LAnalysisContext$LResolvedFunctionType$;

MemberFunctionDefinition.prototype.forEachStatement$F$LStatement$B$ = function (cb) {
	return Util$forEachStatement$F$LStatement$B$ALStatement$(cb, this._statements);
};


function MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$($this, cb) {
	return Util$forEachStatement$F$LStatement$B$ALStatement$(cb, $this._statements);
};

MemberFunctionDefinition.forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$ = MemberFunctionDefinition$forEachStatement_0$LMemberFunctionDefinition$F$LStatement$B$;

function InstantiatedMemberFunctionDefinition(token, name, flags, returnType, args, locals, statements, closures, lastTokenOfBody, docComment) {
	MemberFunctionDefinition.call(this, token, name, flags, returnType, args, locals, statements, closures, lastTokenOfBody, docComment);
};

$__jsx_extend([InstantiatedMemberFunctionDefinition], MemberFunctionDefinition);
function TemplateFunctionDefinition(token, name, flags, typeArgs, returnType, args, locals, statements, closures, lastTokenOfBody, docComment) {
	var $this = this;
	MemberFunctionDefinition.call(this, token, name, flags, returnType, args, locals, statements, closures, lastTokenOfBody, docComment);
	this._typeArgs = typeArgs.concat([]);
	this._instantiatedDefs = ({_list: [], _equalsCallback: (function (x, y) {
		var i;
		var x$len$0;
		for ((i = 0, x$len$0 = x.length); i < x$len$0; ++ i) {
			if (! x[i].equals$LType$(y[i])) {
				return false;
			}
		}
		return true;
	})});
	this._resolvedTypemap = {};
};

$__jsx_extend([TemplateFunctionDefinition], MemberFunctionDefinition);
$__jsx_merge_interface(TemplateFunctionDefinition, TemplateDefinition);

TemplateFunctionDefinition.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var instantiated;
	var k;
	instantiated = new TemplateFunctionDefinition(this._token, MemberDefinition$getNameToken_0$LMemberDefinition$(this), MemberDefinition$flags_0$LMemberDefinition$(this), this._typeArgs.concat([]), this._returnType, this._args.concat([]), this._locals, this._statements, this._closures, this._lastTokenOfBody, this._docComment);
	for (k in this._resolvedTypemap) {
		instantiated._resolvedTypemap[k] = this._resolvedTypemap[k];
	}
	for (k in instantiationContext.typemap) {
		instantiated._resolvedTypemap[k] = instantiationContext.typemap[k];
	}
	return instantiated;
};


function TemplateFunctionDefinition$instantiateTemplateFunction_0$LTemplateFunctionDefinition$ALCompileError$LToken$ALType$($this, errors, token, typeArgs) {
	var instantiated;
	var instantiationContext;
	var k;
	var analysisContext;
	var i;
	var classDef$0;
	var _classDef$0;
	instantiated = TypedMap$Array$Type$E$MemberFunctionDefinition$E$get_0$LTypedMap$Array$Type$E$MemberFunctionDefinition$E$ALType$($this._instantiatedDefs, typeArgs);
	if (instantiated != null) {
		return instantiated;
	}
	instantiationContext = $this.buildInstantiationContext$ALCompileError$LToken$ALToken$ALType$(errors, token, $this._typeArgs, typeArgs);
	if (instantiationContext == null) {
		return null;
	}
	for (k in $this._resolvedTypemap) {
		instantiationContext.typemap[k] = $this._resolvedTypemap[k];
	}
	instantiated = MemberFunctionDefinition$_instantiateCore_0$LMemberFunctionDefinition$LInstantiationContext$F$LToken$LToken$NLType$ALArgumentDeclaration$ALLocalVariable$ALStatement$ALMemberFunctionDefinition$LToken$LDocComment$LMemberFunctionDefinition$$($this, instantiationContext, (function (token, name, flags, returnType, args, locals, statements, closures, lastTokenOfBody, docComment) {
		return new InstantiatedMemberFunctionDefinition(token, name, flags, returnType, args, locals, statements, closures, lastTokenOfBody, docComment);
	}));
	if (instantiated == null) {
		return null;
	}
	classDef$0 = _classDef$0 = $this._classDef;
	instantiated._classDef = classDef$0;
	_classDef$0._members.push(instantiated);
	analysisContext = ({errors: errors, parser: ClassDefinition$getParser_0$LClassDefinition$($this._classDef), postInstantiationCallback: (function (parser, classDef) {
		throw new Error("not implemented");
	}), funcDef: null, blockStack: null, statement: null});
	for (i = 0; i < instantiationContext.objectTypesUsed.length; ++ i) {
		instantiationContext.objectTypesUsed[i].resolveType$LAnalysisContext$(analysisContext);
	}
	MemberFunctionDefinition$analyze_0$LMemberFunctionDefinition$LAnalysisContext$(instantiated, analysisContext);
	TypedMap$Array$Type$E$MemberFunctionDefinition$E$set_0$LTypedMap$Array$Type$E$MemberFunctionDefinition$E$ALType$LMemberFunctionDefinition$($this._instantiatedDefs, typeArgs.concat([]), instantiated);
	return instantiated;
};

TemplateFunctionDefinition.instantiateTemplateFunction_0$LTemplateFunctionDefinition$ALCompileError$LToken$ALType$ = TemplateFunctionDefinition$instantiateTemplateFunction_0$LTemplateFunctionDefinition$ALCompileError$LToken$ALType$;

function TemplateClassDefinition(token, className, flags, typeArgs, extendType, implementTypes, members, inners, templateInners, objectTypesUsed, docComment) {
	ClassDefinition.call(this, token, className, flags, extendType, implementTypes, members, inners, templateInners, objectTypesUsed, docComment);
	this._token = token;
	this._className = className;
	this._flags = flags;
	this._typeArgs = typeArgs.concat([]);
	ClassDefinition$_resetMembersClassDef_0$LClassDefinition$(this);
};

$__jsx_extend([TemplateClassDefinition], ClassDefinition);
$__jsx_merge_interface(TemplateClassDefinition, TemplateDefinition);

TemplateClassDefinition.prototype.getToken$ = function () {
	return this._token;
};


TemplateClassDefinition.prototype.className$ = function () {
	return this._className;
};


TemplateClassDefinition.prototype.flags$ = function () {
	return this._flags;
};


TemplateClassDefinition.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var typemap;
	var key;
	var i;
	var context;
	var succeeded;
	var members;
	var member;
	var inners;
	var inner;
	var templateInners;
	var templateInner;
	var extendType;
	var type;
	var implementTypes;
	typemap = {};
	for (key in instantiationContext.typemap) {
		typemap[key] = instantiationContext.typemap[key];
	}
	for (i = 0; i < this._typeArgs.length; ++ i) {
		delete typemap[Token$getValue_0$LToken$(this._typeArgs[i])];
	}
	context = ({errors: instantiationContext.errors, typemap: typemap, objectTypesUsed: []});
	succeeded = true;
	members = [];
	for (i = 0; i < this._members.length; ++ i) {
		member = this._members[i].instantiate$LInstantiationContext$(context);
		if (member == null) {
			succeeded = false;
		}
		members[i] = member;
	}
	inners = [];
	for (i = 0; i < this._inners.length; ++ i) {
		inner = this._inners[i].instantiate$LInstantiationContext$(context);
		if (inner == null) {
			succeeded = false;
		}
		inners[i] = inner;
	}
	templateInners = [];
	for (i = 0; i < this._templateInners.length; ++ i) {
		templateInner = this._templateInners[i].instantiate$LInstantiationContext$(context);
		if (templateInner == null) {
			succeeded = false;
		}
		templateInners[i] = templateInner;
	}
	if (! succeeded) {
		return null;
	}
	extendType = null;
	if (this._extendType != null) {
		type = this._extendType.instantiate$LInstantiationContext$(instantiationContext);
		if (! (type instanceof ParsedObjectType)) {
			instantiationContext.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$(this._extendType), "non-object type is not extensible"));
			return null;
		}
		extendType = type;
	}
	implementTypes = [];
	for (i = 0; i < this._implementTypes.length; ++ i) {
		type = this._implementTypes[i].instantiate$LInstantiationContext$(instantiationContext);
		if (! (type instanceof ParsedObjectType)) {
			instantiationContext.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$(this._implementTypes[i]), "non-object type is not extensible"));
			return null;
		}
		implementTypes[i] = type;
	}
	return new TemplateClassDefinition(this._token, this._className, this._flags, this._typeArgs, extendType, implementTypes, members, inners, templateInners, context.objectTypesUsed, this._docComment);
};


function TemplateClassDefinition$instantiateTemplateClass_0$LTemplateClassDefinition$ALCompileError$LTemplateInstantiationRequest$($this, errors, request) {
	var instantiationContext;
	var succeeded;
	var members;
	var i;
	var member;
	var inners;
	var inner;
	var templateInners;
	var templateInner;
	var extendType;
	var type;
	var implementTypes;
	var instantiatedDef;
	instantiationContext = $this.buildInstantiationContext$ALCompileError$LToken$ALToken$ALType$(errors, request._token, $this._typeArgs, request._typeArgs);
	if (instantiationContext == null) {
		return null;
	}
	succeeded = true;
	members = [];
	for (i = 0; i < $this._members.length; ++ i) {
		member = $this._members[i].instantiate$LInstantiationContext$(instantiationContext);
		if (member == null) {
			succeeded = false;
		}
		members[i] = member;
	}
	inners = [];
	for (i = 0; i < $this._inners.length; ++ i) {
		inner = $this._inners[i].instantiate$LInstantiationContext$(instantiationContext);
		if (inner == null) {
			succeeded = false;
		}
		inners[i] = inner;
	}
	templateInners = [];
	for (i = 0; i < $this._templateInners.length; ++ i) {
		templateInner = $this._templateInners[i].instantiate$LInstantiationContext$(instantiationContext);
		if (templateInner == null) {
			succeeded = false;
		}
		templateInners[i] = templateInner;
	}
	if (! succeeded) {
		return null;
	}
	extendType = null;
	if ($this._extendType != null) {
		type = $this._extendType.instantiate$LInstantiationContext$(instantiationContext);
		if (! (type instanceof ParsedObjectType)) {
			instantiationContext.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$($this._extendType), "non-object type is not extensible"));
			return null;
		}
		extendType = type;
	}
	implementTypes = [];
	for (i = 0; i < $this._implementTypes.length; ++ i) {
		type = $this._implementTypes[i].instantiate$LInstantiationContext$(instantiationContext);
		if (! (type instanceof ParsedObjectType)) {
			instantiationContext.errors.push(new CompileError(ParsedObjectType$getToken_0$LParsedObjectType$($this._implementTypes[i]), "non-object type is not extensible"));
			return null;
		}
		implementTypes[i] = type;
	}
	instantiatedDef = new InstantiatedClassDefinition($this, request._typeArgs, extendType, implementTypes, members, inners, templateInners, instantiationContext.objectTypesUsed);
	return instantiatedDef;
};

TemplateClassDefinition.instantiateTemplateClass_0$LTemplateClassDefinition$ALCompileError$LTemplateInstantiationRequest$ = TemplateClassDefinition$instantiateTemplateClass_0$LTemplateClassDefinition$ALCompileError$LTemplateInstantiationRequest$;

function InstantiatedClassDefinition(templateClassDef, typeArguments, extendType, implementTypes, members, inners, templateInners, objectTypesUsed) {
	ClassDefinition.call(this, null, Type$templateTypeToString$SALType$((templateClassDef._outerClassDef != null ? ClassDefinition$classFullName_0$LClassDefinition$(templateClassDef._outerClassDef) + "." + templateClassDef._className : templateClassDef.className$()), typeArguments), templateClassDef._flags, extendType, implementTypes, members, inners, templateInners, objectTypesUsed, null);
	this._templateClassDef = templateClassDef;
	this._typeArguments = typeArguments;
};

$__jsx_extend([InstantiatedClassDefinition], ClassDefinition);
function InstantiatedClassDefinition$getTemplateClass_0$LInstantiatedClassDefinition$($this) {
	return $this._templateClassDef;
};

InstantiatedClassDefinition.getTemplateClass_0$LInstantiatedClassDefinition$ = InstantiatedClassDefinition$getTemplateClass_0$LInstantiatedClassDefinition$;

function InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$($this) {
	var this$0;
	this$0 = $this._templateClassDef;
	return this$0._className;
};

InstantiatedClassDefinition.getTemplateClassName_0$LInstantiatedClassDefinition$ = InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$;

function InstantiatedClassDefinition$getTypeArguments_0$LInstantiatedClassDefinition$($this) {
	return $this._typeArguments;
};

InstantiatedClassDefinition.getTypeArguments_0$LInstantiatedClassDefinition$ = InstantiatedClassDefinition$getTypeArguments_0$LInstantiatedClassDefinition$;

InstantiatedClassDefinition.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	throw new Error("logic flaw");
};


function Type() {
};

$__jsx_extend([Type], Object);
Type.prototype.serialize$ = function () {
	return this.toString();
};


function Type$serialize_0$LType$($this) {
	return $this.toString();
};

Type.serialize_0$LType$ = Type$serialize_0$LType$;

Type.prototype.equals$LType$ = function (x) {
	return this == x;
};


function Type$resolveIfNullable_0$LType$($this) {
	return ($this instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this) : $this);
};

Type.resolveIfNullable_0$LType$ = Type$resolveIfNullable_0$LType$;

Type.prototype.asAssignableType$ = function () {
	return this;
};


function Type$templateTypeToString$SALType$(parameterizedTypeName, typeArgs) {
	var s;
	var i;
	var typeArgs$len$0;
	s = parameterizedTypeName + ".<";
	for ((i = 0, typeArgs$len$0 = typeArgs.length); i < typeArgs$len$0; ++ i) {
		if (i !== 0) {
			s += ",";
		}
		s += typeArgs[i].toString();
	}
	s += ">";
	return s;
};

Type.templateTypeToString$SALType$ = Type$templateTypeToString$SALType$;

function Type$isIntegerOrNumber$LType$(type) {
	return type instanceof IntegerType || type instanceof NumberType;
};

Type.isIntegerOrNumber$LType$ = Type$isIntegerOrNumber$LType$;

function Type$calcLeastCommonAncestor$LType$LType$B(type1, type2, acceptVariant) {
	var obj1;
	var obj2;
	var ifaces1;
	var candidates;
	var i;
	var iface;
	var uniquify;
	var $this$0;
	if (type1.equals$LType$(type2)) {
		return type1;
	}
	if ((type1 instanceof IntegerType || type1 instanceof NumberType) && (type2 instanceof IntegerType || type2 instanceof NumberType)) {
		return Type.numberType;
	}
	if (Type.voidType.equals$LType$(type1) || Type.voidType.equals$LType$(type2)) {
		return null;
	}
	if (Type.variantType.equals$LType$(type1) || Type.variantType.equals$LType$(type2)) {
		return Type.variantType;
	}
	if (Type.nullType.equals$LType$(type1)) {
		return (Type.nullType.isConvertibleTo$LType$(type2) ? type2 : new NullableType(type2));
	}
	if (Type.nullType.equals$LType$(type2)) {
		return (Type.nullType.isConvertibleTo$LType$(type1) ? type1 : new NullableType(type1));
	}
	if ((type1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type1) : type1) instanceof PrimitiveType || (type2 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type2) : type2) instanceof PrimitiveType) {
		if ((type1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type1) : type1).equals$LType$(type2 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type2) : type2)) {
			return new NullableType(type1);
		} else {
			if (Type$isIntegerOrNumber$LType$(type1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type1) : type1) && Type$isIntegerOrNumber$LType$(type2 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type2) : type2)) {
				return new NullableType(Type.numberType);
			} else {
				return (acceptVariant ? Type.variantType : null);
			}
		}
	}
	if ((type1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type1) : type1) instanceof ObjectType && (type2 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type2) : type2) instanceof ObjectType) {
		obj1 = (type1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type1) : type1);
		obj2 = (type2 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type2) : type2);
		ifaces1 = [];
		for (; ; ) {
			ifaces1 = ifaces1.concat(ClassDefinition$implementTypes_0$LClassDefinition$(obj1._classDef).map((function (t) {
				return t;
			})));
			if (obj2.isConvertibleTo$LType$(obj1)) {
				break;
			}
			$this$0 = obj1._classDef;
			obj1 = $this$0._extendType;
		}
		if (obj1._classDef.className$() !== "Object") {
			return obj1;
		}
		candidates = [];
		for (i in ifaces1) {
			iface = ifaces1[i];
			do {
				if (obj2.isConvertibleTo$LType$(iface)) {
					candidates.push(iface);
					break;
				}
			} while (iface = ClassDefinition$extendType_0$LClassDefinition$(iface._classDef));
		}
		function uniquify(list) {
			var result;
			var i;
			var j;
			result = [];
			for (i = 0; i < list.length; ++ i) {
				result.push(list[i]);
				for (j = i + 1; j < list.length; ++ j) {
					if (list[i].equals$LType$(list[j])) {
						result.pop();
						break;
					}
				}
			}
			return result;
		}
		candidates = uniquify(candidates);
		switch (candidates.length) {
		case 0:
			return obj1;
		case 1:
			return candidates[0];
		default:
			return null;
		}
	}
	return ((type1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type1) : type1) instanceof FunctionType && (type2 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type2) : type2) instanceof FunctionType ? null : acceptVariant ? Type.variantType : null);
};

Type.calcLeastCommonAncestor$LType$LType$B = Type$calcLeastCommonAncestor$LType$LType$B;

function Type$calcLeastCommonAncestor$ALType$B(types, acceptVariant) {
	var type;
	var i;
	var types$len$0;
	if (types.length === 0) {
		return null;
	}
	type = types[0];
	for ((i = 1, types$len$0 = types.length); i < types$len$0; ++ i) {
		type = Type$calcLeastCommonAncestor$LType$LType$B(type, types[i], acceptVariant);
		if (type == null) {
			return null;
		}
	}
	return type;
};

Type.calcLeastCommonAncestor$ALType$B = Type$calcLeastCommonAncestor$ALType$B;

function VoidType() {
};

$__jsx_extend([VoidType], Type);
VoidType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	return this;
};


VoidType.prototype.isAssignable$ = function () {
	return false;
};


VoidType.prototype.isConvertibleTo$LType$ = function (type) {
	return false;
};


VoidType.prototype.getClassDef$ = function () {
	throw new Error("VoidType#getClassDef() is not supported");
};


VoidType.prototype.toString = function () {
	return "void";
};


function NullType() {
};

$__jsx_extend([NullType], Type);
NullType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	return this;
};


NullType.prototype.isAssignable$ = function () {
	return false;
};


NullType.prototype.isConvertibleTo$LType$ = function (type) {
	return type instanceof NullableType || type instanceof ObjectType || type instanceof VariantType || type instanceof StaticFunctionType;
};


NullType.prototype.getClassDef$ = function () {
	throw new Error("NullType#getClassDef() is not supported");
};


NullType.prototype.toString = function () {
	return "null";
};


function PrimitiveType() {
};

$__jsx_extend([PrimitiveType], Type);
PrimitiveType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	return this;
};


PrimitiveType.prototype.isAssignable$ = function () {
	return true;
};


function BooleanType() {
};

$__jsx_extend([BooleanType], PrimitiveType);
BooleanType.prototype.isConvertibleTo$LType$ = function (type) {
	type = (type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type);
	return type instanceof BooleanType || type instanceof VariantType;
};


BooleanType.prototype.getClassDef$ = function () {
	return BooleanType._classDef;
};


BooleanType.prototype.toString = function () {
	return "boolean";
};


function IntegerType() {
};

$__jsx_extend([IntegerType], PrimitiveType);
IntegerType.prototype.isConvertibleTo$LType$ = function (type) {
	type = (type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type);
	return type instanceof IntegerType || type instanceof NumberType || type instanceof VariantType;
};


IntegerType.prototype.getClassDef$ = function () {
	return NumberType._classDef;
};


IntegerType.prototype.toString = function () {
	return "int";
};


function NumberType() {
};

$__jsx_extend([NumberType], PrimitiveType);
NumberType.prototype.isConvertibleTo$LType$ = function (type) {
	type = (type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type);
	return type instanceof IntegerType || type instanceof NumberType || type instanceof VariantType;
};


NumberType.prototype.getClassDef$ = function () {
	return NumberType._classDef;
};


NumberType.prototype.toString = function () {
	return "number";
};


function StringType() {
};

$__jsx_extend([StringType], PrimitiveType);
StringType.prototype.isConvertibleTo$LType$ = function (type) {
	type = (type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type);
	return type instanceof StringType || type instanceof VariantType;
};


StringType.prototype.getClassDef$ = function () {
	return StringType._classDef;
};


StringType.prototype.toString = function () {
	return "string";
};


function VariantType() {
};

$__jsx_extend([VariantType], Type);
VariantType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	return this;
};


VariantType.prototype.isAssignable$ = function () {
	return true;
};


VariantType.prototype.isConvertibleTo$LType$ = function (type) {
	type = (type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type);
	return type instanceof VariantType;
};


VariantType.prototype.getClassDef$ = function () {
	throw new Error("VariantType#getClassDef() is not supported");
};


VariantType.prototype.toString = function () {
	return "variant";
};


function NullableType(type) {
	this._baseType = null;
	if (type.equals$LType$(Type.variantType)) {
		throw new Error("logic flaw, cannot create Nullable.<variant>");
	}
	this._baseType = (type instanceof NullableType ? type._baseType : type);
};

$__jsx_extend([NullableType], Type);
NullableType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var baseType;
	baseType = Type$resolveIfNullable_0$LType$(this._baseType).instantiate$LInstantiationContext$(instantiationContext);
	return (baseType instanceof PrimitiveType ? new NullableType(baseType) : baseType);
};


NullableType.prototype.equals$LType$ = function (x) {
	return x instanceof NullableType && this._baseType.equals$LType$(x._baseType);
};


NullableType.prototype.isConvertibleTo$LType$ = function (type) {
	return this._baseType.isConvertibleTo$LType$(type instanceof NullableType ? type._baseType : type);
};


NullableType.prototype.isAssignable$ = function () {
	return true;
};


NullableType.prototype.getClassDef$ = function () {
	return this._baseType.getClassDef$();
};


function NullableType$getBaseType_0$LNullableType$($this) {
	return $this._baseType;
};

NullableType.getBaseType_0$LNullableType$ = NullableType$getBaseType_0$LNullableType$;

NullableType.prototype.toString = function () {
	return "Nullable.<" + this._baseType.toString() + ">";
};


function VariableLengthArgumentType(type) {
	this._baseType = null;
	if (type instanceof VariableLengthArgumentType) {
		throw new Error("logic flaw");
	}
	this._baseType = type;
};

$__jsx_extend([VariableLengthArgumentType], Type);
VariableLengthArgumentType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var baseType;
	baseType = this._baseType.instantiate$LInstantiationContext$(instantiationContext);
	return new VariableLengthArgumentType(baseType);
};


VariableLengthArgumentType.prototype.equals$LType$ = function (x) {
	return x instanceof VariableLengthArgumentType && this._baseType.equals$LType$(x._baseType);
};


VariableLengthArgumentType.prototype.isConvertibleTo$LType$ = function (type) {
	throw new Error("logic flaw");
};


VariableLengthArgumentType.prototype.isAssignable$ = function () {
	throw new Error("logic flaw");
};


VariableLengthArgumentType.prototype.getClassDef$ = function () {
	throw new Error("logic flaw");
};


function VariableLengthArgumentType$getBaseType_0$LVariableLengthArgumentType$($this) {
	return $this._baseType;
};

VariableLengthArgumentType.getBaseType_0$LVariableLengthArgumentType$ = VariableLengthArgumentType$getBaseType_0$LVariableLengthArgumentType$;

VariableLengthArgumentType.prototype.toString = function () {
	return "..." + this._baseType.toString();
};


function ObjectType(classDef) {
	this._classDef = classDef;
};

$__jsx_extend([ObjectType], Type);
ObjectType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	throw new Error("logic flaw; ObjectType is created during semantic analysis, after template instantiation");
};


ObjectType.prototype.equals$LType$ = function (x) {
	return (this instanceof ParsedObjectType && x instanceof ParsedObjectType && (this._classDef == null || x._classDef == null) ? this.toString() === x.toString() : x instanceof ObjectType && this._classDef == x._classDef);
};


ObjectType.prototype.resolveType$LAnalysisContext$ = function (context) {
	if (this._classDef == null) {
		throw new Error("logic flaw");
	}
};


ObjectType.prototype.isConvertibleTo$LType$ = function (type) {
	type = (type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type);
	return (type instanceof VariantType ? true : ! (type instanceof ObjectType) ? false : this._classDef == null ? false : ClassDefinition$isConvertibleTo_0$LClassDefinition$LClassDefinition$(this._classDef, type._classDef));
};


ObjectType.prototype.isAssignable$ = function () {
	return true;
};


ObjectType.prototype.getClassDef$ = function () {
	return this._classDef;
};


ObjectType.prototype.toString = function () {
	return (this._classDef != null ? this._classDef.className$() : "(null)");
};


function ParsedObjectType(qualifiedName, typeArgs) {
	ObjectType.call(this, null);
	this._qualifiedName = qualifiedName;
	this._typeArguments = typeArgs;
};

$__jsx_extend([ParsedObjectType], ObjectType);
ParsedObjectType.prototype.getToken$ = function () {
	var $this$0;
	$this$0 = this._qualifiedName;
	return $this$0._token;
};


function ParsedObjectType$getToken_0$LParsedObjectType$($this) {
	var $this$0;
	$this$0 = $this._qualifiedName;
	return $this$0._token;
};

ParsedObjectType.getToken_0$LParsedObjectType$ = ParsedObjectType$getToken_0$LParsedObjectType$;

function ParsedObjectType$getTypeArguments_0$LParsedObjectType$($this) {
	return $this._typeArguments;
};

ParsedObjectType.getTypeArguments_0$LParsedObjectType$ = ParsedObjectType$getTypeArguments_0$LParsedObjectType$;

ParsedObjectType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var enclosingType;
	var actualType;
	var qualifiedName;
	var actualEnclosingType;
	var typeArgs;
	var i;
	var templateClassName;
	var objectType;
	var $this$0;
	var $this$1;
	var $this$2;
	var _typeArguments$0;
	$this$0 = this._qualifiedName;
	enclosingType = $this$0._enclosingType;
	if (enclosingType == null && this._typeArguments.length === 0) {
		actualType = instantiationContext.typemap[Token$getValue_0$LToken$(QualifiedName$getToken_0$LQualifiedName$(this._qualifiedName))];
		if (actualType != null) {
			return actualType;
		}
		if (this._classDef == null) {
			instantiationContext.objectTypesUsed.push(this);
		}
		return this;
	}
	qualifiedName = this._qualifiedName;
	if (enclosingType != null) {
		actualEnclosingType = QualifiedName$getEnclosingType_0$LQualifiedName$(this._qualifiedName).instantiate$LInstantiationContext$(instantiationContext);
		if (! QualifiedName$getEnclosingType_0$LQualifiedName$(this._qualifiedName).equals$LType$(actualEnclosingType)) {
			qualifiedName = new QualifiedName$1(QualifiedName$getToken_0$LQualifiedName$(this._qualifiedName), actualEnclosingType);
		}
	}
	typeArgs = [];
	for (i = 0; i < this._typeArguments.length; ++ i) {
		if ((_typeArguments$0 = this._typeArguments)[i] instanceof ParsedObjectType && ParsedObjectType$getTypeArguments_0$LParsedObjectType$(_typeArguments$0[i]).length !== 0) {
			actualType = this._typeArguments[i].instantiate$LInstantiationContext$(instantiationContext);
		} else {
			actualType = instantiationContext.typemap[this._typeArguments[i].toString()];
		}
		typeArgs[i] = (actualType != null ? actualType : this._typeArguments[i]);
		if (typeArgs[i] instanceof NullableType) {
			$this$1 = qualifiedName._token;
			templateClassName = $this$1._value;
			if (templateClassName === "Array" || templateClassName === "Map") {
				$this$2 = typeArgs[i];
				typeArgs[i] = $this$2._baseType;
			}
		}
	}
	objectType = new ParsedObjectType(qualifiedName, typeArgs);
	instantiationContext.objectTypesUsed.push(objectType);
	return objectType;
};


ParsedObjectType.prototype.resolveType$LAnalysisContext$ = function (context) {
	if (this._classDef == null) {
		this._classDef = QualifiedName$getClass_0$LQualifiedName$LAnalysisContext$ALType$(this._qualifiedName, context, this._typeArguments);
	}
};


ParsedObjectType.prototype.toString = function () {
	return (this._typeArguments.length !== 0 ? Type$templateTypeToString$SALType$(Token$getValue_0$LToken$(QualifiedName$getToken_0$LQualifiedName$(this._qualifiedName)), this._typeArguments) : Token$getValue_0$LToken$(QualifiedName$getToken_0$LQualifiedName$(this._qualifiedName)));
};


function FunctionType() {
};

$__jsx_extend([FunctionType], Type);
FunctionType.prototype.isConvertibleTo$LType$ = function (type) {
	return false;
};


FunctionType.prototype.getClassDef$ = function () {
	return FunctionType._classDef;
};


FunctionType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	throw new Error("logic flaw");
};


function FunctionChoiceType(types) {
	this._types = types;
};

$__jsx_extend([FunctionChoiceType], FunctionType);
FunctionChoiceType.prototype.isAssignable$ = function () {
	return false;
};


FunctionChoiceType.prototype.asAssignableType$ = function () {
	throw new Error("logic flaw");
};


FunctionChoiceType.prototype.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B = function (context, operatorToken, argTypes, isStatic) {
	var types;
	var i;
	var matched;
	var notes;
	var errors$0;
	types = this._types;
	for (i = 0; i < types.length; ++ i) {
		if (ResolvedFunctionType$_deduceByArgumentTypes_0$LResolvedFunctionType$LToken$ALType$BBALCompileNote$(types[i], ResolvedFunctionType$getToken_0$LResolvedFunctionType$(types[i]), argTypes, isStatic, true, [  ])) {
			return types[i];
		}
	}
	matched = [];
	notes = [];
	for (i = 0; i < types.length; ++ i) {
		if (ResolvedFunctionType$_deduceByArgumentTypes_0$LResolvedFunctionType$LToken$ALType$BBALCompileNote$(types[i], ResolvedFunctionType$getToken_0$LResolvedFunctionType$(types[i]), argTypes, isStatic, false, notes)) {
			matched.push(types[i]);
		}
	}
	switch (matched.length) {
	case 0:
		context.errors.push(new CompileError(operatorToken, (operatorToken._value === "[" ? "operator [] of type " + argTypes[0].toString() + " is not applicable to " + this.getObjectType$().toString() : "no function with matching arguments")));
		break;
	case 1:
		return matched[0];
	default:
		context.errors.push(new CompileError(operatorToken, "result of function resolution using the arguments is ambiguous"));
		break;
	}
	CompileError$addCompileNotes_0$LCompileError$ALCompileNote$((errors$0 = context.errors)[errors$0.length - 1], notes);
	return null;
};


FunctionChoiceType.prototype.getExpectedTypes$NB = function (numberOfArgs, isStatic) {
	var expected;
	var i;
	expected = [];
	for (i = 0; i < this._types.length; ++ i) {
		ResolvedFunctionType$_getExpectedTypes_0$LResolvedFunctionType$AALType$NB(this._types[i], expected, numberOfArgs, isStatic);
	}
	return expected;
};


FunctionChoiceType.prototype.toString = function () {
	return (this._types.length === 1 ? this._types[0].toString() : "<<multiple choices>>");
};


FunctionChoiceType.prototype.getObjectType$ = function () {
	throw new Error("logic flaw");
};


function ResolvedFunctionType() {
};

$__jsx_extend([ResolvedFunctionType], FunctionType);
ResolvedFunctionType.prototype.isAssignable$ = function () {
	return this._isAssignable;
};


ResolvedFunctionType.prototype.asAssignableType$ = function () {
	var $this$0;
	$this$0 = this._clone$();
	$this$0._isAssignable = true;
	return $this$0;
};


ResolvedFunctionType.prototype.getToken$ = function () {
	return this._token;
};


function ResolvedFunctionType$getToken_0$LResolvedFunctionType$($this) {
	return $this._token;
};

ResolvedFunctionType.getToken_0$LResolvedFunctionType$ = ResolvedFunctionType$getToken_0$LResolvedFunctionType$;

function ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$($this) {
	return $this._returnType;
};

ResolvedFunctionType.getReturnType_0$LResolvedFunctionType$ = ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$;

function ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$($this) {
	return $this._argTypes;
};

ResolvedFunctionType.getArgumentTypes_0$LResolvedFunctionType$ = ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$;

ResolvedFunctionType.prototype.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B = function (context, operatorToken, argTypes, isStatic) {
	var notes;
	var error;
	notes = [];
	if (! ResolvedFunctionType$_deduceByArgumentTypes_0$LResolvedFunctionType$LToken$ALType$BBALCompileNote$(this, this._token != null ? this._token : operatorToken, argTypes, isStatic, false, notes)) {
		error = new CompileError(operatorToken, (operatorToken._value === "[" ? "operator [] of type " + argTypes[0].toString() + " is not applicable to " + this.getObjectType$().toString() : "no function with matching arguments"));
		CompileError$addCompileNotes_0$LCompileError$ALCompileNote$(error, notes);
		context.errors.push(error);
		return null;
	}
	return this;
};


function ResolvedFunctionType$_deduceByArgumentTypes_0$LResolvedFunctionType$LToken$ALType$BBALCompileNote$($this, token, argTypes, isStatic, exact, notes) {
	var compareArg;
	var vargType;
	var i;
	var _argTypes$0;
	var _argTypes$1;
	compareArg = (function (formal, actual) {
		return (formal.equals$LType$(actual) ? true : ! exact && actual.isConvertibleTo$LType$(formal) ? true : false);
	});
	if ($this instanceof StaticFunctionType !== isStatic) {
		if (isStatic) {
			notes.push(new CompileNote(token, 'candidate function not viable: expected a static function, but got a member function'));
		} else {
			notes.push(new CompileNote(token, 'candidate function not viable: expected a member function, but got a static function'));
		}
		return false;
	}
	if ((_argTypes$1 = $this._argTypes).length !== 0 && _argTypes$1[_argTypes$1.length - 1] instanceof VariableLengthArgumentType) {
		vargType = (_argTypes$0 = $this._argTypes)[_argTypes$0.length - 1];
		if (argTypes.length < _argTypes$0.length - 1) {
			notes.push(new CompileNote(token, 'candidate function not viable: wrong number of arguments'));
			return false;
		}
		for (i = 0; i < $this._argTypes.length - 1; ++ i) {
			if (! compareArg($this._argTypes[i], argTypes[i])) {
				notes.push(new CompileNote(token, Util$format$SAS('candidate function not viable: no known conversion from %1 to %2 for %3 argument.', [ argTypes[i].toString(), $this._argTypes[i].toString(), Util$toOrdinal$N(i + 1) ])));
				return false;
			}
		}
		if (argTypes[i] instanceof VariableLengthArgumentType && argTypes.length === $this._argTypes.length) {
			if (! compareArg(VariableLengthArgumentType$getBaseType_0$LVariableLengthArgumentType$($this._argTypes[i]), VariableLengthArgumentType$getBaseType_0$LVariableLengthArgumentType$(argTypes[i]))) {
				notes.push(new CompileNote(token, Util$format$SAS('candidate function not viable: no known conversion from %1 to %2 for %3 argument.', [ VariableLengthArgumentType$getBaseType_0$LVariableLengthArgumentType$(argTypes[i]).toString(), VariableLengthArgumentType$getBaseType_0$LVariableLengthArgumentType$($this._argTypes[i]).toString(), Util$toOrdinal$N(i + 1) ])));
				return false;
			}
		} else {
			for (; i < argTypes.length; ++ i) {
				if (! compareArg(vargType._baseType, argTypes[i])) {
					notes.push(new CompileNote(token, Util$format$SAS('candidate function not viable: no known conversion from %1 to %2 for %3 argument.', [ argTypes[i].toString(), vargType._baseType.toString(), Util$toOrdinal$N(i + 1) ])));
					return false;
				}
			}
		}
	} else {
		if (argTypes.length !== $this._argTypes.length) {
			notes.push(new CompileNote(token, Util$format$SAS('candidate function not viable: wrong number of arguments (%1 for %2)', [ argTypes.length + "", $this._argTypes.length + "" ])));
			return false;
		}
		for (i = 0; i < argTypes.length; ++ i) {
			if (! compareArg($this._argTypes[i], argTypes[i])) {
				notes.push(new CompileNote(token, Util$format$SAS('candidate function not viable: no known conversion from %1 to %2 for %3 argument.', [ argTypes[i].toString(), $this._argTypes[i].toString(), Util$toOrdinal$N(i + 1) ])));
				return false;
			}
		}
	}
	return true;
};

ResolvedFunctionType._deduceByArgumentTypes_0$LResolvedFunctionType$LToken$ALType$BBALCompileNote$ = ResolvedFunctionType$_deduceByArgumentTypes_0$LResolvedFunctionType$LToken$ALType$BBALCompileNote$;

ResolvedFunctionType.prototype.getExpectedTypes$NB = function (numberOfArgs, isStatic) {
	var expected;
	expected = [];
	ResolvedFunctionType$_getExpectedTypes_0$LResolvedFunctionType$AALType$NB(this, expected, numberOfArgs, isStatic);
	return expected;
};


function ResolvedFunctionType$_getExpectedTypes_0$LResolvedFunctionType$AALType$NB($this, expected, numberOfArgs, isStatic) {
	var argTypes;
	var i;
	var hasCallback;
	var callbackArgTypes;
	var $this$0;
	var _argTypes$0;
	var _argTypes$1;
	if ($this instanceof StaticFunctionType !== isStatic) {
		return;
	}
	argTypes = [];
	if ((_argTypes$1 = $this._argTypes).length > 0 && numberOfArgs >= _argTypes$1.length && _argTypes$1[_argTypes$1.length - 1] instanceof VariableLengthArgumentType) {
		for (i = 0; i < numberOfArgs; ++ i) {
			if (i < $this._argTypes.length - 1) {
				argTypes[i] = $this._argTypes[i];
			} else {
				$this$0 = (_argTypes$0 = $this._argTypes)[_argTypes$0.length - 1];
				argTypes[i] = $this$0._baseType;
			}
		}
	} else {
		if ($this._argTypes.length === numberOfArgs) {
			argTypes = $this._argTypes;
		} else {
			return;
		}
	}
	hasCallback = false;
	callbackArgTypes = argTypes.map((function (argType) {
		var typeName;
		typeName = '';
		if (argType instanceof StaticFunctionType || argType instanceof ObjectType && argType.getClassDef$() instanceof InstantiatedClassDefinition && ((typeName = InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(argType.getClassDef$())) === 'Array' || typeName === 'Map')) {
			hasCallback = true;
			return argType;
		} else {
			return null;
		}
	}));
	if (hasCallback) {
		expected.push(callbackArgTypes);
	}
};

ResolvedFunctionType._getExpectedTypes_0$LResolvedFunctionType$AALType$NB = ResolvedFunctionType$_getExpectedTypes_0$LResolvedFunctionType$AALType$NB;

ResolvedFunctionType.prototype.toString = function () {
	var args;
	var i;
	args = [];
	for (i = 0; i < this._argTypes.length; ++ i) {
		if (this._argTypes[i] instanceof VariableLengthArgumentType) {
			args[i] = "... : " + VariableLengthArgumentType$getBaseType_0$LVariableLengthArgumentType$(this._argTypes[i]).toString();
		} else {
			args[i] = ": " + this._argTypes[i].toString();
		}
	}
	return this._toStringPrefix$() + "function (" + args.join(", ") + ") : " + this._returnType.toString();
};


ResolvedFunctionType.prototype.getObjectType$ = function () {
	throw new Error("logic flaw");
};


function StaticFunctionType(token, returnType, argTypes, isAssignable) {
	this._token = token;
	this._returnType = returnType;
	this._argTypes = argTypes;
	this._isAssignable = isAssignable;
};

$__jsx_extend([StaticFunctionType], ResolvedFunctionType);
StaticFunctionType.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var returnType;
	var argTypes;
	var i;
	returnType = this._returnType.instantiate$LInstantiationContext$(instantiationContext);
	if (returnType == null) {
		return null;
	}
	argTypes = [];
	for (i = 0; i < this._argTypes.length; ++ i) {
		if ((argTypes[i] = this._argTypes[i].instantiate$LInstantiationContext$(instantiationContext)) == null) {
			return null;
		}
	}
	return new StaticFunctionType(this._token, returnType, argTypes, this._isAssignable);
};


StaticFunctionType.prototype.equals$LType$ = function (x) {
	return x instanceof StaticFunctionType && this._returnType.equals$LType$(x._returnType) && Util$typesAreEqual$ALType$ALType$(this._argTypes, x._argTypes);
};


StaticFunctionType.prototype._clone$ = function () {
	return new StaticFunctionType(this._token, this._returnType, this._argTypes, this._isAssignable);
};


StaticFunctionType.prototype.isConvertibleTo$LType$ = function (type) {
	type = (type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type);
	return (type instanceof VariantType ? true : ! (type instanceof StaticFunctionType) ? false : ! this._returnType.equals$LType$(ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(type)) ? false : ResolvedFunctionType$_deduceByArgumentTypes_0$LResolvedFunctionType$LToken$ALType$BBALCompileNote$(this, ResolvedFunctionType$getToken_0$LResolvedFunctionType$(type), ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(type), true, true, [  ]));
};


StaticFunctionType.prototype._toStringPrefix$ = function () {
	return "";
};


StaticFunctionType.prototype.getObjectType$ = function () {
	throw new Error("logic flaw");
};


function MemberFunctionType(token, objectType, returnType, argTypes, isAssignable) {
	this._token = token;
	this._returnType = returnType;
	this._argTypes = argTypes;
	this._isAssignable = isAssignable;
	this._objectType = objectType;
};

$__jsx_extend([MemberFunctionType], ResolvedFunctionType);
MemberFunctionType.prototype.equals$LType$ = function (x) {
	return x instanceof MemberFunctionType && this._objectType == x._objectType && this._returnType.equals$LType$(x._returnType) && Util$typesAreEqual$ALType$ALType$(this._argTypes, x._argTypes);
};


MemberFunctionType.prototype._clone$ = function () {
	return new MemberFunctionType(this._token, this._objectType, this._returnType, this._argTypes, this._isAssignable);
};


MemberFunctionType.prototype._toStringPrefix$ = function () {
	return this._objectType.toString() + ".";
};


MemberFunctionType.prototype.getObjectType$ = function () {
	return this._objectType;
};


function CompletionRequest() {
};

$__jsx_extend([CompletionRequest], Object);
function CompletionRequest$getColumnOffset_0$LCompletionRequest$($this) {
	return $this._columnOffest;
};

CompletionRequest.getColumnOffset_0$LCompletionRequest$ = CompletionRequest$getColumnOffset_0$LCompletionRequest$;

function CompletionRequest$isInRange_0$LCompletionRequest$NNN($this, lineNumber, columnOffset, length) {
	return (lineNumber !== $this._lineNumber ? -1 : columnOffset <= $this._columnOffest && $this._columnOffest <= columnOffset + length ? $this._columnOffest - columnOffset : -1);
};

CompletionRequest.isInRange_0$LCompletionRequest$NNN = CompletionRequest$isInRange_0$LCompletionRequest$NNN;

function CompletionCandidates() {
};

$__jsx_extend([CompletionCandidates], Object);
CompletionCandidates.prototype.getPrefix$ = function () {
	return this._prefix;
};


function KeywordCompletionCandidate(expected) {
	this._prefix = null;
	this._expected = expected;
};

$__jsx_extend([KeywordCompletionCandidate], CompletionCandidates);
function CompletionCandidatesOfTopLevel(parser, autoCompleteMatchCb) {
	this._prefix = null;
	this._parser = parser;
	this._autoCompleteMatchCb = autoCompleteMatchCb;
};

$__jsx_extend([CompletionCandidatesOfTopLevel], CompletionCandidates);
function _CompletionCandidatesWithLocal(parser) {
	var $this = this;
	CompletionCandidatesOfTopLevel.call(this, parser, null);
	this._locals = [];
	Parser$_forEachScope_0$LParser$F$LLocalVariable$ALLocalVariable$ALArgumentDeclaration$B$(parser, (function (funcName, locals, args) {
		var i;
		if (funcName != null) {
			$this._locals = $this._locals.concat([ funcName ]);
		}
		$this._locals = $this._locals.concat(locals);
		for (i in args) {
			$this._locals.push(args[i]);
		}
		return true;
	}));
};

$__jsx_extend([_CompletionCandidatesWithLocal], CompletionCandidatesOfTopLevel);
function _CompletionCandidatesOfNamespace(imprt, autoCompleteMatchCb) {
	this._prefix = null;
	this._import = imprt;
	this._autoCompleteMatchCb = autoCompleteMatchCb;
};

$__jsx_extend([_CompletionCandidatesOfNamespace], CompletionCandidates);
function _CompletionCandidatesOfProperty(expr) {
	this._prefix = null;
	this._expr = expr;
};

$__jsx_extend([_CompletionCandidatesOfProperty], CompletionCandidates);
function _StatementTransformer(transformer, identifier) {
	this._id = 0;
	this._transformer = transformer;
	if (_StatementTransformer._statementCountMap[identifier] == null) {
		_StatementTransformer._statementCountMap[identifier] = 0;
	}
	this._id = _StatementTransformer._statementCountMap[identifier]++;
};

$__jsx_extend([_StatementTransformer], Object);
function _StatementTransformer$getID_0$L_StatementTransformer$($this) {
	return $this._id;
};

_StatementTransformer.getID_0$L_StatementTransformer$ = _StatementTransformer$getID_0$L_StatementTransformer$;

function _ConstructorInvocationStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "CONSTRUCTOR-INVOCATION");
	this._statement = statement;
};

$__jsx_extend([_ConstructorInvocationStatementTransformer], _StatementTransformer);
_ConstructorInvocationStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_ConstructorInvocationStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	return [ this._statement ];
};


function _ExpressionStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "EXPRESSION");
	this._statement = statement;
};

$__jsx_extend([_ExpressionStatementTransformer], _StatementTransformer);
_ExpressionStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_ExpressionStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	return [ this._statement ];
};


function _FunctionStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "FUNCTION");
	this._statement = statement;
};

$__jsx_extend([_FunctionStatementTransformer], _StatementTransformer);
_FunctionStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_FunctionStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	return [ this._statement ];
};


function _ReturnStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "RETURN");
	this._statement = statement;
};

$__jsx_extend([_ReturnStatementTransformer], _StatementTransformer);
_ReturnStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_ReturnStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	throw new Error("logic flaw");
};


function _YieldStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "YIELD");
	this._index = 0;
	this._statement = statement;
};

$__jsx_extend([_YieldStatementTransformer], _StatementTransformer);
_YieldStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_YieldStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	var statements;
	var label;
	statements = [];
	statements.push(this._statement);
	label = "$YIELD_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(label));
	statements.push(new LabelStatement(label));
	return statements;
};


function _DeleteStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "DELETE");
	this._statement = statement;
};

$__jsx_extend([_DeleteStatementTransformer], _StatementTransformer);
_DeleteStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_DeleteStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	return [ this._statement ];
};


function _BreakStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "BREAK");
	this._statement = statement;
};

$__jsx_extend([_BreakStatementTransformer], _StatementTransformer);
_BreakStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_BreakStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	var trans;
	var $this$0;
	var _labelMap$0;
	if (JumpStatement$getLabel_0$LJumpStatement$(this._statement) != null) {
		trans = CodeTransformer$findLabellableStatementTransformerByLabel_0$LCodeTransformer$S(this._transformer, Token$getValue_0$LToken$(JumpStatement$getLabel_0$LJumpStatement$(this._statement)));
	} else {
		$this$0 = this._transformer;
		trans = (_labelMap$0 = $this$0._labelMap)[_labelMap$0.length - 1];
	}
	return [ new GotoStatement(trans.getBreakingLabel$()) ];
};


function _ContinueStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "CONTINUE");
	this._statement = statement;
};

$__jsx_extend([_ContinueStatementTransformer], _StatementTransformer);
_ContinueStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_ContinueStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	var trans;
	var $this$0;
	var _labelMap$0;
	if (JumpStatement$getLabel_0$LJumpStatement$(this._statement) != null) {
		trans = CodeTransformer$findLabellableStatementTransformerByLabel_0$LCodeTransformer$S(this._transformer, Token$getValue_0$LToken$(JumpStatement$getLabel_0$LJumpStatement$(this._statement)));
	} else {
		$this$0 = this._transformer;
		trans = (_labelMap$0 = $this$0._labelMap)[_labelMap$0.length - 1];
	}
	return [ new GotoStatement(trans.getContinuingLabel$()) ];
};


function _LabellableStatementTransformer(transformer, identifier) {
	_StatementTransformer.call(this, transformer, identifier);
};

$__jsx_extend([_LabellableStatementTransformer], _StatementTransformer);
function _DoWhileStatementTransformer(transformer, statement) {
	_LabellableStatementTransformer.call(this, transformer, "DO-WHILE");
	this._index = 0;
	this._statement = statement;
};

$__jsx_extend([_DoWhileStatementTransformer], _LabellableStatementTransformer);
_DoWhileStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_DoWhileStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	var statements;
	var bodyLabel;
	var testLabel;
	var endLabel;
	var $this$0;
	var $this$1;
	var expr$0;
	var $this$3;
	statements = [];
	bodyLabel = "$BODY_DO_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(bodyLabel));
	statements.push(new LabelStatement(bodyLabel));
	$this$0 = this._transformer;
	$this$0._labelMap.push(this);
	CodeTransformer$convertAndPushStatements_0$LCodeTransformer$ALStatement$ALStatement$(this._transformer, this._statement.getStatements$(), statements);
	$this$1 = this._transformer;
	$this$1._labelMap.pop();
	testLabel = "$TEST_DO_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(testLabel));
	statements.push(new LabelStatement(testLabel));
	endLabel = "$END_DO_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	$this$3 = this._statement;
	expr$0 = $this$3._expr;
	statements.push(new IfStatement(new Token$0("if", false), expr$0, [ new GotoStatement(bodyLabel) ], [ new GotoStatement(endLabel) ]));
	statements.push(new LabelStatement(endLabel));
	return statements;
};


_DoWhileStatementTransformer.prototype.getBreakingLabel$ = function () {
	return "$END_DO_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
};


_DoWhileStatementTransformer.prototype.getContinuingLabel$ = function () {
	return "$BODY_DO_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
};


function _ForInStatementTransformer(transformer, statement) {
	_LabellableStatementTransformer.call(this, transformer, "FOR-IN");
	this._statement = statement;
};

$__jsx_extend([_ForInStatementTransformer], _LabellableStatementTransformer);
_ForInStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_ForInStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	throw new Error("logic flaw");
};


_ForInStatementTransformer.prototype.getBreakingLabel$ = function () {
	throw new Error("logic flaw");
};


_ForInStatementTransformer.prototype.getContinuingLabel$ = function () {
	throw new Error("logic flaw");
};


function _ForStatementTransformer(transformer, statement) {
	_LabellableStatementTransformer.call(this, transformer, "FOR");
	this._index = 0;
	this._statement = statement;
};

$__jsx_extend([_ForStatementTransformer], _LabellableStatementTransformer);
_ForStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_ForStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	var statements;
	var initLabel;
	var testLabel;
	var bodyLabel;
	var endLabel;
	var postLabel;
	var expr$0;
	var expr$1;
	var $this$2;
	var $this$3;
	var expr$2;
	var $this$5;
	var $this$6;
	var $this$7;
	statements = [];
	initLabel = "$INIT_FOR_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(initLabel));
	statements.push(new LabelStatement(initLabel));
	$this$5 = this._statement;
	expr$0 = $this$5._initExpr;
	statements.push(new ExpressionStatement(expr$0));
	testLabel = "$TEST_FOR_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(testLabel));
	statements.push(new LabelStatement(testLabel));
	bodyLabel = "$BODY_FOR_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	endLabel = "$END_FOR_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	$this$6 = this._statement;
	expr$1 = $this$6._condExpr;
	statements.push(new IfStatement(new Token$0("if", false), expr$1, [ new GotoStatement(bodyLabel) ], [ new GotoStatement(endLabel) ]));
	statements.push(new LabelStatement(bodyLabel));
	$this$2 = this._transformer;
	$this$2._labelMap.push(this);
	CodeTransformer$convertAndPushStatements_0$LCodeTransformer$ALStatement$ALStatement$(this._transformer, this._statement.getStatements$(), statements);
	$this$3 = this._transformer;
	$this$3._labelMap.pop();
	postLabel = "$POST_FOR_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(postLabel));
	statements.push(new LabelStatement(postLabel));
	$this$7 = this._statement;
	expr$2 = $this$7._postExpr;
	statements.push(new ExpressionStatement(expr$2));
	statements.push(new GotoStatement(testLabel));
	statements.push(new LabelStatement(endLabel));
	return statements;
};


_ForStatementTransformer.prototype.getBreakingLabel$ = function () {
	return "$END_FOR_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
};


_ForStatementTransformer.prototype.getContinuingLabel$ = function () {
	return "$POST_FOR_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
};


function _IfStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "IF");
	this._statement = statement;
};

$__jsx_extend([_IfStatementTransformer], _StatementTransformer);
_IfStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_IfStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	var statements;
	var testLabel;
	var succLabel;
	var failLabel;
	var endLabel;
	var expr$0;
	var $this$1;
	statements = [];
	testLabel = "$TEST_IF_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	succLabel = "$SUCC_IF_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	failLabel = "$FAIL_IF_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(testLabel));
	statements.push(new LabelStatement(testLabel));
	$this$1 = this._statement;
	expr$0 = $this$1._expr;
	statements.push(new IfStatement(new Token$0("if", false), expr$0, [ new GotoStatement(succLabel) ], [ new GotoStatement(failLabel) ]));
	statements.push(new LabelStatement(succLabel));
	CodeTransformer$convertAndPushStatements_0$LCodeTransformer$ALStatement$ALStatement$(this._transformer, IfStatement$getOnTrueStatements_0$LIfStatement$(this._statement), statements);
	endLabel = "$END_IF_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(endLabel));
	statements.push(new LabelStatement(failLabel));
	CodeTransformer$convertAndPushStatements_0$LCodeTransformer$ALStatement$ALStatement$(this._transformer, IfStatement$getOnFalseStatements_0$LIfStatement$(this._statement), statements);
	statements.push(new GotoStatement(endLabel));
	statements.push(new LabelStatement(endLabel));
	return statements;
};


function _SwitchStatementTransformer(transformer, statement) {
	_LabellableStatementTransformer.call(this, transformer, "SWITCH");
	this._index = 0;
	this._statement = statement;
};

$__jsx_extend([_SwitchStatementTransformer], _LabellableStatementTransformer);
_SwitchStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_SwitchStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	var statements;
	var testLabel;
	var endLabel;
	statements = [];
	testLabel = "$TEST_SWITCH_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(testLabel));
	statements.push(new LabelStatement(testLabel));
	_SwitchStatementTransformer$_pushConditionalSwitch_0$L_SwitchStatementTransformer$ALStatement$(this, statements);
	endLabel = "$END_SWITCH_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(endLabel));
	_SwitchStatementTransformer$_pushSwitchBody_0$L_SwitchStatementTransformer$ALStatement$(this, statements);
	statements.push(new LabelStatement(endLabel));
	return statements;
};


function _SwitchStatementTransformer$_pushConditionalSwitch_0$L_SwitchStatementTransformer$ALStatement$($this, output) {
	var statements;
	var switchCases;
	var i;
	var stmt;
	var condSwitch;
	var $this$0;
	$this$0 = $this._statement;
	statements = $this$0._statements;
	switchCases = [];
	for (i = 0; i < statements.length; ++ i) {
		stmt = statements[i];
		if (stmt instanceof CaseStatement) {
			switchCases.push(stmt);
			switchCases.push(new GotoStatement(_SwitchStatementTransformer$_getLabelFromCaseStatement_0$L_SwitchStatementTransformer$LCaseStatement$($this, stmt)));
			switchCases.push(new ReturnStatement(new Token$0("return", false), null));
		} else {
			if (stmt instanceof DefaultStatement) {
				switchCases.push(stmt);
				switchCases.push(new GotoStatement("$SWITCH_" + ($this._id + "") + "_DEFAULT"));
				switchCases.push(new ReturnStatement(new Token$0("return", false), null));
			}
		}
	}
	condSwitch = $this._statement.clone$();
	condSwitch._statements = switchCases;
	output.push(condSwitch);
};

_SwitchStatementTransformer._pushConditionalSwitch_0$L_SwitchStatementTransformer$ALStatement$ = _SwitchStatementTransformer$_pushConditionalSwitch_0$L_SwitchStatementTransformer$ALStatement$;

function _SwitchStatementTransformer$_pushSwitchBody_0$L_SwitchStatementTransformer$ALStatement$($this, output) {
	var statements;
	var i;
	var stmt;
	var label;
	var $this$0;
	var $this$1;
	var caseStmt$0;
	var $this$2;
	$this$0 = $this._statement;
	statements = $this$0._statements;
	$this$1 = $this._transformer;
	$this$1._labelMap.push($this);
	for (i = 0; i < statements.length; ++ i) {
		stmt = statements[i];
		if (stmt instanceof CaseStatement) {
			caseStmt$0 = stmt;
			label = "$SWITCH_" + ($this._id + "") + "_CASE_" + Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(caseStmt$0._expr));
			output.push(new GotoStatement(label));
			output.push(new LabelStatement(label));
		} else {
			if (stmt instanceof DefaultStatement) {
				label = "$SWITCH_" + ($this._id + "") + "_DEFAULT";
				output.push(new GotoStatement(label));
				output.push(new LabelStatement(label));
			} else {
				CodeTransformer$convertAndPushStatement_0$LCodeTransformer$LStatement$ALStatement$($this._transformer, stmt, output);
			}
		}
	}
	$this$2 = $this._transformer;
	$this$2._labelMap.pop();
};

_SwitchStatementTransformer._pushSwitchBody_0$L_SwitchStatementTransformer$ALStatement$ = _SwitchStatementTransformer$_pushSwitchBody_0$L_SwitchStatementTransformer$ALStatement$;

function _SwitchStatementTransformer$_getLabelFromCaseStatement_0$L_SwitchStatementTransformer$LCaseStatement$($this, caseStmt) {
	return "$SWITCH_" + ($this._id + "") + "_CASE_" + Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(caseStmt._expr));
};

_SwitchStatementTransformer._getLabelFromCaseStatement_0$L_SwitchStatementTransformer$LCaseStatement$ = _SwitchStatementTransformer$_getLabelFromCaseStatement_0$L_SwitchStatementTransformer$LCaseStatement$;

_SwitchStatementTransformer.prototype.getBreakingLabel$ = function () {
	return "$END_SWITCH_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
};


_SwitchStatementTransformer.prototype.getContinuingLabel$ = function () {
	throw new Error("logic flaw");
};


function _CaseStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "CASE");
	this._statement = statement;
};

$__jsx_extend([_CaseStatementTransformer], _StatementTransformer);
_CaseStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_CaseStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	throw new Error("logic flaw");
};


function _DefaultStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "DEFAULT");
	this._statement = statement;
};

$__jsx_extend([_DefaultStatementTransformer], _StatementTransformer);
_DefaultStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_DefaultStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	throw new Error("logic flaw");
};


function _WhileStatementTransformer(transformer, statement) {
	_LabellableStatementTransformer.call(this, transformer, "WHILE");
	this._statement = statement;
};

$__jsx_extend([_WhileStatementTransformer], _LabellableStatementTransformer);
_WhileStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_WhileStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	var statements;
	var testLabel;
	var bodyLabel;
	var endLabel;
	var expr$0;
	var $this$1;
	var $this$2;
	var $this$3;
	statements = [];
	testLabel = "$TEST_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	statements.push(new GotoStatement(testLabel));
	statements.push(new LabelStatement(testLabel));
	bodyLabel = "$BODY_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	endLabel = "$END_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
	$this$3 = this._statement;
	expr$0 = $this$3._expr;
	statements.push(new IfStatement(new Token$0("if", false), expr$0, [ new GotoStatement(bodyLabel) ], [ new GotoStatement(endLabel) ]));
	statements.push(new LabelStatement(bodyLabel));
	$this$1 = this._transformer;
	$this$1._labelMap.push(this);
	CodeTransformer$convertAndPushStatements_0$LCodeTransformer$ALStatement$ALStatement$(this._transformer, this._statement.getStatements$(), statements);
	$this$2 = this._transformer;
	$this$2._labelMap.pop();
	statements.push(new GotoStatement(testLabel));
	statements.push(new LabelStatement(endLabel));
	return statements;
};


_WhileStatementTransformer.prototype.getBreakingLabel$ = function () {
	return "$END_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
};


_WhileStatementTransformer.prototype.getContinuingLabel$ = function () {
	return "$TEST_WHILE_" + (_StatementTransformer$getID_0$L_StatementTransformer$(this) + "");
};


function _TryStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "TRY");
	this._statement = statement;
};

$__jsx_extend([_TryStatementTransformer], _StatementTransformer);
_TryStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_TryStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	throw new Error("logic flaw");
};


function _CatchStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "CATCH");
	this._statement = statement;
};

$__jsx_extend([_CatchStatementTransformer], _StatementTransformer);
_CatchStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_CatchStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	throw new Error("logic flaw");
};


function _ThrowStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "THROW");
	this._statement = statement;
};

$__jsx_extend([_ThrowStatementTransformer], _StatementTransformer);
_ThrowStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_ThrowStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	return [ this._statement ];
};


function _AssertStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "ASSERT");
	this._statement = statement;
};

$__jsx_extend([_AssertStatementTransformer], _StatementTransformer);
_AssertStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_AssertStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	return [ this._statement ];
};


function _LogStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "LOG");
	this._statement = statement;
};

$__jsx_extend([_LogStatementTransformer], _StatementTransformer);
_LogStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_LogStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	return [ this._statement ];
};


function _DebuggerStatementTransformer(transformer, statement) {
	_StatementTransformer.call(this, transformer, "DEBUGGER");
	this._statement = statement;
};

$__jsx_extend([_DebuggerStatementTransformer], _StatementTransformer);
_DebuggerStatementTransformer.prototype.getStatement$ = function () {
	return this._statement;
};


_DebuggerStatementTransformer.prototype.replaceControlStructuresWithGotos$ = function () {
	return [ this._statement ];
};


function CodeTransformer() {
	this._labelMap = [];
	this._statementIDs = {};
};

$__jsx_extend([CodeTransformer], Object);
function CodeTransformer$findLabellableStatementTransformerByLabel_0$LCodeTransformer$S($this, label) {
	var i;
	var trans;
	for (i = 0; $this._labelMap.length; ++ i) {
		trans = $this._labelMap[i];
		if (Token$getValue_0$LToken$(LabellableStatement$getLabel_0$LLabellableStatement$(trans.getStatement$())) === label) {
			return trans;
		}
	}
	throw new Error("fatal error: no corresponding transformer for label \"" + label + "\"");
};

CodeTransformer.findLabellableStatementTransformerByLabel_0$LCodeTransformer$S = CodeTransformer$findLabellableStatementTransformerByLabel_0$LCodeTransformer$S;

function CodeTransformer$convertAndPushStatement_0$LCodeTransformer$LStatement$ALStatement$($this, input, output) {
	var conved;
	var i;
	conved = CodeTransformer$_getStatementTransformerFor_0$LCodeTransformer$LStatement$($this, input).replaceControlStructuresWithGotos$();
	for (i = 0; i < conved.length; ++ i) {
		output.push(conved[i]);
	}
};

CodeTransformer.convertAndPushStatement_0$LCodeTransformer$LStatement$ALStatement$ = CodeTransformer$convertAndPushStatement_0$LCodeTransformer$LStatement$ALStatement$;

function CodeTransformer$convertAndPushStatements_0$LCodeTransformer$ALStatement$ALStatement$($this, input, output) {
	var i;
	for (i = 0; i < input.length; ++ i) {
		CodeTransformer$convertAndPushStatement_0$LCodeTransformer$LStatement$ALStatement$($this, input[i], output);
	}
};

CodeTransformer.convertAndPushStatements_0$LCodeTransformer$ALStatement$ALStatement$ = CodeTransformer$convertAndPushStatements_0$LCodeTransformer$ALStatement$ALStatement$;

function CodeTransformer$transformFunctionDefinition_0$LCodeTransformer$LMemberFunctionDefinition$($this, funcDef) {
	var newExpr;
	var numBlock;
	newExpr = new NewExpression(new Token$0("new", false), CodeTransformer.stopIterationType, [  ]);
	newExpr.analyze$LAnalysisContext$LExpression$(({errors: [  ], parser: null, postInstantiationCallback: null, funcDef: null, blockStack: null, statement: null}), null);
	funcDef._statements.push(new ThrowStatement(new Token$0("throw", false), newExpr));
	CodeTransformer$_replaceControlStructuresWithGotos_0$LCodeTransformer$LMemberFunctionDefinition$($this, funcDef);
	numBlock = CodeTransformer$_eliminateGotos_0$LCodeTransformer$LMemberFunctionDefinition$($this, funcDef);
	CodeTransformer$_eliminateYields_0$LCodeTransformer$LMemberFunctionDefinition$N($this, funcDef, numBlock);
};

CodeTransformer.transformFunctionDefinition_0$LCodeTransformer$LMemberFunctionDefinition$ = CodeTransformer$transformFunctionDefinition_0$LCodeTransformer$LMemberFunctionDefinition$;

function CodeTransformer$_getStatementTransformerFor_0$LCodeTransformer$LStatement$($this, statement) {
	if (statement instanceof ConstructorInvocationStatement) {
		return new _ConstructorInvocationStatementTransformer($this, statement);
	} else {
		if (statement instanceof ExpressionStatement) {
			return new _ExpressionStatementTransformer($this, statement);
		} else {
			if (statement instanceof FunctionStatement) {
				return new _FunctionStatementTransformer($this, statement);
			} else {
				if (statement instanceof ReturnStatement) {
					return new _ReturnStatementTransformer($this, statement);
				} else {
					if (statement instanceof YieldStatement) {
						return new _YieldStatementTransformer($this, statement);
					} else {
						if (statement instanceof DeleteStatement) {
							return new _DeleteStatementTransformer($this, statement);
						} else {
							if (statement instanceof BreakStatement) {
								return new _BreakStatementTransformer($this, statement);
							} else {
								if (statement instanceof ContinueStatement) {
									return new _ContinueStatementTransformer($this, statement);
								} else {
									if (statement instanceof DoWhileStatement) {
										return new _DoWhileStatementTransformer($this, statement);
									} else {
										if (statement instanceof ForInStatement) {
											return new _ForInStatementTransformer($this, statement);
										} else {
											if (statement instanceof ForStatement) {
												return new _ForStatementTransformer($this, statement);
											} else {
												if (statement instanceof IfStatement) {
													return new _IfStatementTransformer($this, statement);
												} else {
													if (statement instanceof SwitchStatement) {
														return new _SwitchStatementTransformer($this, statement);
													} else {
														if (statement instanceof CaseStatement) {
															return new _CaseStatementTransformer($this, statement);
														} else {
															if (statement instanceof DefaultStatement) {
																return new _DefaultStatementTransformer($this, statement);
															} else {
																if (statement instanceof WhileStatement) {
																	return new _WhileStatementTransformer($this, statement);
																} else {
																	if (statement instanceof TryStatement) {
																		return new _TryStatementTransformer($this, statement);
																	} else {
																		if (statement instanceof CatchStatement) {
																			return new _CatchStatementTransformer($this, statement);
																		} else {
																			if (statement instanceof ThrowStatement) {
																				return new _ThrowStatementTransformer($this, statement);
																			} else {
																				if (statement instanceof AssertStatement) {
																					return new _AssertStatementTransformer($this, statement);
																				} else {
																					if (statement instanceof LogStatement) {
																						return new _LogStatementTransformer($this, statement);
																					} else {
																						if (statement instanceof DebuggerStatement) {
																							return new _DebuggerStatementTransformer($this, statement);
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	throw new Error("got unexpected type of statement: " + JSON.stringify(statement.serialize$()));
};

CodeTransformer._getStatementTransformerFor_0$LCodeTransformer$LStatement$ = CodeTransformer$_getStatementTransformerFor_0$LCodeTransformer$LStatement$;

function CodeTransformer$_replaceControlStructuresWithGotos_0$LCodeTransformer$LMemberFunctionDefinition$($this, funcDef) {
	var statements;
	var i;
	statements = [];
	for (i = 0; i < funcDef._statements.length; ++ i) {
		statements = statements.concat(CodeTransformer$_getStatementTransformerFor_0$LCodeTransformer$LStatement$($this, funcDef._statements[i]).replaceControlStructuresWithGotos$());
	}
	statements.unshift(new GotoStatement("$START"), new LabelStatement("$START"));
	statements.push(new GotoStatement("$END"), new LabelStatement("$END"));
	funcDef._statements = statements;
};

CodeTransformer._replaceControlStructuresWithGotos_0$LCodeTransformer$LMemberFunctionDefinition$ = CodeTransformer$_replaceControlStructuresWithGotos_0$LCodeTransformer$LMemberFunctionDefinition$;

function CodeTransformer$_eliminateGotos_0$LCodeTransformer$LMemberFunctionDefinition$($this, funcDef) {
	var statements;
	var labels;
	var i;
	var name;
	var stmt;
	var ifStmt;
	var succLabel;
	var failLabel;
	var switchStmt;
	var j;
	var entries;
	var codeBlocks;
	var currentLabel;
	var numBlock;
	var body;
	var block;
	var $this$0;
	var $this$1;
	var $this$2;
	var $this$3;
	var $this$4;
	statements = funcDef._statements;
	labels = {};
	for (i = 0; i < statements.length; ++ i) {
		if (statements[i] instanceof LabelStatement && labels[LabelStatement$getName_0$LLabelStatement$(statements[i])] == null) {
			$this$0 = statements[i];
			name = $this$0._name;
			labels[name] = new LocalVariable(new Token$0(name, true), new StaticFunctionType(null, Type.voidType, [  ], true));
			funcDef._locals.push(labels[name]);
		}
	}
	for (i = 0; i < statements.length; ++ i) {
		stmt = statements[i];
		if (stmt instanceof GotoStatement) {
			$this$1 = stmt;
			name = $this$1.label;
			statements[i] = new ExpressionStatement(new CallExpression(new Token$0("(", false), new LocalExpression(null, labels[name]), [  ]));
		} else {
			if (stmt instanceof IfStatement) {
				ifStmt = stmt;
				$this$2 = ifStmt._onTrueStatements[0];
				succLabel = $this$2.label;
				ifStmt._onTrueStatements[0] = new ExpressionStatement(new CallExpression(new Token$0("(", false), new LocalExpression(null, labels[succLabel]), [  ]));
				$this$3 = ifStmt._onFalseStatements[0];
				failLabel = $this$3.label;
				ifStmt._onFalseStatements[0] = new ExpressionStatement(new CallExpression(new Token$0("(", false), new LocalExpression(null, labels[failLabel]), [  ]));
			} else {
				if (stmt instanceof SwitchStatement) {
					switchStmt = stmt;
					for (j = 0; j < switchStmt._statements.length; ++ j) {
						if (switchStmt._statements[j] instanceof GotoStatement) {
							$this$4 = switchStmt._statements[j];
							name = $this$4.label;
							switchStmt._statements[j] = new ExpressionStatement(new CallExpression(new Token$0("(", false), new LocalExpression(null, labels[name]), [  ]));
						}
					}
				}
			}
		}
	}
	entries = [];
	for (i = 0; i < statements.length; ++ i) {
		if (statements[i] instanceof LabelStatement) {
			break;
		}
		entries.push(statements[i]);
	}
	codeBlocks = [];
	currentLabel = null;
	numBlock = 0;
	while (i < statements.length) {
		currentLabel = statements[i];
		body = [];
		++ i;
		for (; i < statements.length; ++ i) {
			if (statements[i] instanceof LabelStatement) {
				break;
			}
			body.push(statements[i]);
		}
		block = new MemberFunctionDefinition(new Token$0("function", false), null, 8, Type.voidType, [  ], [  ], body, [  ], null, null);
		funcDef._closures.push(block);
		codeBlocks.push(new ExpressionStatement(new AssignmentExpression(new Token$0("=", false), new LocalExpression(null, labels[currentLabel._name]), new FunctionExpression(new Token$0("function", false), block))));
		++ numBlock;
	}
	funcDef._statements = codeBlocks.concat(entries);
	return numBlock;
};

CodeTransformer._eliminateGotos_0$LCodeTransformer$LMemberFunctionDefinition$ = CodeTransformer$_eliminateGotos_0$LCodeTransformer$LMemberFunctionDefinition$;

function CodeTransformer$_calcGeneratorNestDepth$LMemberFunctionDefinition$(funcDef) {
	var depth;
	var parent;
	depth = 0;
	while ((parent = funcDef._parent) != null) {
		if ((parent._flags & 8192) !== 0) {
			depth++;
		}
		funcDef = parent;
	}
	return depth;
};

CodeTransformer._calcGeneratorNestDepth$LMemberFunctionDefinition$ = CodeTransformer$_calcGeneratorNestDepth$LMemberFunctionDefinition$;

function CodeTransformer$_eliminateYields_0$LCodeTransformer$LMemberFunctionDefinition$N($this, funcDef, numBlock) {
	var yieldType;
	var genClassDef;
	var createContext;
	var parser;
	var genType;
	var genLocalName;
	var genLocal;
	var newExpr;
	var blocks;
	var i;
	var statements;
	var j;
	var $this$0;
	var $this$1;
	var _closures$0;
	yieldType = InstantiatedClassDefinition$getTypeArguments_0$LInstantiatedClassDefinition$(funcDef._returnType.getClassDef$())[0];
	genClassDef = TemplateClassDefinition$instantiateTemplateClass_0$LTemplateClassDefinition$ALCompileError$LTemplateInstantiationRequest$(CodeTransformer.jsxGeneratorClassDef, [  ], ({_token: null, _className: "__jsx_generator", _typeArgs: [ yieldType ]}));
	createContext = (function (parser) {
		return ({errors: [  ], parser: parser, postInstantiationCallback: (function (parser, classDef) {
			ClassDefinition$setAnalysisContextOfVariables_0$LClassDefinition$LAnalysisContext$(classDef, createContext(parser));
			ClassDefinition$analyze_0$LClassDefinition$LAnalysisContext$(classDef, createContext(parser));
			return classDef;
		}), funcDef: null, blockStack: null, statement: null});
	});
	$this$0 = CodeTransformer.jsxGeneratorClassDef;
	parser = $this$0._parser;
	ClassDefinition$resolveTypes_0$LClassDefinition$LAnalysisContext$(genClassDef, createContext(parser));
	ClassDefinition$analyze_0$LClassDefinition$LAnalysisContext$(genClassDef, createContext(parser));
	ClassDefinition$getParser_0$LClassDefinition$(CodeTransformer.jsxGeneratorClassDef)._classDefs.push(genClassDef);
	genType = new ObjectType(genClassDef);
	genLocalName = "$generator" + (CodeTransformer$_calcGeneratorNestDepth$LMemberFunctionDefinition$(funcDef) + "");
	genLocal = new LocalVariable(new Token$0(genLocalName, false), genType);
	funcDef._locals.push(genLocal);
	newExpr = new NewExpression(new Token$0("new", false), genType, [  ]);
	newExpr.analyze$LAnalysisContext$LExpression$(({errors: [  ], parser: null, postInstantiationCallback: null, funcDef: null, blockStack: null, statement: null}), null);
	funcDef._statements.unshift(new ExpressionStatement(new AssignmentExpression(new Token$0("=", false), new LocalExpression(new Token$0(genLocalName, false), genLocal), newExpr)));
	blocks = (_closures$0 = funcDef._closures).slice(_closures$0.length - numBlock);
	for (i = 0; i < blocks.length; ++ i) {
		$this$1 = blocks[i];
		statements = $this$1._statements;
		for (j = 0; j < statements.length; ++ j) {
			if (statements[j] instanceof YieldStatement) {
				statements.splice(j, 2, new ExpressionStatement(new AssignmentExpression(new Token$0("=", false), new PropertyExpression$0(new Token$0(".", false), new LocalExpression(new Token$0(genLocalName, false), genLocal), new Token$0("__value", false), [  ], yieldType), YieldStatement$getExpr_0$LYieldStatement$(statements[j]))), new ExpressionStatement(new AssignmentExpression(new Token$0("=", false), new PropertyExpression$0(new Token$0(".", false), new LocalExpression(new Token$0(genLocalName, false), genLocal), new Token$0("__next", true), [  ], new StaticFunctionType(null, Type.voidType, [  ], true)), CallExpression$getExpr_0$LCallExpression$(UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statements[j + 1])))));
				break;
			}
		}
	}
	statements = funcDef._statements;
	statements.splice(statements.length - 1, 1, new ExpressionStatement(new AssignmentExpression(new Token$0("=", false), new PropertyExpression$0(new Token$0(".", false), new LocalExpression(new Token$0(genLocalName, false), genLocal), new Token$0("__next", true), [  ], new StaticFunctionType(null, Type.voidType, [  ], true)), new LocalExpression(new Token$0("$START", true), LocalExpression$getLocal_0$LLocalExpression$(CallExpression$getExpr_0$LCallExpression$(UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$(statements[statements.length - 1])))))));
	statements.push(new ReturnStatement(new Token$0("return", false), new LocalExpression(new Token$0("$generator", false), genLocal)));
};

CodeTransformer._eliminateYields_0$LCodeTransformer$LMemberFunctionDefinition$N = CodeTransformer$_eliminateYields_0$LCodeTransformer$LMemberFunctionDefinition$N;

function Expression(that) {
	var k;
	this._stash = {};
	this._token = that._token;
	for (k in that._stash) {
		this._stash[k] = that._stash[k].clone$();
	}
};

$__jsx_extend([Expression], Object);
$__jsx_merge_interface(Expression, Stashable);

Expression.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	var $this = this;
	var onExpr;
	function onExpr(expr) {
		var srcType;
		var instanceofExpr;
		var $this$0;
		var type$0;
		var $this$1;
		var type$1;
		var $this$2;
		var type$2;
		var $this$3;
		var type$3;
		var $this$4;
		var type$4;
		var $this$5;
		var type$5;
		var $this$6;
		var type$6;
		var $this$7;
		var local$0;
		var type$7;
		if (expr instanceof NullExpression) {
			srcType = expr.getType$();
			if (srcType != null) {
				$this$0 = expr;
				type$0 = srcType.instantiate$LInstantiationContext$(instantiationContext);
				$this$0._type = type$0;
			}
		} else {
			if (expr instanceof NewExpression) {
				srcType = expr.getType$();
				if (srcType != null) {
					$this$1 = expr;
					type$1 = srcType.instantiate$LInstantiationContext$(instantiationContext);
					$this$1._type = type$1;
				}
			} else {
				if (expr instanceof ArrayLiteralExpression) {
					srcType = expr.getType$();
					if (srcType != null) {
						$this$2 = expr;
						type$2 = srcType.instantiate$LInstantiationContext$(instantiationContext);
						$this$2._type = type$2;
					}
				} else {
					if (expr instanceof MapLiteralExpression) {
						srcType = expr.getType$();
						if (srcType != null) {
							$this$3 = expr;
							type$3 = srcType.instantiate$LInstantiationContext$(instantiationContext);
							$this$3._type = type$3;
						}
					} else {
						if (expr instanceof AsExpression) {
							srcType = expr.getType$();
							if (srcType != null) {
								$this$4 = expr;
								type$4 = srcType.instantiate$LInstantiationContext$(instantiationContext);
								$this$4._type = type$4;
							}
						} else {
							if (expr instanceof AsNoConvertExpression) {
								srcType = expr.getType$();
								if (srcType != null) {
									$this$5 = expr;
									type$5 = srcType.instantiate$LInstantiationContext$(instantiationContext);
									$this$5._type = type$5;
								}
							} else {
								if (expr instanceof ClassExpression) {
									srcType = expr.getType$();
									if (srcType != null) {
										$this$6 = expr;
										type$6 = srcType.instantiate$LInstantiationContext$(instantiationContext);
										$this$6._parsedType = type$6;
									}
								} else {
									if (expr instanceof LocalExpression) {
										$this$7 = expr;
										local$0 = LocalVariable$getInstantiated_0$LLocalVariable$(LocalExpression$getLocal_0$LLocalExpression$(expr));
										$this$7._local = local$0;
									} else {
										if (expr instanceof InstanceofExpression) {
											instanceofExpr = expr;
											type$7 = instanceofExpr._expectedType.instantiate$LInstantiationContext$(instantiationContext);
											instanceofExpr._expectedType = type$7;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
	}
	return onExpr(this);
};


function Expression$instantiate_0$LExpression$LInstantiationContext$($this, instantiationContext) {
	var onExpr;
	function onExpr(expr) {
		var srcType;
		var instanceofExpr;
		var $this$0;
		var type$0;
		var $this$1;
		var type$1;
		var $this$2;
		var type$2;
		var $this$3;
		var type$3;
		var $this$4;
		var type$4;
		var $this$5;
		var type$5;
		var $this$6;
		var type$6;
		var $this$7;
		var local$0;
		var type$7;
		if (expr instanceof NullExpression) {
			srcType = expr.getType$();
			if (srcType != null) {
				$this$0 = expr;
				type$0 = srcType.instantiate$LInstantiationContext$(instantiationContext);
				$this$0._type = type$0;
			}
		} else {
			if (expr instanceof NewExpression) {
				srcType = expr.getType$();
				if (srcType != null) {
					$this$1 = expr;
					type$1 = srcType.instantiate$LInstantiationContext$(instantiationContext);
					$this$1._type = type$1;
				}
			} else {
				if (expr instanceof ArrayLiteralExpression) {
					srcType = expr.getType$();
					if (srcType != null) {
						$this$2 = expr;
						type$2 = srcType.instantiate$LInstantiationContext$(instantiationContext);
						$this$2._type = type$2;
					}
				} else {
					if (expr instanceof MapLiteralExpression) {
						srcType = expr.getType$();
						if (srcType != null) {
							$this$3 = expr;
							type$3 = srcType.instantiate$LInstantiationContext$(instantiationContext);
							$this$3._type = type$3;
						}
					} else {
						if (expr instanceof AsExpression) {
							srcType = expr.getType$();
							if (srcType != null) {
								$this$4 = expr;
								type$4 = srcType.instantiate$LInstantiationContext$(instantiationContext);
								$this$4._type = type$4;
							}
						} else {
							if (expr instanceof AsNoConvertExpression) {
								srcType = expr.getType$();
								if (srcType != null) {
									$this$5 = expr;
									type$5 = srcType.instantiate$LInstantiationContext$(instantiationContext);
									$this$5._type = type$5;
								}
							} else {
								if (expr instanceof ClassExpression) {
									srcType = expr.getType$();
									if (srcType != null) {
										$this$6 = expr;
										type$6 = srcType.instantiate$LInstantiationContext$(instantiationContext);
										$this$6._parsedType = type$6;
									}
								} else {
									if (expr instanceof LocalExpression) {
										$this$7 = expr;
										local$0 = LocalVariable$getInstantiated_0$LLocalVariable$(LocalExpression$getLocal_0$LLocalExpression$(expr));
										$this$7._local = local$0;
									} else {
										if (expr instanceof InstanceofExpression) {
											instanceofExpr = expr;
											type$7 = instanceofExpr._expectedType.instantiate$LInstantiationContext$(instantiationContext);
											instanceofExpr._expectedType = type$7;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return Expression$forEachExpression_0$LExpression$F$LExpression$B$(expr, onExpr);
	}
	return onExpr($this);
};

Expression.instantiate_0$LExpression$LInstantiationContext$ = Expression$instantiate_0$LExpression$LInstantiationContext$;

Expression.prototype.getToken$ = function () {
	return this._token;
};


function Expression$getToken_0$LExpression$($this) {
	return $this._token;
};

Expression.getToken_0$LExpression$ = Expression$getToken_0$LExpression$;

Expression.prototype.getHolderType$ = function () {
	return null;
};


Expression.prototype.isClassSpecifier$ = function () {
	return false;
};


function Expression$forEachExpression_0$LExpression$F$LExpression$B$($this, cb) {
	return $this.forEachExpression$F$LExpression$F$LExpression$V$B$((function (expr, _) {
		return cb(expr);
	}));
};

Expression.forEachExpression_0$LExpression$F$LExpression$B$ = Expression$forEachExpression_0$LExpression$F$LExpression$B$;

Expression.prototype.assertIsAssignable$LAnalysisContext$LToken$LType$ = function (context, token, type) {
	context.errors.push(new CompileError(token, "left-hand-side expression is not assignable"));
	return false;
};


function Expression$assertIsAssignable$LAnalysisContext$LToken$LType$LType$(context, token, lhsType, rhsType) {
	if (! lhsType.isAssignable$()) {
		context.errors.push(new CompileError(token, "left-hand-side expression is not assignable"));
		return false;
	}
	if (! rhsType.isConvertibleTo$LType$(lhsType)) {
		context.errors.push(new CompileError(token, "cannot assign a value of type '" + rhsType.toString() + "' to '" + lhsType.toString() + "'"));
		return false;
	}
	return true;
};

Expression.assertIsAssignable$LAnalysisContext$LToken$LType$LType$ = Expression$assertIsAssignable$LAnalysisContext$LToken$LType$LType$;

function Expression$getDefaultValueExpressionOf$LType$(type) {
	return (type.equals$LType$(Type.booleanType) ? new BooleanLiteralExpression(new Token$0("false", false)) : type.equals$LType$(Type.integerType) ? new IntegerLiteralExpression(new Token$0("0", false)) : type.equals$LType$(Type.numberType) ? new NumberLiteralExpression(new Token$0("0", false)) : type.equals$LType$(Type.stringType) ? new StringLiteralExpression(new Token$0("\"\"", false)) : new NullExpression(new Token$0("null", false), type));
};

Expression.getDefaultValueExpressionOf$LType$ = Expression$getDefaultValueExpressionOf$LType$;

function LeafExpression() {
};

$__jsx_extend([LeafExpression], Expression);
LeafExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function OperatorExpression(that) {
	Expression.call(this, that);
};

$__jsx_extend([OperatorExpression], Expression);
function OperatorExpression$isConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B($this, context, expr, type, mayUnbox) {
	var exprType;
	var $this$0;
	$this$0 = expr.getType$();
	exprType = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	return (mayUnbox && type instanceof PrimitiveType && exprType instanceof ObjectType && exprType.getClassDef$() == type.getClassDef$() ? true : exprType.isConvertibleTo$LType$(type));
};

OperatorExpression.isConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B = OperatorExpression$isConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B;

function OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B($this, context, expr, type, mayUnbox) {
	var _token$0;
	if (! OperatorExpression$isConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B($this, context, expr, type, mayUnbox)) {
		context.errors.push(new CompileError(_token$0 = $this._token, "cannot apply operator '" + Token$getValue_0$LToken$(_token$0) + "' to type '" + expr.getType$().toString() + "'"));
		return false;
	}
	return true;
};

OperatorExpression.assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B = OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B;

function LocalExpression(token, local) {
	this._stash = {};
	this._token = token;
	this._cloned = false;
	this._local = local;
};

$__jsx_extend([LocalExpression], LeafExpression);
LocalExpression.prototype.clone$ = function () {
	var that;
	that = new LocalExpression(this._token, this._local);
	that._cloned = true;
	return that;
};


function LocalExpression$getLocal_0$LLocalExpression$($this) {
	return $this._local;
};

LocalExpression.getLocal_0$LLocalExpression$ = LocalExpression$getLocal_0$LLocalExpression$;

function LocalExpression$setLocal_0$LLocalExpression$LLocalVariable$($this, local) {
	$this._local = local;
};

LocalExpression.setLocal_0$LLocalExpression$LLocalVariable$ = LocalExpression$setLocal_0$LLocalExpression$LLocalVariable$;

LocalExpression.prototype.serialize$ = function () {
	return [ "LocalExpression", Token$serialize_0$LToken$(this._token), LocalVariable$serialize_0$LLocalVariable$(this._local) ];
};


LocalExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var statement$0;
	if (parentExpr instanceof AssignmentExpression && BinaryExpression$getFirstExpr_0$LBinaryExpression$(parentExpr) == this && Token$getValue_0$LToken$(Expression$getToken_0$LExpression$(parentExpr)) === "=" || parentExpr == null && (statement$0 = context.statement) instanceof ForInStatement && ForInStatement$getLHSExpr_0$LForInStatement$(statement$0) == this) {
	} else {
		this._local.touchVariable$LAnalysisContext$LToken$B(context, this._token, false);
		if (LocalVariable$getType_0$LLocalVariable$(this._local) == null) {
			return false;
		}
	}
	return true;
};


LocalExpression.prototype.getType$ = function () {
	var $this$0;
	$this$0 = this._local;
	return $this$0._type;
};


LocalExpression.prototype.assertIsAssignable$LAnalysisContext$LToken$LType$ = function (context, token, type) {
	if (LocalVariable$getType_0$LLocalVariable$(this._local) == null) {
		if (type.equals$LType$(Type.nullType)) {
			context.errors.push(new CompileError(token, "cannot assign null without type annotation to a value of undetermined type"));
			return false;
		}
		LocalVariable$setType_0$LLocalVariable$LType$(this._local, type.asAssignableType$());
	} else {
		if (! type.isConvertibleTo$LType$(LocalVariable$getType_0$LLocalVariable$(this._local))) {
			context.errors.push(new CompileError(token, "cannot assign a value of type '" + type.toString() + "' to '" + LocalVariable$getType_0$LLocalVariable$(this._local).toString() + "'"));
			return false;
		}
	}
	this._local.touchVariable$LAnalysisContext$LToken$B(context, this._token, true);
	return true;
};


function ClassExpression(token, parsedType) {
	this._stash = {};
	this._token = token;
	this._parsedType = parsedType;
};

$__jsx_extend([ClassExpression], LeafExpression);
ClassExpression.prototype.clone$ = function () {
	return new ClassExpression(this._token, this._parsedType);
};


ClassExpression.prototype.serialize$ = function () {
	return [ "ClassExpression", Token$serialize_0$LToken$(this._token), Type$serialize_0$LType$(this._parsedType) ];
};


ClassExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return true;
};


ClassExpression.prototype.getType$ = function () {
	return this._parsedType;
};


ClassExpression.prototype.isClassSpecifier$ = function () {
	return true;
};


ClassExpression.prototype.assertIsAssignable$LAnalysisContext$LToken$LType$ = function (context, token, type) {
	context.errors.push(new CompileError(token, "cannot modify a class definition"));
	return false;
};


function NullExpression(token, type) {
	this._stash = {};
	this._token = token;
	this._type = type;
};

$__jsx_extend([NullExpression], LeafExpression);
NullExpression.prototype.clone$ = function () {
	return new NullExpression(this._token, this._type);
};


NullExpression.prototype.serialize$ = function () {
	return [ "NullExpression", Token$serialize_0$LToken$(this._token), Type$serialize_0$LType$(this._type) ];
};


NullExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return true;
};


NullExpression.prototype.getType$ = function () {
	return this._type;
};


function BooleanLiteralExpression(token) {
	this._stash = {};
	this._token = token;
};

$__jsx_extend([BooleanLiteralExpression], LeafExpression);
BooleanLiteralExpression.prototype.clone$ = function () {
	return new BooleanLiteralExpression(this._token);
};


BooleanLiteralExpression.prototype.serialize$ = function () {
	return [ "BooleanLiteralExpression", Token$serialize_0$LToken$(this._token) ];
};


BooleanLiteralExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return true;
};


BooleanLiteralExpression.prototype.getType$ = function () {
	return Type.booleanType;
};


function IntegerLiteralExpression(token) {
	this._stash = {};
	this._token = token;
};

$__jsx_extend([IntegerLiteralExpression], LeafExpression);
IntegerLiteralExpression.prototype.clone$ = function () {
	return new IntegerLiteralExpression(this._token);
};


IntegerLiteralExpression.prototype.serialize$ = function () {
	return [ "IntegerLiteralExpression", Token$serialize_0$LToken$(this._token) ];
};


IntegerLiteralExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return true;
};


IntegerLiteralExpression.prototype.getType$ = function () {
	return Type.integerType;
};


function NumberLiteralExpression(token) {
	this._stash = {};
	this._token = token;
};

$__jsx_extend([NumberLiteralExpression], LeafExpression);
NumberLiteralExpression.prototype.clone$ = function () {
	return new NumberLiteralExpression(this._token);
};


NumberLiteralExpression.prototype.serialize$ = function () {
	return [ "NumberLiteralExpression", Token$serialize_0$LToken$(this._token) ];
};


NumberLiteralExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return true;
};


NumberLiteralExpression.prototype.getType$ = function () {
	return Type.numberType;
};


function StringLiteralExpression(token) {
	this._stash = {};
	this._token = token;
};

$__jsx_extend([StringLiteralExpression], LeafExpression);
StringLiteralExpression.prototype.clone$ = function () {
	return new StringLiteralExpression(this._token);
};


StringLiteralExpression.prototype.serialize$ = function () {
	return [ "StringLiteralExpression", Token$serialize_0$LToken$(this._token) ];
};


StringLiteralExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return true;
};


StringLiteralExpression.prototype.getType$ = function () {
	return Type.stringType;
};


function RegExpLiteralExpression(token) {
	RegExpLiteralExpression$0.call(this, token, null);
};

function RegExpLiteralExpression$0(token, type) {
	this._stash = {};
	this._token = token;
	this._type = type;
};

$__jsx_extend([RegExpLiteralExpression, RegExpLiteralExpression$0], LeafExpression);
RegExpLiteralExpression.prototype.clone$ = function () {
	return new RegExpLiteralExpression$0(this._token, this._type);
};


RegExpLiteralExpression.prototype.serialize$ = function () {
	return [ "RegExpLiteralExpression", Token$serialize_0$LToken$(this._token) ];
};


RegExpLiteralExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var classDef;
	classDef = Parser$lookup_0$LParser$ALCompileError$LToken$S(context.parser, context.errors, this._token, "RegExp");
	if (classDef == null) {
		throw new Error("could not find definition for RegExp");
	}
	this._type = new ObjectType(classDef);
	return true;
};


RegExpLiteralExpression.prototype.getType$ = function () {
	return this._type;
};


function ArrayLiteralExpression(token, exprs, type) {
	this._stash = {};
	this._token = token;
	this._exprs = exprs;
	this._type = type;
};

$__jsx_extend([ArrayLiteralExpression], Expression);
ArrayLiteralExpression.prototype.clone$ = function () {
	return new ArrayLiteralExpression(this._token, Cloner$Expression$E$cloneArray$ALExpression$(this._exprs), this._type);
};


function ArrayLiteralExpression$getExprs_0$LArrayLiteralExpression$($this) {
	return $this._exprs;
};

ArrayLiteralExpression.getExprs_0$LArrayLiteralExpression$ = ArrayLiteralExpression$getExprs_0$LArrayLiteralExpression$;

ArrayLiteralExpression.prototype.getType$ = function () {
	return this._type;
};


ArrayLiteralExpression.prototype.serialize$ = function () {
	return [ "ArrayLiteralExpression", Token$serialize_0$LToken$(this._token), Serializer$Expression$E$serializeArray$ALExpression$(this._exprs), Serializer$Type$E$serializeNullable$LType$(this._type) ];
};


ArrayLiteralExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var $this = this;
	var succeeded;
	var i;
	var classDef;
	var expectedType;
	var elementType;
	var $this$0;
	var _type$0;
	succeeded = true;
	for (i = 0; i < this._exprs.length; ++ i) {
		if (! this._exprs[i].analyze$LAnalysisContext$LExpression$(context, this)) {
			succeeded = false;
		} else {
			if (this._exprs[i].getType$().equals$LType$(Type.voidType)) {
				context.errors.push(new CompileError(this._token, "cannot assign void to an array"));
				succeeded = false;
			}
		}
	}
	if (! succeeded) {
		return false;
	}
	if (this._type != null) {
		if ((_type$0 = this._type) instanceof ObjectType && (classDef = _type$0.getClassDef$()) instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) === "Array") {
		} else {
			context.errors.push(new CompileError(this._token, "the type specified after ':' is not an array type"));
			return false;
		}
		$this$0 = InstantiatedClassDefinition$getTypeArguments_0$LInstantiatedClassDefinition$(this._type.getClassDef$())[0];
		expectedType = ($this$0 instanceof PrimitiveType ? new NullableType($this$0) : $this$0);
		for (i = 0; i < this._exprs.length; ++ i) {
			elementType = this._exprs[i].getType$();
			if (! elementType.isConvertibleTo$LType$(expectedType)) {
				context.errors.push(new CompileError(this._token, "cannot assign '" + elementType.toString() + "' to an array of '" + expectedType.toString() + "'"));
				succeeded = false;
			}
		}
	} else {
		elementType = Type$calcLeastCommonAncestor$ALType$B(this._exprs.map((function (expr) {
			return expr.getType$();
		})), true);
		if (elementType == null || elementType.equals$LType$(Type.nullType)) {
			context.errors.push(new CompileError(this._token, "could not deduce array type, please specify"));
			return false;
		}
		if (elementType.equals$LType$(Type.integerType)) {
			elementType = Type.numberType;
		}
		elementType = (elementType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(elementType) : elementType);
		this._type = new ObjectType(Util$instantiateTemplate$LAnalysisContext$LToken$SALType$(context, this._token, "Array", [ elementType ]));
	}
	return succeeded;
};


ArrayLiteralExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return (! Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(cb, this._exprs) ? false : true);
};


function MapLiteralElement(key, expr) {
	this._key = key;
	this._expr = expr;
};

$__jsx_extend([MapLiteralElement], Object);
function MapLiteralElement$getKey_0$LMapLiteralElement$($this) {
	return $this._key;
};

MapLiteralElement.getKey_0$LMapLiteralElement$ = MapLiteralElement$getKey_0$LMapLiteralElement$;

function MapLiteralElement$getExpr_0$LMapLiteralElement$($this) {
	return $this._expr;
};

MapLiteralElement.getExpr_0$LMapLiteralElement$ = MapLiteralElement$getExpr_0$LMapLiteralElement$;

function MapLiteralElement$setExpr_0$LMapLiteralElement$LExpression$($this, expr) {
	$this._expr = expr;
};

MapLiteralElement.setExpr_0$LMapLiteralElement$LExpression$ = MapLiteralElement$setExpr_0$LMapLiteralElement$LExpression$;

function MapLiteralExpression(token, elements, type) {
	this._stash = {};
	this._token = token;
	this._elements = elements;
	this._type = type;
};

$__jsx_extend([MapLiteralExpression], Expression);
MapLiteralExpression.prototype.clone$ = function () {
	var ret;
	var i;
	ret = new MapLiteralExpression(this._token, [], this._type);
	for (i = 0; i < this._elements.length; ++ i) {
		ret._elements[i] = ({_key: MapLiteralElement$getKey_0$LMapLiteralElement$(this._elements[i]), _expr: MapLiteralElement$getExpr_0$LMapLiteralElement$(this._elements[i]).clone$()});
	}
	return ret;
};


function MapLiteralExpression$getElements_0$LMapLiteralExpression$($this) {
	return $this._elements;
};

MapLiteralExpression.getElements_0$LMapLiteralExpression$ = MapLiteralExpression$getElements_0$LMapLiteralExpression$;

MapLiteralExpression.prototype.getType$ = function () {
	return this._type;
};


MapLiteralExpression.prototype.serialize$ = function () {
	return [ "MapLiteralExpression", Token$serialize_0$LToken$(this._token), Serializer$MapLiteralElement$E$serializeArray$ALMapLiteralElement$(this._elements), Serializer$Type$E$serializeNullable$LType$(this._type) ];
};


MapLiteralExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var $this = this;
	var succeeded;
	var i;
	var classDef;
	var expectedType;
	var elementType;
	var _type$0;
	var _type$1;
	succeeded = true;
	for (i = 0; i < this._elements.length; ++ i) {
		if (! MapLiteralElement$getExpr_0$LMapLiteralElement$(this._elements[i]).analyze$LAnalysisContext$LExpression$(context, this)) {
			succeeded = false;
		} else {
			if (MapLiteralElement$getExpr_0$LMapLiteralElement$(this._elements[i]).getType$().equals$LType$(Type.voidType)) {
				context.errors.push(new CompileError(this._token, "cannot assign void to a hash"));
				succeeded = false;
			}
		}
	}
	if (! succeeded) {
		return false;
	}
	if ((_type$1 = this._type) != null && _type$1 == Type.variantType) {
	} else {
		if ((_type$0 = this._type) != null && _type$0 instanceof ObjectType) {
			classDef = this._type.getClassDef$();
			if (! (classDef instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) === "Map")) {
				context.errors.push(new CompileError(this._token, "specified type is not a hash type"));
				return false;
			}
			expectedType = ParsedObjectType$getTypeArguments_0$LParsedObjectType$(this._type)[0];
			for (i = 0; i < this._elements.length; ++ i) {
				elementType = MapLiteralElement$getExpr_0$LMapLiteralElement$(this._elements[i]).getType$();
				if (! elementType.isConvertibleTo$LType$(expectedType)) {
					context.errors.push(new CompileError(this._token, "cannot assign '" + elementType.toString() + "' to a map of '" + expectedType.toString() + "'"));
					succeeded = false;
				}
			}
		} else {
			if (this._type != null) {
				context.errors.push(new CompileError(this._token, "invalid type for a map literal"));
				return false;
			} else {
				elementType = Type$calcLeastCommonAncestor$ALType$B(this._elements.map((function (elt) {
					return elt._expr.getType$();
				})), true);
				if (elementType == null || elementType.equals$LType$(Type.nullType)) {
					context.errors.push(new CompileError(this._token, "could not deduce hash type, please specify"));
					return false;
				}
				if (elementType.equals$LType$(Type.integerType)) {
					elementType = Type.numberType;
				}
				elementType = (elementType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(elementType) : elementType);
				this._type = new ObjectType(Util$instantiateTemplate$LAnalysisContext$LToken$SALType$(context, this._token, "Map", [ elementType ]));
			}
		}
	}
	return succeeded;
};


MapLiteralExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	var i;
	for (i = 0; i < this._elements.length; ++ i) {
		if (! cb(MapLiteralElement$getExpr_0$LMapLiteralElement$(this._elements[i]), (function (elements, index) {
			return (function (expr) {
				MapLiteralElement$setExpr_0$LMapLiteralElement$LExpression$(elements[index], expr);
			});
		})(this._elements, i))) {
			return false;
		}
	}
	return true;
};


function ThisExpression(token, classDef) {
	this._stash = {};
	this._token = token;
	this._classDef = classDef;
};

$__jsx_extend([ThisExpression], Expression);
ThisExpression.prototype.clone$ = function () {
	return new ThisExpression(this._token, this._classDef);
};


ThisExpression.prototype.serialize$ = function () {
	return [ "ThisExpression", Token$serialize_0$LToken$(this._token), Serializer$ClassDefinition$E$serializeNullable$LClassDefinition$(this._classDef) ];
};


ThisExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var rootFuncDef;
	rootFuncDef = context.funcDef;
	if (rootFuncDef != null) {
		while (rootFuncDef._parent != null) {
			rootFuncDef = rootFuncDef._parent;
		}
	}
	if (rootFuncDef == null || (rootFuncDef._flags & 8) !== 0) {
		context.errors.push(new CompileError(this._token, "cannot use 'this' outside of a member function"));
		return false;
	}
	this._classDef = rootFuncDef._classDef;
	return true;
};


ThisExpression.prototype.getType$ = function () {
	return new ObjectType(this._classDef);
};


ThisExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function FunctionExpression(token, funcDef) {
	this._stash = {};
	this._token = token;
	this._funcDef = funcDef;
};

$__jsx_extend([FunctionExpression], Expression);
FunctionExpression.prototype.clone$ = function () {
	return new FunctionExpression(this._token, this._funcDef);
};


function FunctionExpression$getFuncDef_0$LFunctionExpression$($this) {
	return $this._funcDef;
};

FunctionExpression.getFuncDef_0$LFunctionExpression$ = FunctionExpression$getFuncDef_0$LFunctionExpression$;

function FunctionExpression$setFuncDef_0$LFunctionExpression$LMemberFunctionDefinition$($this, funcDef) {
	$this._funcDef = funcDef;
};

FunctionExpression.setFuncDef_0$LFunctionExpression$LMemberFunctionDefinition$ = FunctionExpression$setFuncDef_0$LFunctionExpression$LMemberFunctionDefinition$;

FunctionExpression.prototype.serialize$ = function () {
	return [ "FunctionExpression", this._funcDef.serialize$() ];
};


FunctionExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	if (! FunctionExpression$argumentTypesAreIdentified_0$LFunctionExpression$(this)) {
		context.errors.push(new CompileError(this._token, "argument types were not automatically deductable, please specify them by hand"));
		return false;
	}
	MemberFunctionDefinition$analyze_0$LMemberFunctionDefinition$LAnalysisContext$(this._funcDef, context);
	return true;
};


FunctionExpression.prototype.getType$ = function () {
	return this._funcDef.getType$();
};


function FunctionExpression$argumentTypesAreIdentified_0$LFunctionExpression$($this) {
	var argTypes;
	var i;
	var argTypes$len$0;
	argTypes = MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this._funcDef);
	for ((i = 0, argTypes$len$0 = argTypes.length); i < argTypes$len$0; ++ i) {
		if (argTypes[i] == null) {
			return false;
		}
	}
	return true;
};

FunctionExpression.argumentTypesAreIdentified_0$LFunctionExpression$ = FunctionExpression$argumentTypesAreIdentified_0$LFunctionExpression$;

function FunctionExpression$typesAreIdentified_0$LFunctionExpression$($this) {
	return (! FunctionExpression$argumentTypesAreIdentified_0$LFunctionExpression$($this) ? false : MemberFunctionDefinition$getReturnType_0$LMemberFunctionDefinition$($this._funcDef) == null ? false : true);
};

FunctionExpression.typesAreIdentified_0$LFunctionExpression$ = FunctionExpression$typesAreIdentified_0$LFunctionExpression$;

function FunctionExpression$deductTypeIfUnknown_0$LFunctionExpression$LAnalysisContext$LResolvedFunctionType$($this, context, type) {
	return (! MemberFunctionDefinition$deductTypeIfUnknown_0$LMemberFunctionDefinition$LAnalysisContext$LResolvedFunctionType$($this._funcDef, context, type) ? false : true);
};

FunctionExpression.deductTypeIfUnknown_0$LFunctionExpression$LAnalysisContext$LResolvedFunctionType$ = FunctionExpression$deductTypeIfUnknown_0$LFunctionExpression$LAnalysisContext$LResolvedFunctionType$;

FunctionExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function UnaryExpression() {
};

$__jsx_extend([UnaryExpression], OperatorExpression);
function UnaryExpression$getExpr_0$LUnaryExpression$($this) {
	return $this._expr;
};

UnaryExpression.getExpr_0$LUnaryExpression$ = UnaryExpression$getExpr_0$LUnaryExpression$;

function UnaryExpression$setExpr_0$LUnaryExpression$LExpression$($this, expr) {
	$this._expr = expr;
};

UnaryExpression.setExpr_0$LUnaryExpression$LExpression$ = UnaryExpression$setExpr_0$LUnaryExpression$LExpression$;

UnaryExpression.prototype.serialize$ = function () {
	return [ "UnaryExpression", Token$serialize_0$LToken$(this._token), this._expr.serialize$() ];
};


function UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$($this, context) {
	var _token$0;
	if (! $this._expr.analyze$LAnalysisContext$LExpression$(context, $this)) {
		return false;
	}
	if ($this._expr.getType$().equals$LType$(Type.voidType)) {
		context.errors.push(new CompileError(_token$0 = $this._token, "cannot apply operator '" + Token$getValue_0$LToken$(_token$0) + "' against void"));
		return false;
	}
	return true;
};

UnaryExpression._analyze_0$LUnaryExpression$LAnalysisContext$ = UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$;

UnaryExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return cb(this._expr, (function (expr) {
		$this._expr = expr;
	}));
};


function BitwiseNotExpression(operatorToken, expr) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr;
};

$__jsx_extend([BitwiseNotExpression], UnaryExpression);
BitwiseNotExpression.prototype.clone$ = function () {
	return new BitwiseNotExpression(this._token, this._expr.clone$());
};


BitwiseNotExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return (! UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$(this, context) ? false : ! OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr, Type.numberType, false) ? false : true);
};


BitwiseNotExpression.prototype.getType$ = function () {
	return Type.integerType;
};


function InstanceofExpression(operatorToken, expr, expectedType) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr;
	this._expectedType = expectedType;
};

$__jsx_extend([InstanceofExpression], UnaryExpression);
InstanceofExpression.prototype.clone$ = function () {
	return new InstanceofExpression(this._token, this._expr.clone$(), this._expectedType);
};


function InstanceofExpression$getExpectedType_0$LInstanceofExpression$($this) {
	return $this._expectedType;
};

InstanceofExpression.getExpectedType_0$LInstanceofExpression$ = InstanceofExpression$getExpectedType_0$LInstanceofExpression$;

InstanceofExpression.prototype.serialize$ = function () {
	return [ "InstanceofExpression", this._expr.serialize$(), Type$serialize_0$LType$(this._expectedType) ];
};


InstanceofExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var exprType;
	if (! UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	exprType = this._expr.getType$();
	if (exprType instanceof ObjectType) {
	} else {
		if (exprType.equals$LType$(Type.variantType)) {
		} else {
			context.errors.push(new CompileError(this._token, "operator 'instanceof' is only applicable to an object or a variant"));
			return false;
		}
	}
	return true;
};


InstanceofExpression.prototype.getType$ = function () {
	return Type.booleanType;
};


function AsExpression(operatorToken, expr, type) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr;
	this._type = type;
};

$__jsx_extend([AsExpression], UnaryExpression);
AsExpression.prototype.clone$ = function () {
	return new AsExpression(this._token, this._expr.clone$(), this._type);
};


AsExpression.prototype.serialize$ = function () {
	return [ "AsExpression", this._expr.serialize$(), Type$serialize_0$LType$(this._type) ];
};


AsExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var exprType;
	var success;
	var deducedType;
	var $this$0;
	var _type$0;
	var _type$1;
	if (! UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	if (this._type instanceof NullableType) {
		context.errors.push(new CompileError(this._token, "right operand of 'as' expression cannot be a Nullable<T> type"));
		return false;
	}
	if (this._expr.getType$().isConvertibleTo$LType$(this._type)) {
		return true;
	}
	$this$0 = this._expr.getType$();
	exprType = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	success = false;
	if (exprType.equals$LType$(Type.nullType)) {
		if ((_type$0 = this._type) instanceof ObjectType || _type$0 instanceof FunctionType) {
			success = true;
		}
	} else {
		if (exprType instanceof PrimitiveType) {
			if (this._type instanceof PrimitiveType) {
				success = true;
			}
		} else {
			if (exprType.equals$LType$(Type.variantType)) {
				success = true;
			} else {
				if (exprType instanceof ObjectType) {
					if ((_type$1 = this._type) instanceof ObjectType && _type$1.isConvertibleTo$LType$(exprType)) {
						success = true;
					}
				} else {
					if (this._expr instanceof PropertyExpression && exprType instanceof FunctionType && this._type instanceof StaticFunctionType) {
						deducedType = PropertyExpression$deduceByArgumentTypes_0$LPropertyExpression$LAnalysisContext$LToken$ALType$B(this._expr, context, this._token, ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(this._type), true);
						if (deducedType != null) {
							exprType = deducedType;
							if (deducedType._returnType.equals$LType$(ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(this._type))) {
								success = true;
							}
						}
					}
				}
			}
		}
	}
	if (! success) {
		context.errors.push(new CompileError(this._token, "cannot convert a value of type '" + exprType.toString() + "' to '" + this._type.toString() + "'"));
		return false;
	}
	return true;
};


AsExpression.prototype.getType$ = function () {
	return this._type;
};


function AsNoConvertExpression(operatorToken, expr, type) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr;
	this._type = type;
};

$__jsx_extend([AsNoConvertExpression], UnaryExpression);
AsNoConvertExpression.prototype.clone$ = function () {
	return new AsNoConvertExpression(this._token, this._expr.clone$(), this._type);
};


AsNoConvertExpression.prototype.serialize$ = function () {
	return [ "AsNoConvertExpression", this._expr.serialize$(), Type$serialize_0$LType$(this._type) ];
};


AsNoConvertExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var srcType;
	var _type$0;
	if (! UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	srcType = this._expr.getType$();
	if (srcType.equals$LType$(Type.nullType) && ! ((_type$0 = this._type) instanceof NullableType || _type$0 instanceof ObjectType || _type$0 instanceof FunctionType)) {
		context.errors.push(new CompileError(this._token, "'" + srcType.toString() + "' cannot be treated as a value of type '" + this._type.toString() + "'"));
		return false;
	}
	return true;
};


AsNoConvertExpression.prototype.getType$ = function () {
	return this._type;
};


function LogicalNotExpression(operatorToken, expr) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr;
};

$__jsx_extend([LogicalNotExpression], UnaryExpression);
LogicalNotExpression.prototype.clone$ = function () {
	return new LogicalNotExpression(this._token, this._expr.clone$());
};


LogicalNotExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	if (! UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	if (Type$resolveIfNullable_0$LType$(this._expr.getType$()).equals$LType$(Type.voidType)) {
		context.errors.push(new CompileError(this._token, "cannot apply operator '!' against void"));
		return false;
	}
	return true;
};


LogicalNotExpression.prototype.getType$ = function () {
	return Type.booleanType;
};


function IncrementExpression() {
};

$__jsx_extend([IncrementExpression], UnaryExpression);
IncrementExpression.prototype.serialize$ = function () {
	return [ this._getClassName$(), Token$serialize_0$LToken$(this._token), this._expr.serialize$() ];
};


IncrementExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var exprType;
	var _token$0;
	if (! UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	exprType = this._expr.getType$();
	if ((exprType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(exprType) : exprType).equals$LType$(Type.integerType) || (exprType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(exprType) : exprType).equals$LType$(Type.numberType)) {
	} else {
		context.errors.push(new CompileError(_token$0 = this._token, "cannot apply operator '" + Token$getValue_0$LToken$(_token$0) + "' to a non-number"));
		return false;
	}
	return (! this._expr.assertIsAssignable$LAnalysisContext$LToken$LType$(context, this._token, exprType) ? false : true);
};


IncrementExpression.prototype.getType$ = function () {
	var $this$0;
	$this$0 = this._expr.getType$();
	return ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
};


function PostIncrementExpression(operatorToken, expr) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr;
};

$__jsx_extend([PostIncrementExpression], IncrementExpression);
PostIncrementExpression.prototype.clone$ = function () {
	return new PostIncrementExpression(this._token, this._expr.clone$());
};


PostIncrementExpression.prototype._getClassName$ = function () {
	return "PostIncrementExpression";
};


function PreIncrementExpression(operatorToken, expr) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr;
};

$__jsx_extend([PreIncrementExpression], IncrementExpression);
PreIncrementExpression.prototype.clone$ = function () {
	return new PreIncrementExpression(this._token, this._expr.clone$());
};


PreIncrementExpression.prototype._getClassName$ = function () {
	return "PreIncrementExpression";
};


function PropertyExpression(operatorToken, expr1, identifierToken, typeArgs) {
	PropertyExpression$0.call(this, operatorToken, expr1, identifierToken, typeArgs, null);
};

function PropertyExpression$0(operatorToken, expr1, identifierToken, typeArgs, type) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr1;
	this._identifierToken = identifierToken;
	this._typeArgs = typeArgs;
	this._type = (type != null ? type : null);
	this._isInner = false;
};

$__jsx_extend([PropertyExpression, PropertyExpression$0], UnaryExpression);
PropertyExpression.prototype.clone$ = function () {
	var propExpr;
	propExpr = new PropertyExpression$0(this._token, this._expr.clone$(), this._identifierToken, this._typeArgs, this._type);
	propExpr._isInner = this._isInner;
	return propExpr;
};


function PropertyExpression$getIdentifierToken_0$LPropertyExpression$($this) {
	return $this._identifierToken;
};

PropertyExpression.getIdentifierToken_0$LPropertyExpression$ = PropertyExpression$getIdentifierToken_0$LPropertyExpression$;

PropertyExpression.prototype.serialize$ = function () {
	return [ "PropertyExpression", this._expr.serialize$(), Token$serialize_0$LToken$(this._identifierToken), Serializer$Type$E$serializeNullable$LType$(this._type) ];
};


PropertyExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var $this = this;
	var exprType;
	var classDef;
	var _identifierToken$0;
	var _type$0;
	if (! UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	exprType = this._expr.getType$();
	if (exprType.equals$LType$(Type.voidType)) {
		context.errors.push(new CompileError(this._identifierToken, "cannot obtain a member of void"));
		return false;
	}
	if (exprType.equals$LType$(Type.nullType)) {
		context.errors.push(new CompileError(this._identifierToken, "cannot obtain a member of null"));
		return false;
	}
	if ((exprType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(exprType) : exprType).equals$LType$(Type.variantType)) {
		context.errors.push(new CompileError(this._identifierToken, "property of a variant should be referred to by using the [] operator"));
		return false;
	}
	classDef = exprType.getClassDef$();
	if (classDef == null) {
		context.errors.push(new CompileError(this._identifierToken, "cannot determine type due to preceding errors"));
		return false;
	}
	if (this._expr.isClassSpecifier$()) {
		ClassDefinition$forEachInnerClass_0$LClassDefinition$F$LClassDefinition$B$(classDef, (function (classDef) {
			var objectType;
			if (classDef.className$() === Token$getValue_0$LToken$($this._identifierToken)) {
				objectType = new ParsedObjectType(new QualifiedName$1($this._identifierToken, exprType), $this._typeArgs);
				objectType.resolveType$LAnalysisContext$(context);
				$this._type = objectType;
				$this._isInner = true;
				return false;
			}
			return true;
		}));
		if (this._isInner) {
			return true;
		}
	}
	_type$0 = this._type = ClassDefinition$getMemberTypeByName_0$LClassDefinition$ALCompileError$LToken$SBALType$N(classDef, context.errors, _identifierToken$0 = this._identifierToken, Token$getValue_0$LToken$(_identifierToken$0), this._expr.isClassSpecifier$(), this._typeArgs, (this._expr.isClassSpecifier$() ? 1 : 0));
	if (_type$0 == null) {
		context.errors.push(new CompileError(this._identifierToken, "'" + exprType.toString() + "' does not have a property named '" + Token$getValue_0$LToken$(this._identifierToken) + "'"));
		return false;
	}
	return true;
};


PropertyExpression.prototype.getType$ = function () {
	return this._type;
};


PropertyExpression.prototype.getHolderType$ = function () {
	var type;
	type = this._expr.getType$();
	if (type instanceof PrimitiveType) {
		type = new ObjectType(type.getClassDef$());
	}
	return type;
};


PropertyExpression.prototype.isClassSpecifier$ = function () {
	return this._isInner;
};


PropertyExpression.prototype.assertIsAssignable$LAnalysisContext$LToken$LType$ = function (context, token, type) {
	var $this = this;
	var holderType;
	var varFlags;
	if (! Expression$assertIsAssignable$LAnalysisContext$LToken$LType$LType$(context, token, this._type, type)) {
		return false;
	}
	holderType = this.getHolderType$();
	varFlags = 0;
	if (! holderType.equals$LType$(Type.variantType)) {
		if (ClassDefinition$forEachClassToBase_0$LClassDefinition$F$LClassDefinition$B$(holderType.getClassDef$(), (function (classDef) {
			return ClassDefinition$forEachMemberVariable_0$LClassDefinition$F$LMemberVariableDefinition$B$(classDef, (function (varDef) {
				if (MemberDefinition$name_0$LMemberDefinition$(varDef) === Token$getValue_0$LToken$($this._identifierToken)) {
					varFlags = MemberDefinition$flags_0$LMemberDefinition$(varDef);
					return false;
				}
				return true;
			}));
		}))) {
			throw new Error("logic flaw, could not find definition for " + holderType.getClassDef$().className$() + "#" + Token$getValue_0$LToken$(this._identifierToken));
		}
	}
	if ((varFlags & 1) !== 0) {
		context.errors.push(new CompileError(token, "cannot modify a constant"));
		return false;
	} else {
		if ((varFlags & 512) !== 0) {
			context.errors.push(new CompileError(token, "cannot modify a readonly variable"));
			return false;
		}
	}
	return true;
};


PropertyExpression.prototype.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B = function (context, operatorToken, argTypes, isStatic) {
	var i;
	var rhsType;
	for (i = 0; i < argTypes.length; ++ i) {
		if (argTypes[i] instanceof FunctionChoiceType) {
			context.errors.push(new CompileError(operatorToken, "type deduction of overloaded function passed in as an argument is not supported; use 'as' to specify the function"));
			return null;
		}
	}
	rhsType = this._type.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B(context, operatorToken, argTypes, isStatic);
	if (rhsType == null) {
		return null;
	}
	this._type = rhsType;
	return rhsType;
};


function PropertyExpression$deduceByArgumentTypes_0$LPropertyExpression$LAnalysisContext$LToken$ALType$B($this, context, operatorToken, argTypes, isStatic) {
	var i;
	var rhsType;
	for (i = 0; i < argTypes.length; ++ i) {
		if (argTypes[i] instanceof FunctionChoiceType) {
			context.errors.push(new CompileError(operatorToken, "type deduction of overloaded function passed in as an argument is not supported; use 'as' to specify the function"));
			return null;
		}
	}
	rhsType = $this._type.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B(context, operatorToken, argTypes, isStatic);
	if (rhsType == null) {
		return null;
	}
	$this._type = rhsType;
	return rhsType;
};

PropertyExpression.deduceByArgumentTypes_0$LPropertyExpression$LAnalysisContext$LToken$ALType$B = PropertyExpression$deduceByArgumentTypes_0$LPropertyExpression$LAnalysisContext$LToken$ALType$B;

function TypeofExpression(operatorToken, expr) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr;
};

$__jsx_extend([TypeofExpression], UnaryExpression);
TypeofExpression.prototype.clone$ = function () {
	return new TypeofExpression(this._token, this._expr.clone$());
};


TypeofExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var exprType;
	if (! UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	exprType = this._expr.getType$();
	if (! exprType.equals$LType$(Type.variantType)) {
		context.errors.push(new CompileError(this._token, "cannot apply operator 'typeof' to '" + this._expr.getType$().toString() + "'"));
		return false;
	}
	return true;
};


TypeofExpression.prototype.getType$ = function () {
	return Type.stringType;
};


function SignExpression(operatorToken, expr) {
	this._stash = {};
	this._token = operatorToken;
	this._expr = expr;
};

$__jsx_extend([SignExpression], UnaryExpression);
SignExpression.prototype.clone$ = function () {
	return new SignExpression(this._token, this._expr.clone$());
};


SignExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return (! UnaryExpression$_analyze_0$LUnaryExpression$LAnalysisContext$(this, context) ? false : ! OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr, Type.numberType, true) ? false : true);
};


SignExpression.prototype.getType$ = function () {
	var type;
	type = this._expr.getType$();
	return ((type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type).equals$LType$(Type.numberType) ? Type.numberType : Type.integerType);
};


function BinaryExpression() {
};

$__jsx_extend([BinaryExpression], OperatorExpression);
function BinaryExpression$getFirstExpr_0$LBinaryExpression$($this) {
	return $this._expr1;
};

BinaryExpression.getFirstExpr_0$LBinaryExpression$ = BinaryExpression$getFirstExpr_0$LBinaryExpression$;

function BinaryExpression$setFirstExpr_0$LBinaryExpression$LExpression$($this, expr) {
	$this._expr1 = expr;
};

BinaryExpression.setFirstExpr_0$LBinaryExpression$LExpression$ = BinaryExpression$setFirstExpr_0$LBinaryExpression$LExpression$;

function BinaryExpression$getSecondExpr_0$LBinaryExpression$($this) {
	return $this._expr2;
};

BinaryExpression.getSecondExpr_0$LBinaryExpression$ = BinaryExpression$getSecondExpr_0$LBinaryExpression$;

function BinaryExpression$setSecondExpr_0$LBinaryExpression$LExpression$($this, expr) {
	$this._expr2 = expr;
};

BinaryExpression.setSecondExpr_0$LBinaryExpression$LExpression$ = BinaryExpression$setSecondExpr_0$LBinaryExpression$LExpression$;

BinaryExpression.prototype.serialize$ = function () {
	return [ "BinaryExpression", Token$serialize_0$LToken$(this._token), this._expr1.serialize$(), this._expr2.serialize$() ];
};


function BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$($this, context) {
	return (! $this._expr1.analyze$LAnalysisContext$LExpression$(context, $this) ? false : ! $this._expr2.analyze$LAnalysisContext$LExpression$(context, $this) ? false : true);
};

BinaryExpression._analyze_0$LBinaryExpression$LAnalysisContext$ = BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$;

BinaryExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr1, (function (expr) {
		$this._expr1 = expr;
	})) ? false : ! cb(this._expr2, (function (expr) {
		$this._expr2 = expr;
	})) ? false : true);
};


function AdditiveExpression(operatorToken, expr1, expr2) {
	this._stash = {};
	this._token = operatorToken;
	this._expr1 = expr1;
	this._expr2 = expr2;
	this._type = null;
};

$__jsx_extend([AdditiveExpression], BinaryExpression);
AdditiveExpression.prototype.clone$ = function () {
	var ret;
	ret = new AdditiveExpression(this._token, this._expr1.clone$(), this._expr2.clone$());
	ret._type = this._type;
	return ret;
};


AdditiveExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var expr1Type;
	var expr2Type;
	var $this$0;
	var $this$1;
	if (! BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	$this$0 = this._expr1.getType$();
	expr1Type = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	$this$1 = this._expr2.getType$();
	expr2Type = ($this$1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$1) : $this$1);
	if ((expr1Type.isConvertibleTo$LType$(Type.numberType) || expr1Type instanceof ObjectType && expr1Type.getClassDef$() == Type.numberType.getClassDef$()) && (expr2Type.isConvertibleTo$LType$(Type.numberType) || expr2Type instanceof ObjectType && expr2Type.getClassDef$() == Type.numberType.getClassDef$())) {
		this._type = (expr1Type instanceof NumberType || expr2Type instanceof NumberType ? Type.numberType : Type.integerType);
	} else {
		if ((expr1Type.equals$LType$(Type.stringType) || expr1Type instanceof ObjectType && expr1Type.getClassDef$() == Type.stringType.getClassDef$()) && (expr2Type.equals$LType$(Type.stringType) || expr2Type instanceof ObjectType && expr2Type.getClassDef$() == Type.stringType.getClassDef$())) {
			this._type = expr1Type;
		} else {
			context.errors.push(new CompileError(this._token, "cannot apply operator '+' to '" + expr1Type.toString() + "' and '" + expr2Type.toString() + "'"));
			return false;
		}
	}
	return true;
};


AdditiveExpression.prototype.getType$ = function () {
	return this._type;
};


function ArrayExpression(operatorToken, expr1, expr2) {
	this._stash = {};
	this._token = operatorToken;
	this._expr1 = expr1;
	this._expr2 = expr2;
	this._type = null;
};

$__jsx_extend([ArrayExpression], BinaryExpression);
ArrayExpression.prototype.clone$ = function () {
	var ret;
	ret = new ArrayExpression(this._token, this._expr1.clone$(), this._expr2.clone$());
	ret._type = this._type;
	return ret;
};


ArrayExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var expr1Type;
	var $this$0;
	if (! BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	if (this._expr1.getType$() == null) {
		context.errors.push(new CompileError(this._token, "cannot determine type due to preceding errors"));
		return false;
	}
	$this$0 = this._expr1.getType$();
	expr1Type = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	if (expr1Type instanceof ObjectType) {
		return ArrayExpression$_analyzeApplicationOnObject_0$LArrayExpression$LAnalysisContext$LType$(this, context, expr1Type);
	} else {
		if (expr1Type.equals$LType$(Type.variantType)) {
			return ArrayExpression$_analyzeApplicationOnVariant_0$LArrayExpression$LAnalysisContext$(this, context);
		}
	}
	context.errors.push(new CompileError(this._token, "cannot apply []; the operator is only applicable against an array or an variant"));
	return false;
};


function ArrayExpression$_analyzeApplicationOnObject_0$LArrayExpression$LAnalysisContext$LType$($this, context, expr1Type) {
	var expr1ClassDef;
	var funcType;
	var deducedFuncType;
	expr1ClassDef = expr1Type.getClassDef$();
	funcType = ClassDefinition$getMemberTypeByName_0$LClassDefinition$ALCompileError$LToken$SBALType$N(expr1ClassDef, context.errors, $this._token, "__native_index_operator__", false, [], 0);
	if (funcType == null) {
		context.errors.push(new CompileError($this._token, "cannot apply operator[] on an instance of class '" + expr1ClassDef.className$() + "'"));
		return false;
	}
	deducedFuncType = funcType.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B(context, $this._token, [ $this._expr2.getType$() ], false);
	if (deducedFuncType == null) {
		return false;
	}
	$this._type = deducedFuncType._returnType;
	return true;
};

ArrayExpression._analyzeApplicationOnObject_0$LArrayExpression$LAnalysisContext$LType$ = ArrayExpression$_analyzeApplicationOnObject_0$LArrayExpression$LAnalysisContext$LType$;

function ArrayExpression$_analyzeApplicationOnVariant_0$LArrayExpression$LAnalysisContext$($this, context) {
	var expr2Type;
	var $this$0;
	$this$0 = $this._expr2.getType$();
	expr2Type = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	if (! (expr2Type.equals$LType$(Type.stringType) || expr2Type.isConvertibleTo$LType$(Type.numberType))) {
		context.errors.push(new CompileError($this._token, "the argument of variant[] should be a string or a number"));
		return false;
	}
	$this._type = Type.variantType;
	return true;
};

ArrayExpression._analyzeApplicationOnVariant_0$LArrayExpression$LAnalysisContext$ = ArrayExpression$_analyzeApplicationOnVariant_0$LArrayExpression$LAnalysisContext$;

ArrayExpression.prototype.getType$ = function () {
	return this._type;
};


ArrayExpression.prototype.assertIsAssignable$LAnalysisContext$LToken$LType$ = function (context, token, type) {
	return Expression$assertIsAssignable$LAnalysisContext$LToken$LType$LType$(context, token, this._type, type);
};


function AssignmentExpression(operatorToken, expr1, expr2) {
	this._stash = {};
	this._token = operatorToken;
	this._expr1 = expr1;
	this._expr2 = expr2;
};

$__jsx_extend([AssignmentExpression], BinaryExpression);
AssignmentExpression.prototype.clone$ = function () {
	return new AssignmentExpression(this._token, this._expr1.clone$(), this._expr2.clone$());
};


AssignmentExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var rhsType;
	var lhsType;
	if (this._expr2 instanceof FunctionExpression) {
		return AssignmentExpression$_analyzeFunctionExpressionAssignment_0$LAssignmentExpression$LAnalysisContext$LExpression$(this, context, parentExpr);
	}
	if (! BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	if (Token$getValue_0$LToken$(this._token) !== "=") {
		return AssignmentExpression$_analyzeFusedAssignment_0$LAssignmentExpression$LAnalysisContext$(this, context);
	}
	rhsType = this._expr2.getType$();
	if (rhsType == null) {
		return false;
	}
	if (rhsType.equals$LType$(Type.voidType)) {
		context.errors.push(new CompileError(this._token, "cannot assign void"));
		return false;
	}
	if (this._expr2.isClassSpecifier$()) {
		context.errors.push(new CompileError(this._token, "cannot assign a class"));
		return false;
	}
	if ((rhsType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(rhsType) : rhsType).equals$LType$(Type.nullType) && this._expr1.getType$() == null) {
		context.errors.push(new CompileError(this._token, "cannot assign null to an unknown type"));
		return false;
	}
	if (rhsType instanceof FunctionChoiceType) {
		lhsType = this._expr1.getType$();
		if (lhsType != null) {
			if (! (lhsType instanceof ResolvedFunctionType)) {
				context.errors.push(new CompileError(this._token, "cannot assign a function reference to '" + this._expr1.getType$().toString() + "'"));
				return false;
			}
			if ((rhsType = PropertyExpression$deduceByArgumentTypes_0$LPropertyExpression$LAnalysisContext$LToken$ALType$B(this._expr2, context, this._token, ResolvedFunctionType$getArgumentTypes_0$LResolvedFunctionType$(lhsType), lhsType instanceof StaticFunctionType)) == null) {
				return false;
			}
		} else {
			context.errors.push(new CompileError(this._token, "function reference is ambiguous"));
			return false;
		}
	}
	if (rhsType instanceof MemberFunctionType) {
		context.errors.push(new CompileError(this._token, "cannot assign a member function"));
		return false;
	}
	return (! this._expr1.assertIsAssignable$LAnalysisContext$LToken$LType$(context, this._token, rhsType) ? false : true);
};


function AssignmentExpression$_analyzeFusedAssignment_0$LAssignmentExpression$LAnalysisContext$($this, context) {
	var lhsType;
	var rhsType;
	var $this$0;
	var $this$1;
	var _token$0;
	$this$0 = $this._expr1.getType$();
	lhsType = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	$this$1 = $this._expr2.getType$();
	rhsType = ($this$1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$1) : $this$1);
	if (! $this._expr1.assertIsAssignable$LAnalysisContext$LToken$LType$(context, $this._token, lhsType)) {
		return false;
	}
	if (Token$getValue_0$LToken$($this._token) === "+=" && lhsType.equals$LType$(Type.stringType) && rhsType.equals$LType$(Type.stringType)) {
		return true;
	}
	if ((lhsType instanceof IntegerType || lhsType instanceof NumberType) && (rhsType instanceof IntegerType || rhsType instanceof NumberType)) {
		return true;
	}
	context.errors.push(new CompileError(_token$0 = $this._token, "cannot apply operator '" + Token$getValue_0$LToken$(_token$0) + "' against '" + $this._expr1.getType$().toString() + "' and '" + $this._expr2.getType$().toString() + "'"));
	return false;
};

AssignmentExpression._analyzeFusedAssignment_0$LAssignmentExpression$LAnalysisContext$ = AssignmentExpression$_analyzeFusedAssignment_0$LAssignmentExpression$LAnalysisContext$;

function AssignmentExpression$_analyzeFunctionExpressionAssignment_0$LAssignmentExpression$LAnalysisContext$LExpression$($this, context, parentExpr) {
	if (! $this._expr1.analyze$LAnalysisContext$LExpression$(context, $this)) {
		return false;
	}
	if ($this._expr1.getType$() == null) {
		if (! FunctionExpression$typesAreIdentified_0$LFunctionExpression$($this._expr2)) {
			context.errors.push(new CompileError($this._token, "either side of the operator should be fully type-qualified : " + (FunctionExpression$argumentTypesAreIdentified_0$LFunctionExpression$($this._expr2) ? "return type not declared" : "argument / return types not declared")));
			return false;
		}
	} else {
		if (! $this._expr1.getType$().equals$LType$(Type.variantType)) {
			if (! FunctionExpression$deductTypeIfUnknown_0$LFunctionExpression$LAnalysisContext$LResolvedFunctionType$($this._expr2, context, $this._expr1.getType$())) {
				return false;
			}
		}
	}
	return (! $this._expr1.assertIsAssignable$LAnalysisContext$LToken$LType$(context, $this._token, $this._expr2.getType$()) ? false : ! $this._expr2.analyze$LAnalysisContext$LExpression$(context, $this) ? false : true);
};

AssignmentExpression._analyzeFunctionExpressionAssignment_0$LAssignmentExpression$LAnalysisContext$LExpression$ = AssignmentExpression$_analyzeFunctionExpressionAssignment_0$LAssignmentExpression$LAnalysisContext$LExpression$;

AssignmentExpression.prototype.getType$ = function () {
	return this._expr1.getType$();
};


function BinaryNumberExpression(operatorToken, expr1, expr2) {
	this._stash = {};
	this._token = operatorToken;
	this._expr1 = expr1;
	this._expr2 = expr2;
};

$__jsx_extend([BinaryNumberExpression], BinaryExpression);
BinaryNumberExpression.prototype.clone$ = function () {
	return new BinaryNumberExpression(this._token, this._expr1.clone$(), this._expr2.clone$());
};


BinaryNumberExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var $this$0;
	var $this$1;
	var _token$0;
	if (! BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	switch (Token$getValue_0$LToken$(this._token)) {
	case "<":
	case "<=":
	case ">":
	case ">=":
		if (OperatorExpression$isConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr1, Type.numberType, true)) {
			return OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr2, Type.numberType, true);
		}
		if (OperatorExpression$isConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr1, Type.stringType, true)) {
			return OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr2, Type.stringType, true);
		}
		context.errors.push(new CompileError(_token$0 = this._token, "cannot apply operator '" + Token$getValue_0$LToken$(_token$0) + "' to type '" + this._expr1.getType$().toString() + "'"));
		return false;
	default:
		$this$0 = this._expr1.getType$();
		$this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0;
		if (! OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr1, Type.numberType, true)) {
			return false;
		}
		$this$1 = this._expr2.getType$();
		$this$1 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$1) : $this$1;
		if (! OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr2, Type.numberType, true)) {
			return false;
		}
		return true;
	}
};


BinaryNumberExpression.prototype.getType$ = function () {
	switch (Token$getValue_0$LToken$(this._token)) {
	case "+":
	case "-":
	case "*":
		if (Type$resolveIfNullable_0$LType$(this._expr1.getType$()).equals$LType$(Type.numberType) || Type$resolveIfNullable_0$LType$(this._expr2.getType$()).equals$LType$(Type.numberType)) {
			return Type.numberType;
		} else {
			return Type.integerType;
		}
	case "/":
	case "%":
		return Type.numberType;
	case "<":
	case "<=":
	case ">":
	case ">=":
		return Type.booleanType;
	case "&":
	case "|":
	case "^":
		return Type.integerType;
	default:
		throw new Error("unexpected operator:" + Token$getValue_0$LToken$(this._token));
	}
};


function EqualityExpression(operatorToken, expr1, expr2) {
	this._stash = {};
	this._token = operatorToken;
	this._expr1 = expr1;
	this._expr2 = expr2;
};

$__jsx_extend([EqualityExpression], BinaryExpression);
EqualityExpression.prototype.clone$ = function () {
	return new EqualityExpression(this._token, this._expr1.clone$(), this._expr2.clone$());
};


EqualityExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var $this = this;
	var bool;
	var expr1Type;
	var expr2Type;
	function bool(x) {
		return (x ? 1 : 0);
	}
	if (! BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	expr1Type = this._expr1.getType$();
	expr2Type = this._expr2.getType$();
	if ((expr1Type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(expr1Type) : expr1Type).equals$LType$(expr2Type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(expr2Type) : expr2Type)) {
	} else {
		if (expr1Type.isConvertibleTo$LType$(expr2Type) || expr2Type.isConvertibleTo$LType$(expr1Type)) {
		} else {
			if (bool(expr1Type instanceof ObjectType) + bool(expr2Type instanceof ObjectType) === 1 && expr1Type.getClassDef$() == expr2Type.getClassDef$()) {
			} else {
				context.errors.push(new CompileError(this._token, "either side of operator == should be convertible from the other"));
				return false;
			}
		}
	}
	return true;
};


EqualityExpression.prototype.getType$ = function () {
	return Type.booleanType;
};


function InExpression(operatorToken, expr1, expr2) {
	this._stash = {};
	this._token = operatorToken;
	this._expr1 = expr1;
	this._expr2 = expr2;
};

$__jsx_extend([InExpression], BinaryExpression);
InExpression.prototype.clone$ = function () {
	return new InExpression(this._token, this._expr1.clone$(), this._expr2.clone$());
};


InExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var expr2Type;
	var expr2ClassDef;
	if (! BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	if (! Type$resolveIfNullable_0$LType$(this._expr1.getType$()).equals$LType$(Type.stringType)) {
		context.errors.push(new CompileError(this._token, "left operand of 'in' expression should be a string"));
		return false;
	}
	if ((expr2Type = Type$resolveIfNullable_0$LType$(this._expr2.getType$())) instanceof ObjectType && (expr2ClassDef = expr2Type.getClassDef$()) instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(expr2ClassDef) === "Map") {
	} else {
		context.errors.push(new CompileError(this._token, "right operand of 'in' expression should be a map"));
		return false;
	}
	return true;
};


InExpression.prototype.getType$ = function () {
	return Type.booleanType;
};


function LogicalExpression(operatorToken, expr1, expr2) {
	this._stash = {};
	this._token = operatorToken;
	this._expr1 = expr1;
	this._expr2 = expr2;
};

$__jsx_extend([LogicalExpression], BinaryExpression);
LogicalExpression.prototype.clone$ = function () {
	return new LogicalExpression(this._token, this._expr1.clone$(), this._expr2.clone$());
};


LogicalExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var _token$0;
	var _token$1;
	if (! BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$(this, context)) {
		return false;
	}
	if (Type$resolveIfNullable_0$LType$(this._expr1.getType$()).equals$LType$(Type.voidType)) {
		context.errors.push(new CompileError(_token$0 = this._token, "left argument of operator '" + Token$getValue_0$LToken$(_token$0) + "' cannot be void"));
		return false;
	}
	if (Type$resolveIfNullable_0$LType$(this._expr2.getType$()).equals$LType$(Type.voidType)) {
		context.errors.push(new CompileError(_token$1 = this._token, "right argument of operator '" + Token$getValue_0$LToken$(_token$1) + "' cannot be void"));
		return false;
	}
	return true;
};


LogicalExpression.prototype.getType$ = function () {
	return Type.booleanType;
};


function ShiftExpression(operatorToken, expr1, expr2) {
	this._stash = {};
	this._token = operatorToken;
	this._expr1 = expr1;
	this._expr2 = expr2;
};

$__jsx_extend([ShiftExpression], BinaryExpression);
ShiftExpression.prototype.clone$ = function () {
	return new ShiftExpression(this._token, this._expr1.clone$(), this._expr2.clone$());
};


ShiftExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return (! BinaryExpression$_analyze_0$LBinaryExpression$LAnalysisContext$(this, context) ? false : ! OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr1, Type.integerType, true) ? false : ! OperatorExpression$assertIsConvertibleTo_0$LOperatorExpression$LAnalysisContext$LExpression$LType$B(this, context, this._expr2, Type.integerType, true) ? false : true);
};


ShiftExpression.prototype.getType$ = function () {
	return Type.integerType;
};


function ConditionalExpression(operatorToken, condExpr, ifTrueExpr, ifFalseExpr) {
	ConditionalExpression$0.call(this, operatorToken, condExpr, ifTrueExpr, ifFalseExpr, null);
};

function ConditionalExpression$0(operatorToken, condExpr, ifTrueExpr, ifFalseExpr, type) {
	this._stash = {};
	this._token = operatorToken;
	this._condExpr = condExpr;
	this._ifTrueExpr = ifTrueExpr;
	this._ifFalseExpr = ifFalseExpr;
	this._type = (type != null ? type : null);
};

$__jsx_extend([ConditionalExpression, ConditionalExpression$0], OperatorExpression);
ConditionalExpression.prototype.clone$ = function () {
	return new ConditionalExpression$0(this._token, this._condExpr.clone$(), this._ifTrueExpr != null ? this._ifTrueExpr.clone$() : null, this._ifFalseExpr.clone$(), this._type);
};


function ConditionalExpression$getCondExpr_0$LConditionalExpression$($this) {
	return $this._condExpr;
};

ConditionalExpression.getCondExpr_0$LConditionalExpression$ = ConditionalExpression$getCondExpr_0$LConditionalExpression$;

function ConditionalExpression$setCondExpr_0$LConditionalExpression$LExpression$($this, expr) {
	$this._condExpr = expr;
};

ConditionalExpression.setCondExpr_0$LConditionalExpression$LExpression$ = ConditionalExpression$setCondExpr_0$LConditionalExpression$LExpression$;

function ConditionalExpression$getIfTrueExpr_0$LConditionalExpression$($this) {
	return $this._ifTrueExpr;
};

ConditionalExpression.getIfTrueExpr_0$LConditionalExpression$ = ConditionalExpression$getIfTrueExpr_0$LConditionalExpression$;

function ConditionalExpression$getIfFalseExpr_0$LConditionalExpression$($this) {
	return $this._ifFalseExpr;
};

ConditionalExpression.getIfFalseExpr_0$LConditionalExpression$ = ConditionalExpression$getIfFalseExpr_0$LConditionalExpression$;

ConditionalExpression.prototype.serialize$ = function () {
	return [ "ConditionalExpression", Token$serialize_0$LToken$(this._token), this._condExpr.serialize$(), Serializer$Expression$E$serializeNullable$LExpression$(this._ifTrueExpr), this._ifFalseExpr.serialize$() ];
};


ConditionalExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var typeIfTrue;
	var typeIfFalse;
	var _ifTrueExpr$0;
	var _type$0;
	if (! this._condExpr.analyze$LAnalysisContext$LExpression$(context, this)) {
		return false;
	}
	if ((_ifTrueExpr$0 = this._ifTrueExpr) != null && ! _ifTrueExpr$0.analyze$LAnalysisContext$LExpression$(context, this)) {
		return false;
	}
	if (! this._ifFalseExpr.analyze$LAnalysisContext$LExpression$(context, this)) {
		return false;
	}
	if (this._condExpr.getType$().equals$LType$(Type.voidType)) {
		context.errors.push(new CompileError(this._token, "condition cannot be void"));
		return false;
	}
	if (this._ifTrueExpr != null) {
		typeIfTrue = this._ifTrueExpr.getType$();
	} else {
		typeIfTrue = this._condExpr.getType$();
	}
	typeIfFalse = this._ifFalseExpr.getType$();
	_type$0 = this._type = Type$calcLeastCommonAncestor$LType$LType$B(typeIfTrue, typeIfFalse, false);
	if (_type$0 == null) {
		context.errors.push(new CompileError(this._token, "could not get the join type of '" + typeIfTrue.toString() + "' and '" + typeIfFalse.toString() + "'"));
		return false;
	}
	return true;
};


ConditionalExpression.prototype.getType$ = function () {
	return this._type;
};


ConditionalExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._condExpr, (function (expr) {
		$this._condExpr = expr;
	})) ? false : this._ifTrueExpr != null && ! cb(this._ifTrueExpr, (function (expr) {
		$this._ifTrueExpr = expr;
	})) ? false : ! cb(this._ifFalseExpr, (function (expr) {
		$this._ifFalseExpr = expr;
	})) ? false : true);
};


function CallExpression(token, expr, args) {
	this._stash = {};
	this._token = token;
	this._expr = expr;
	this._args = args;
};

function CallExpression$0(that) {
	OperatorExpression.call(this, that);
	this._expr = that._expr.clone$();
	this._args = Cloner$Expression$E$cloneArray$ALExpression$(that._args);
};

$__jsx_extend([CallExpression, CallExpression$0], OperatorExpression);
CallExpression.prototype.clone$ = function () {
	return new CallExpression$0(this);
};


function CallExpression$getExpr_0$LCallExpression$($this) {
	return $this._expr;
};

CallExpression.getExpr_0$LCallExpression$ = CallExpression$getExpr_0$LCallExpression$;

function CallExpression$setExpr_0$LCallExpression$LExpression$($this, expr) {
	$this._expr = expr;
};

CallExpression.setExpr_0$LCallExpression$LExpression$ = CallExpression$setExpr_0$LCallExpression$LExpression$;

function CallExpression$getArguments_0$LCallExpression$($this) {
	return $this._args;
};

CallExpression.getArguments_0$LCallExpression$ = CallExpression$getArguments_0$LCallExpression$;

CallExpression.prototype.serialize$ = function () {
	return [ "CallExpression", Token$serialize_0$LToken$(this._token), this._expr.serialize$(), Serializer$Expression$E$serializeArray$ALExpression$(this._args) ];
};


CallExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var exprType;
	var argTypes;
	var isCallingStatic;
	var $this$0;
	var _args$0;
	if (! this._expr.analyze$LAnalysisContext$LExpression$(context, this)) {
		return false;
	}
	$this$0 = this._expr.getType$();
	exprType = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	if (! (exprType instanceof FunctionType)) {
		context.errors.push(new CompileError(this._token, "cannot call a non-function"));
		return false;
	}
	argTypes = Util$analyzeArgs$LAnalysisContext$ALExpression$LExpression$AALType$(context, _args$0 = this._args, this, exprType.getExpectedTypes$NB(_args$0.length, ! (this._expr instanceof PropertyExpression && ! exprType.isAssignable$() && ! UnaryExpression$getExpr_0$LUnaryExpression$(this._expr).isClassSpecifier$())));
	if (argTypes == null) {
		return false;
	}
	if (this._expr instanceof PropertyExpression && ! exprType.isAssignable$()) {
		isCallingStatic = UnaryExpression$getExpr_0$LUnaryExpression$(this._expr).isClassSpecifier$();
		if (! isCallingStatic && Token$getValue_0$LToken$(PropertyExpression$getIdentifierToken_0$LPropertyExpression$(this._expr)) === "constructor") {
			context.errors.push(new CompileError(this._token, "cannot call a constructor other than by using 'new'"));
			return false;
		}
		if (PropertyExpression$deduceByArgumentTypes_0$LPropertyExpression$LAnalysisContext$LToken$ALType$B(this._expr, context, this._token, argTypes, isCallingStatic) == null) {
			return false;
		}
	} else {
		if (exprType.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B(context, this._token, argTypes, true) == null) {
			return false;
		}
	}
	return true;
};


CallExpression.prototype.getType$ = function () {
	var type;
	type = this._expr.getType$();
	return (type == null ? null : ResolvedFunctionType$getReturnType_0$LResolvedFunctionType$(type instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(type) : type));
};


CallExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr, (function (expr) {
		$this._expr = expr;
	})) ? false : ! Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(cb, this._args) ? false : true);
};


function SuperExpression(token, name, args) {
	this._stash = {};
	this._token = token;
	this._name = name;
	this._args = args;
	this._funcType = null;
};

function SuperExpression$0(that) {
	OperatorExpression.call(this, that);
	this._name = that._name;
	this._args = Cloner$Expression$E$cloneArray$ALExpression$(that._args);
	this._funcType = that._funcType;
};

$__jsx_extend([SuperExpression, SuperExpression$0], OperatorExpression);
SuperExpression.prototype.clone$ = function () {
	return new SuperExpression$0(this);
};


function SuperExpression$getArguments_0$LSuperExpression$($this) {
	return $this._args;
};

SuperExpression.getArguments_0$LSuperExpression$ = SuperExpression$getArguments_0$LSuperExpression$;

SuperExpression.prototype.serialize$ = function () {
	return [ "SuperExpression", Token$serialize_0$LToken$(this._token), Token$serialize_0$LToken$(this._name), Serializer$Expression$E$serializeArray$ALExpression$(this._args) ];
};


SuperExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var classDef;
	var funcType;
	var argTypes;
	var $this$0;
	var _args$0;
	if ((MemberDefinition$flags_0$LMemberDefinition$(context.funcDef) & 8) !== 0) {
		context.errors.push(new CompileError(this._token, "cannot use 'super' keyword in a static function"));
		return false;
	}
	$this$0 = context.funcDef;
	classDef = $this$0._classDef;
	funcType = null;
	if ((funcType = ClassDefinition$getMemberTypeByName_0$LClassDefinition$ALCompileError$LToken$SBALType$N(classDef, context.errors, this._token, Token$getValue_0$LToken$(this._name), false, [], 2)) == null) {
		context.errors.push(new CompileError(this._token, "could not find a member function with given name in super classes of class '" + classDef.className$() + "'"));
		return false;
	}
	argTypes = Util$analyzeArgs$LAnalysisContext$ALExpression$LExpression$AALType$(context, _args$0 = this._args, this, funcType.getExpectedTypes$NB(_args$0.length, false));
	if (argTypes == null) {
		return false;
	}
	if ((funcType = funcType.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B(context, this._token, argTypes, false)) == null) {
		return false;
	}
	this._funcType = funcType;
	return true;
};


SuperExpression.prototype.getType$ = function () {
	var $this$0;
	$this$0 = this._funcType;
	return $this$0._returnType;
};


SuperExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return (! Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(cb, this._args) ? false : true);
};


function NewExpression(token, type, args) {
	this._stash = {};
	this._token = token;
	this._type = type;
	this._args = args;
	this._constructor = null;
};

function NewExpression$0(that) {
	OperatorExpression.call(this, that);
	this._type = that._type;
	this._args = Cloner$Expression$E$cloneArray$ALExpression$(that._args);
	this._constructor = that._constructor;
};

$__jsx_extend([NewExpression, NewExpression$0], OperatorExpression);
NewExpression.prototype.clone$ = function () {
	return new NewExpression$0(this);
};


function NewExpression$getArguments_0$LNewExpression$($this) {
	return $this._args;
};

NewExpression.getArguments_0$LNewExpression$ = NewExpression$getArguments_0$LNewExpression$;

NewExpression.prototype.serialize$ = function () {
	return [ "NewExpression", Token$serialize_0$LToken$(this._token), Type$serialize_0$LType$(this._type), Serializer$Expression$E$serializeArray$ALExpression$(this._args) ];
};


NewExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	var classDef;
	var ctors;
	var argTypes;
	var _args$0;
	if (! (this._type instanceof ObjectType)) {
		context.errors.push(new CompileError(this._token, "cannot instantiate a non-object type: " + this._type.toString()));
		return false;
	}
	classDef = this._type.getClassDef$();
	if (classDef == null) {
		return false;
	}
	if ((classDef.flags$() & 192) !== 0) {
		context.errors.push(new CompileError(this._token, "cannot instantiate an interface or a mixin"));
		return false;
	}
	if ((classDef.flags$() & 2) !== 0) {
		context.errors.push(new CompileError(this._token, "cannot instantiate an abstract class"));
		return false;
	}
	ctors = ClassDefinition$getMemberTypeByName_0$LClassDefinition$ALCompileError$LToken$SBALType$N(classDef, context.errors, this._token, "constructor", false, [], 1);
	if (ctors == null) {
		context.errors.push(new CompileError(this._token, "the class cannot be instantiated"));
		return false;
	}
	argTypes = Util$analyzeArgs$LAnalysisContext$ALExpression$LExpression$AALType$(context, _args$0 = this._args, this, ctors.getExpectedTypes$NB(_args$0.length, false));
	if (argTypes == null) {
		return false;
	}
	if ((this._constructor = ctors.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B(context, this._token, argTypes, false)) == null) {
		context.errors.push(new CompileError(this._token, "cannot create an object of type '" + this._type.toString() + "', arguments mismatch"));
		return false;
	}
	return true;
};


NewExpression.prototype.getType$ = function () {
	return this._type;
};


function NewExpression$getConstructor_0$LNewExpression$($this) {
	return $this._constructor;
};

NewExpression.getConstructor_0$LNewExpression$ = NewExpression$getConstructor_0$LNewExpression$;

NewExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return (! Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(cb, this._args) ? false : true);
};


function CommaExpression(token, expr1, expr2) {
	this._stash = {};
	this._token = token;
	this._expr1 = expr1;
	this._expr2 = expr2;
};

$__jsx_extend([CommaExpression], Expression);
CommaExpression.prototype.clone$ = function () {
	return new CommaExpression(this._token, this._expr1.clone$(), this._expr2.clone$());
};


function CommaExpression$getFirstExpr_0$LCommaExpression$($this) {
	return $this._expr1;
};

CommaExpression.getFirstExpr_0$LCommaExpression$ = CommaExpression$getFirstExpr_0$LCommaExpression$;

function CommaExpression$getSecondExpr_0$LCommaExpression$($this) {
	return $this._expr2;
};

CommaExpression.getSecondExpr_0$LCommaExpression$ = CommaExpression$getSecondExpr_0$LCommaExpression$;

CommaExpression.prototype.serialize$ = function () {
	return [ "CommaExpression", this._expr1.serialize$(), this._expr2.serialize$() ];
};


CommaExpression.prototype.analyze$LAnalysisContext$LExpression$ = function (context, parentExpr) {
	return this._expr1.analyze$LAnalysisContext$LExpression$(context, this) && this._expr2.analyze$LAnalysisContext$LExpression$(context, this);
};


CommaExpression.prototype.getType$ = function () {
	return this._expr2.getType$();
};


CommaExpression.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr1, (function (expr) {
		$this._expr1 = expr;
	})) ? false : ! cb(this._expr2, (function (expr) {
		$this._expr2 = expr;
	})) ? false : true);
};


function Statement() {
};

$__jsx_extend([Statement], Object);
$__jsx_merge_interface(Statement, Stashable);

function Statement$analyze_0$LStatement$LAnalysisContext$($this, context) {
	var token;
	var srcPos;
	if (! ($this instanceof CaseStatement || $this instanceof DefaultStatement)) {
		if (! Statement$assertIsReachable$LAnalysisContext$LToken$(context, $this.getToken$())) {
			return false;
		}
	}
	try {
		return $this.doAnalyze$LAnalysisContext$(context);
	} catch ($__jsx_catch_0) {
		if ($__jsx_catch_0 instanceof Error) {
			token = $this.getToken$();
			srcPos = (token != null ? Util$format$SAS(" at file %1, line %2", [ token._filename, token._lineNumber + "" ]) : "");
			$__jsx_catch_0.message = Util$format$SAS("fatal error while compiling statement%1\n%2", [ srcPos, $__jsx_catch_0.message ]);
			throw $__jsx_catch_0;
		} else {
			throw $__jsx_catch_0;
		}
	}
};

Statement.analyze_0$LStatement$LAnalysisContext$ = Statement$analyze_0$LStatement$LAnalysisContext$;

Statement.prototype.forEachStatement$F$LStatement$B$ = function (cb) {
	return true;
};


Statement.prototype.handleStatements$F$ALStatement$B$ = function (cb) {
	return true;
};


function Statement$forEachExpression_0$LStatement$F$LExpression$B$($this, cb) {
	return $this.forEachExpression$F$LExpression$F$LExpression$V$B$((function (expr, _) {
		return cb(expr);
	}));
};

Statement.forEachExpression_0$LStatement$F$LExpression$B$ = Statement$forEachExpression_0$LStatement$F$LExpression$B$;

function Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$($this, context, expr) {
	var result;
	if (context.statement != null) {
		throw new Error("logic flaw");
	}
	context.statement = $this;
	result = false;
	try {
		result = expr.analyze$LAnalysisContext$LExpression$(context, null);
	} finally {
		context.statement = null;
	}
	return result;
};

Statement._analyzeExpr_0$LStatement$LAnalysisContext$LExpression$ = Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$;

function Statement$assertIsReachable$LAnalysisContext$LToken$(context, token) {
	var blockStack$0;
	if (! LocalVariableStatuses$isReachable_0$LLocalVariableStatuses$((blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses)) {
		context.errors.push(new CompileWarning(token, "the code is unreachable"));
	}
	return true;
};

Statement.assertIsReachable$LAnalysisContext$LToken$ = Statement$assertIsReachable$LAnalysisContext$LToken$;

function ConstructorInvocationStatement(token, ctorClassType, args) {
	ConstructorInvocationStatement$0.call(this, token, ctorClassType, args, null);
};

function ConstructorInvocationStatement$0(token, ctorClassType, args, ctorFunctionType) {
	this._stash = {};
	this._token = token;
	this._ctorClassType = ctorClassType;
	this._args = args;
	this._ctorFunctionType = (ctorFunctionType != null ? ctorFunctionType : null);
};

$__jsx_extend([ConstructorInvocationStatement, ConstructorInvocationStatement$0], Statement);
ConstructorInvocationStatement.prototype.clone$ = function () {
	return new ConstructorInvocationStatement$0(this._token, this._ctorClassType, Cloner$Expression$E$cloneArray$ALExpression$(this._args), this._ctorFunctionType);
};


ConstructorInvocationStatement.prototype.instantiate$LInstantiationContext$ = function (instantiationContext) {
	if (this._ctorFunctionType != null) {
		throw new Error("instantiation after analysis?");
	}
	return new ConstructorInvocationStatement$0(this._token, this._ctorClassType.instantiate$LInstantiationContext$(instantiationContext), Cloner$Expression$E$cloneArray$ALExpression$(this._args), null);
};


function ConstructorInvocationStatement$instantiate_0$LConstructorInvocationStatement$LInstantiationContext$($this, instantiationContext) {
	if ($this._ctorFunctionType != null) {
		throw new Error("instantiation after analysis?");
	}
	return new ConstructorInvocationStatement$0($this._token, $this._ctorClassType.instantiate$LInstantiationContext$(instantiationContext), Cloner$Expression$E$cloneArray$ALExpression$($this._args), null);
};

ConstructorInvocationStatement.instantiate_0$LConstructorInvocationStatement$LInstantiationContext$ = ConstructorInvocationStatement$instantiate_0$LConstructorInvocationStatement$LInstantiationContext$;

ConstructorInvocationStatement.prototype.getToken$ = function () {
	return this._token;
};


function ConstructorInvocationStatement$getArguments_0$LConstructorInvocationStatement$($this) {
	return $this._args;
};

ConstructorInvocationStatement.getArguments_0$LConstructorInvocationStatement$ = ConstructorInvocationStatement$getArguments_0$LConstructorInvocationStatement$;

function ConstructorInvocationStatement$getConstructingClassDef_0$LConstructorInvocationStatement$($this) {
	return $this._ctorClassType.getClassDef$();
};

ConstructorInvocationStatement.getConstructingClassDef_0$LConstructorInvocationStatement$ = ConstructorInvocationStatement$getConstructingClassDef_0$LConstructorInvocationStatement$;

function ConstructorInvocationStatement$getConstructorType_0$LConstructorInvocationStatement$($this) {
	return $this._ctorFunctionType;
};

ConstructorInvocationStatement.getConstructorType_0$LConstructorInvocationStatement$ = ConstructorInvocationStatement$getConstructorType_0$LConstructorInvocationStatement$;

ConstructorInvocationStatement.prototype.serialize$ = function () {
	return [ "ConstructorInvocationStatement", Type$serialize_0$LType$(this._ctorClassType), Serializer$Expression$E$serializeArray$ALExpression$(this._args) ];
};


ConstructorInvocationStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var ctorType;
	var argTypes;
	var _args$0;
	ctorType = ClassDefinition$getMemberTypeByName_0$LClassDefinition$ALCompileError$LToken$SBALType$N(ConstructorInvocationStatement$getConstructingClassDef_0$LConstructorInvocationStatement$(this), context.errors, this._token, "constructor", false, [], 1);
	if (ctorType == null) {
		if (this._args.length !== 0) {
			context.errors.push(new CompileError(this._token, "no function with matching arguments"));
			return true;
		}
		ctorType = new MemberFunctionType(ConstructorInvocationStatement$getConstructingClassDef_0$LConstructorInvocationStatement$(this).getToken$(), new ObjectType(ConstructorInvocationStatement$getConstructingClassDef_0$LConstructorInvocationStatement$(this)), Type.voidType, [], false);
	} else {
		argTypes = Util$analyzeArgs$LAnalysisContext$ALExpression$LExpression$AALType$(context, _args$0 = this._args, null, ctorType.getExpectedTypes$NB(_args$0.length, false));
		if (argTypes == null) {
			return true;
		}
		if ((ctorType = ctorType.deduceByArgumentTypes$LAnalysisContext$LToken$ALType$B(context, this._token, argTypes, false)) == null) {
			return true;
		}
	}
	this._ctorFunctionType = ctorType;
	return true;
};


ConstructorInvocationStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return (! Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(cb, this._args) ? false : true);
};


function UnaryExpressionStatement(expr) {
	this._stash = {};
	this._expr = null;
	if (expr == null) {
		throw new Error("logic flaw");
	}
	this._expr = expr;
};

$__jsx_extend([UnaryExpressionStatement], Statement);
UnaryExpressionStatement.prototype.getToken$ = function () {
	var $this$0;
	$this$0 = this._expr;
	return $this$0._token;
};


function UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$($this) {
	return $this._expr;
};

UnaryExpressionStatement.getExpr_0$LUnaryExpressionStatement$ = UnaryExpressionStatement$getExpr_0$LUnaryExpressionStatement$;

function UnaryExpressionStatement$setExpr_0$LUnaryExpressionStatement$LExpression$($this, expr) {
	$this._expr = expr;
};

UnaryExpressionStatement.setExpr_0$LUnaryExpressionStatement$LExpression$ = UnaryExpressionStatement$setExpr_0$LUnaryExpressionStatement$LExpression$;

UnaryExpressionStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr);
	return true;
};


UnaryExpressionStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr, (function (expr) {
		$this._expr = expr;
	})) ? false : true);
};


function ExpressionStatement(expr) {
	UnaryExpressionStatement.call(this, expr);
};

$__jsx_extend([ExpressionStatement], UnaryExpressionStatement);
ExpressionStatement.prototype.clone$ = function () {
	return new ExpressionStatement(this._expr.clone$());
};


ExpressionStatement.prototype.serialize$ = function () {
	return [ "ExpressionStatement", this._expr.serialize$() ];
};


function FunctionStatement(token, funcDef) {
	this._stash = {};
	this._token = token;
	this._funcDef = funcDef;
};

$__jsx_extend([FunctionStatement], Statement);
FunctionStatement.prototype.clone$ = function () {
	return new FunctionStatement(this._token, this._funcDef);
};


FunctionStatement.prototype.getToken$ = function () {
	return this._token;
};


function FunctionStatement$getFuncDef_0$LFunctionStatement$($this) {
	return $this._funcDef;
};

FunctionStatement.getFuncDef_0$LFunctionStatement$ = FunctionStatement$getFuncDef_0$LFunctionStatement$;

function FunctionStatement$setFuncDef_0$LFunctionStatement$LMemberFunctionDefinition$($this, funcDef) {
	$this._funcDef = funcDef;
};

FunctionStatement.setFuncDef_0$LFunctionStatement$LMemberFunctionDefinition$ = FunctionStatement$setFuncDef_0$LFunctionStatement$LMemberFunctionDefinition$;

FunctionStatement.prototype.serialize$ = function () {
	return [ "FunctionStatement", this._funcDef.serialize$() ];
};


FunctionStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var blockStack$0;
	if (! FunctionStatement$_typesAreIdentified_0$LFunctionStatement$(this)) {
		context.errors.push(new CompileError(this._token, "argument / return types were not automatically deductable, please specify them by hand"));
		return false;
	}
	MemberFunctionDefinition$analyze_0$LMemberFunctionDefinition$LAnalysisContext$(this._funcDef, context);
	LocalVariableStatuses$setStatus_0$LLocalVariableStatuses$LLocalVariable$((blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses, MemberFunctionDefinition$getFuncLocal_0$LMemberFunctionDefinition$(this._funcDef));
	return true;
};


function FunctionStatement$_typesAreIdentified_0$LFunctionStatement$($this) {
	var argTypes;
	var i;
	var argTypes$len$0;
	argTypes = MemberFunctionDefinition$getArgumentTypes_0$LMemberFunctionDefinition$($this._funcDef);
	for ((i = 0, argTypes$len$0 = argTypes.length); i < argTypes$len$0; ++ i) {
		if (argTypes[i] == null) {
			return false;
		}
	}
	return (MemberFunctionDefinition$getReturnType_0$LMemberFunctionDefinition$($this._funcDef) == null ? false : true);
};

FunctionStatement._typesAreIdentified_0$LFunctionStatement$ = FunctionStatement$_typesAreIdentified_0$LFunctionStatement$;

FunctionStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function ReturnStatement(token, expr) {
	this._stash = {};
	this._token = token;
	this._expr = expr;
};

$__jsx_extend([ReturnStatement], Statement);
ReturnStatement.prototype.clone$ = function () {
	return new ReturnStatement(this._token, Cloner$Expression$E$cloneNullable$LExpression$(this._expr));
};


ReturnStatement.prototype.getToken$ = function () {
	return this._token;
};


function ReturnStatement$getExpr_0$LReturnStatement$($this) {
	return $this._expr;
};

ReturnStatement.getExpr_0$LReturnStatement$ = ReturnStatement$getExpr_0$LReturnStatement$;

function ReturnStatement$setExpr_0$LReturnStatement$LExpression$($this, expr) {
	$this._expr = expr;
};

ReturnStatement.setExpr_0$LReturnStatement$LExpression$ = ReturnStatement$setExpr_0$LReturnStatement$LExpression$;

ReturnStatement.prototype.serialize$ = function () {
	return [ "ReturnStatement", Serializer$Expression$E$serializeNullable$LExpression$(this._expr) ];
};


ReturnStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var returnType;
	var exprType;
	var $this$0;
	var $this$1;
	var $this$2;
	var $this$3;
	var type$0;
	var $this$4;
	var _expr$0;
	var blockStack$0;
	$this$0 = context.funcDef;
	if (($this$0._flags & 8192) !== 0) {
		context.errors.push(new CompileError(this._token, "return statement in generator is not allowed"));
		return true;
	}
	$this$1 = context.funcDef;
	returnType = $this$1._returnType;
	if (returnType == null) {
		if (this._expr != null) {
			if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
				return true;
			}
			exprType = this._expr.getType$();
			if (exprType == null) {
				return true;
			}
			$this$2 = context.funcDef;
			$this$2._returnType = exprType;
		} else {
			$this$3 = context.funcDef;
			type$0 = Type.voidType;
			$this$3._returnType = type$0;
		}
	} else {
		if (returnType.equals$LType$(Type.voidType)) {
			if (this._expr != null) {
				context.errors.push(new CompileError(this._token, "cannot return a value from a void function"));
				return true;
			}
		} else {
			if (this._expr == null) {
				context.errors.push(new CompileError(this._token, "cannot return void, the function is declared to return a value of type '" + returnType.toString() + "'"));
				return true;
			}
			if ((_expr$0 = this._expr) instanceof FunctionExpression && ! FunctionExpression$argumentTypesAreIdentified_0$LFunctionExpression$(_expr$0) && returnType instanceof StaticFunctionType) {
				if (! FunctionExpression$deductTypeIfUnknown_0$LFunctionExpression$LAnalysisContext$LResolvedFunctionType$(this._expr, context, returnType)) {
					return false;
				}
			}
			if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
				return true;
			}
			exprType = this._expr.getType$();
			if (exprType == null) {
				return true;
			}
			if (! exprType.isConvertibleTo$LType$(returnType)) {
				context.errors.push(new CompileError(this._token, "cannot convert '" + exprType.toString() + "' to return type '" + returnType.toString() + "'"));
				return false;
			}
		}
	}
	$this$4 = (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses;
	$this$4._isReachable = false;
	return true;
};


ReturnStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	var _expr$0;
	return ((_expr$0 = this._expr) != null && ! cb(_expr$0, (function (expr) {
		$this._expr = expr;
	})) ? false : true);
};


function YieldStatement(token, expr) {
	this._stash = {};
	this._token = token;
	this._expr = expr;
};

$__jsx_extend([YieldStatement], Statement);
YieldStatement.prototype.clone$ = function () {
	return new YieldStatement(this._token, Cloner$Expression$E$cloneNullable$LExpression$(this._expr));
};


YieldStatement.prototype.getToken$ = function () {
	return this._token;
};


function YieldStatement$getExpr_0$LYieldStatement$($this) {
	return $this._expr;
};

YieldStatement.getExpr_0$LYieldStatement$ = YieldStatement$getExpr_0$LYieldStatement$;

YieldStatement.prototype.serialize$ = function () {
	return [ "YieldStatement", Serializer$Expression$E$serializeNullable$LExpression$(this._expr) ];
};


YieldStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var returnType;
	var yieldType;
	var $this$0;
	var $this$1;
	var type$0;
	if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
		return true;
	}
	if (this._expr.getType$() == null) {
		return true;
	}
	$this$0 = context.funcDef;
	returnType = $this$0._returnType;
	if (returnType == null) {
		yieldType = this._expr.getType$();
		$this$1 = context.funcDef;
		type$0 = new ObjectType(Util$instantiateTemplate$LAnalysisContext$LToken$SALType$(context, this._token, "g_Enumerable", [ yieldType ]));
		$this$1._returnType = type$0;
	} else {
		if (returnType instanceof ObjectType && returnType.getClassDef$() instanceof InstantiatedClassDefinition && InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(returnType.getClassDef$()) === "g_Enumerable") {
			yieldType = InstantiatedClassDefinition$getTypeArguments_0$LInstantiatedClassDefinition$(returnType.getClassDef$())[0];
		} else {
			context.errors.push(new CompileError(this._token, "cannot convert 'g_Enumerable.<" + this._expr.getType$().toString() + ">' to return type '" + returnType.toString() + "'"));
			return false;
		}
	}
	if (! this._expr.getType$().isConvertibleTo$LType$(yieldType)) {
		context.errors.push(new CompileError(this._token, "cannot convert '" + this._expr.getType$().toString() + "' to yield type '" + yieldType.toString() + "'"));
		return false;
	}
	return true;
};


YieldStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	var _expr$0;
	return ((_expr$0 = this._expr) != null && ! cb(_expr$0, (function (expr) {
		$this._expr = expr;
	})) ? false : true);
};


function DeleteStatement(token, expr) {
	UnaryExpressionStatement.call(this, expr);
	this._token = token;
};

$__jsx_extend([DeleteStatement], UnaryExpressionStatement);
DeleteStatement.prototype.clone$ = function () {
	return new DeleteStatement(this._token, this._expr.clone$());
};


DeleteStatement.prototype.getToken$ = function () {
	return this._token;
};


DeleteStatement.prototype.serialize$ = function () {
	return [ "DeleteStatement", this._expr.serialize$() ];
};


DeleteStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var secondExprType;
	if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
		return true;
	}
	if (! (this._expr instanceof ArrayExpression)) {
		context.errors.push(new CompileError(this._token, "only properties of a hash object can be deleted"));
		return true;
	}
	secondExprType = BinaryExpression$getSecondExpr_0$LBinaryExpression$(this._expr).getType$();
	if (secondExprType == null) {
		return true;
	}
	if (! (secondExprType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(secondExprType) : secondExprType).equals$LType$(Type.stringType)) {
		context.errors.push(new CompileError(this._token, "only properties of a hash object can be deleted"));
		return true;
	}
	return true;
};


function JumpStatement() {
};

$__jsx_extend([JumpStatement], Statement);
JumpStatement.prototype.getToken$ = function () {
	return this._token;
};


function JumpStatement$getLabel_0$LJumpStatement$($this) {
	return $this._label;
};

JumpStatement.getLabel_0$LJumpStatement$ = JumpStatement$getLabel_0$LJumpStatement$;

JumpStatement.prototype.serialize$ = function () {
	return [ this._getName$(), Token$serialize_0$LToken$(this._token), Serializer$Token$E$serializeNullable$LToken$(this._label) ];
};


JumpStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var targetBlock;
	var $this$0;
	var blockStack$0;
	var blockStack$1;
	var blockStack$2;
	targetBlock = JumpStatement$_determineDestination_0$LJumpStatement$LAnalysisContext$(this, context);
	if (targetBlock == null) {
		return true;
	}
	if (this instanceof BreakStatement) {
		LabellableStatement$registerVariableStatusesOnBreak_0$LLabellableStatement$LLocalVariableStatuses$(targetBlock.block, (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses);
	} else {
		ContinuableStatement$registerVariableStatusesOnContinue_0$LContinuableStatement$LLocalVariableStatuses$(targetBlock.block, (blockStack$1 = context.blockStack)[blockStack$1.length - 1].localVariableStatuses);
	}
	$this$0 = (blockStack$2 = context.blockStack)[blockStack$2.length - 1].localVariableStatuses;
	$this$0._isReachable = false;
	return true;
};


function JumpStatement$_determineDestination_0$LJumpStatement$LAnalysisContext$($this, context) {
	var i;
	var statement;
	var statementLabel;
	var $this$0;
	var _label$0;
	var _token$0;
	for (i = context.blockStack.length - 1; ! (context.blockStack[i].block instanceof MemberFunctionDefinition); -- i) {
		statement = context.blockStack[i].block;
		if (! (statement instanceof LabellableStatement)) {
			continue;
		}
		if ($this._label != null) {
			$this$0 = statement;
			statementLabel = $this$0._label;
			if (statementLabel != null && statementLabel._value === Token$getValue_0$LToken$($this._label)) {
				if (Token$getValue_0$LToken$($this._token) === "continue" && statement instanceof SwitchStatement) {
					context.errors.push(new CompileError($this._token, "cannot 'continue' to a switch statement"));
					return null;
				}
			} else {
				continue;
			}
		} else {
			if (Token$getValue_0$LToken$($this._token) === "continue" && statement instanceof SwitchStatement) {
				continue;
			}
		}
		return context.blockStack[i];
	}
	if ($this._label != null) {
		context.errors.push(new CompileError(_label$0 = $this._label, "label '" + Token$getValue_0$LToken$(_label$0) + "' is either not defined or invalid as the destination"));
	} else {
		context.errors.push(new CompileError(_token$0 = $this._token, "cannot '" + Token$getValue_0$LToken$(_token$0) + "' at this point"));
	}
	return null;
};

JumpStatement._determineDestination_0$LJumpStatement$LAnalysisContext$ = JumpStatement$_determineDestination_0$LJumpStatement$LAnalysisContext$;

JumpStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function BreakStatement(token, label) {
	this._stash = {};
	this._token = token;
	this._label = label;
};

$__jsx_extend([BreakStatement], JumpStatement);
BreakStatement.prototype.clone$ = function () {
	return new BreakStatement(this._token, this._label);
};


BreakStatement.prototype._getName$ = function () {
	return "BreakStatement";
};


BreakStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function ContinueStatement(token, label) {
	this._stash = {};
	this._token = token;
	this._label = label;
};

$__jsx_extend([ContinueStatement], JumpStatement);
ContinueStatement.prototype.clone$ = function () {
	return new ContinueStatement(this._token, this._label);
};


ContinueStatement.prototype._getName$ = function () {
	return "ContinueStatement";
};


ContinueStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function LabellableStatement() {
};

$__jsx_extend([LabellableStatement], Statement);
$__jsx_merge_interface(LabellableStatement, Block);

LabellableStatement.prototype.getToken$ = function () {
	return this._token;
};


function LabellableStatement$getLabel_0$LLabellableStatement$($this) {
	return $this._label;
};

LabellableStatement.getLabel_0$LLabellableStatement$ = LabellableStatement$getLabel_0$LLabellableStatement$;

function LabellableStatement$_serialize_0$LLabellableStatement$($this) {
	return [ Serializer$Token$E$serializeNullable$LToken$($this._label) ];
};

LabellableStatement._serialize_0$LLabellableStatement$ = LabellableStatement$_serialize_0$LLabellableStatement$;

LabellableStatement.prototype._prepareBlockAnalysis$LAnalysisContext$ = function (context) {
	var $this$0;
	var blockStack$0;
	var blockStack$1;
	var _lvStatusesOnBreak$0;
	(blockStack$0 = context.blockStack).push(({localVariableStatuses: LocalVariableStatuses$clone_0$LLocalVariableStatuses$(blockStack$0[blockStack$0.length - 1].localVariableStatuses), block: this}));
	$this$0 = (blockStack$1 = context.blockStack)[blockStack$1.length - 1].localVariableStatuses;
	_lvStatusesOnBreak$0 = this._lvStatusesOnBreak = new LocalVariableStatuses$0($this$0);
	_lvStatusesOnBreak$0._isReachable = false;
};


LabellableStatement.prototype._abortBlockAnalysis$LAnalysisContext$ = function (context) {
	context.blockStack.pop();
	this._lvStatusesOnBreak = null;
};


LabellableStatement.prototype._finalizeBlockAnalysis$LAnalysisContext$ = function (context) {
	var blockStack$0;
	context.blockStack.pop();
	(blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses = this._lvStatusesOnBreak;
	this._lvStatusesOnBreak = null;
};


function LabellableStatement$registerVariableStatusesOnBreak_0$LLabellableStatement$LLocalVariableStatuses$($this, statuses) {
	if (statuses != null) {
		if ($this._lvStatusesOnBreak == null) {
			$this._lvStatusesOnBreak = new LocalVariableStatuses$0(statuses);
		} else {
			$this._lvStatusesOnBreak = LocalVariableStatuses$merge_0$LLocalVariableStatuses$LLocalVariableStatuses$($this._lvStatusesOnBreak, statuses);
		}
	}
};

LabellableStatement.registerVariableStatusesOnBreak_0$LLabellableStatement$LLocalVariableStatuses$ = LabellableStatement$registerVariableStatusesOnBreak_0$LLabellableStatement$LLocalVariableStatuses$;

function ContinuableStatement() {
};

$__jsx_extend([ContinuableStatement], LabellableStatement);
ContinuableStatement.prototype.getStatements$ = function () {
	return this._statements;
};


ContinuableStatement.prototype.forEachStatement$F$LStatement$B$ = function (cb) {
	return (! Util$forEachStatement$F$LStatement$B$ALStatement$(cb, this._statements) ? false : true);
};


ContinuableStatement.prototype.handleStatements$F$ALStatement$B$ = function (cb) {
	return (! cb(this._statements) ? false : true);
};


ContinuableStatement.prototype._prepareBlockAnalysis$LAnalysisContext$ = function (context) {
	LabellableStatement.prototype._prepareBlockAnalysis$LAnalysisContext$.call(this, context);
	this._lvStatusesOnContinue = null;
};


ContinuableStatement.prototype._abortBlockAnalysis$LAnalysisContext$ = function (context) {
	LabellableStatement.prototype._abortBlockAnalysis$LAnalysisContext$.call(this, context);
	this._lvStatusesOnContinue = null;
};


ContinuableStatement.prototype._finalizeBlockAnalysis$LAnalysisContext$ = function (context) {
	LabellableStatement.prototype._finalizeBlockAnalysis$LAnalysisContext$.call(this, context);
	ContinuableStatement$_restoreContinueVariableStatuses_0$LContinuableStatement$LAnalysisContext$(this, context);
};


function ContinuableStatement$_restoreContinueVariableStatuses_0$LContinuableStatement$LAnalysisContext$($this, context) {
	var blockStack$0;
	if ($this._lvStatusesOnContinue != null) {
		(blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses = LocalVariableStatuses$merge_0$LLocalVariableStatuses$LLocalVariableStatuses$(blockStack$0[blockStack$0.length - 1].localVariableStatuses, $this._lvStatusesOnContinue);
		$this._lvStatusesOnContinue = null;
	}
};

ContinuableStatement._restoreContinueVariableStatuses_0$LContinuableStatement$LAnalysisContext$ = ContinuableStatement$_restoreContinueVariableStatuses_0$LContinuableStatement$LAnalysisContext$;

function ContinuableStatement$registerVariableStatusesOnContinue_0$LContinuableStatement$LLocalVariableStatuses$($this, statuses) {
	if (statuses != null) {
		if ($this._lvStatusesOnContinue == null) {
			$this._lvStatusesOnContinue = new LocalVariableStatuses$0(statuses);
		} else {
			$this._lvStatusesOnContinue = LocalVariableStatuses$merge_0$LLocalVariableStatuses$LLocalVariableStatuses$($this._lvStatusesOnContinue, statuses);
		}
	}
};

ContinuableStatement.registerVariableStatusesOnContinue_0$LContinuableStatement$LLocalVariableStatuses$ = ContinuableStatement$registerVariableStatusesOnContinue_0$LContinuableStatement$LLocalVariableStatuses$;

function DoWhileStatement(token, label, expr, statements) {
	this._stash = {};
	this._lvStatusesOnBreak = null;
	this._token = token;
	this._label = label;
	this._lvStatusesOnContinue = null;
	this._statements = statements;
	this._expr = expr;
};

$__jsx_extend([DoWhileStatement], ContinuableStatement);
DoWhileStatement.prototype.clone$ = function () {
	return new DoWhileStatement(this._token, this._label, this._expr.clone$(), Cloner$Statement$E$cloneArray$ALStatement$(this._statements));
};


function DoWhileStatement$getExpr_0$LDoWhileStatement$($this) {
	return $this._expr;
};

DoWhileStatement.getExpr_0$LDoWhileStatement$ = DoWhileStatement$getExpr_0$LDoWhileStatement$;

DoWhileStatement.prototype.serialize$ = function () {
	return [ "DoWhileStatement" ].concat(LabellableStatement$_serialize_0$LLabellableStatement$(this)).concat([ this._expr.serialize$(), Serializer$Statement$E$serializeArray$ALStatement$(this._statements) ]);
};


DoWhileStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var i;
	var blockStack$0;
	this._prepareBlockAnalysis$LAnalysisContext$(context);
	try {
		for (i = 0; i < this._statements.length; ++ i) {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._statements[i], context)) {
				return false;
			}
		}
		ContinuableStatement$_restoreContinueVariableStatuses_0$LContinuableStatement$LAnalysisContext$(this, context);
		if (! Statement$assertIsReachable$LAnalysisContext$LToken$(context, Expression$getToken_0$LExpression$(this._expr))) {
			return false;
		}
		if (Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
			if (Type$resolveIfNullable_0$LType$(this._expr.getType$()).equals$LType$(Type.voidType)) {
				context.errors.push(new CompileError(Expression$getToken_0$LExpression$(this._expr), "expression of the do-while statement should not return void"));
			}
		}
		LabellableStatement$registerVariableStatusesOnBreak_0$LLabellableStatement$LLocalVariableStatuses$(this, (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses);
		this._finalizeBlockAnalysis$LAnalysisContext$(context);
	} catch ($__jsx_catch_0) {
		if ($__jsx_catch_0 instanceof Error) {
			this._abortBlockAnalysis$LAnalysisContext$(context);
			throw $__jsx_catch_0;
		} else {
			throw $__jsx_catch_0;
		}
	}
	return true;
};


DoWhileStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr, (function (expr) {
		$this._expr = expr;
	})) ? false : true);
};


function ForInStatement(token, label, lhsExpr, listExpr, statements) {
	this._stash = {};
	this._lvStatusesOnBreak = null;
	this._token = token;
	this._label = label;
	this._lvStatusesOnContinue = null;
	this._statements = statements;
	this._lhsExpr = lhsExpr;
	this._listExpr = listExpr;
};

$__jsx_extend([ForInStatement], ContinuableStatement);
ForInStatement.prototype.clone$ = function () {
	return new ForInStatement(this._token, this._label, this._lhsExpr.clone$(), this._listExpr.clone$(), Cloner$Statement$E$cloneArray$ALStatement$(this._statements));
};


function ForInStatement$getLHSExpr_0$LForInStatement$($this) {
	return $this._lhsExpr;
};

ForInStatement.getLHSExpr_0$LForInStatement$ = ForInStatement$getLHSExpr_0$LForInStatement$;

function ForInStatement$getListExpr_0$LForInStatement$($this) {
	return $this._listExpr;
};

ForInStatement.getListExpr_0$LForInStatement$ = ForInStatement$getListExpr_0$LForInStatement$;

ForInStatement.prototype.getStatements$ = function () {
	return this._statements;
};


ForInStatement.prototype.serialize$ = function () {
	return [ "ForInStatement" ].concat(LabellableStatement$_serialize_0$LLabellableStatement$(this)).concat([ this._lhsExpr.serialize$(), this._listExpr.serialize$(), Serializer$Statement$E$serializeArray$ALStatement$(this._statements) ]);
};


ForInStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var listType;
	var listClassDef;
	var listTypeName;
	var i;
	var $this$0;
	var blockStack$0;
	if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._listExpr)) {
		return true;
	}
	$this$0 = this._listExpr.getType$();
	listType = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	if (listType instanceof ObjectType && (listClassDef = listType.getClassDef$()) instanceof InstantiatedClassDefinition && ((listTypeName = InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(listClassDef)) === "Array" || listTypeName === "Map")) {
	} else {
		context.errors.push(new CompileError(this._token, "list expression of the for..in statement should be an array or a map"));
		return true;
	}
	this._prepareBlockAnalysis$LAnalysisContext$(context);
	try {
		Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._lhsExpr);
		if (! this._lhsExpr.assertIsAssignable$LAnalysisContext$LToken$LType$(context, this._token, listTypeName === "Array" ? Type.numberType : Type.stringType)) {
			return false;
		}
		for (i = 0; i < this._statements.length; ++ i) {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._statements[i], context)) {
				return false;
			}
		}
		ContinuableStatement$registerVariableStatusesOnContinue_0$LContinuableStatement$LLocalVariableStatuses$(this, (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses);
		this._finalizeBlockAnalysis$LAnalysisContext$(context);
	} catch ($__jsx_catch_0) {
		if ($__jsx_catch_0 instanceof Error) {
			this._abortBlockAnalysis$LAnalysisContext$(context);
			throw $__jsx_catch_0;
		} else {
			throw $__jsx_catch_0;
		}
	}
	return true;
};


ForInStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._lhsExpr, (function (expr) {
		$this._lhsExpr = expr;
	})) ? false : ! cb(this._listExpr, (function (expr) {
		$this._listExpr = expr;
	})) ? false : true);
};


function ForStatement(token, label, initExpr, condExpr, postExpr, statements) {
	this._stash = {};
	this._lvStatusesOnBreak = null;
	this._token = token;
	this._label = label;
	this._lvStatusesOnContinue = null;
	this._statements = statements;
	this._initExpr = initExpr;
	this._condExpr = condExpr;
	this._postExpr = postExpr;
};

$__jsx_extend([ForStatement], ContinuableStatement);
ForStatement.prototype.clone$ = function () {
	return new ForStatement(this._token, this._label, Cloner$Expression$E$cloneNullable$LExpression$(this._initExpr), Cloner$Expression$E$cloneNullable$LExpression$(this._condExpr), Cloner$Expression$E$cloneNullable$LExpression$(this._postExpr), Cloner$Statement$E$cloneArray$ALStatement$(this._statements));
};


ForStatement.prototype.getStatements$ = function () {
	return this._statements;
};


ForStatement.prototype.serialize$ = function () {
	return [ "ForStatement" ].concat(LabellableStatement$_serialize_0$LLabellableStatement$(this)).concat([ Serializer$Expression$E$serializeNullable$LExpression$(this._initExpr), Serializer$Expression$E$serializeNullable$LExpression$(this._condExpr), Serializer$Expression$E$serializeNullable$LExpression$(this._postExpr), Serializer$Statement$E$serializeArray$ALStatement$(this._statements) ]);
};


ForStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var i;
	var blockStack$0;
	if (this._initExpr != null) {
		Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._initExpr);
	}
	if (this._condExpr != null) {
		if (Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._condExpr)) {
			if (Type$resolveIfNullable_0$LType$(this._condExpr.getType$()).equals$LType$(Type.voidType)) {
				context.errors.push(new CompileError(Expression$getToken_0$LExpression$(this._condExpr), "condition expression of the for statement should not return void"));
			}
		}
	}
	this._prepareBlockAnalysis$LAnalysisContext$(context);
	try {
		for (i = 0; i < this._statements.length; ++ i) {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._statements[i], context)) {
				return false;
			}
		}
		ContinuableStatement$_restoreContinueVariableStatuses_0$LContinuableStatement$LAnalysisContext$(this, context);
		if (this._postExpr != null) {
			if (! Statement$assertIsReachable$LAnalysisContext$LToken$(context, Expression$getToken_0$LExpression$(this._postExpr))) {
				return false;
			}
			Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._postExpr);
		}
		LabellableStatement$registerVariableStatusesOnBreak_0$LLabellableStatement$LLocalVariableStatuses$(this, (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses);
		this._finalizeBlockAnalysis$LAnalysisContext$(context);
	} catch ($__jsx_catch_0) {
		if ($__jsx_catch_0 instanceof Error) {
			this._abortBlockAnalysis$LAnalysisContext$(context);
			throw $__jsx_catch_0;
		} else {
			throw $__jsx_catch_0;
		}
	}
	return true;
};


ForStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	var _initExpr$0;
	return ((_initExpr$0 = this._initExpr) != null && ! cb(_initExpr$0, (function (expr) {
		$this._initExpr = expr;
	})) ? false : this._condExpr != null && ! cb(this._condExpr, (function (expr) {
		$this._condExpr = expr;
	})) ? false : this._postExpr != null && ! cb(this._postExpr, (function (expr) {
		$this._postExpr = expr;
	})) ? false : true);
};


function IfStatement(token, expr, onTrueStatements, onFalseStatements) {
	this._stash = {};
	this._token = token;
	this._expr = expr;
	this._onTrueStatements = onTrueStatements;
	this._onFalseStatements = onFalseStatements;
};

$__jsx_extend([IfStatement], Statement);
$__jsx_merge_interface(IfStatement, Block);

IfStatement.prototype.clone$ = function () {
	return new IfStatement(this._token, this._expr.clone$(), Cloner$Statement$E$cloneArray$ALStatement$(this._onTrueStatements), Cloner$Statement$E$cloneArray$ALStatement$(this._onFalseStatements));
};


IfStatement.prototype.getToken$ = function () {
	return this._token;
};


function IfStatement$getExpr_0$LIfStatement$($this) {
	return $this._expr;
};

IfStatement.getExpr_0$LIfStatement$ = IfStatement$getExpr_0$LIfStatement$;

function IfStatement$setExpr_0$LIfStatement$LExpression$($this, expr) {
	$this._expr = expr;
};

IfStatement.setExpr_0$LIfStatement$LExpression$ = IfStatement$setExpr_0$LIfStatement$LExpression$;

function IfStatement$getOnTrueStatements_0$LIfStatement$($this) {
	return $this._onTrueStatements;
};

IfStatement.getOnTrueStatements_0$LIfStatement$ = IfStatement$getOnTrueStatements_0$LIfStatement$;

function IfStatement$getOnFalseStatements_0$LIfStatement$($this) {
	return $this._onFalseStatements;
};

IfStatement.getOnFalseStatements_0$LIfStatement$ = IfStatement$getOnFalseStatements_0$LIfStatement$;

IfStatement.prototype.serialize$ = function () {
	return [ "IfStatement", this._expr.serialize$(), Serializer$Statement$E$serializeArray$ALStatement$(this._onTrueStatements), Serializer$Statement$E$serializeArray$ALStatement$(this._onFalseStatements) ];
};


IfStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var lvStatusesOnTrueStmts;
	var lvStatusesOnFalseStmts;
	var i;
	var blockStack$0;
	var blockStack$1;
	var blockStack$2;
	var blockStack$3;
	var blockStack$4;
	if (Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
		if (Type$resolveIfNullable_0$LType$(this._expr.getType$()).equals$LType$(Type.voidType)) {
			context.errors.push(new CompileError(Expression$getToken_0$LExpression$(this._expr), "expression of the if statement should not return void"));
		}
	}
	(blockStack$1 = context.blockStack).push(({localVariableStatuses: LocalVariableStatuses$clone_0$LLocalVariableStatuses$(blockStack$1[blockStack$1.length - 1].localVariableStatuses), block: this}));
	(lvStatusesOnTrueStmts = null, lvStatusesOnFalseStmts = null);
	try {
		for (i = 0; i < this._onTrueStatements.length; ++ i) {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._onTrueStatements[i], context)) {
				return false;
			}
		}
		lvStatusesOnTrueStmts = (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses;
	} finally {
		context.blockStack.pop();
	}
	try {
		(blockStack$2 = context.blockStack).push(({localVariableStatuses: LocalVariableStatuses$clone_0$LLocalVariableStatuses$(blockStack$2[blockStack$2.length - 1].localVariableStatuses), block: this}));
		for (i = 0; i < this._onFalseStatements.length; ++ i) {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._onFalseStatements[i], context)) {
				return false;
			}
		}
		lvStatusesOnFalseStmts = (blockStack$3 = context.blockStack)[blockStack$3.length - 1].localVariableStatuses;
	} finally {
		context.blockStack.pop();
	}
	(blockStack$4 = context.blockStack)[blockStack$4.length - 1].localVariableStatuses = LocalVariableStatuses$merge_0$LLocalVariableStatuses$LLocalVariableStatuses$(lvStatusesOnTrueStmts, lvStatusesOnFalseStmts);
	return true;
};


IfStatement.prototype.forEachStatement$F$LStatement$B$ = function (cb) {
	return (! Util$forEachStatement$F$LStatement$B$ALStatement$(cb, this._onTrueStatements) ? false : ! Util$forEachStatement$F$LStatement$B$ALStatement$(cb, this._onFalseStatements) ? false : true);
};


IfStatement.prototype.handleStatements$F$ALStatement$B$ = function (cb) {
	return (! cb(this._onTrueStatements) ? false : ! cb(this._onFalseStatements) ? false : true);
};


IfStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr, (function (expr) {
		$this._expr = expr;
	})) ? false : true);
};


function SwitchStatement(token, label, expr, statements) {
	this._stash = {};
	this._lvStatusesOnBreak = null;
	this._token = token;
	this._label = label;
	this._expr = expr;
	this._statements = statements;
};

$__jsx_extend([SwitchStatement], LabellableStatement);
SwitchStatement.prototype.clone$ = function () {
	return new SwitchStatement(this._token, this._label, this._expr.clone$(), Cloner$Statement$E$cloneArray$ALStatement$(this._statements));
};


function SwitchStatement$getExpr_0$LSwitchStatement$($this) {
	return $this._expr;
};

SwitchStatement.getExpr_0$LSwitchStatement$ = SwitchStatement$getExpr_0$LSwitchStatement$;

function SwitchStatement$setExpr_0$LSwitchStatement$LExpression$($this, expr) {
	$this._expr = expr;
};

SwitchStatement.setExpr_0$LSwitchStatement$LExpression$ = SwitchStatement$setExpr_0$LSwitchStatement$LExpression$;

SwitchStatement.prototype.getStatements$ = function () {
	return this._statements;
};


function SwitchStatement$getStatements_0$LSwitchStatement$($this) {
	return $this._statements;
};

SwitchStatement.getStatements_0$LSwitchStatement$ = SwitchStatement$getStatements_0$LSwitchStatement$;

SwitchStatement.prototype.serialize$ = function () {
	return [ "SwitchStatement" ].concat(LabellableStatement$_serialize_0$LLabellableStatement$(this)).concat([ this._expr.serialize$(), Serializer$Statement$E$serializeArray$ALStatement$(this._statements) ]);
};


SwitchStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var exprType;
	var hasDefaultLabel;
	var i;
	var statement;
	var $this$0;
	var $this$1;
	var blockStack$0;
	var blockStack$1;
	var blockStack$2;
	if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
		return true;
	}
	$this$0 = this._expr.getType$();
	exprType = ($this$0 instanceof NullableType ? NullableType$getBaseType_0$LNullableType$($this$0) : $this$0);
	if (! (exprType.equals$LType$(Type.booleanType) || exprType.equals$LType$(Type.integerType) || exprType.equals$LType$(Type.numberType) || exprType.equals$LType$(Type.stringType))) {
		context.errors.push(new CompileError(this._token, "switch statement only accepts boolean, number, or string expressions"));
		return true;
	}
	this._prepareBlockAnalysis$LAnalysisContext$(context);
	try {
		hasDefaultLabel = false;
		for (i = 0; i < this._statements.length; ++ i) {
			statement = this._statements[i];
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(statement, context)) {
				return false;
			}
			if (statement instanceof DefaultStatement) {
				hasDefaultLabel = true;
			}
		}
		$this$1 = (blockStack$1 = context.blockStack)[blockStack$1.length - 1].localVariableStatuses;
		if ($this$1._isReachable) {
			LabellableStatement$registerVariableStatusesOnBreak_0$LLabellableStatement$LLocalVariableStatuses$(this, (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses);
		}
		if (! hasDefaultLabel) {
			LabellableStatement$registerVariableStatusesOnBreak_0$LLabellableStatement$LLocalVariableStatuses$(this, (blockStack$2 = context.blockStack)[blockStack$2.length - 2].localVariableStatuses);
		}
		this._finalizeBlockAnalysis$LAnalysisContext$(context);
	} catch ($__jsx_catch_0) {
		if ($__jsx_catch_0 instanceof Error) {
			this._abortBlockAnalysis$LAnalysisContext$(context);
			throw $__jsx_catch_0;
		} else {
			throw $__jsx_catch_0;
		}
	}
	return true;
};


SwitchStatement.prototype.forEachStatement$F$LStatement$B$ = function (cb) {
	return (! Util$forEachStatement$F$LStatement$B$ALStatement$(cb, this._statements) ? false : true);
};


SwitchStatement.prototype.handleStatements$F$ALStatement$B$ = function (cb) {
	return (! cb(this._statements) ? false : true);
};


SwitchStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr, (function (expr) {
		$this._expr = expr;
	})) ? false : true);
};


function CaseStatement(token, expr) {
	this._stash = {};
	this._token = token;
	this._expr = expr;
};

$__jsx_extend([CaseStatement], Statement);
CaseStatement.prototype.clone$ = function () {
	return new CaseStatement(this._token, this._expr.clone$());
};


CaseStatement.prototype.getToken$ = function () {
	return this._token;
};


function CaseStatement$getExpr_0$LCaseStatement$($this) {
	return $this._expr;
};

CaseStatement.getExpr_0$LCaseStatement$ = CaseStatement$getExpr_0$LCaseStatement$;

CaseStatement.prototype.serialize$ = function () {
	return [ "CaseStatement", this._expr.serialize$() ];
};


CaseStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var statement;
	var expectedType;
	var exprType;
	var blockStack$0;
	var blockStack$1;
	if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
		return true;
	}
	statement = (blockStack$0 = context.blockStack)[blockStack$0.length - 1].block;
	if (! (statement instanceof SwitchStatement)) {
		throw new Error("logic flaw");
	}
	expectedType = SwitchStatement$getExpr_0$LSwitchStatement$(statement).getType$();
	if (expectedType == null) {
		return true;
	}
	expectedType = (expectedType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(expectedType) : expectedType);
	exprType = this._expr.getType$();
	if (exprType == null) {
		return true;
	}
	exprType = (exprType instanceof NullableType ? NullableType$getBaseType_0$LNullableType$(exprType) : exprType);
	if (exprType.equals$LType$(expectedType)) {
	} else {
		if ((exprType instanceof IntegerType || exprType instanceof NumberType) && (expectedType instanceof IntegerType || expectedType instanceof NumberType)) {
		} else {
			if (expectedType.equals$LType$(Type.stringType) && exprType.equals$LType$(Type.nullType)) {
			} else {
				context.errors.push(new CompileError(this._token, "type mismatch; expected type was '" + expectedType.toString() + "' but got '" + exprType.toString() + "'"));
			}
		}
	}
	(blockStack$1 = context.blockStack)[blockStack$1.length - 1].localVariableStatuses = LocalVariableStatuses$clone_0$LLocalVariableStatuses$(blockStack$1[blockStack$1.length - 2].localVariableStatuses);
	return true;
};


CaseStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr, (function (expr) {
		$this._expr = expr;
	})) ? false : true);
};


function DefaultStatement(token) {
	this._stash = {};
	this._token = token;
};

$__jsx_extend([DefaultStatement], Statement);
DefaultStatement.prototype.clone$ = function () {
	return new DefaultStatement(this._token);
};


DefaultStatement.prototype.getToken$ = function () {
	return this._token;
};


DefaultStatement.prototype.serialize$ = function () {
	return [ "DefaultStatement" ];
};


DefaultStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var blockStack$0;
	(blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses = LocalVariableStatuses$clone_0$LLocalVariableStatuses$(blockStack$0[blockStack$0.length - 2].localVariableStatuses);
	return true;
};


DefaultStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function WhileStatement(token, label, expr, statements) {
	this._stash = {};
	this._lvStatusesOnBreak = null;
	this._token = token;
	this._label = label;
	this._lvStatusesOnContinue = null;
	this._statements = statements;
	this._expr = expr;
};

$__jsx_extend([WhileStatement], ContinuableStatement);
WhileStatement.prototype.clone$ = function () {
	return new WhileStatement(this._token, this._label, this._expr.clone$(), Cloner$Statement$E$cloneArray$ALStatement$(this._statements));
};


function WhileStatement$getExpr_0$LWhileStatement$($this) {
	return $this._expr;
};

WhileStatement.getExpr_0$LWhileStatement$ = WhileStatement$getExpr_0$LWhileStatement$;

WhileStatement.prototype.getStatements$ = function () {
	return this._statements;
};


WhileStatement.prototype.serialize$ = function () {
	return [ "WhileStatement" ].concat(LabellableStatement$_serialize_0$LLabellableStatement$(this)).concat([ this._expr.serialize$(), Serializer$Statement$E$serializeArray$ALStatement$(this._statements) ]);
};


WhileStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var i;
	var blockStack$0;
	if (Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
		if (Type$resolveIfNullable_0$LType$(this._expr.getType$()).equals$LType$(Type.voidType)) {
			context.errors.push(new CompileError(Expression$getToken_0$LExpression$(this._expr), "expression of the while statement should not return void"));
		}
	}
	this._prepareBlockAnalysis$LAnalysisContext$(context);
	try {
		for (i = 0; i < this._statements.length; ++ i) {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._statements[i], context)) {
				return false;
			}
		}
		ContinuableStatement$registerVariableStatusesOnContinue_0$LContinuableStatement$LLocalVariableStatuses$(this, (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses);
		this._finalizeBlockAnalysis$LAnalysisContext$(context);
	} catch ($__jsx_catch_0) {
		if ($__jsx_catch_0 instanceof Error) {
			this._abortBlockAnalysis$LAnalysisContext$(context);
			throw $__jsx_catch_0;
		} else {
			throw $__jsx_catch_0;
		}
	}
	return true;
};


WhileStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr, (function (expr) {
		$this._expr = expr;
	})) ? false : true);
};


function TryStatement(token, tryStatements, catchStatements, finallyStatements) {
	this._stash = {};
	this._token = token;
	this._tryStatements = tryStatements;
	this._catchStatements = catchStatements;
	this._finallyStatements = finallyStatements;
};

$__jsx_extend([TryStatement], Statement);
$__jsx_merge_interface(TryStatement, Block);

TryStatement.prototype.clone$ = function () {
	return new TryStatement(this._token, Cloner$Statement$E$cloneArray$ALStatement$(this._tryStatements), Cloner$CatchStatement$E$cloneArray$ALCatchStatement$(this._catchStatements), Cloner$Statement$E$cloneArray$ALStatement$(this._finallyStatements));
};


TryStatement.prototype.getToken$ = function () {
	return this._token;
};


function TryStatement$getTryStatements_0$LTryStatement$($this) {
	return $this._tryStatements;
};

TryStatement.getTryStatements_0$LTryStatement$ = TryStatement$getTryStatements_0$LTryStatement$;

function TryStatement$getCatchStatements_0$LTryStatement$($this) {
	return $this._catchStatements;
};

TryStatement.getCatchStatements_0$LTryStatement$ = TryStatement$getCatchStatements_0$LTryStatement$;

function TryStatement$getFinallyStatements_0$LTryStatement$($this) {
	return $this._finallyStatements;
};

TryStatement.getFinallyStatements_0$LTryStatement$ = TryStatement$getFinallyStatements_0$LTryStatement$;

TryStatement.prototype.serialize$ = function () {
	return [ "TryStatement", Serializer$Statement$E$serializeArray$ALStatement$(this._tryStatements), Serializer$CatchStatement$E$serializeArray$ALCatchStatement$(this._catchStatements), Serializer$Statement$E$serializeArray$ALStatement$(this._finallyStatements) ];
};


TryStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var lvStatusesAfterTryCatch;
	var i;
	var lvStatusesAfterCatch;
	var curCatchType;
	var j;
	var precCatchType;
	var lvStatusesAfterFinally;
	var $this$0;
	var $this$1;
	var $this$2;
	var $this$3;
	var blockStack$0;
	var blockStack$1;
	var blockStack$2;
	var blockStack$3;
	var blockStack$4;
	var blockStack$5;
	var blockStack$6;
	if ((MemberDefinition$flags_0$LMemberDefinition$(context.funcDef) & 8192) !== 0) {
		context.errors.push(new CompileError(this._token, "invalid use of try block inside generator"));
		return false;
	}
	(blockStack$1 = context.blockStack).push(({localVariableStatuses: LocalVariableStatuses$clone_0$LLocalVariableStatuses$(blockStack$1[blockStack$1.length - 1].localVariableStatuses), block: this}));
	lvStatusesAfterTryCatch = null;
	try {
		for (i = 0; i < this._tryStatements.length; ++ i) {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._tryStatements[i], context)) {
				return false;
			}
		}
		lvStatusesAfterTryCatch = (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses;
	} finally {
		context.blockStack.pop();
	}
	for (i = 0; i < this._catchStatements.length; ++ i) {
		(blockStack$3 = context.blockStack).push(({localVariableStatuses: LocalVariableStatuses$clone_0$LLocalVariableStatuses$(blockStack$3[blockStack$3.length - 1].localVariableStatuses), block: this._catchStatements[i]}));
		lvStatusesAfterCatch = null;
		try {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._catchStatements[i], context)) {
				return false;
			}
			lvStatusesAfterCatch = (blockStack$2 = context.blockStack)[blockStack$2.length - 1].localVariableStatuses;
		} finally {
			context.blockStack.pop();
		}
		lvStatusesAfterTryCatch = LocalVariableStatuses$merge_0$LLocalVariableStatuses$LLocalVariableStatuses$(lvStatusesAfterTryCatch, lvStatusesAfterCatch);
		$this$2 = this._catchStatements[i];
		$this$0 = $this$2._local;
		curCatchType = $this$0._type;
		for (j = 0; j < i; ++ j) {
			$this$3 = this._catchStatements[j];
			$this$1 = $this$3._local;
			precCatchType = $this$1._type;
			if (curCatchType.isConvertibleTo$LType$(precCatchType)) {
				context.errors.push(new CompileError(this._catchStatements[i]._token, "code is unreachable, a broader catch statement for type '" + precCatchType.toString() + "' already exists"));
				return false;
			}
		}
	}
	(blockStack$5 = context.blockStack).push(({localVariableStatuses: LocalVariableStatuses$merge_0$LLocalVariableStatuses$LLocalVariableStatuses$(blockStack$5[blockStack$5.length - 1].localVariableStatuses, lvStatusesAfterTryCatch), block: this}));
	lvStatusesAfterFinally = null;
	try {
		for (i = 0; i < this._finallyStatements.length; ++ i) {
			if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._finallyStatements[i], context)) {
				return false;
			}
		}
		lvStatusesAfterFinally = (blockStack$4 = context.blockStack)[blockStack$4.length - 1].localVariableStatuses;
	} finally {
		context.blockStack.pop();
	}
	(blockStack$6 = context.blockStack)[blockStack$6.length - 1].localVariableStatuses = LocalVariableStatuses$mergeFinally_0$LLocalVariableStatuses$LLocalVariableStatuses$(lvStatusesAfterTryCatch, lvStatusesAfterFinally);
	return true;
};


TryStatement.prototype.forEachStatement$F$LStatement$B$ = function (cb) {
	var $this = this;
	return (! Util$forEachStatement$F$LStatement$B$ALStatement$(cb, this._tryStatements) ? false : ! Util$forEachStatement$F$LStatement$B$ALStatement$(cb, this._catchStatements.map((function (s) {
		return s;
	}))) ? false : ! Util$forEachStatement$F$LStatement$B$ALStatement$(cb, this._finallyStatements) ? false : true);
};


TryStatement.prototype.handleStatements$F$ALStatement$B$ = function (cb) {
	var $this = this;
	return (! cb(this._tryStatements) ? false : ! cb(this._catchStatements.map((function (s) {
		return s;
	}))) ? false : ! cb(this._finallyStatements) ? false : true);
};


TryStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function CatchStatement(token, local, statements) {
	this._stash = {};
	this._token = token;
	this._local = local;
	this._statements = statements;
};

$__jsx_extend([CatchStatement], Statement);
$__jsx_merge_interface(CatchStatement, Block);

CatchStatement.prototype.clone$ = function () {
	return new CatchStatement(this._token, this._local, Cloner$Statement$E$cloneArray$ALStatement$(this._statements));
};


CatchStatement.prototype.getToken$ = function () {
	return this._token;
};


function CatchStatement$getLocal_0$LCatchStatement$($this) {
	return $this._local;
};

CatchStatement.getLocal_0$LCatchStatement$ = CatchStatement$getLocal_0$LCatchStatement$;

function CatchStatement$setLocal_0$LCatchStatement$LCaughtVariable$($this, local) {
	$this._local = local;
};

CatchStatement.setLocal_0$LCatchStatement$LCaughtVariable$ = CatchStatement$setLocal_0$LCatchStatement$LCaughtVariable$;

CatchStatement.prototype.getStatements$ = function () {
	return this._statements;
};


function CatchStatement$getStatements_0$LCatchStatement$($this) {
	return $this._statements;
};

CatchStatement.getStatements_0$LCatchStatement$ = CatchStatement$getStatements_0$LCatchStatement$;

CatchStatement.prototype.serialize$ = function () {
	return [ "CatchStatement", Token$serialize_0$LToken$(this._token), LocalVariable$serialize_0$LLocalVariable$(this._local), Serializer$Statement$E$serializeArray$ALStatement$(this._statements) ];
};


CatchStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var catchType;
	var i;
	var $this$0;
	$this$0 = this._local;
	catchType = $this$0._type;
	if (! (catchType instanceof ObjectType || catchType.equals$LType$(Type.variantType))) {
		context.errors.push(new CompileError(this._token, "only objects or a variant may be caught"));
	}
	for (i = 0; i < this._statements.length; ++ i) {
		if (! Statement$analyze_0$LStatement$LAnalysisContext$(this._statements[i], context)) {
			return false;
		}
	}
	return true;
};


CatchStatement.prototype.forEachStatement$F$LStatement$B$ = function (cb) {
	return Util$forEachStatement$F$LStatement$B$ALStatement$(cb, this._statements);
};


CatchStatement.prototype.handleStatements$F$ALStatement$B$ = function (cb) {
	return cb(this._statements);
};


CatchStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function ThrowStatement(token, expr) {
	this._stash = {};
	this._token = token;
	this._expr = expr;
};

$__jsx_extend([ThrowStatement], Statement);
ThrowStatement.prototype.clone$ = function () {
	return new ThrowStatement(this._token, this._expr.clone$());
};


ThrowStatement.prototype.getToken$ = function () {
	return this._token;
};


function ThrowStatement$getExpr_0$LThrowStatement$($this) {
	return $this._expr;
};

ThrowStatement.getExpr_0$LThrowStatement$ = ThrowStatement$getExpr_0$LThrowStatement$;

ThrowStatement.prototype.serialize$ = function () {
	return [ "ThrowStatement", Token$serialize_0$LToken$(this._token), this._expr.serialize$() ];
};


ThrowStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var errorClassDef;
	var $this$0;
	var blockStack$0;
	if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
		return true;
	}
	errorClassDef = Parser$lookup_0$LParser$ALCompileError$LToken$S(context.parser, context.errors, this._token, "Error");
	if (errorClassDef == null) {
		throw new Error("could not find definition for Error");
	}
	if (this._expr.getType$().equals$LType$(Type.voidType)) {
		context.errors.push(new CompileError(this._token, "cannot throw 'void'"));
		return true;
	}
	$this$0 = (blockStack$0 = context.blockStack)[blockStack$0.length - 1].localVariableStatuses;
	$this$0._isReachable = false;
	return true;
};


ThrowStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr, (function (expr) {
		$this._expr = expr;
	})) ? false : true);
};


function InformationStatement() {
};

$__jsx_extend([InformationStatement], Statement);
InformationStatement.prototype.getToken$ = function () {
	return this._token;
};


function AssertStatement(token, expr, msgExpr) {
	this._stash = {};
	this._token = token;
	this._expr = expr;
	this._msgExpr = msgExpr;
};

$__jsx_extend([AssertStatement], InformationStatement);
AssertStatement.prototype.clone$ = function () {
	return new AssertStatement(this._token, this._expr.clone$(), Cloner$Expression$E$cloneNullable$LExpression$(this._msgExpr));
};


AssertStatement.prototype.serialize$ = function () {
	return [ "AssertStatement", Token$serialize_0$LToken$(this._token), Serializer$Expression$E$serializeNullable$LExpression$(this._expr), Serializer$Expression$E$serializeNullable$LExpression$(this._msgExpr) ];
};


AssertStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var exprType;
	var msgExprType;
	if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._expr)) {
		return true;
	}
	exprType = this._expr.getType$();
	if (exprType.equals$LType$(Type.voidType)) {
		context.errors.push(new CompileError(Expression$getToken_0$LExpression$(this._expr), "argument of the assert statement cannot be void"));
	}
	if (this._msgExpr != null) {
		if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._msgExpr)) {
			return true;
		}
		msgExprType = this._msgExpr.getType$();
		if (! msgExprType.equals$LType$(Type.stringType)) {
			context.errors.push(new CompileError(Expression$getToken_0$LExpression$(this._msgExpr), "message expression of the assert statement must be of string type"));
		}
	}
	return true;
};


AssertStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	var $this = this;
	return (! cb(this._expr, (function (expr) {
		$this._expr = expr;
	})) ? false : this._msgExpr != null && ! cb(this._msgExpr, (function (expr) {
		$this._msgExpr = expr;
	})) ? false : true);
};


function LogStatement(token, exprs) {
	this._stash = {};
	this._token = token;
	this._exprs = exprs;
};

$__jsx_extend([LogStatement], InformationStatement);
LogStatement.prototype.clone$ = function () {
	return new LogStatement(this._token, Cloner$Expression$E$cloneArray$ALExpression$(this._exprs));
};


LogStatement.prototype.serialize$ = function () {
	return [ "LogStatement", Token$serialize_0$LToken$(this._token), Serializer$Expression$E$serializeArray$ALExpression$(this._exprs) ];
};


LogStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	var i;
	var exprType;
	for (i = 0; i < this._exprs.length; ++ i) {
		if (! Statement$_analyzeExpr_0$LStatement$LAnalysisContext$LExpression$(this, context, this._exprs[i])) {
			return true;
		}
		exprType = this._exprs[i].getType$();
		if (exprType == null) {
			return true;
		}
		if (exprType.equals$LType$(Type.voidType)) {
			context.errors.push(new CompileError(this._token, "cannot log a void expression"));
			break;
		}
	}
	return true;
};


LogStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return Util$forEachExpression$F$LExpression$F$LExpression$V$B$ALExpression$(cb, this._exprs);
};


function DebuggerStatement(token) {
	this._stash = {};
	this._token = token;
};

$__jsx_extend([DebuggerStatement], InformationStatement);
DebuggerStatement.prototype.clone$ = function () {
	return new DebuggerStatement(this._token);
};


DebuggerStatement.prototype.serialize$ = function () {
	return [ "DebuggerStatement", Token$serialize_0$LToken$(this._token) ];
};


DebuggerStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	return true;
};


DebuggerStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function GotoStatement(label) {
	this._stash = {};
	this.label = label;
};

$__jsx_extend([GotoStatement], Statement);
GotoStatement.prototype.getToken$ = function () {
	return null;
};


GotoStatement.prototype.clone$ = function () {
	return new GotoStatement(this.label);
};


GotoStatement.prototype.serialize$ = function () {
	return null;
};


GotoStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	return true;
};


GotoStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function LabelStatement(name) {
	this._stash = {};
	this._name = name;
};

$__jsx_extend([LabelStatement], Statement);
function LabelStatement$getName_0$LLabelStatement$($this) {
	return $this._name;
};

LabelStatement.getName_0$LLabelStatement$ = LabelStatement$getName_0$LLabelStatement$;

LabelStatement.prototype.getToken$ = function () {
	return null;
};


LabelStatement.prototype.clone$ = function () {
	return new LabelStatement(this._name);
};


LabelStatement.prototype.serialize$ = function () {
	return null;
};


LabelStatement.prototype.doAnalyze$LAnalysisContext$ = function (context) {
	return true;
};


LabelStatement.prototype.forEachExpression$F$LExpression$F$LExpression$V$B$ = function (cb) {
	return true;
};


function Meta() {
};

$__jsx_extend([Meta], Object);
function SourceMapper() {
};

$__jsx_extend([SourceMapper], Object);
function SourceMapper$makeGeneratedPos_0$LSourceMapper$S($this, output) {
	var pos;
	var line;
	var lastNewLinePos;
	var column;
	pos = $this._outputLength;
	line = $this._outputLineNumber;
	while ((pos = output.indexOf("\n", pos)) !== -1) {
		++ pos;
		++ line;
	}
	$this._outputLength = output.length;
	$this._outputLineNumber = line;
	lastNewLinePos = output.lastIndexOf("\n") + 1;
	column = output.length - lastNewLinePos;
	return ({ line: line, column: column });
};

SourceMapper.makeGeneratedPos_0$LSourceMapper$S = SourceMapper$makeGeneratedPos_0$LSourceMapper$S;

function SourceMapper$add_0$LSourceMapper$SNNUSUS($this, output, tokenLineNumber, tokenColumnNumber, tokenValue, tokenFilename) {
	var genPos;
	var origPos;
	var sourceFile;
	genPos = SourceMapper$makeGeneratedPos_0$LSourceMapper$S($this, output);
	if ($__jsx_isNaN(tokenLineNumber) || tokenFilename == null) {
		origPos = null;
		sourceFile = null;
		tokenValue = null;
	} else {
		origPos = ({ line: tokenLineNumber, column: tokenColumnNumber });
		sourceFile = tokenFilename;
		$this._sourceFiles[tokenFilename] = true;
		if (tokenFilename.indexOf($this._rootDir + "/") === 0) {
			sourceFile = sourceFile.substring($this._rootDir.length + 1);
		}
	}
	$this._impl.addMapping(({ generated: genPos, original: origPos, source: sourceFile, name: tokenValue }));
};

SourceMapper.add_0$LSourceMapper$SNNUSUS = SourceMapper$add_0$LSourceMapper$SNNUSUS;

function SourceMapper$getSourceMapFooter_0$LSourceMapper$($this) {
	var sourceMappingURL;
	var path$0;
	var parts$0;
	if ($this._outputFile != null) {
		path$0 = $this._outputFile + ".mapping";
		parts$0 = Util$_resolvedPathParts$S(path$0);
		sourceMappingURL = parts$0.pop();
	} else {
		sourceMappingURL = "data:application/json;base64," + new Buffer($this._impl.toString(), "utf8").toString("base64");
	}
	return "\n//# sourceMappingURL=" + sourceMappingURL + "\n";
};

SourceMapper.getSourceMapFooter_0$LSourceMapper$ = SourceMapper$getSourceMapFooter_0$LSourceMapper$;

function DocCommentNode() {
};

$__jsx_extend([DocCommentNode], Object);
function DocCommentNode$appendDescription_0$LDocCommentNode$S($this, s) {
	s = s.trim();
	if (s !== "") {
		if ($this._description !== "") {
			$this._description += " ";
		}
		$this._description += s;
	}
};

DocCommentNode.appendDescription_0$LDocCommentNode$S = DocCommentNode$appendDescription_0$LDocCommentNode$S;

function DocCommentParameter(token) {
	this._description = "";
	this._token = token;
};

$__jsx_extend([DocCommentParameter], DocCommentNode);
DocCommentParameter.prototype.getToken$ = function () {
	return this._token;
};


function DocCommentParameter$getParamName_0$LDocCommentParameter$($this) {
	var $this$0;
	$this$0 = $this._token;
	return $this$0._value;
};

DocCommentParameter.getParamName_0$LDocCommentParameter$ = DocCommentParameter$getParamName_0$LDocCommentParameter$;

function DocCommentTag(tagName) {
	this._description = "";
	this._tagName = tagName;
};

$__jsx_extend([DocCommentTag], DocCommentNode);
function DocComment() {
	this._description = "";
	this._params = [];
	this._tags = [];
};

$__jsx_extend([DocComment], DocCommentNode);
function DocumentGenerator() {
};

$__jsx_extend([DocumentGenerator], Object);
function node() {
};

$__jsx_extend([node], Object);
function _LinkTimeOptimizationCommand$CStash() {
	this.extendedBy = [];
};

$__jsx_extend([_LinkTimeOptimizationCommand$CStash], Stash);
_LinkTimeOptimizationCommand$CStash.prototype.clone$ = function () {
	throw new Error("not supported");
};


function _StripOptimizeCommand$C_Stash() {
	this.touched = false;
};

$__jsx_extend([_StripOptimizeCommand$C_Stash], Stash);
_StripOptimizeCommand$C_Stash.prototype.clone$ = function () {
	throw new Error("not supported");
};


function _DetermineCalleeCommand$CStash() {
	this.callingFuncDef = null;
};

function _DetermineCalleeCommand$CStash$0(that) {
	this.callingFuncDef = that.callingFuncDef;
};

$__jsx_extend([_DetermineCalleeCommand$CStash, _DetermineCalleeCommand$CStash$0], Stash);
_DetermineCalleeCommand$CStash.prototype.clone$ = function () {
	return new _DetermineCalleeCommand$CStash$0(this);
};


function _StaticizeOptimizeCommand$CStash() {
	this.altName = null;
};

function _StaticizeOptimizeCommand$CStash$0(that) {
	this.altName = that.altName;
};

$__jsx_extend([_StaticizeOptimizeCommand$CStash, _StaticizeOptimizeCommand$CStash$0], Stash);
_StaticizeOptimizeCommand$CStash.prototype.clone$ = function () {
	return new _StaticizeOptimizeCommand$CStash$0(this);
};


function _UnclassifyOptimizationCommand$CStash() {
	this.inliner = null;
};

function _UnclassifyOptimizationCommand$CStash$0(that) {
	this.inliner = that.inliner;
};

$__jsx_extend([_UnclassifyOptimizationCommand$CStash, _UnclassifyOptimizationCommand$CStash$0], Stash);
_UnclassifyOptimizationCommand$CStash.prototype.clone$ = function () {
	return new _UnclassifyOptimizationCommand$CStash$0(this);
};


function _FoldConstantCommand$CStash() {
	this.isOptimized = false;
};

function _FoldConstantCommand$CStash$0(that) {
	this.isOptimized = that.isOptimized;
};

$__jsx_extend([_FoldConstantCommand$CStash, _FoldConstantCommand$CStash$0], Stash);
_FoldConstantCommand$CStash.prototype.clone$ = function () {
	return new _FoldConstantCommand$CStash$0(this);
};


function _InlineOptimizeCommand$CStash() {
	this.isOptimized = false;
	this.isInlineable = null;
};

function _InlineOptimizeCommand$CStash$0(that) {
	this.isOptimized = that.isOptimized;
	this.isInlineable = that.isInlineable;
};

$__jsx_extend([_InlineOptimizeCommand$CStash, _InlineOptimizeCommand$CStash$0], Stash);
_InlineOptimizeCommand$CStash.prototype.clone$ = function () {
	return new _InlineOptimizeCommand$CStash$0(this);
};


function _UnboxOptimizeCommand$CStash() {
	this.canUnbox = null;
};

$__jsx_extend([_UnboxOptimizeCommand$CStash], Stash);
_UnboxOptimizeCommand$CStash.prototype.clone$ = function () {
	var tmp;
	tmp = new _UnboxOptimizeCommand$CStash();
	tmp.canUnbox = this.canUnbox;
	return tmp;
};


function _NoDebugCommand$CStash() {
	this.debugValue = true;
};

$__jsx_extend([_NoDebugCommand$CStash], Stash);
_NoDebugCommand$CStash.prototype.clone$ = function () {
	var tmp;
	tmp = new _NoDebugCommand$CStash();
	tmp.debugValue = this.debugValue;
	return tmp;
};


function _Util$0$COutputNameStash(outputName) {
	this.outputName = outputName;
};

$__jsx_extend([_Util$0$COutputNameStash], Stash);
_Util$0$COutputNameStash.prototype.clone$ = function () {
	throw new Error("not supported");
};


function _Namer$C_TryStash(catchName) {
	this.catchName = catchName;
};

$__jsx_extend([_Namer$C_TryStash], Stash);
_Namer$C_TryStash.prototype.clone$ = function () {
	throw new Error("operation not supported");
};


function _Namer$C_CatchTargetStash(tryStmt) {
	this.tryStmt = tryStmt;
};

$__jsx_extend([_Namer$C_CatchTargetStash], Stash);
_Namer$C_CatchTargetStash.prototype.clone$ = function () {
	throw new Error("operation not supported");
};


function _Minifier$C_ClassStash() {
	this.staticVariableUseCount = {};
	this.staticVariableConversionTable = {};
};

$__jsx_extend([_Minifier$C_ClassStash], Stash);
_Minifier$C_ClassStash.prototype.clone$ = function () {
	throw new Error("operation not supported");
};


function _Minifier$C_ScopeStash() {
	this.usedGlobals = {};
	this.usedOuterLocals = [];
};

$__jsx_extend([_Minifier$C_ScopeStash], Stash);
_Minifier$C_ScopeStash.prototype.clone$ = function () {
	throw new Error("operation not supported");
};


function _Minifier$C_LocalStash() {
	this.useCount = 0;
	this.minifiedName = null;
};

$__jsx_extend([_Minifier$C_LocalStash], Stash);
_Minifier$C_LocalStash.prototype.clone$ = function () {
	throw new Error("operation not supported");
};


function _Minifier$C_MinifyingNamer() {
	this._emitter = null;
	this._catchLevel = -1;
	this._minifier = null;
};

$__jsx_extend([_Minifier$C_MinifyingNamer], _Namer);
function _Minifier$C_MinifyingNamer$_getMangler_0$L_Minifier$C_MinifyingNamer$($this) {
	var $this$0;
	$this$0 = $this._minifier._emitter;
	return $this$0._mangler;
};

_Minifier$C_MinifyingNamer._getMangler_0$L_Minifier$C_MinifyingNamer$ = _Minifier$C_MinifyingNamer$_getMangler_0$L_Minifier$C_MinifyingNamer$;

function _Minifier$C_MinifyingNamer$_isCounting_0$L_Minifier$C_MinifyingNamer$($this) {
	var $this$0;
	$this$0 = $this._minifier;
	return $this$0._propertyConversionTable == null;
};

_Minifier$C_MinifyingNamer._isCounting_0$L_Minifier$C_MinifyingNamer$ = _Minifier$C_MinifyingNamer$_isCounting_0$L_Minifier$C_MinifyingNamer$;

_Minifier$C_MinifyingNamer.prototype.getNameOfProperty$LClassDefinition$S = function (classDef, name) {
	var $this$0$0;
	if (Util$memberRootIsNative$LClassDefinition$SALType$B(classDef, name, null, false) || Util$memberIsExported$LClassDefinition$SALType$B(classDef, name, null, false)) {
		return name;
	}
	$this$0$0 = this._minifier;
	if ($this$0$0._propertyConversionTable == null) {
		_Minifier$_incr$HNS(this._minifier._propertyUseCount, name);
	} else {
		name = this._minifier._propertyConversionTable[name];
	}
	return name;
};


_Minifier$C_MinifyingNamer.prototype.getNameOfMethod$LClassDefinition$SALType$ = function (classDef, name, argTypes) {
	var mangledName;
	var $this$0;
	var $this$0$0;
	var $this$0$1;
	if (Util$memberRootIsNative$LClassDefinition$SALType$B(classDef, name, argTypes, false)) {
		return name;
	}
	$this$0$1 = this._minifier._emitter;
	$this$0 = $this$0$1._mangler;
	mangledName = name + _Mangler$mangleFunctionArguments_0$L_Mangler$ALType$($this$0, argTypes);
	$this$0$0 = this._minifier;
	if ($this$0$0._propertyConversionTable == null) {
		_Minifier$_incr$HNS(this._minifier._propertyUseCount, mangledName);
	} else {
		mangledName = this._minifier._propertyConversionTable[mangledName];
	}
	return mangledName;
};


_Minifier$C_MinifyingNamer.prototype.getNameOfStaticVariable$LClassDefinition$S = function (classDef, name) {
	var $this$0$0;
	if (Util$memberRootIsNative$LClassDefinition$SALType$B(classDef, name, null, true) || Util$memberIsExported$LClassDefinition$SALType$B(classDef, name, null, true)) {
		return name;
	}
	$this$0$0 = this._minifier;
	if ($this$0$0._propertyConversionTable == null) {
		_Minifier$_incr$HNS(_Minifier$_getClassStash$LClassDefinition$(classDef).staticVariableUseCount, name);
	} else {
		name = _Minifier$_getClassStash$LClassDefinition$(classDef).staticVariableConversionTable[name];
	}
	return name;
};


_Minifier$C_MinifyingNamer.prototype.getNameOfStaticFunction$LClassDefinition$SALType$ = function (classDef, name, argTypes) {
	var mangledName;
	var $this$0$0;
	if (Util$memberRootIsNative$LClassDefinition$SALType$B(classDef, name, argTypes, true)) {
		return this.getNameOfClass$LClassDefinition$(classDef) + "." + name;
	}
	mangledName = classDef.getStash$S("emitter.outputname").outputName + "$" + _Mangler$mangleFunctionName_0$L_Mangler$SALType$(_Minifier$C_MinifyingNamer$_getMangler_0$L_Minifier$C_MinifyingNamer$(this), name, argTypes);
	$this$0$0 = this._minifier;
	if ($this$0$0._propertyConversionTable == null) {
		_Minifier$_incr$HNS(this._minifier._globalUseCount, mangledName);
	} else {
		mangledName = this._minifier._globalConversionTable[mangledName];
	}
	return mangledName;
};


_Minifier$C_MinifyingNamer.prototype.getNameOfConstructor$LClassDefinition$ALType$ = function (classDef, argTypes) {
	var name;
	var mangledName;
	var $this$0$0;
	var ctor$0;
	var $this$0$1;
	if ((classDef.flags$() & 16) !== 0) {
		name = (classDef instanceof InstantiatedClassDefinition ? InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) === "Map" ? "Object" : InstantiatedClassDefinition$getTemplateClassName_0$LInstantiatedClassDefinition$(classDef) : classDef.className$());
		$this$0$0 = this._minifier;
		if ($this$0$0._propertyConversionTable == null) {
			_Minifier$_incr$HNS(this._minifier._globalUseCount, name);
		}
		return name;
	}
	ctor$0 = Util$findFunctionInClass$LClassDefinition$SALType$B(classDef, "constructor", argTypes, false);
	mangledName = ((ctor$0._classDef.flags$() & 16) !== 0 ? _Util$0$getNameOfNativeConstructor$LClassDefinition$(ctor$0._classDef) : ctor$0.getStash$S("emitter.outputname").outputName);
	$this$0$1 = this._minifier;
	if ($this$0$1._propertyConversionTable == null) {
		_Minifier$_incr$HNS(this._minifier._globalUseCount, mangledName);
	} else {
		mangledName = this._minifier._globalConversionTable[mangledName];
	}
	return mangledName;
};


_Minifier$C_MinifyingNamer.prototype.getNameOfClass$LClassDefinition$ = function (classDef) {
	var name;
	var $this$0$0;
	name = classDef.getStash$S("emitter.outputname").outputName;
	$this$0$0 = this._minifier;
	if ($this$0$0._propertyConversionTable == null) {
		_Minifier$_incr$HNS(this._minifier._globalUseCount, name);
	}
	return ((classDef.flags$() & 272) === 0 && ! _Minifier$C_MinifyingNamer$_isCounting_0$L_Minifier$C_MinifyingNamer$(this) ? this._minifier._globalConversionTable[name] : name);
};


_Minifier$C_MinifyingNamer.prototype.enterScope$LLocalVariable$F$V$ = function (local, cb) {
	var $this = this;
	var $this$0$0;
	if (local == null) {
		cb();
	} else {
		$this$0$0 = this._minifier;
		if ($this$0$0._propertyConversionTable == null) {
			_Minifier$_recordUsedIdentifiers_0$L_Minifier$LStashable$F$V$(this._minifier, local, (function () {
				$this._minifier._outerLocals.push(local);
				cb();
				$this._minifier._outerLocals.pop();
			}));
		} else {
			_Minifier$_buildConversionTable_0$L_Minifier$ALLocalVariable$L_Minifier$C_ScopeStash$(this._minifier, [ local ], _Minifier$_getScopeStash$LStashable$(local));
			cb();
		}
	}
};


_Minifier$C_MinifyingNamer.prototype.enterFunction$LMemberFunctionDefinition$F$V$ = function (funcDef, cb) {
	var $this = this;
	var $this$0$0;
	$this$0$0 = this._minifier;
	if ($this$0$0._propertyConversionTable == null) {
		_Minifier$_recordUsedIdentifiers_0$L_Minifier$LStashable$F$V$(this._minifier, funcDef, (function () {
			var _minifier$0;
			(_minifier$0 = $this._minifier)._outerLocals = _minifier$0._outerLocals.concat(_Minifier$_getArgsAndLocals$LMemberFunctionDefinition$(funcDef));
			cb();
			$this._minifier._outerLocals.length -= funcDef._args.length + funcDef._locals.length;
		}));
	} else {
		_Minifier$_buildConversionTable_0$L_Minifier$ALLocalVariable$L_Minifier$C_ScopeStash$(this._minifier, _Minifier$_getArgsAndLocals$LMemberFunctionDefinition$(funcDef), _Minifier$_getScopeStash$LStashable$(funcDef));
		cb();
	}
};


_Minifier$C_MinifyingNamer.prototype.getNameOfLocalVariable$LLocalVariable$ = function (local) {
	var caught$0;
	var tryStmt$0$0;
	var $this$0$0;
	var $this$0;
	if (local instanceof CaughtVariable) {
		caught$0 = local;
		tryStmt$0$0 = caught$0.getStash$S("namer").tryStmt;
		return tryStmt$0$0.getStash$S("namer").catchName;
	}
	$this$0$0 = this._minifier;
	if ($this$0$0._propertyConversionTable == null) {
		++ _Minifier$_getLocalStash$LLocalVariable$(local).useCount;
		$this$0 = local._name;
		return $this$0._value;
	} else {
		return _Minifier$_getLocalStash$LLocalVariable$(local).minifiedName;
	}
};


function MemberFunctionDefinition$C_CloneStash() {
	this.newLocal = null;
	this.newFuncDef = null;
};

function MemberFunctionDefinition$C_CloneStash$0(that) {
	this.newLocal = that.newLocal;
	this.newFuncDef = that.newFuncDef;
};

$__jsx_extend([MemberFunctionDefinition$C_CloneStash, MemberFunctionDefinition$C_CloneStash$0], Stash);
MemberFunctionDefinition$C_CloneStash.prototype.clone$ = function () {
	return new MemberFunctionDefinition$C_CloneStash$0(this);
};


$__jsx_lazy_init(ScriptLoader, "seen", function () {
	return {};
});
ScriptLoader.optimizationLevel = 0;
var js = { global: function () { return this; }() };
$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
$__jsx_lazy_init(dom, "document", function () {
	return js.global.document;
});
_InlineOptimizeCommand.INLINE_THRESHOLD = 30;
$__jsx_lazy_init(_MinifiedNameGenerator, "KEYWORDS", function () {
	return "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int boolean export interface byte extends long char final native class float package const goto private debugger implements protected double import public NaN Infinity undefined eval".split(/\s+/);
});
$__jsx_lazy_init(_MinifiedNameGenerator, "GLOBALS", function () {
	return "parseInt parseFloat isNaN isFinite decodeURI decodeURIComponent encodeURI encodeURIComponent Object Function Array String Boolean Number Date RegExp Error EvalError RangeError ReferenceError SyntaxError TypeError URIError Math".split(/\s+/);
});
$__jsx_lazy_init(_UnaryExpressionEmitter, "_operatorPrecedence", function () {
	return {};
});
$__jsx_lazy_init(_PostfixExpressionEmitter, "_operatorPrecedence", function () {
	return {};
});
_InstanceofExpressionEmitter._operatorPrecedence = 0;
_PropertyExpressionEmitter._operatorPrecedence = 0;
_FunctionExpressionEmitter._operatorPrecedence = 0;
_AdditiveExpressionEmitter._operatorPrecedence = 0;
$__jsx_lazy_init(_AssignmentExpressionEmitter, "_operatorPrecedence", function () {
	return {};
});
$__jsx_lazy_init(_EqualityExpressionEmitter, "_operatorPrecedence", function () {
	return {};
});
_InExpressionEmitter._operatorPrecedence = 0;
$__jsx_lazy_init(_LogicalExpressionEmitter, "_operatorPrecedence", function () {
	return {};
});
$__jsx_lazy_init(_ShiftExpressionEmitter, "_operatorPrecedence", function () {
	return {};
});
$__jsx_lazy_init(_BinaryNumberExpressionEmitter, "_operatorPrecedence", function () {
	return {};
});
_ArrayExpressionEmitter._operatorPrecedence = 0;
_ConditionalExpressionEmitter._operatorPrecedence = 0;
_CallExpressionEmitter._operatorPrecedence = 0;
_SuperExpressionEmitter._operatorPrecedence = 0;
_NewExpressionEmitter._operatorPrecedence = 0;
_CommaExpressionEmitter._operatorPrecedence = 0;
$__jsx_lazy_init(Util, "_stringLiteralEncodingMap", function () {
	return ({ "\0": "\\0", "\r": "\\r", "\n": "\\n", "\t": "\\t", "\"": "\\\"", "\'": "\\\'", "\\": "\\\\" });
});
$__jsx_lazy_init(Util, "_ecma262reserved", function () {
	return Util$asSet$AS([ "break", "do", "instanceof", "typeof", "case", "else", "new", "var", "catch", "finally", "return", "void", "continue", "for", "switch", "while", "debugger", "function", "this", "with", "default", "if", "throw", "delete", "in", "try", "class", "enum", "extends", "super", "const", "export", "import", "implements", "let", "private", "public", "yield", "interface", "package", "protected", "static", "null", "true", "false" ]);
});
$__jsx_lazy_init(BrowserPlatform, "debug", function () {
	return dom.window.location.hash === "#debug";
});
JavaScriptEmitter._initialized = false;
$__jsx_lazy_init(_Lexer, "stringLiteral", function () {
	return _Lexer$makeAlt$AS([ " '  [^'\\\\]* (?: \\\\. [^'\\\\]* )* ' ", ' "  [^"\\\\]* (?: \\\\. [^"\\\\]* )* " ' ]);
});
$__jsx_lazy_init(_Lexer, "regexpLiteral", function () {
	return ' "  [^"\\\\]* (?: \\\\. [^"\\\\]* )* " '.replace(/"/g, "/") + "[mgi]*";
});
$__jsx_lazy_init(_Lexer, "numberLiteral", function () {
	return _Lexer$makeAlt$AS([ "(?: (?: 0 | [1-9][0-9]* ) \\. [0-9]* (?: [eE] [+-]? [0-9]+ )? )", "(?: \\. [0-9]+ (?: [eE] [+-]? [0-9]+ )? )", "(?: (?: 0 | [1-9][0-9]* )(?: [eE] [+-]? [0-9]+ ) )", "NaN", "Infinity" ]) + "\\b";
});
$__jsx_lazy_init(_Lexer, "integerLiteral", function () {
	return _Lexer$makeAlt$AS([ "(?: 0 [xX] [0-9a-fA-F]+ )", "(?: 0 | [1-9][0-9]* )" ]) + "(?![\\.0-9eE])\\b";
});
$__jsx_lazy_init(_Lexer, "rxIdent", function () {
	return _Lexer$rx$S("^ [a-zA-Z_] [a-zA-Z0-9_]* ");
});
$__jsx_lazy_init(_Lexer, "rxStringLiteral", function () {
	return _Lexer$rx$S("^" + _Lexer.stringLiteral);
});
$__jsx_lazy_init(_Lexer, "rxNumberLiteral", function () {
	return _Lexer$rx$S("^" + _Lexer.numberLiteral);
});
$__jsx_lazy_init(_Lexer, "rxIntegerLiteral", function () {
	return _Lexer$rx$S("^" + _Lexer.integerLiteral);
});
$__jsx_lazy_init(_Lexer, "rxRegExpLiteral", function () {
	return _Lexer$rx$S("^" + _Lexer.regexpLiteral);
});
_Lexer.rxNewline = /(?:\r\n?|\n)/;
$__jsx_lazy_init(_Lexer, "keywords", function () {
	return Util$asSet$AS([ "null", "true", "false", "NaN", "Infinity", "break", "do", "instanceof", "typeof", "case", "else", "new", "var", "catch", "finally", "return", "void", "for", "switch", "while", "function", "this", "if", "throw", "in", "try", "class", "extends", "super", "import", "implements", "static", "__FILE__", "__LINE__", "undefined" ]);
});
$__jsx_lazy_init(_Lexer, "reserved", function () {
	return Util$asSet$AS([ "debugger", "with", "const", "export", "let", "private", "public", "yield", "protected", "extern", "native", "as", "operator" ]);
});
ClassDefinition.IS_ABSTRACT = 2;
ClassDefinition.IS_FINAL = 4;
ClassDefinition.IS_STATIC = 8;
ClassDefinition.IS_NATIVE = 16;
ClassDefinition.IS_OVERRIDE = 32;
ClassDefinition.IS_EXPORT = 16384;
$__jsx_lazy_init(Type, "voidType", function () {
	return new VoidType();
});
$__jsx_lazy_init(Type, "nullType", function () {
	return new NullType();
});
$__jsx_lazy_init(Type, "booleanType", function () {
	return new BooleanType();
});
$__jsx_lazy_init(Type, "integerType", function () {
	return new IntegerType();
});
$__jsx_lazy_init(Type, "numberType", function () {
	return new NumberType();
});
$__jsx_lazy_init(Type, "stringType", function () {
	return new StringType();
});
$__jsx_lazy_init(Type, "variantType", function () {
	return new VariantType();
});
BooleanType._classDef = null;
NumberType._classDef = null;
StringType._classDef = null;
FunctionType._classDef = null;
$__jsx_lazy_init(_StatementTransformer, "_statementCountMap", function () {
	return {};
});
CodeTransformer.stopIterationType = null;
CodeTransformer.jsxGeneratorClassDef = null;

var $__jsx_classMap = {
	"system:lib/built-in.jsx": {
		g_StopIteration: g_StopIteration,
		g_StopIteration$: g_StopIteration
	},
	"system:src/web/jsx-script-loader.jsx": {
		ScriptLoader: ScriptLoader,
		ScriptLoader$: ScriptLoader,
		_Main: _Main,
		_Main$: _Main
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom,
		EventInit: EventInit,
		EventInit$: EventInit,
		CustomEventInit: CustomEventInit,
		CustomEventInit$: CustomEventInit,
		MutationObserverInit: MutationObserverInit,
		MutationObserverInit$: MutationObserverInit,
		UIEventInit: UIEventInit,
		UIEventInit$: UIEventInit,
		FocusEventInit: FocusEventInit,
		FocusEventInit$: FocusEventInit,
		MouseEventInit: MouseEventInit,
		MouseEventInit$: MouseEventInit,
		WheelEventInit: WheelEventInit,
		WheelEventInit$: WheelEventInit,
		KeyboardEventInit: KeyboardEventInit,
		KeyboardEventInit$: KeyboardEventInit,
		CompositionEventInit: CompositionEventInit,
		CompositionEventInit$: CompositionEventInit,
		ProgressEventInit: ProgressEventInit,
		ProgressEventInit$: ProgressEventInit,
		XMLHttpRequestOptions: XMLHttpRequestOptions,
		XMLHttpRequestOptions$: XMLHttpRequestOptions,
		TrackEventInit: TrackEventInit,
		TrackEventInit$: TrackEventInit,
		PopStateEventInit: PopStateEventInit,
		PopStateEventInit$: PopStateEventInit,
		HashChangeEventInit: HashChangeEventInit,
		HashChangeEventInit$: HashChangeEventInit,
		PageTransitionEventInit: PageTransitionEventInit,
		PageTransitionEventInit$: PageTransitionEventInit,
		DragEventInit: DragEventInit,
		DragEventInit$: DragEventInit,
		CloseEventInit: CloseEventInit,
		CloseEventInit$: CloseEventInit,
		StorageEventInit: StorageEventInit,
		StorageEventInit$: StorageEventInit,
		MessageEventInit: MessageEventInit,
		MessageEventInit$: MessageEventInit,
		ErrorEventInit: ErrorEventInit,
		ErrorEventInit$: ErrorEventInit,
		EventSourceInit: EventSourceInit,
		EventSourceInit$: EventSourceInit,
		IDBObjectStoreParameters: IDBObjectStoreParameters,
		IDBObjectStoreParameters$: IDBObjectStoreParameters,
		IDBIndexParameters: IDBIndexParameters,
		IDBIndexParameters$: IDBIndexParameters,
		IDBVersionChangeEventInit: IDBVersionChangeEventInit,
		IDBVersionChangeEventInit$: IDBVersionChangeEventInit,
		NotificationOptions: NotificationOptions,
		NotificationOptions$: NotificationOptions,
		RTCSessionDescriptionInit: RTCSessionDescriptionInit,
		RTCSessionDescriptionInit$: RTCSessionDescriptionInit,
		RTCIceCandidateInit: RTCIceCandidateInit,
		RTCIceCandidateInit$: RTCIceCandidateInit,
		RTCIceServer: RTCIceServer,
		RTCIceServer$: RTCIceServer,
		RTCConfiguration: RTCConfiguration,
		RTCConfiguration$: RTCConfiguration,
		DataChannelInit: DataChannelInit,
		DataChannelInit$: DataChannelInit,
		RTCPeerConnectionIceEventInit: RTCPeerConnectionIceEventInit,
		RTCPeerConnectionIceEventInit$: RTCPeerConnectionIceEventInit,
		MediaStreamEventInit: MediaStreamEventInit,
		MediaStreamEventInit$: MediaStreamEventInit,
		DataChannelEventInit: DataChannelEventInit,
		DataChannelEventInit$: DataChannelEventInit,
		MediaStreamConstraints: MediaStreamConstraints,
		MediaStreamConstraints$: MediaStreamConstraints,
		MediaTrackConstraints: MediaTrackConstraints,
		MediaTrackConstraints$: MediaTrackConstraints,
		HitRegionOptions: HitRegionOptions,
		HitRegionOptions$: HitRegionOptions,
		WebGLContextAttributes: WebGLContextAttributes,
		WebGLContextAttributes$: WebGLContextAttributes,
		WebGLContextEventInit: WebGLContextEventInit,
		WebGLContextEventInit$: WebGLContextEventInit,
		DeviceOrientationEventInit: DeviceOrientationEventInit,
		DeviceOrientationEventInit$: DeviceOrientationEventInit,
		DeviceMotionEventInit: DeviceMotionEventInit,
		DeviceMotionEventInit$: DeviceMotionEventInit
	},
	"system:src/compiler.jsx": {
		Compiler: Compiler,
		Compiler$LPlatform$: Compiler
	},
	"system:src/optimizer.jsx": {
		_Util: _Util,
		_Util$: _Util,
		Optimizer: Optimizer,
		Optimizer$: Optimizer,
		_OptimizeCommand: _OptimizeCommand,
		_OptimizeCommand$: _OptimizeCommand,
		_FunctionOptimizeCommand: _FunctionOptimizeCommand,
		_FunctionOptimizeCommand$: _FunctionOptimizeCommand,
		_LinkTimeOptimizationCommand: _LinkTimeOptimizationCommand,
		_LinkTimeOptimizationCommand$: _LinkTimeOptimizationCommand,
		_StripOptimizeCommand: _StripOptimizeCommand,
		_StripOptimizeCommand$: _StripOptimizeCommand,
		_NoAssertCommand: _NoAssertCommand,
		_NoAssertCommand$: _NoAssertCommand,
		_NoLogCommand: _NoLogCommand,
		_NoLogCommand$: _NoLogCommand,
		_DetermineCalleeCommand: _DetermineCalleeCommand,
		_DetermineCalleeCommand$: _DetermineCalleeCommand,
		_StaticizeOptimizeCommand: _StaticizeOptimizeCommand,
		_StaticizeOptimizeCommand$: _StaticizeOptimizeCommand,
		_UnclassifyOptimizationCommand: _UnclassifyOptimizationCommand,
		_UnclassifyOptimizationCommand$: _UnclassifyOptimizationCommand,
		_FoldConstantCommand: _FoldConstantCommand,
		_FoldConstantCommand$: _FoldConstantCommand,
		_DeadCodeEliminationOptimizeCommand: _DeadCodeEliminationOptimizeCommand,
		_DeadCodeEliminationOptimizeCommand$: _DeadCodeEliminationOptimizeCommand,
		_InlineOptimizeCommand: _InlineOptimizeCommand,
		_InlineOptimizeCommand$: _InlineOptimizeCommand,
		_ReturnIfOptimizeCommand: _ReturnIfOptimizeCommand,
		_ReturnIfOptimizeCommand$: _ReturnIfOptimizeCommand,
		_LCSECachedExpression: _LCSECachedExpression,
		_LCSECachedExpression$LExpression$F$LExpression$V$: _LCSECachedExpression,
		_LCSEOptimizeCommand: _LCSEOptimizeCommand,
		_LCSEOptimizeCommand$: _LCSEOptimizeCommand,
		_UnboxOptimizeCommand: _UnboxOptimizeCommand,
		_UnboxOptimizeCommand$: _UnboxOptimizeCommand,
		_ArrayLengthOptimizeCommand: _ArrayLengthOptimizeCommand,
		_ArrayLengthOptimizeCommand$: _ArrayLengthOptimizeCommand,
		_NoDebugCommand: _NoDebugCommand,
		_NoDebugCommand$: _NoDebugCommand,
		"_LinkTimeOptimizationCommand.Stash": _LinkTimeOptimizationCommand$CStash,
		"_LinkTimeOptimizationCommand.Stash$": _LinkTimeOptimizationCommand$CStash,
		"_StripOptimizeCommand._Stash": _StripOptimizeCommand$C_Stash,
		"_StripOptimizeCommand._Stash$": _StripOptimizeCommand$C_Stash,
		"_DetermineCalleeCommand.Stash": _DetermineCalleeCommand$CStash,
		"_DetermineCalleeCommand.Stash$": _DetermineCalleeCommand$CStash,
		"_DetermineCalleeCommand.Stash$L_DetermineCalleeCommand$CStash$": _DetermineCalleeCommand$CStash$0,
		"_StaticizeOptimizeCommand.Stash": _StaticizeOptimizeCommand$CStash,
		"_StaticizeOptimizeCommand.Stash$": _StaticizeOptimizeCommand$CStash,
		"_StaticizeOptimizeCommand.Stash$L_StaticizeOptimizeCommand$CStash$": _StaticizeOptimizeCommand$CStash$0,
		"_UnclassifyOptimizationCommand.Stash": _UnclassifyOptimizationCommand$CStash,
		"_UnclassifyOptimizationCommand.Stash$": _UnclassifyOptimizationCommand$CStash,
		"_UnclassifyOptimizationCommand.Stash$L_UnclassifyOptimizationCommand$CStash$": _UnclassifyOptimizationCommand$CStash$0,
		"_FoldConstantCommand.Stash": _FoldConstantCommand$CStash,
		"_FoldConstantCommand.Stash$": _FoldConstantCommand$CStash,
		"_FoldConstantCommand.Stash$L_FoldConstantCommand$CStash$": _FoldConstantCommand$CStash$0,
		"_InlineOptimizeCommand.Stash": _InlineOptimizeCommand$CStash,
		"_InlineOptimizeCommand.Stash$": _InlineOptimizeCommand$CStash,
		"_InlineOptimizeCommand.Stash$L_InlineOptimizeCommand$CStash$": _InlineOptimizeCommand$CStash$0,
		"_UnboxOptimizeCommand.Stash": _UnboxOptimizeCommand$CStash,
		"_UnboxOptimizeCommand.Stash$": _UnboxOptimizeCommand$CStash,
		"_NoDebugCommand.Stash": _NoDebugCommand$CStash,
		"_NoDebugCommand.Stash$": _NoDebugCommand$CStash
	},
	"system:src/jsemitter.jsx": {
		_Util: _Util$0,
		_Util$: _Util$0,
		_Mangler: _Mangler,
		_Mangler$: _Mangler,
		_Namer: _Namer,
		_Namer$: _Namer,
		_MinifiedNameGenerator: _MinifiedNameGenerator,
		_MinifiedNameGenerator$AS: _MinifiedNameGenerator,
		_Minifier: _Minifier,
		_Minifier$LJavaScriptEmitter$ALClassDefinition$: _Minifier,
		_StatementEmitter: _StatementEmitter,
		_StatementEmitter$: _StatementEmitter,
		_ConstructorInvocationStatementEmitter: _ConstructorInvocationStatementEmitter,
		_ConstructorInvocationStatementEmitter$LJavaScriptEmitter$LConstructorInvocationStatement$: _ConstructorInvocationStatementEmitter,
		_ExpressionStatementEmitter: _ExpressionStatementEmitter,
		_ExpressionStatementEmitter$LJavaScriptEmitter$LExpressionStatement$: _ExpressionStatementEmitter,
		_FunctionStatementEmitter: _FunctionStatementEmitter,
		_FunctionStatementEmitter$LJavaScriptEmitter$LFunctionStatement$: _FunctionStatementEmitter,
		_ReturnStatementEmitter: _ReturnStatementEmitter,
		_ReturnStatementEmitter$LJavaScriptEmitter$LReturnStatement$: _ReturnStatementEmitter,
		_DeleteStatementEmitter: _DeleteStatementEmitter,
		_DeleteStatementEmitter$LJavaScriptEmitter$LDeleteStatement$: _DeleteStatementEmitter,
		_BreakStatementEmitter: _BreakStatementEmitter,
		_BreakStatementEmitter$LJavaScriptEmitter$LBreakStatement$: _BreakStatementEmitter,
		_ContinueStatementEmitter: _ContinueStatementEmitter,
		_ContinueStatementEmitter$LJavaScriptEmitter$LContinueStatement$: _ContinueStatementEmitter,
		_DoWhileStatementEmitter: _DoWhileStatementEmitter,
		_DoWhileStatementEmitter$LJavaScriptEmitter$LDoWhileStatement$: _DoWhileStatementEmitter,
		_ForInStatementEmitter: _ForInStatementEmitter,
		_ForInStatementEmitter$LJavaScriptEmitter$LForInStatement$: _ForInStatementEmitter,
		_ForStatementEmitter: _ForStatementEmitter,
		_ForStatementEmitter$LJavaScriptEmitter$LForStatement$: _ForStatementEmitter,
		_IfStatementEmitter: _IfStatementEmitter,
		_IfStatementEmitter$LJavaScriptEmitter$LIfStatement$: _IfStatementEmitter,
		_SwitchStatementEmitter: _SwitchStatementEmitter,
		_SwitchStatementEmitter$LJavaScriptEmitter$LSwitchStatement$: _SwitchStatementEmitter,
		_CaseStatementEmitter: _CaseStatementEmitter,
		_CaseStatementEmitter$LJavaScriptEmitter$LCaseStatement$: _CaseStatementEmitter,
		_DefaultStatementEmitter: _DefaultStatementEmitter,
		_DefaultStatementEmitter$LJavaScriptEmitter$LDefaultStatement$: _DefaultStatementEmitter,
		_WhileStatementEmitter: _WhileStatementEmitter,
		_WhileStatementEmitter$LJavaScriptEmitter$LWhileStatement$: _WhileStatementEmitter,
		_TryStatementEmitter: _TryStatementEmitter,
		_TryStatementEmitter$LJavaScriptEmitter$LTryStatement$: _TryStatementEmitter,
		_CatchStatementEmitter: _CatchStatementEmitter,
		_CatchStatementEmitter$LJavaScriptEmitter$LCatchStatement$: _CatchStatementEmitter,
		_ThrowStatementEmitter: _ThrowStatementEmitter,
		_ThrowStatementEmitter$LJavaScriptEmitter$LThrowStatement$: _ThrowStatementEmitter,
		_AssertStatementEmitter: _AssertStatementEmitter,
		_AssertStatementEmitter$LJavaScriptEmitter$LAssertStatement$: _AssertStatementEmitter,
		_LogStatementEmitter: _LogStatementEmitter,
		_LogStatementEmitter$LJavaScriptEmitter$LLogStatement$: _LogStatementEmitter,
		_DebuggerStatementEmitter: _DebuggerStatementEmitter,
		_DebuggerStatementEmitter$LJavaScriptEmitter$LDebuggerStatement$: _DebuggerStatementEmitter,
		_ExpressionEmitter: _ExpressionEmitter,
		_ExpressionEmitter$: _ExpressionEmitter,
		_LocalExpressionEmitter: _LocalExpressionEmitter,
		_LocalExpressionEmitter$LJavaScriptEmitter$LLocalExpression$: _LocalExpressionEmitter,
		_ClassExpressionEmitter: _ClassExpressionEmitter,
		_ClassExpressionEmitter$LJavaScriptEmitter$LClassExpression$: _ClassExpressionEmitter,
		_NullExpressionEmitter: _NullExpressionEmitter,
		_NullExpressionEmitter$LJavaScriptEmitter$LNullExpression$: _NullExpressionEmitter,
		_BooleanLiteralExpressionEmitter: _BooleanLiteralExpressionEmitter,
		_BooleanLiteralExpressionEmitter$LJavaScriptEmitter$LBooleanLiteralExpression$: _BooleanLiteralExpressionEmitter,
		_IntegerLiteralExpressionEmitter: _IntegerLiteralExpressionEmitter,
		_IntegerLiteralExpressionEmitter$LJavaScriptEmitter$LIntegerLiteralExpression$: _IntegerLiteralExpressionEmitter,
		_NumberLiteralExpressionEmitter: _NumberLiteralExpressionEmitter,
		_NumberLiteralExpressionEmitter$LJavaScriptEmitter$LNumberLiteralExpression$: _NumberLiteralExpressionEmitter,
		_StringLiteralExpressionEmitter: _StringLiteralExpressionEmitter,
		_StringLiteralExpressionEmitter$LJavaScriptEmitter$LStringLiteralExpression$: _StringLiteralExpressionEmitter,
		_RegExpLiteralExpressionEmitter: _RegExpLiteralExpressionEmitter,
		_RegExpLiteralExpressionEmitter$LJavaScriptEmitter$LRegExpLiteralExpression$: _RegExpLiteralExpressionEmitter,
		_ArrayLiteralExpressionEmitter: _ArrayLiteralExpressionEmitter,
		_ArrayLiteralExpressionEmitter$LJavaScriptEmitter$LArrayLiteralExpression$: _ArrayLiteralExpressionEmitter,
		_MapLiteralExpressionEmitter: _MapLiteralExpressionEmitter,
		_MapLiteralExpressionEmitter$LJavaScriptEmitter$LMapLiteralExpression$: _MapLiteralExpressionEmitter,
		_ThisExpressionEmitter: _ThisExpressionEmitter,
		_ThisExpressionEmitter$LJavaScriptEmitter$LThisExpression$: _ThisExpressionEmitter,
		_AsExpressionEmitter: _AsExpressionEmitter,
		_AsExpressionEmitter$LJavaScriptEmitter$LAsExpression$: _AsExpressionEmitter,
		_AsNoConvertExpressionEmitter: _AsNoConvertExpressionEmitter,
		_AsNoConvertExpressionEmitter$LJavaScriptEmitter$LAsNoConvertExpression$: _AsNoConvertExpressionEmitter,
		_OperatorExpressionEmitter: _OperatorExpressionEmitter,
		_OperatorExpressionEmitter$: _OperatorExpressionEmitter,
		_UnaryExpressionEmitter: _UnaryExpressionEmitter,
		_UnaryExpressionEmitter$LJavaScriptEmitter$LUnaryExpression$: _UnaryExpressionEmitter,
		_PostfixExpressionEmitter: _PostfixExpressionEmitter,
		_PostfixExpressionEmitter$LJavaScriptEmitter$LUnaryExpression$: _PostfixExpressionEmitter,
		_InstanceofExpressionEmitter: _InstanceofExpressionEmitter,
		_InstanceofExpressionEmitter$LJavaScriptEmitter$LInstanceofExpression$: _InstanceofExpressionEmitter,
		_PropertyExpressionEmitter: _PropertyExpressionEmitter,
		_PropertyExpressionEmitter$LJavaScriptEmitter$LPropertyExpression$: _PropertyExpressionEmitter,
		_FunctionExpressionEmitter: _FunctionExpressionEmitter,
		_FunctionExpressionEmitter$LJavaScriptEmitter$LFunctionExpression$: _FunctionExpressionEmitter,
		_AdditiveExpressionEmitter: _AdditiveExpressionEmitter,
		_AdditiveExpressionEmitter$LJavaScriptEmitter$LAdditiveExpression$: _AdditiveExpressionEmitter,
		_AssignmentExpressionEmitter: _AssignmentExpressionEmitter,
		_AssignmentExpressionEmitter$LJavaScriptEmitter$LAssignmentExpression$: _AssignmentExpressionEmitter,
		_EqualityExpressionEmitter: _EqualityExpressionEmitter,
		_EqualityExpressionEmitter$LJavaScriptEmitter$LEqualityExpression$: _EqualityExpressionEmitter,
		_InExpressionEmitter: _InExpressionEmitter,
		_InExpressionEmitter$LJavaScriptEmitter$LInExpression$: _InExpressionEmitter,
		_LogicalExpressionEmitter: _LogicalExpressionEmitter,
		_LogicalExpressionEmitter$LJavaScriptEmitter$LLogicalExpression$: _LogicalExpressionEmitter,
		_ShiftExpressionEmitter: _ShiftExpressionEmitter,
		_ShiftExpressionEmitter$LJavaScriptEmitter$LShiftExpression$: _ShiftExpressionEmitter,
		_BinaryNumberExpressionEmitter: _BinaryNumberExpressionEmitter,
		_BinaryNumberExpressionEmitter$LJavaScriptEmitter$LBinaryNumberExpression$: _BinaryNumberExpressionEmitter,
		_ArrayExpressionEmitter: _ArrayExpressionEmitter,
		_ArrayExpressionEmitter$LJavaScriptEmitter$LArrayExpression$: _ArrayExpressionEmitter,
		_ConditionalExpressionEmitter: _ConditionalExpressionEmitter,
		_ConditionalExpressionEmitter$LJavaScriptEmitter$LConditionalExpression$: _ConditionalExpressionEmitter,
		_CallExpressionEmitter: _CallExpressionEmitter,
		_CallExpressionEmitter$LJavaScriptEmitter$LCallExpression$: _CallExpressionEmitter,
		_SuperExpressionEmitter: _SuperExpressionEmitter,
		_SuperExpressionEmitter$LJavaScriptEmitter$LSuperExpression$: _SuperExpressionEmitter,
		_NewExpressionEmitter: _NewExpressionEmitter,
		_NewExpressionEmitter$LJavaScriptEmitter$LNewExpression$: _NewExpressionEmitter,
		_CommaExpressionEmitter: _CommaExpressionEmitter,
		_CommaExpressionEmitter$LJavaScriptEmitter$LCommaExpression$: _CommaExpressionEmitter,
		_BootstrapBuilder: _BootstrapBuilder,
		_BootstrapBuilder$: _BootstrapBuilder,
		_ExecutableBootstrapBuilder: _ExecutableBootstrapBuilder,
		_ExecutableBootstrapBuilder$: _ExecutableBootstrapBuilder,
		_TestBootstrapBuilder: _TestBootstrapBuilder,
		_TestBootstrapBuilder$: _TestBootstrapBuilder,
		_JSEmitterStash: _JSEmitterStash,
		_JSEmitterStash$: _JSEmitterStash,
		JavaScriptEmitter: JavaScriptEmitter,
		JavaScriptEmitter$LPlatform$: JavaScriptEmitter,
		"_Util.OutputNameStash": _Util$0$COutputNameStash,
		"_Util.OutputNameStash$S": _Util$0$COutputNameStash,
		"_Namer._TryStash": _Namer$C_TryStash,
		"_Namer._TryStash$S": _Namer$C_TryStash,
		"_Namer._CatchTargetStash": _Namer$C_CatchTargetStash,
		"_Namer._CatchTargetStash$LTryStatement$": _Namer$C_CatchTargetStash,
		"_Minifier._ClassStash": _Minifier$C_ClassStash,
		"_Minifier._ClassStash$": _Minifier$C_ClassStash,
		"_Minifier._ScopeStash": _Minifier$C_ScopeStash,
		"_Minifier._ScopeStash$": _Minifier$C_ScopeStash,
		"_Minifier._LocalStash": _Minifier$C_LocalStash,
		"_Minifier._LocalStash$": _Minifier$C_LocalStash,
		"_Minifier._MinifyingNamer": _Minifier$C_MinifyingNamer,
		"_Minifier._MinifyingNamer$": _Minifier$C_MinifyingNamer
	},
	"system:src/util.jsx": {
		Util: Util,
		Util$: Util
	},
	"system:src/platform.jsx": {
		Platform: Platform,
		Platform$: Platform
	},
	"system:src/web/browser-platform.jsx": {
		BrowserPlatform: BrowserPlatform,
		BrowserPlatform$: BrowserPlatform
	},
	"system:src/analysis.jsx": {
		InstantiationContext: InstantiationContext,
		InstantiationContext$ALCompileError$HLType$: InstantiationContext,
		TemplateInstantiationRequest: TemplateInstantiationRequest,
		TemplateInstantiationRequest$LToken$SALType$: TemplateInstantiationRequest,
		Block: Block,
		Block$: Block,
		BlockContext: BlockContext,
		BlockContext$LLocalVariableStatuses$LBlock$: BlockContext,
		AnalysisContext: AnalysisContext,
		AnalysisContext$ALCompileError$LParser$F$LParser$LClassDefinition$LClassDefinition$$: AnalysisContext,
		Stash: Stash,
		Stash$: Stash,
		Stashable: Stashable,
		Stashable$: Stashable,
		LocalVariable: LocalVariable,
		LocalVariable$LToken$LType$: LocalVariable,
		CaughtVariable: CaughtVariable,
		CaughtVariable$LToken$LType$: CaughtVariable,
		ArgumentDeclaration: ArgumentDeclaration,
		ArgumentDeclaration$LToken$LType$: ArgumentDeclaration,
		ArgumentDeclaration$LToken$LType$LExpression$: ArgumentDeclaration$0,
		LocalVariableStatuses: LocalVariableStatuses,
		LocalVariableStatuses$LMemberFunctionDefinition$LLocalVariableStatuses$: LocalVariableStatuses,
		LocalVariableStatuses$LLocalVariableStatuses$: LocalVariableStatuses$0,
		CompileIssue: CompileIssue,
		CompileIssue$LToken$S: CompileIssue,
		CompileError: CompileError,
		CompileError$LToken$S: CompileError,
		CompileError$SNNS: CompileError$0,
		CompileWarning: CompileWarning,
		CompileWarning$LToken$S: CompileWarning,
		DeprecatedWarning: DeprecatedWarning,
		DeprecatedWarning$SNNS: DeprecatedWarning,
		CompileNote: CompileNote,
		CompileNote$LToken$S: CompileNote
	},
	"system:src/emitter.jsx": {
		Emitter: Emitter,
		Emitter$: Emitter
	},
	"system:src/parser.jsx": {
		Token: Token,
		Token$SBUSNN: Token,
		Token$SB: Token$0,
		_Lexer: _Lexer,
		_Lexer$: _Lexer,
		Import: Import,
		Import$LParser$: Import,
		Import$LToken$LToken$ALToken$: Import$0,
		WildcardImport: WildcardImport,
		WildcardImport$LToken$LToken$ALToken$SS: WildcardImport,
		QualifiedName: QualifiedName,
		QualifiedName$LToken$: QualifiedName,
		QualifiedName$LToken$LImport$: QualifiedName$0,
		QualifiedName$LToken$LParsedObjectType$: QualifiedName$1,
		ParserState: ParserState,
		ParserState$NNLDocComment$NBNNNN: ParserState,
		ClassState: ClassState,
		ClassState$LClassState$LParsedObjectType$ALToken$LParsedObjectType$ALParsedObjectType$ALParsedObjectType$NALClassDefinition$ALTemplateClassDefinition$: ClassState,
		Scope: Scope,
		Scope$LScope$ALLocalVariable$LLocalVariable$ALArgumentDeclaration$ALStatement$ALMemberFunctionDefinition$B: Scope,
		Parser: Parser,
		Parser$LToken$SLCompletionRequest$: Parser
	},
	"system:src/classdef.jsx": {
		TemplateDefinition: TemplateDefinition,
		TemplateDefinition$: TemplateDefinition,
		ClassDefinition: ClassDefinition,
		ClassDefinition$LToken$SNLParsedObjectType$ALParsedObjectType$ALMemberDefinition$ALClassDefinition$ALTemplateClassDefinition$ALParsedObjectType$LDocComment$: ClassDefinition,
		MemberDefinition: MemberDefinition,
		MemberDefinition$LToken$LToken$NALMemberFunctionDefinition$LDocComment$: MemberDefinition,
		MemberVariableDefinition: MemberVariableDefinition,
		MemberVariableDefinition$LToken$LToken$NLType$LExpression$ALMemberFunctionDefinition$LDocComment$: MemberVariableDefinition,
		MemberFunctionDefinition: MemberFunctionDefinition,
		MemberFunctionDefinition$LToken$LToken$NLType$ALArgumentDeclaration$ALLocalVariable$ALStatement$ALMemberFunctionDefinition$LToken$LDocComment$: MemberFunctionDefinition,
		InstantiatedMemberFunctionDefinition: InstantiatedMemberFunctionDefinition,
		InstantiatedMemberFunctionDefinition$LToken$LToken$NLType$ALArgumentDeclaration$ALLocalVariable$ALStatement$ALMemberFunctionDefinition$LToken$LDocComment$: InstantiatedMemberFunctionDefinition,
		TemplateFunctionDefinition: TemplateFunctionDefinition,
		TemplateFunctionDefinition$LToken$LToken$NALToken$LType$ALArgumentDeclaration$ALLocalVariable$ALStatement$ALMemberFunctionDefinition$LToken$LDocComment$: TemplateFunctionDefinition,
		TemplateClassDefinition: TemplateClassDefinition,
		TemplateClassDefinition$LToken$SNALToken$LParsedObjectType$ALParsedObjectType$ALMemberDefinition$ALClassDefinition$ALTemplateClassDefinition$ALParsedObjectType$LDocComment$: TemplateClassDefinition,
		InstantiatedClassDefinition: InstantiatedClassDefinition,
		InstantiatedClassDefinition$LTemplateClassDefinition$ALType$LParsedObjectType$ALParsedObjectType$ALMemberDefinition$ALClassDefinition$ALTemplateClassDefinition$ALParsedObjectType$: InstantiatedClassDefinition,
		"MemberFunctionDefinition._CloneStash": MemberFunctionDefinition$C_CloneStash,
		"MemberFunctionDefinition._CloneStash$": MemberFunctionDefinition$C_CloneStash,
		"MemberFunctionDefinition._CloneStash$LMemberFunctionDefinition$C_CloneStash$": MemberFunctionDefinition$C_CloneStash$0
	},
	"system:src/type.jsx": {
		Type: Type,
		Type$: Type,
		VoidType: VoidType,
		VoidType$: VoidType,
		NullType: NullType,
		NullType$: NullType,
		PrimitiveType: PrimitiveType,
		PrimitiveType$: PrimitiveType,
		BooleanType: BooleanType,
		BooleanType$: BooleanType,
		IntegerType: IntegerType,
		IntegerType$: IntegerType,
		NumberType: NumberType,
		NumberType$: NumberType,
		StringType: StringType,
		StringType$: StringType,
		VariantType: VariantType,
		VariantType$: VariantType,
		NullableType: NullableType,
		NullableType$LType$: NullableType,
		VariableLengthArgumentType: VariableLengthArgumentType,
		VariableLengthArgumentType$LType$: VariableLengthArgumentType,
		ObjectType: ObjectType,
		ObjectType$LClassDefinition$: ObjectType,
		ParsedObjectType: ParsedObjectType,
		ParsedObjectType$LQualifiedName$ALType$: ParsedObjectType,
		FunctionType: FunctionType,
		FunctionType$: FunctionType,
		FunctionChoiceType: FunctionChoiceType,
		FunctionChoiceType$ALResolvedFunctionType$: FunctionChoiceType,
		ResolvedFunctionType: ResolvedFunctionType,
		ResolvedFunctionType$: ResolvedFunctionType,
		StaticFunctionType: StaticFunctionType,
		StaticFunctionType$LToken$LType$ALType$B: StaticFunctionType,
		MemberFunctionType: MemberFunctionType,
		MemberFunctionType$LToken$LType$LType$ALType$B: MemberFunctionType
	},
	"system:src/completion.jsx": {
		CompletionRequest: CompletionRequest,
		CompletionRequest$: CompletionRequest,
		CompletionCandidates: CompletionCandidates,
		CompletionCandidates$: CompletionCandidates,
		KeywordCompletionCandidate: KeywordCompletionCandidate,
		KeywordCompletionCandidate$S: KeywordCompletionCandidate,
		CompletionCandidatesOfTopLevel: CompletionCandidatesOfTopLevel,
		CompletionCandidatesOfTopLevel$LParser$F$LClassDefinition$B$: CompletionCandidatesOfTopLevel,
		_CompletionCandidatesWithLocal: _CompletionCandidatesWithLocal,
		_CompletionCandidatesWithLocal$LParser$: _CompletionCandidatesWithLocal,
		_CompletionCandidatesOfNamespace: _CompletionCandidatesOfNamespace,
		_CompletionCandidatesOfNamespace$LImport$F$LClassDefinition$B$: _CompletionCandidatesOfNamespace,
		_CompletionCandidatesOfProperty: _CompletionCandidatesOfProperty,
		_CompletionCandidatesOfProperty$LExpression$: _CompletionCandidatesOfProperty
	},
	"system:src/instruments.jsx": {
		_StatementTransformer: _StatementTransformer,
		_StatementTransformer$LCodeTransformer$S: _StatementTransformer,
		_ConstructorInvocationStatementTransformer: _ConstructorInvocationStatementTransformer,
		_ConstructorInvocationStatementTransformer$LCodeTransformer$LConstructorInvocationStatement$: _ConstructorInvocationStatementTransformer,
		_ExpressionStatementTransformer: _ExpressionStatementTransformer,
		_ExpressionStatementTransformer$LCodeTransformer$LExpressionStatement$: _ExpressionStatementTransformer,
		_FunctionStatementTransformer: _FunctionStatementTransformer,
		_FunctionStatementTransformer$LCodeTransformer$LFunctionStatement$: _FunctionStatementTransformer,
		_ReturnStatementTransformer: _ReturnStatementTransformer,
		_ReturnStatementTransformer$LCodeTransformer$LReturnStatement$: _ReturnStatementTransformer,
		_YieldStatementTransformer: _YieldStatementTransformer,
		_YieldStatementTransformer$LCodeTransformer$LYieldStatement$: _YieldStatementTransformer,
		_DeleteStatementTransformer: _DeleteStatementTransformer,
		_DeleteStatementTransformer$LCodeTransformer$LDeleteStatement$: _DeleteStatementTransformer,
		_BreakStatementTransformer: _BreakStatementTransformer,
		_BreakStatementTransformer$LCodeTransformer$LBreakStatement$: _BreakStatementTransformer,
		_ContinueStatementTransformer: _ContinueStatementTransformer,
		_ContinueStatementTransformer$LCodeTransformer$LContinueStatement$: _ContinueStatementTransformer,
		_LabellableStatementTransformer: _LabellableStatementTransformer,
		_LabellableStatementTransformer$LCodeTransformer$S: _LabellableStatementTransformer,
		_DoWhileStatementTransformer: _DoWhileStatementTransformer,
		_DoWhileStatementTransformer$LCodeTransformer$LDoWhileStatement$: _DoWhileStatementTransformer,
		_ForInStatementTransformer: _ForInStatementTransformer,
		_ForInStatementTransformer$LCodeTransformer$LForInStatement$: _ForInStatementTransformer,
		_ForStatementTransformer: _ForStatementTransformer,
		_ForStatementTransformer$LCodeTransformer$LForStatement$: _ForStatementTransformer,
		_IfStatementTransformer: _IfStatementTransformer,
		_IfStatementTransformer$LCodeTransformer$LIfStatement$: _IfStatementTransformer,
		_SwitchStatementTransformer: _SwitchStatementTransformer,
		_SwitchStatementTransformer$LCodeTransformer$LSwitchStatement$: _SwitchStatementTransformer,
		_CaseStatementTransformer: _CaseStatementTransformer,
		_CaseStatementTransformer$LCodeTransformer$LCaseStatement$: _CaseStatementTransformer,
		_DefaultStatementTransformer: _DefaultStatementTransformer,
		_DefaultStatementTransformer$LCodeTransformer$LDefaultStatement$: _DefaultStatementTransformer,
		_WhileStatementTransformer: _WhileStatementTransformer,
		_WhileStatementTransformer$LCodeTransformer$LWhileStatement$: _WhileStatementTransformer,
		_TryStatementTransformer: _TryStatementTransformer,
		_TryStatementTransformer$LCodeTransformer$LTryStatement$: _TryStatementTransformer,
		_CatchStatementTransformer: _CatchStatementTransformer,
		_CatchStatementTransformer$LCodeTransformer$LCatchStatement$: _CatchStatementTransformer,
		_ThrowStatementTransformer: _ThrowStatementTransformer,
		_ThrowStatementTransformer$LCodeTransformer$LThrowStatement$: _ThrowStatementTransformer,
		_AssertStatementTransformer: _AssertStatementTransformer,
		_AssertStatementTransformer$LCodeTransformer$LAssertStatement$: _AssertStatementTransformer,
		_LogStatementTransformer: _LogStatementTransformer,
		_LogStatementTransformer$LCodeTransformer$LLogStatement$: _LogStatementTransformer,
		_DebuggerStatementTransformer: _DebuggerStatementTransformer,
		_DebuggerStatementTransformer$LCodeTransformer$LDebuggerStatement$: _DebuggerStatementTransformer,
		CodeTransformer: CodeTransformer,
		CodeTransformer$: CodeTransformer
	},
	"system:src/expression.jsx": {
		Expression: Expression,
		Expression$LExpression$: Expression,
		LeafExpression: LeafExpression,
		LeafExpression$: LeafExpression,
		OperatorExpression: OperatorExpression,
		OperatorExpression$LExpression$: OperatorExpression,
		LocalExpression: LocalExpression,
		LocalExpression$LToken$LLocalVariable$: LocalExpression,
		ClassExpression: ClassExpression,
		ClassExpression$LToken$LType$: ClassExpression,
		NullExpression: NullExpression,
		NullExpression$LToken$LType$: NullExpression,
		BooleanLiteralExpression: BooleanLiteralExpression,
		BooleanLiteralExpression$LToken$: BooleanLiteralExpression,
		IntegerLiteralExpression: IntegerLiteralExpression,
		IntegerLiteralExpression$LToken$: IntegerLiteralExpression,
		NumberLiteralExpression: NumberLiteralExpression,
		NumberLiteralExpression$LToken$: NumberLiteralExpression,
		StringLiteralExpression: StringLiteralExpression,
		StringLiteralExpression$LToken$: StringLiteralExpression,
		RegExpLiteralExpression: RegExpLiteralExpression,
		RegExpLiteralExpression$LToken$: RegExpLiteralExpression,
		RegExpLiteralExpression$LToken$LType$: RegExpLiteralExpression$0,
		ArrayLiteralExpression: ArrayLiteralExpression,
		ArrayLiteralExpression$LToken$ALExpression$LType$: ArrayLiteralExpression,
		MapLiteralElement: MapLiteralElement,
		MapLiteralElement$LToken$LExpression$: MapLiteralElement,
		MapLiteralExpression: MapLiteralExpression,
		MapLiteralExpression$LToken$ALMapLiteralElement$LType$: MapLiteralExpression,
		ThisExpression: ThisExpression,
		ThisExpression$LToken$LClassDefinition$: ThisExpression,
		FunctionExpression: FunctionExpression,
		FunctionExpression$LToken$LMemberFunctionDefinition$: FunctionExpression,
		UnaryExpression: UnaryExpression,
		UnaryExpression$: UnaryExpression,
		BitwiseNotExpression: BitwiseNotExpression,
		BitwiseNotExpression$LToken$LExpression$: BitwiseNotExpression,
		InstanceofExpression: InstanceofExpression,
		InstanceofExpression$LToken$LExpression$LType$: InstanceofExpression,
		AsExpression: AsExpression,
		AsExpression$LToken$LExpression$LType$: AsExpression,
		AsNoConvertExpression: AsNoConvertExpression,
		AsNoConvertExpression$LToken$LExpression$LType$: AsNoConvertExpression,
		LogicalNotExpression: LogicalNotExpression,
		LogicalNotExpression$LToken$LExpression$: LogicalNotExpression,
		IncrementExpression: IncrementExpression,
		IncrementExpression$: IncrementExpression,
		PostIncrementExpression: PostIncrementExpression,
		PostIncrementExpression$LToken$LExpression$: PostIncrementExpression,
		PreIncrementExpression: PreIncrementExpression,
		PreIncrementExpression$LToken$LExpression$: PreIncrementExpression,
		PropertyExpression: PropertyExpression,
		PropertyExpression$LToken$LExpression$LToken$ALType$: PropertyExpression,
		PropertyExpression$LToken$LExpression$LToken$ALType$LType$: PropertyExpression$0,
		TypeofExpression: TypeofExpression,
		TypeofExpression$LToken$LExpression$: TypeofExpression,
		SignExpression: SignExpression,
		SignExpression$LToken$LExpression$: SignExpression,
		BinaryExpression: BinaryExpression,
		BinaryExpression$: BinaryExpression,
		AdditiveExpression: AdditiveExpression,
		AdditiveExpression$LToken$LExpression$LExpression$: AdditiveExpression,
		ArrayExpression: ArrayExpression,
		ArrayExpression$LToken$LExpression$LExpression$: ArrayExpression,
		AssignmentExpression: AssignmentExpression,
		AssignmentExpression$LToken$LExpression$LExpression$: AssignmentExpression,
		BinaryNumberExpression: BinaryNumberExpression,
		BinaryNumberExpression$LToken$LExpression$LExpression$: BinaryNumberExpression,
		EqualityExpression: EqualityExpression,
		EqualityExpression$LToken$LExpression$LExpression$: EqualityExpression,
		InExpression: InExpression,
		InExpression$LToken$LExpression$LExpression$: InExpression,
		LogicalExpression: LogicalExpression,
		LogicalExpression$LToken$LExpression$LExpression$: LogicalExpression,
		ShiftExpression: ShiftExpression,
		ShiftExpression$LToken$LExpression$LExpression$: ShiftExpression,
		ConditionalExpression: ConditionalExpression,
		ConditionalExpression$LToken$LExpression$LExpression$LExpression$: ConditionalExpression,
		ConditionalExpression$LToken$LExpression$LExpression$LExpression$LType$: ConditionalExpression$0,
		CallExpression: CallExpression,
		CallExpression$LToken$LExpression$ALExpression$: CallExpression,
		CallExpression$LCallExpression$: CallExpression$0,
		SuperExpression: SuperExpression,
		SuperExpression$LToken$LToken$ALExpression$: SuperExpression,
		SuperExpression$LSuperExpression$: SuperExpression$0,
		NewExpression: NewExpression,
		NewExpression$LToken$LType$ALExpression$: NewExpression,
		NewExpression$LNewExpression$: NewExpression$0,
		CommaExpression: CommaExpression,
		CommaExpression$LToken$LExpression$LExpression$: CommaExpression
	},
	"system:src/statement.jsx": {
		Statement: Statement,
		Statement$: Statement,
		ConstructorInvocationStatement: ConstructorInvocationStatement,
		ConstructorInvocationStatement$LToken$LType$ALExpression$: ConstructorInvocationStatement,
		ConstructorInvocationStatement$LToken$LType$ALExpression$LFunctionType$: ConstructorInvocationStatement$0,
		UnaryExpressionStatement: UnaryExpressionStatement,
		UnaryExpressionStatement$LExpression$: UnaryExpressionStatement,
		ExpressionStatement: ExpressionStatement,
		ExpressionStatement$LExpression$: ExpressionStatement,
		FunctionStatement: FunctionStatement,
		FunctionStatement$LToken$LMemberFunctionDefinition$: FunctionStatement,
		ReturnStatement: ReturnStatement,
		ReturnStatement$LToken$LExpression$: ReturnStatement,
		YieldStatement: YieldStatement,
		YieldStatement$LToken$LExpression$: YieldStatement,
		DeleteStatement: DeleteStatement,
		DeleteStatement$LToken$LExpression$: DeleteStatement,
		JumpStatement: JumpStatement,
		JumpStatement$: JumpStatement,
		BreakStatement: BreakStatement,
		BreakStatement$LToken$LToken$: BreakStatement,
		ContinueStatement: ContinueStatement,
		ContinueStatement$LToken$LToken$: ContinueStatement,
		LabellableStatement: LabellableStatement,
		LabellableStatement$: LabellableStatement,
		ContinuableStatement: ContinuableStatement,
		ContinuableStatement$: ContinuableStatement,
		DoWhileStatement: DoWhileStatement,
		DoWhileStatement$LToken$LToken$LExpression$ALStatement$: DoWhileStatement,
		ForInStatement: ForInStatement,
		ForInStatement$LToken$LToken$LExpression$LExpression$ALStatement$: ForInStatement,
		ForStatement: ForStatement,
		ForStatement$LToken$LToken$LExpression$LExpression$LExpression$ALStatement$: ForStatement,
		IfStatement: IfStatement,
		IfStatement$LToken$LExpression$ALStatement$ALStatement$: IfStatement,
		SwitchStatement: SwitchStatement,
		SwitchStatement$LToken$LToken$LExpression$ALStatement$: SwitchStatement,
		CaseStatement: CaseStatement,
		CaseStatement$LToken$LExpression$: CaseStatement,
		DefaultStatement: DefaultStatement,
		DefaultStatement$LToken$: DefaultStatement,
		WhileStatement: WhileStatement,
		WhileStatement$LToken$LToken$LExpression$ALStatement$: WhileStatement,
		TryStatement: TryStatement,
		TryStatement$LToken$ALStatement$ALCatchStatement$ALStatement$: TryStatement,
		CatchStatement: CatchStatement,
		CatchStatement$LToken$LCaughtVariable$ALStatement$: CatchStatement,
		ThrowStatement: ThrowStatement,
		ThrowStatement$LToken$LExpression$: ThrowStatement,
		InformationStatement: InformationStatement,
		InformationStatement$: InformationStatement,
		AssertStatement: AssertStatement,
		AssertStatement$LToken$LExpression$LExpression$: AssertStatement,
		LogStatement: LogStatement,
		LogStatement$LToken$ALExpression$: LogStatement,
		DebuggerStatement: DebuggerStatement,
		DebuggerStatement$LToken$: DebuggerStatement,
		GotoStatement: GotoStatement,
		GotoStatement$S: GotoStatement,
		LabelStatement: LabelStatement,
		LabelStatement$S: LabelStatement
	},
	"system:src/meta.jsx": {
		Meta: Meta,
		Meta$: Meta
	},
	"system:src/jssourcemap.jsx": {
		SourceMapper: SourceMapper,
		SourceMapper$: SourceMapper
	},
	"system:src/doc.jsx": {
		DocCommentNode: DocCommentNode,
		DocCommentNode$: DocCommentNode,
		DocCommentParameter: DocCommentParameter,
		DocCommentParameter$LToken$: DocCommentParameter,
		DocCommentTag: DocCommentTag,
		DocCommentTag$S: DocCommentTag,
		DocComment: DocComment,
		DocComment$: DocComment,
		DocumentGenerator: DocumentGenerator,
		DocumentGenerator$: DocumentGenerator
	},
	"system:lib/js/js/nodejs.jsx": {
		node: node,
		node$: node
	}
};


/**
 * launches _Main.main(:string[]):void invoked by jsx --run|--executable
 */
JSX.runMain = function (sourceFile, args) {
	var module = JSX.require(sourceFile);
	if (! module) {
		throw new ReferenceError("entry point module not found in " + sourceFile);
	}
	if (! module._Main) {
		throw new ReferenceError("entry point _Main not found in " + sourceFile);
	}
	if (! module._Main.main) {
		throw new ReferenceError("entry point _Main.main(:string[]):void not found in " + sourceFile);
	}
	module._Main.main(args);
};

/**
 * launches _Test#test*():void invoked by jsx --test
 */
JSX.runTests = function (sourceFile, tests) {
	var module = JSX.require(sourceFile);
	var testClass = module._Test;

	if (!testClass) return; // skip if there's no test class

	if(tests.length === 0) {
		var p = testClass.prototype;
		for (var m in p) {
			if (p[m] instanceof Function && m.match(/^test\w*$/)) {
				tests.push(m);
			}
		}
	}

	var testCase = new testClass();

	if (testCase.beforeClass != null)
		testCase.beforeClass(tests);

	for (var i = 0; i < tests.length; ++i) {
		(function (method) {
			if (method in testCase) {
				testCase.run(method, function() { testCase[method](); });
			}
			else {
				throw new ReferenceError("No such test method: " + method);
			}
		}(tests[i]));
	}

	if (testCase.afterClass != null)
		testCase.afterClass();
};
/**
 * call a function on load/DOMContentLoaded
 */
function $__jsx_onload (event) {
	window.removeEventListener("load", $__jsx_onload);
	document.removeEventListener("DOMContentLoaded", $__jsx_onload);
	JSX.runMain("system:src/web/jsx-script-loader.jsx", [])
}

window.addEventListener("load", $__jsx_onload);
document.addEventListener("DOMContentLoaded", $__jsx_onload);

})(JSX);
