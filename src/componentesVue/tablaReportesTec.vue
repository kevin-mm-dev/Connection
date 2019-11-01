<template>
	<table ref="table"
		class="scrolling"
		:class="{ scrolly: scrollVertical, scrollx: scrollHorizontal }"
		:style="tableStyle"
		>
		<thead name="thead" ref="thead"
			:class="{ scrollsync: syncHeaderScroll }"
			:style="syncHeaderScroll && scrollVertical ? stubScrollbarStyle : ''"
			@dragenter="onDragEnterHeader"
			@dragover.prevent="onDragOverHeader"
			@drop="onDropHeader"
			><slot name="thead"/>
      <tr>
        <th><b>Cliente</b></th>
        <!-- <th>Celular</th> -->
        <th>Fallas</th>
        <th style="width:1rem;">Fecha</th>
        <th>Revisar</th>
        <th>Cotizare</th>
        </tr> 
        </thead>
		<tbody class="propiedadesTabla" name="tbody" ref="tbody"
			@scroll.passive="updateSyncedScroll"><slot name="tbody"/>
       
	   

	  <tr v-for="re in listaReportes" v-bind:key="re.key">
            <th>{{re.nombreCliente}}</th>
            <!-- <th>{{re.celularCliente}}</th> -->
            <th>{{re.fallas}}</th>
            <th style="width:1rem;">{{re.fecha}}</th>
			<th  class="tablaOpciones">
				<a class="button is-info" @click="verReporte(re)"><span class="icon is-small"><i class="far fa-eye"></i></span></a>
				<!-- <a style="margin-left:3rem;" class="button is-success"><span class="icon is-small"><i class="far fa-check-circle"></i></span></a> -->
            </th>
            <th class="tablaOpciones">
				<a  @click="cotizarReporte(re)" class="button is-info">
					<span class="icon is-small">
						<i class="far fa-edit"></i>
					</span>
				</a>
				<a v-if="re.cotizado==(1)" class="button is-success">
					<span class="icon is-small">
						<i class="far fa-laugh-beam"></i>
					</span>
				</a>
            </th>
			
        </tr>
		
      </tbody>
		<tfoot name="tfoot" ref="tfoot"
			v-if="includeFooter"
			:class="{ scrollsync: syncFooterScroll }"
			:style="syncFooterScroll && scrollVertical ? stubScrollbarStyle : ''"
			><slot name="tfoot"/></tfoot>
	</table>
</template>
<script>
export default {
  name: "VueScrollingTable",
   props:['listaReportes'],
	// props: {
	// 	listaReportes:[],
	// 	deadAreaColor: { type: String, required: false, default: "#CCC" },
	// 	includeFooter: { type: Boolean, required: false, default: false },
	// 	syncHeaderScroll: { type: Boolean, required: false, default: true },
	// 	syncFooterScroll: { type: Boolean, required: false, default: true },
	// 	scrollHorizontal: { type: Boolean, required: false, default: true },
    // 	scrollVertical: { type: Boolean, required: false, default: true },
	// },
	data (){
    return {
		deadAreaColor: { type: String, required: false, default: "#CCC" },
		includeFooter: { type: Boolean, required: false, default: false },
		syncHeaderScroll: { type: Boolean, required: false, default: true },
		syncFooterScroll: { type: Boolean, required: false, default: true },
		scrollHorizontal: { type: Boolean, required: false, default: true },
    	scrollVertical: { type: Boolean, required: false, default: true },
		}
	},
	computed: {
		tableStyle() {
			return `background-color: ${this.deadAreaColor};`
		},
		stubScrollbarStyle() {
			return `background-color: ${this.deadAreaColor};
				scrollbar-base-color: ${this.deadAreaColor};
				scrollbar-face-color: ${this.deadAreaColor};
				scrollbar-highlight-color: ${this.deadAreaColor};
				scrollbar-track-color: ${this.deadAreaColor};
				scrollbar-arrow-color: ${this.deadAreaColor};
				scrollbar-shadow-color: ${this.deadAreaColor};
				scrollbar-darkshadow-color: ${this.deadAreaColor};`
		},
	},
	watch: {
		deadAreaColor() {
			this.setColors()
		},
	},
	mounted: function() {
		this.setColors()
		this.updateSyncedScroll()
	},
	methods: {
		updateSyncedScroll() {
			const b = this.$refs.tbody
			const l = b.scrollLeft
			if (this.scrollHorizontal) {
				if (this.syncHeaderScroll) {
					const h = this.$refs.thead
					if (h.scrollLeft !== l) {
						h.scrollLeft = l
					}
				}
				if (this.includeFooter && this.syncFooterScroll) {
					const f = this.$refs.tfoot
					if (f.scrollLeft !== l) {
						f.scrollLeft = l
					}
				}
			}
			this.$emit("scroll", b.scrollTop, l, b.scrollHeight, b.scrollWidth)
		},
		setColors() {
			const s = this.$refs.table.style
			s.setProperty("--dead-area-color", this.deadAreaColor)
		},
		onDragEnterHeader(e) {
			this.$emit("header-dragenter", e)
		},
		onDragOverHeader(e) {
			this.$emit("header-dragover", e)
		},
		onDropHeader(e) {
			this.$emit("header-drop", e)
		},
		cotizarReporte(re)
		{
			this.$emit("cotizarReporte", re)
		},
		verReporte(re)
		{
			this.$emit("verReporte", re)
		}
	},
}
</script>
<style>
table.scrolling {
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	width: 100%;
	height: 100%;
	border-collapse: collapse;
	overflow: hidden;
	/* Use this to create a "dead" area color if table is too wide for cells */
	background-color: #ccc;
	--dead-area-color: #ccc;
  width: 61rem;
    margin-left: 15rem;
}

table.scrolling thead,
table.scrolling tfoot {
	/* Grow automatically to fit content, don't shrink it proportionately to the body. */
	flex: 0 0 auto;
	display: block;
	/* Horizontal scrolling, when allowed, is controlled by JS, not a scroll bar. */
	overflow: hidden;
}

table.scrolling tbody {
	display: block;
	flex: 1 1 auto;
	/* Disable all scrolling by default */
	overflow: hidden;
}

.propiedadesTabla{
  height: 30rem;
  /* width: 30rem; */
}
/* Turn on vertical scrolling for all elements so scroll bars take up the same space */
table.scrolling.scrolly tbody,
table.scrolling.scrolly thead.scrollsync,
table.scrolling.scrolly tfoot.scrollsync {
	overflow-y: scroll;
}

/* Turn on horizontal scrolling for the body only */
table.scrolling.scrollx tbody {
	overflow-x: scroll;
}

/*
For Webkit, use "dead area" color to hide vertical scrollbar functions in the header and footer.
Since WebKit supports CSS variables and style attributes don't support pseudo-classes, use variables.
Display is set because otherwise Chrome ignores the other styling.
TODO: on Chrome/Safari for Mac, scrollbars are not shown anyway and this creates an extra block. No impact on iOS Safari.
*/
table.scrolling.scrolly thead.scrollsync::-webkit-scrollbar {
	display: block;
	background-color: var(--dead-area-color);
}
table.scrolling.scrolly thead.scrollsync::-webkit-scrollbar-track {
	background-color: var(--dead-area-color);
}

/* IE11 adds an extra tbody, have to hide it. */
table.scrolling tbody:nth-child(3) {
	display: none;
}

/* The one caveat to scrolling this way: a hard-set width is required. Can override in thead/tbody slot. */
table.scrolling td,
table.scrolling th {
	border: 1px solid #ddd;

	/* These must all be set the same in your overriding CSS */
	width: 10em;
	min-width: 10em;
	max-width: 10em;

	/* Important in case your data is too long for your cell */
	overflow: hidden;
	word-wrap: break-word;
}

table.scrolling td {
	background-color: #fff;
}

table.scrolling th {
	background-color: #f7f7f7;
}
</style>
