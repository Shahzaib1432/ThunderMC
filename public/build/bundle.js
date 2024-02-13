
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\tabs\info.svelte generated by Svelte v3.59.2 */

    const file$5 = "src\\tabs\\info.svelte";

    function create_fragment$5(ctx) {
    	let html;
    	let nav0;
    	let label0;
    	let t1;
    	let label1;
    	let t3;
    	let label2;
    	let t5;
    	let label3;
    	let a0;
    	let t7;
    	let label4;
    	let a1;
    	let t9;
    	let nav1;
    	let div;
    	let t10;
    	let label5;
    	let t12;
    	let label6;
    	let t13;
    	let br0;
    	let t14;
    	let br1;
    	let t15;
    	let br2;
    	let t16;
    	let br3;
    	let t17;
    	let br4;
    	let t18;
    	let br5;
    	let t19;
    	let br6;
    	let t20;
    	let br7;
    	let t21;
    	let br8;
    	let t22;
    	let br9;
    	let t23;
    	let br10;
    	let t24;
    	let br11;

    	const block = {
    		c: function create() {
    			html = element("html");
    			nav0 = element("nav");
    			label0 = element("label");
    			label0.textContent = "About ThunderMC";
    			t1 = space();
    			label1 = element("label");
    			label1.textContent = "Discover ThunderMC – your destination for an extraordinary gaming experience! Join our vibrant community for seamless gameplay, exciting events, and endless thrills. Whether you're a seasoned player or new to Minecraft, ThunderMC delivers excitement without limits!";
    			t3 = space();
    			label2 = element("label");
    			label2.textContent = "Vote For Rewards!";
    			t5 = space();
    			label3 = element("label");
    			a0 = element("a");
    			a0.textContent = "• www.best-minecraft-servers.co/";
    			t7 = space();
    			label4 = element("label");
    			a1 = element("a");
    			a1.textContent = "• www.minecraft.buzz/";
    			t9 = space();
    			nav1 = element("nav");
    			div = element("div");
    			t10 = space();
    			label5 = element("label");
    			label5.textContent = "Our Rules";
    			t12 = space();
    			label6 = element("label");
    			t13 = text("Respect Everyone.");
    			br0 = element("br");
    			t14 = text("\r\n      Avoid swearing.");
    			br1 = element("br");
    			t15 = text("\r\n      No griefing or stealing");
    			br2 = element("br");
    			t16 = text("\r\n      No cheating or hacking");
    			br3 = element("br");
    			t17 = text("\r\n      No exploitation of any bug");
    			br4 = element("br");
    			t18 = text("\r\n      No Spamming");
    			br5 = element("br");
    			t19 = text("\r\n      Absolutely No Advertising");
    			br6 = element("br");
    			t20 = text("\r\n      Report Issues");
    			br7 = element("br");
    			t21 = text("\r\n      Respect The Staff");
    			br8 = element("br");
    			t22 = text("\r\n      Dont claim near other claims without permission.");
    			br9 = element("br");
    			t23 = text("\r\n      No NSFW");
    			br10 = element("br");
    			t24 = text("\r\n      Be Positive");
    			br11 = element("br");
    			set_style(label0, "font-size", "2.2vw");
    			attr_dev(label0, "class", "experiencenav-info");
    			add_location(label0, file$5, 2, 4, 43);
    			set_style(label1, "font-size", "1.8vw");
    			attr_dev(label1, "class", "experiencenav-text");
    			add_location(label1, file$5, 3, 4, 132);
    			attr_dev(label2, "class", "voteinfo svelte-1bsi474");
    			add_location(label2, file$5, 5, 4, 505);
    			attr_dev(a0, "id", "linkLabel");
    			attr_dev(a0, "href", "https://best-minecraft-servers.co/server-thundermc.21282/vote");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$5, 6, 44, 600);
    			attr_dev(label3, "class", "votelink svelte-1bsi474");
    			attr_dev(label3, "for", "linkLabel");
    			add_location(label3, file$5, 6, 4, 560);
    			attr_dev(a1, "id", "linkLabel");
    			attr_dev(a1, "href", "https://minecraft.buzz/vote/9541");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$5, 7, 63, 812);
    			set_style(label4, "top", "69vh");
    			attr_dev(label4, "class", "votelink svelte-1bsi474");
    			attr_dev(label4, "for", "linkLabel");
    			add_location(label4, file$5, 7, 4, 753);
    			attr_dev(nav0, "class", "experiencenav svelte-1bsi474");
    			add_location(nav0, file$5, 1, 2, 10);
    			attr_dev(div, "class", "green-line-horizontal svelte-1bsi474");
    			add_location(div, file$5, 11, 4, 986);
    			attr_dev(label5, "class", "experiencenav-info rules-info svelte-1bsi474");
    			add_location(label5, file$5, 12, 4, 1028);
    			add_location(br0, file$5, 14, 23, 1165);
    			add_location(br1, file$5, 15, 21, 1192);
    			add_location(br2, file$5, 16, 29, 1227);
    			add_location(br3, file$5, 17, 28, 1261);
    			add_location(br4, file$5, 18, 32, 1299);
    			add_location(br5, file$5, 19, 17, 1322);
    			add_location(br6, file$5, 20, 31, 1359);
    			add_location(br7, file$5, 21, 19, 1384);
    			add_location(br8, file$5, 22, 23, 1413);
    			add_location(br9, file$5, 23, 54, 1473);
    			add_location(br10, file$5, 24, 13, 1492);
    			add_location(br11, file$5, 25, 17, 1515);
    			attr_dev(label6, "class", "experiencenav-text rules-text svelte-1bsi474");
    			add_location(label6, file$5, 13, 4, 1096);
    			attr_dev(nav1, "class", "rulesnav svelte-1bsi474");
    			add_location(nav1, file$5, 10, 2, 958);
    			add_location(html, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, html, anchor);
    			append_dev(html, nav0);
    			append_dev(nav0, label0);
    			append_dev(nav0, t1);
    			append_dev(nav0, label1);
    			append_dev(nav0, t3);
    			append_dev(nav0, label2);
    			append_dev(nav0, t5);
    			append_dev(nav0, label3);
    			append_dev(label3, a0);
    			append_dev(nav0, t7);
    			append_dev(nav0, label4);
    			append_dev(label4, a1);
    			append_dev(html, t9);
    			append_dev(html, nav1);
    			append_dev(nav1, div);
    			append_dev(nav1, t10);
    			append_dev(nav1, label5);
    			append_dev(nav1, t12);
    			append_dev(nav1, label6);
    			append_dev(label6, t13);
    			append_dev(label6, br0);
    			append_dev(label6, t14);
    			append_dev(label6, br1);
    			append_dev(label6, t15);
    			append_dev(label6, br2);
    			append_dev(label6, t16);
    			append_dev(label6, br3);
    			append_dev(label6, t17);
    			append_dev(label6, br4);
    			append_dev(label6, t18);
    			append_dev(label6, br5);
    			append_dev(label6, t19);
    			append_dev(label6, br6);
    			append_dev(label6, t20);
    			append_dev(label6, br7);
    			append_dev(label6, t21);
    			append_dev(label6, br8);
    			append_dev(label6, t22);
    			append_dev(label6, br9);
    			append_dev(label6, t23);
    			append_dev(label6, br10);
    			append_dev(label6, t24);
    			append_dev(label6, br11);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Info', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Info> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Info extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Info",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\tabs\events.svelte generated by Svelte v3.59.2 */

    const file$4 = "src\\tabs\\events.svelte";

    function create_fragment$4(ctx) {
    	let html;
    	let label;

    	const block = {
    		c: function create() {
    			html = element("html");
    			label = element("label");
    			label.textContent = "Events Tab";
    			attr_dev(label, "class", "e svelte-92e77j");
    			add_location(label, file$4, 1, 2, 10);
    			add_location(html, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, html, anchor);
    			append_dev(html, label);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Events', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Events> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Events extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Events",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\tabs\servers.svelte generated by Svelte v3.59.2 */

    const file$3 = "src\\tabs\\servers.svelte";

    function create_fragment$3(ctx) {
    	let html;
    	let label;

    	const block = {
    		c: function create() {
    			html = element("html");
    			label = element("label");
    			label.textContent = "Servers Tab";
    			attr_dev(label, "class", "e svelte-92e77j");
    			add_location(label, file$3, 1, 2, 10);
    			add_location(html, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, html, anchor);
    			append_dev(html, label);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Servers', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Servers> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Servers extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Servers",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\tabs\widgets\cardpreviewer.svelte generated by Svelte v3.59.2 */

    const file$2 = "src\\tabs\\widgets\\cardpreviewer.svelte";

    function create_fragment$2(ctx) {
    	let html;
    	let nav1;
    	let nav0;
    	let img;
    	let img_src_value;
    	let t0;
    	let label;
    	let t1;
    	let t2;
    	let button;
    	let t3;
    	let t4;
    	let t5;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			html = element("html");
    			nav1 = element("nav");
    			nav0 = element("nav");
    			img = element("img");
    			t0 = space();
    			label = element("label");
    			t1 = text(/*itemname*/ ctx[1]);
    			t2 = space();
    			button = element("button");
    			t3 = text("Buy (");
    			t4 = text(/*price*/ ctx[4]);
    			t5 = text(" PKR)");
    			attr_dev(img, "class", "cardimage svelte-1cb71um");
    			if (!src_url_equal(img.src, img_src_value = /*imagedisplay*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			set_style(img, "left", /*imagex*/ ctx[5] + "vw");
    			add_location(img, file$2, 3, 6, 79);
    			attr_dev(nav0, "class", "cardimagebehind svelte-1cb71um");
    			add_location(nav0, file$2, 2, 4, 42);
    			attr_dev(nav1, "class", "card svelte-1cb71um");
    			add_location(nav1, file$2, 1, 2, 18);
    			attr_dev(label, "class", "itemname svelte-1cb71um");
    			set_style(label, "left", /*leftlabel*/ ctx[2] + "vw");
    			add_location(label, file$2, 6, 2, 176);
    			attr_dev(button, "class", "buybutton svelte-1cb71um");
    			set_style(button, "left", /*leftbutton*/ ctx[3] + "vw");
    			add_location(button, file$2, 7, 2, 251);
    			attr_dev(html, "lang", "");
    			add_location(html, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, html, anchor);
    			append_dev(html, nav1);
    			append_dev(nav1, nav0);
    			append_dev(nav0, img);
    			append_dev(html, t0);
    			append_dev(html, label);
    			append_dev(label, t1);
    			append_dev(html, t2);
    			append_dev(html, button);
    			append_dev(button, t3);
    			append_dev(button, t4);
    			append_dev(button, t5);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[6], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imagedisplay*/ 1 && !src_url_equal(img.src, img_src_value = /*imagedisplay*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*imagex*/ 32) {
    				set_style(img, "left", /*imagex*/ ctx[5] + "vw");
    			}

    			if (dirty & /*itemname*/ 2) set_data_dev(t1, /*itemname*/ ctx[1]);

    			if (dirty & /*leftlabel*/ 4) {
    				set_style(label, "left", /*leftlabel*/ ctx[2] + "vw");
    			}

    			if (dirty & /*price*/ 16) set_data_dev(t4, /*price*/ ctx[4]);

    			if (dirty & /*leftbutton*/ 8) {
    				set_style(button, "left", /*leftbutton*/ ctx[3] + "vw");
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Cardpreviewer', slots, []);
    	let { imagedisplay = '/resources/dungeon.png' } = $$props;
    	let { itemname = 'Veliz Mavidad.' } = $$props;
    	let { leftlabel = 6 } = $$props;
    	let { leftbutton = 6.2 } = $$props;
    	let { price = 3 } = $$props;
    	let { imagex = 3.5 } = $$props;
    	const writable_props = ['imagedisplay', 'itemname', 'leftlabel', 'leftbutton', 'price', 'imagex'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cardpreviewer> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => alert('Contact Musab using discord to buy. \nDiscord Server: discord.gg/EgyMB9mPQz\nMusabs ID: itzmusab1234');

    	$$self.$$set = $$props => {
    		if ('imagedisplay' in $$props) $$invalidate(0, imagedisplay = $$props.imagedisplay);
    		if ('itemname' in $$props) $$invalidate(1, itemname = $$props.itemname);
    		if ('leftlabel' in $$props) $$invalidate(2, leftlabel = $$props.leftlabel);
    		if ('leftbutton' in $$props) $$invalidate(3, leftbutton = $$props.leftbutton);
    		if ('price' in $$props) $$invalidate(4, price = $$props.price);
    		if ('imagex' in $$props) $$invalidate(5, imagex = $$props.imagex);
    	};

    	$$self.$capture_state = () => ({
    		imagedisplay,
    		itemname,
    		leftlabel,
    		leftbutton,
    		price,
    		imagex
    	});

    	$$self.$inject_state = $$props => {
    		if ('imagedisplay' in $$props) $$invalidate(0, imagedisplay = $$props.imagedisplay);
    		if ('itemname' in $$props) $$invalidate(1, itemname = $$props.itemname);
    		if ('leftlabel' in $$props) $$invalidate(2, leftlabel = $$props.leftlabel);
    		if ('leftbutton' in $$props) $$invalidate(3, leftbutton = $$props.leftbutton);
    		if ('price' in $$props) $$invalidate(4, price = $$props.price);
    		if ('imagex' in $$props) $$invalidate(5, imagex = $$props.imagex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [imagedisplay, itemname, leftlabel, leftbutton, price, imagex, click_handler];
    }

    class Cardpreviewer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			imagedisplay: 0,
    			itemname: 1,
    			leftlabel: 2,
    			leftbutton: 3,
    			price: 4,
    			imagex: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cardpreviewer",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get imagedisplay() {
    		throw new Error("<Cardpreviewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imagedisplay(value) {
    		throw new Error("<Cardpreviewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get itemname() {
    		throw new Error("<Cardpreviewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set itemname(value) {
    		throw new Error("<Cardpreviewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get leftlabel() {
    		throw new Error("<Cardpreviewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set leftlabel(value) {
    		throw new Error("<Cardpreviewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get leftbutton() {
    		throw new Error("<Cardpreviewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set leftbutton(value) {
    		throw new Error("<Cardpreviewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get price() {
    		throw new Error("<Cardpreviewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set price(value) {
    		throw new Error("<Cardpreviewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imagex() {
    		throw new Error("<Cardpreviewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imagex(value) {
    		throw new Error("<Cardpreviewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\tabs\store.svelte generated by Svelte v3.59.2 */
    const file$1 = "src\\tabs\\store.svelte";

    function create_fragment$1(ctx) {
    	let html;
    	let label0;
    	let t1;
    	let div0;
    	let cardpreviewer0;
    	let t2;
    	let cardpreviewer1;
    	let t3;
    	let cardpreviewer2;
    	let t4;
    	let label1;
    	let t6;
    	let div1;
    	let cardpreviewer3;
    	let t7;
    	let cardpreviewer4;
    	let t8;
    	let cardpreviewer5;
    	let t9;
    	let cardpreviewer6;
    	let t10;
    	let label2;
    	let t12;
    	let div2;
    	let cardpreviewer7;
    	let t13;
    	let cardpreviewer8;
    	let t14;
    	let cardpreviewer9;
    	let t15;
    	let cardpreviewer10;
    	let current;

    	cardpreviewer0 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/ruinic.webp",
    				itemname: "Ruinic Key",
    				price: "100",
    				imagex: "8"
    			},
    			$$inline: true
    		});

    	cardpreviewer1 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/dungeon.webp",
    				itemname: "Dungeon Key",
    				price: "150",
    				imagex: "8"
    			},
    			$$inline: true
    		});

    	cardpreviewer2 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/ender.webp",
    				itemname: "Ender Key",
    				price: "200",
    				imagex: "8"
    			},
    			$$inline: true
    		});

    	cardpreviewer3 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/adventurer.webp",
    				itemname: "Warrior",
    				leftlabel: "2",
    				leftbutton: "2.1",
    				price: "900"
    			},
    			$$inline: true
    		});

    	cardpreviewer4 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/pheonix.webp",
    				itemname: "Mythic",
    				leftlabel: "2",
    				leftbutton: "2.1",
    				price: "1250"
    			},
    			$$inline: true
    		});

    	cardpreviewer5 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/supreme.webp",
    				itemname: "Legend",
    				leftlabel: "2",
    				leftbutton: "2.1",
    				price: "1700"
    			},
    			$$inline: true
    		});

    	cardpreviewer6 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/cosmic.webp",
    				itemname: "Heroic",
    				leftlabel: "2",
    				leftbutton: "2.1",
    				price: "2450"
    			},
    			$$inline: true
    		});

    	cardpreviewer7 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/adventurer-block.webp",
    				itemname: "Adventurer Kit",
    				leftlabel: "2",
    				leftbutton: "2.1",
    				price: "850"
    			},
    			$$inline: true
    		});

    	cardpreviewer8 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/pheonix-block.webp",
    				itemname: "Pheonix Kit",
    				leftlabel: "2",
    				leftbutton: "2.1",
    				price: "1200"
    			},
    			$$inline: true
    		});

    	cardpreviewer9 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/supreme-block.webp",
    				itemname: "Supreme Kit",
    				leftlabel: "2",
    				leftbutton: "2.1",
    				price: "1650"
    			},
    			$$inline: true
    		});

    	cardpreviewer10 = new Cardpreviewer({
    			props: {
    				imagedisplay: "resources/cosmic-block.webp",
    				itemname: "Cosmic Kit",
    				leftlabel: "2",
    				leftbutton: "2.1",
    				price: "2250"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			html = element("html");
    			label0 = element("label");
    			label0.textContent = "Keys";
    			t1 = space();
    			div0 = element("div");
    			create_component(cardpreviewer0.$$.fragment);
    			t2 = space();
    			create_component(cardpreviewer1.$$.fragment);
    			t3 = space();
    			create_component(cardpreviewer2.$$.fragment);
    			t4 = space();
    			label1 = element("label");
    			label1.textContent = "Ranks";
    			t6 = space();
    			div1 = element("div");
    			create_component(cardpreviewer3.$$.fragment);
    			t7 = space();
    			create_component(cardpreviewer4.$$.fragment);
    			t8 = space();
    			create_component(cardpreviewer5.$$.fragment);
    			t9 = space();
    			create_component(cardpreviewer6.$$.fragment);
    			t10 = space();
    			label2 = element("label");
    			label2.textContent = "Kits";
    			t12 = space();
    			div2 = element("div");
    			create_component(cardpreviewer7.$$.fragment);
    			t13 = space();
    			create_component(cardpreviewer8.$$.fragment);
    			t14 = space();
    			create_component(cardpreviewer9.$$.fragment);
    			t15 = space();
    			create_component(cardpreviewer10.$$.fragment);
    			attr_dev(label0, "class", "experiencenav-info storeinfo svelte-ltzxvb");
    			add_location(label0, file$1, 6, 2, 142);
    			attr_dev(div0, "class", "itemstore svelte-ltzxvb");
    			add_location(div0, file$1, 7, 2, 202);
    			attr_dev(label1, "class", "experiencenav-info storeinfo svelte-ltzxvb");
    			set_style(label1, "top", "95vh");
    			add_location(label1, file$1, 12, 2, 545);
    			attr_dev(div1, "class", "itemstore svelte-ltzxvb");
    			set_style(div1, "top", "110vh");
    			add_location(div1, file$1, 13, 2, 625);
    			attr_dev(label2, "class", "experiencenav-info storeinfo svelte-ltzxvb");
    			set_style(label2, "top", "190vh");
    			add_location(label2, file$1, 19, 2, 1161);
    			attr_dev(div2, "class", "itemstore svelte-ltzxvb");
    			set_style(div2, "top", "205vh");
    			add_location(div2, file$1, 20, 2, 1241);
    			add_location(html, file$1, 4, 0, 86);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, html, anchor);
    			append_dev(html, label0);
    			append_dev(html, t1);
    			append_dev(html, div0);
    			mount_component(cardpreviewer0, div0, null);
    			append_dev(div0, t2);
    			mount_component(cardpreviewer1, div0, null);
    			append_dev(div0, t3);
    			mount_component(cardpreviewer2, div0, null);
    			append_dev(html, t4);
    			append_dev(html, label1);
    			append_dev(html, t6);
    			append_dev(html, div1);
    			mount_component(cardpreviewer3, div1, null);
    			append_dev(div1, t7);
    			mount_component(cardpreviewer4, div1, null);
    			append_dev(div1, t8);
    			mount_component(cardpreviewer5, div1, null);
    			append_dev(div1, t9);
    			mount_component(cardpreviewer6, div1, null);
    			append_dev(html, t10);
    			append_dev(html, label2);
    			append_dev(html, t12);
    			append_dev(html, div2);
    			mount_component(cardpreviewer7, div2, null);
    			append_dev(div2, t13);
    			mount_component(cardpreviewer8, div2, null);
    			append_dev(div2, t14);
    			mount_component(cardpreviewer9, div2, null);
    			append_dev(div2, t15);
    			mount_component(cardpreviewer10, div2, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cardpreviewer0.$$.fragment, local);
    			transition_in(cardpreviewer1.$$.fragment, local);
    			transition_in(cardpreviewer2.$$.fragment, local);
    			transition_in(cardpreviewer3.$$.fragment, local);
    			transition_in(cardpreviewer4.$$.fragment, local);
    			transition_in(cardpreviewer5.$$.fragment, local);
    			transition_in(cardpreviewer6.$$.fragment, local);
    			transition_in(cardpreviewer7.$$.fragment, local);
    			transition_in(cardpreviewer8.$$.fragment, local);
    			transition_in(cardpreviewer9.$$.fragment, local);
    			transition_in(cardpreviewer10.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cardpreviewer0.$$.fragment, local);
    			transition_out(cardpreviewer1.$$.fragment, local);
    			transition_out(cardpreviewer2.$$.fragment, local);
    			transition_out(cardpreviewer3.$$.fragment, local);
    			transition_out(cardpreviewer4.$$.fragment, local);
    			transition_out(cardpreviewer5.$$.fragment, local);
    			transition_out(cardpreviewer6.$$.fragment, local);
    			transition_out(cardpreviewer7.$$.fragment, local);
    			transition_out(cardpreviewer8.$$.fragment, local);
    			transition_out(cardpreviewer9.$$.fragment, local);
    			transition_out(cardpreviewer10.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html);
    			destroy_component(cardpreviewer0);
    			destroy_component(cardpreviewer1);
    			destroy_component(cardpreviewer2);
    			destroy_component(cardpreviewer3);
    			destroy_component(cardpreviewer4);
    			destroy_component(cardpreviewer5);
    			destroy_component(cardpreviewer6);
    			destroy_component(cardpreviewer7);
    			destroy_component(cardpreviewer8);
    			destroy_component(cardpreviewer9);
    			destroy_component(cardpreviewer10);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Store', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Store> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Cardpreviewer });
    	return [];
    }

    class Store extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Store",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */

    const { console: console_1 } = globals;
    const file = "src\\App.svelte";

    // (27:4) {#if selectedTab == '4'}
    function create_if_block_3(ctx) {
    	let info;
    	let current;
    	info = new Info({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(info.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(info, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(info.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(info, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(27:4) {#if selectedTab == '4'}",
    		ctx
    	});

    	return block;
    }

    // (28:4) {#if selectedTab == '2'}
    function create_if_block_2(ctx) {
    	let events;
    	let current;
    	events = new Events({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(events.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(events, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(events.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(events.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(events, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(28:4) {#if selectedTab == '2'}",
    		ctx
    	});

    	return block;
    }

    // (29:4) {#if selectedTab == '1'}
    function create_if_block_1(ctx) {
    	let servers;
    	let current;
    	servers = new Servers({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(servers.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(servers, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(servers.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(servers.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(servers, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(29:4) {#if selectedTab == '1'}",
    		ctx
    	});

    	return block;
    }

    // (30:4) {#if selectedTab == '3'}
    function create_if_block(ctx) {
    	let store;
    	let current;
    	store = new Store({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(store.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(store, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(store.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(store.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(store, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(30:4) {#if selectedTab == '3'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let nav0;
    	let label;
    	let t0;
    	let t1;
    	let button0;
    	let t3;
    	let button1;
    	let t5;
    	let button2;
    	let t7;
    	let button3;
    	let t9;
    	let nav1;
    	let t10;
    	let t11;
    	let t12;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*selectedTab*/ ctx[1] == '4' && create_if_block_3(ctx);
    	let if_block1 = /*selectedTab*/ ctx[1] == '2' && create_if_block_2(ctx);
    	let if_block2 = /*selectedTab*/ ctx[1] == '1' && create_if_block_1(ctx);
    	let if_block3 = /*selectedTab*/ ctx[1] == '3' && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			nav0 = element("nav");
    			label = element("label");
    			t0 = text(/*name*/ ctx[0]);
    			t1 = space();
    			button0 = element("button");
    			button0.textContent = "Servers";
    			t3 = space();
    			button1 = element("button");
    			button1.textContent = "Events";
    			t5 = space();
    			button2 = element("button");
    			button2.textContent = "Store";
    			t7 = space();
    			button3 = element("button");
    			button3.textContent = "Info";
    			t9 = space();
    			nav1 = element("nav");
    			if (if_block0) if_block0.c();
    			t10 = space();
    			if (if_block1) if_block1.c();
    			t11 = space();
    			if (if_block2) if_block2.c();
    			t12 = space();
    			if (if_block3) if_block3.c();
    			attr_dev(label, "class", "websitenameinfo svelte-1awxazb");
    			add_location(label, file, 18, 4, 393);
    			attr_dev(button0, "class", "topbarbtn svelte-1awxazb");
    			toggle_class(button0, "selected", '1' === /*selectedTab*/ ctx[1]);
    			add_location(button0, file, 20, 4, 444);
    			attr_dev(button1, "class", "topbarbtn svelte-1awxazb");
    			toggle_class(button1, "selected", '2' === /*selectedTab*/ ctx[1]);
    			add_location(button1, file, 21, 4, 567);
    			attr_dev(button2, "class", "topbarbtn svelte-1awxazb");
    			toggle_class(button2, "selected", '3' === /*selectedTab*/ ctx[1]);
    			add_location(button2, file, 22, 4, 689);
    			attr_dev(button3, "class", "topbarbtn svelte-1awxazb");
    			toggle_class(button3, "selected", '4' === /*selectedTab*/ ctx[1]);
    			add_location(button3, file, 23, 4, 810);
    			attr_dev(nav0, "class", "topbar svelte-1awxazb");
    			add_location(nav0, file, 17, 2, 368);
    			attr_dev(nav1, "class", "tabpage svelte-1awxazb");
    			add_location(nav1, file, 25, 1, 936);
    			add_location(main, file, 16, 0, 359);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, nav0);
    			append_dev(nav0, label);
    			append_dev(label, t0);
    			append_dev(nav0, t1);
    			append_dev(nav0, button0);
    			append_dev(nav0, t3);
    			append_dev(nav0, button1);
    			append_dev(nav0, t5);
    			append_dev(nav0, button2);
    			append_dev(nav0, t7);
    			append_dev(nav0, button3);
    			append_dev(main, t9);
    			append_dev(main, nav1);
    			if (if_block0) if_block0.m(nav1, null);
    			append_dev(nav1, t10);
    			if (if_block1) if_block1.m(nav1, null);
    			append_dev(nav1, t11);
    			if (if_block2) if_block2.m(nav1, null);
    			append_dev(nav1, t12);
    			if (if_block3) if_block3.m(nav1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[3], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[4], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[5], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[6], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);

    			if (!current || dirty & /*selectedTab*/ 2) {
    				toggle_class(button0, "selected", '1' === /*selectedTab*/ ctx[1]);
    			}

    			if (!current || dirty & /*selectedTab*/ 2) {
    				toggle_class(button1, "selected", '2' === /*selectedTab*/ ctx[1]);
    			}

    			if (!current || dirty & /*selectedTab*/ 2) {
    				toggle_class(button2, "selected", '3' === /*selectedTab*/ ctx[1]);
    			}

    			if (!current || dirty & /*selectedTab*/ 2) {
    				toggle_class(button3, "selected", '4' === /*selectedTab*/ ctx[1]);
    			}

    			if (/*selectedTab*/ ctx[1] == '4') {
    				if (if_block0) {
    					if (dirty & /*selectedTab*/ 2) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(nav1, t10);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*selectedTab*/ ctx[1] == '2') {
    				if (if_block1) {
    					if (dirty & /*selectedTab*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(nav1, t11);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*selectedTab*/ ctx[1] == '1') {
    				if (if_block2) {
    					if (dirty & /*selectedTab*/ 2) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(nav1, t12);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*selectedTab*/ ctx[1] == '3') {
    				if (if_block3) {
    					if (dirty & /*selectedTab*/ 2) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(nav1, null);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { name } = $$props;
    	let selectedTab = null;

    	function onTopBarBtnClick(tab) {
    		$$invalidate(1, selectedTab = tab);
    		console.log(selectedTab);
    	}

    	onTopBarBtnClick('3');

    	$$self.$$.on_mount.push(function () {
    		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
    			console_1.warn("<App> was created without expected prop 'name'");
    		}
    	});

    	const writable_props = ['name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => onTopBarBtnClick('1');
    	const click_handler_1 = () => onTopBarBtnClick('2');
    	const click_handler_2 = () => onTopBarBtnClick('3');
    	const click_handler_3 = () => onTopBarBtnClick('4');

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({
    		Info,
    		Events,
    		Servers,
    		Store,
    		name,
    		selectedTab,
    		onTopBarBtnClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('selectedTab' in $$props) $$invalidate(1, selectedTab = $$props.selectedTab);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		selectedTab,
    		onTopBarBtnClick,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'ThunderMC'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
