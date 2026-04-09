/* <!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-container": "#553326",
                    "on-primary-fixed": "#00201e",
                    "error-container": "#ffdad6",
                    "on-secondary": "#ffffff",
                    "on-secondary-fixed-variant": "#2a4d4a",
                    "on-secondary-fixed": "#00201e",
                    "surface-container-highest": "#e1e3e3",
                    "surface-tint": "#416561",
                    "surface": "#f8fafa",
                    "on-surface-variant": "#414847",
                    "on-error-container": "#93000a",
                    "primary-fixed-dim": "#a8cec9",
                    "surface-dim": "#d8dada",
                    "outline-variant": "#c0c8c6",
                    "inverse-on-surface": "#eff1f1",
                    "primary": "#032b28",
                    "tertiary-fixed": "#ffdbce",
                    "on-surface": "#191c1d",
                    "error": "#ba1a1a",
                    "tertiary": "#3c1e12",
                    "on-primary": "#ffffff",
                    "on-tertiary-fixed": "#2f1409",
                    "secondary-container": "#c4eae6",
                    "inverse-surface": "#2e3131",
                    "primary-container": "#1d413e",
                    "on-tertiary-fixed-variant": "#623e30",
                    "surface-container": "#eceeee",
                    "surface-variant": "#e1e3e3",
                    "surface-bright": "#f8fafa",
                    "outline": "#717977",
                    "primary-fixed": "#c4eae5",
                    "on-background": "#191c1d",
                    "surface-container-lowest": "#ffffff",
                    "on-primary-fixed-variant": "#294d4a",
                    "secondary-fixed": "#c4eae6",
                    "on-tertiary-container": "#cb9b8a",
                    "on-tertiary": "#ffffff",
                    "surface-container-low": "#f2f4f4",
                    "tertiary-fixed-dim": "#eebba9",
                    "background": "#f8fafa",
                    "secondary-fixed-dim": "#a9ceca",
                    "secondary": "#426562",
                    "on-secondary-container": "#486b68",
                    "on-primary-container": "#88ada8",
                    "on-error": "#ffffff",
                    "surface-container-high": "#e6e8e8",
                    "inverse-primary": "#a8cec9"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Plus Jakarta Sans"],
                    "body": ["Inter"],
                    "label": ["Inter"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .tonal-shift { background-color: rgba(255, 255, 255, 0.8); }
        @media (prefers-color-scheme: dark) {
            .tonal-shift { background-color: rgba(3, 43, 40, 0.8); }
        }
    </style>
</head>
<body class="bg-surface font-body text-on-surface antialiased">
<!-- TopNavBar (Shared Component) -->
<header class="sticky top-4 z-50 flex justify-between items-center px-8 py-4 w-full max-w-[900px] mx-auto mt-4 rounded-b-xl rounded-t-xl bg-white/80 dark:bg-emerald-950/80 backdrop-blur-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)]">
<div class="text-xl font-bold tracking-tighter text-emerald-900 dark:text-emerald-50 font-headline uppercase">
            ESTATE CURATOR
        </div>
<nav class="hidden md:flex items-center gap-6">
<a class="text-emerald-700/60 dark:text-emerald-200/60 hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors font-headline tracking-tight font-semibold" href="#">Collections</a>
<a class="text-emerald-700/60 dark:text-emerald-200/60 hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors font-headline tracking-tight font-semibold" href="#">Neighborhoods</a>
<a class="text-emerald-700/60 dark:text-emerald-200/60 hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors font-headline tracking-tight font-semibold" href="#">Journal</a>
<a class="text-emerald-700/60 dark:text-emerald-200/60 hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors font-headline tracking-tight font-semibold" href="#">Inquiry</a>
</nav>
<div class="flex items-center gap-4">
<button class="hidden lg:block text-sm font-semibold text-emerald-900 dark:text-emerald-50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/50 transition-all duration-300 px-4 py-2 rounded-full">
                Sign In
            </button>
<button class="bg-primary text-on-primary px-5 py-2 rounded-full text-sm font-bold active:scale-95 duration-200 ease-in-out">
                List Property
            </button>
</div>
</header>
<main>
<!-- Hero Section -->
<section class="relative min-h-[921px] flex flex-col items-center justify-center pt-24 pb-12 px-6">
<div class="absolute inset-0 z-0 overflow-hidden">
<img alt="Luxury architectural property" class="w-full h-full object-cover brightness-75" data-alt="Modern minimalist luxury villa with clean white lines and glass walls overlooking a serene forest during twilight with soft warm interior lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAy5dGXTSRkOy78umZuRv3yWTelHliEnAcptf-Dgygrl__sUw83jw46mc8LP3fCmp0H26c-oiG2dc1fnPLh-uBTmV_cSFt6gSyfS6stMrrHTF82WqJACyJ8BVFkP5bIDqhlIsBC1Mj2CoUExmRbFnw9QVD1JmA-DiNbUBnsR68-eVs2odrzyspAFPwVnkRHSTNE3J5DD8CJoDPpIepSykHwhV5bUadZMgO7feqEgZa7qcxK19rHpuc74up3M-HCXvmpwsj-Y-eD9g"/>
<div class="absolute inset-0 bg-gradient-to-b from-transparent via-surface/10 to-surface"></div>
</div>
<div class="relative z-10 text-center mb-12 max-w-4xl">
<span class="label-md uppercase tracking-[0.2em] text-on-primary-fixed-variant mb-4 block font-semibold">División Propiedades</span>
<h1 class="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6 leading-tight">
                    Encontrá tu hogar ideal
                </h1>
</div>
<!-- Advanced Search Form -->
<div class="relative z-10 w-full max-w-5xl bg-surface-container-lowest/90 backdrop-blur-2xl rounded-[2rem] p-4 md:p-8 shadow-2xl">
<form class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
<div class="flex flex-col gap-2">
<label class="text-[10px] font-bold uppercase tracking-widest text-secondary pl-2">Tipo</label>
<select class="bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-medium py-3">
<option>Casa</option>
<option>Departamento</option>
<option>Terreno</option>
</select>
</div>
<div class="flex flex-col gap-2">
<label class="text-[10px] font-bold uppercase tracking-widest text-secondary pl-2">Categoría</label>
<select class="bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-medium py-3">
<option>Venta</option>
<option>Alquiler</option>
</select>
</div>
<div class="flex flex-col gap-2">
<label class="text-[10px] font-bold uppercase tracking-widest text-secondary pl-2">Barrio</label>
<select class="bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-medium py-3">
<option>El Mollar</option>
<option>Yerba Buena</option>
<option>San Miguel</option>
</select>
</div>
<div class="flex flex-col gap-2">
<label class="text-[10px] font-bold uppercase tracking-widest text-secondary pl-2">Zona</label>
<select class="bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-medium py-3">
<option>Norte</option>
<option>Sur</option>
<option>Este</option>
</select>
</div>
<div class="flex items-end">
<button class="w-full h-[52px] bg-primary text-on-primary font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider" type="submit">
<span class="material-symbols-outlined text-sm">search</span>
                            SEARCH PROPERTIES
                        </button>
</div>
</form>
</div>
</section>
<!-- Property Listing Section -->
<section class="max-w-7xl mx-auto px-6 py-24">
<div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
<div class="max-w-xl">
<h2 class="font-headline text-4xl font-extrabold tracking-tight mb-4">Encontrá el lugar que necesitas</h2>
<p class="text-on-surface-variant text-lg">Curated selections of the most exclusive properties in Northern Argentina.</p>
</div>
<div class="flex gap-2">
<button class="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined">west</span>
</button>
<button class="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined">east</span>
</button>
</div>
</div>
<!-- Bento-style Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Card 1 -->
<div class="group bg-surface-container-lowest rounded-[1.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
<div class="relative h-72 overflow-hidden">
<img alt="Terreno Mollar" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Wide scenic landscape of a green mountain meadow under a bright blue sky with scattered clouds in Northern Argentina" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPsd0j9Bz_6JYPA32tsQGAutWwfkjAZBMov7f2KuWfWQODjKnJWU1e579y9y-CPLMAjDJoUWas-HuTz4OGJosNig2YcSNoZGE6dopDxPlXTtHvP6rjDN_nyQtgj9Il0SupVZVmZ97RMofNkuzTsXG4jBunGT4Qyu07_WuO9MGCrjEWqyvlV3Nopve9zUKE-EhtrR_Mi0810K0_nk4SW4lITB-GfoKq40bsDDmLONRoTba3qfYPsQtgTSlL_oZAVgxS4Zm3lkOkjTI"/>
<div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">FOR SALE</div>
</div>
<div class="p-8 flex flex-col flex-grow">
<div class="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter mb-2">
<span class="material-symbols-outlined text-sm">location_on</span>
                            El Mollar, Tucumán
                        </div>
<h3 class="font-headline text-2xl font-bold mb-3">TERRENO MOLLAR III</h3>
<p class="text-on-surface-variant text-sm line-clamp-3 mb-6">Exclusive plot with panoramic mountain views, perfect for a high-end architectural project. Infrastructure and road access fully developed.</p>
<div class="mt-auto pt-6 flex justify-between items-center border-t border-surface-container-low">
<span class="text-primary font-bold text-lg">$145,000</span>
<button class="flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-1 transition-transform uppercase tracking-wider">
                                Ver Detalles
                                <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="group bg-surface-container-lowest rounded-[1.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
<div class="relative h-72 overflow-hidden">
<img alt="Luxury Villa" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Ultra-modern luxury house with large glass windows and an infinity pool reflecting the dusk sky with orange and purple hues" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvccPGmXv2TKY9CDJ2EZU2t0t896NRuFxKZZVOQllg0ykJ5nS3r81MbbRRMweSZw10mvBX9Mc53FVyqZxwCRB7SO8ETl2Hphcwo5ORIVvnLhEEzOS_guW4VbOpgysFXhhfpM9-9U8cSvLfzFiqocFFb6Rg1rQrPmVevOFDTOMGdrPZJiFiEXRj2-2wwSqaJWMOnVPDxamgkKvBzenzE8QFoBEVV3pgUAGwZkeflFINH-gaJ-lVyfB_c5UcQ2UGTbRmH5zAyS1gO3E"/>
<div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">NEW LISTING</div>
</div>
<div class="p-8 flex flex-col flex-grow">
<div class="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter mb-2">
<span class="material-symbols-outlined text-sm">location_on</span>
                            Yerba Buena
                        </div>
<h3 class="font-headline text-2xl font-bold mb-3">VILLA HORIZONTE</h3>
<p class="text-on-surface-variant text-sm line-clamp-3 mb-6">Contemporary villa featuring sustainable design, smart home automation, and an integrated garden that merges with the interior spaces.</p>
<div class="mt-auto pt-6 flex justify-between items-center border-t border-surface-container-low">
<span class="text-primary font-bold text-lg">$580,000</span>
<button class="flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-1 transition-transform uppercase tracking-wider">
                                Ver Detalles
                                <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Card 3 -->
<div class="group bg-surface-container-lowest rounded-[1.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
<div class="relative h-72 overflow-hidden">
<img alt="Classic Estate" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Elegant classic white colonial style estate with manicured green lawns and palm trees under a bright midday sun" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGCgGgoIQCyPYbfeX8tqJDuI1p-XOq-mP3Se917-jH0hWvZH7qH2DgTWkKfc2WICDKfx_batQ9RWmySSSyy6nKNpLkh3GkrfV3UeCpqSM3Yl88QwCx4ZXH45LgawZDhce4V_UBabfcyqxFQxtkg-cQVkEjdAyiy8Jakg8IyGzw5M3LfHNaHDr3DT3hAyIkbLFK5P2ysSuxefUGxQOBGNyL6BupWDmSb7T8l56ygNZzE2SV3oyw0CjxTMaVdqC_j6CHCObw9nMuU-0"/>
<div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">OPPORTUNITY</div>
</div>
<div class="p-8 flex flex-col flex-grow">
<div class="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter mb-2">
<span class="material-symbols-outlined text-sm">location_on</span>
                            San Pablo, Tucumán
                        </div>
<h3 class="font-headline text-2xl font-bold mb-3">QUINTA LAS PALMAS</h3>
<p class="text-on-surface-variant text-sm line-clamp-3 mb-6">Historic family estate restored to perfection. Features a private orchard, traditional gallery architecture, and a spacious pool area.</p>
<div class="mt-auto pt-6 flex justify-between items-center border-t border-surface-container-low">
<span class="text-primary font-bold text-lg">$320,000</span>
<button class="flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-1 transition-transform uppercase tracking-wider">
                                Ver Detalles
                                <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
</section>
<!-- Featured Section -->
<section class="bg-primary text-white py-24 my-24 overflow-hidden relative">
<div class="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
<span class="material-symbols-outlined text-[30rem] leading-none -translate-y-20 translate-x-20">apartment</span>
</div>
<div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div>
<h2 class="font-headline text-5xl font-extrabold mb-6">The Curator's Standard</h2>
<p class="text-on-primary-container text-xl mb-10 leading-relaxed">We don't just list properties; we analyze every architectural detail, neighborhood evolution, and investment potential to ensure you find a home that matches your legacy.</p>
<div class="grid grid-cols-2 gap-8 mb-10">
<div>
<div class="text-4xl font-extrabold mb-2">12+</div>
<div class="text-sm font-bold uppercase tracking-widest text-on-primary-container">Years Experience</div>
</div>
<div>
<div class="text-4xl font-extrabold mb-2">450+</div>
<div class="text-sm font-bold uppercase tracking-widest text-on-primary-container">Curated Estates</div>
</div>
</div>
<button class="bg-on-primary text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-container hover:text-white transition-colors">
                        Learn our process
                    </button>
</div>
<div class="relative">
<img alt="Interior design" class="rounded-3xl shadow-2xl relative z-10 w-full aspect-[4/5] object-cover" data-alt="Luxury modern office interior with warm wood panels, minimalist furniture, and large floor-to-ceiling windows showing city views" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCysKlN21huYI2HFptM6vT3hsyTl-pIcplFF7Bybxhhceb5pNbo8oyrrh9GeM-LqJPQEgF09wPGMTyzNmg1GH9ly6ej4H-7E_z0wMnH403kp04F4lxJK6jWUZuz32BAljkC0xGV8knJ-feNb2qW3gCyO_qId7o6irUxk2OQM6pJ9-NoVtC99XfI4la-PompAF3Z83fXrARBkw3e3zXPlIWyE6n7bsOIHLBMcuS120dm1h47Hc3ZYfD5Oc6QVJ7ZY1QRCWVyVcow3Nw"/>
<div class="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary-container rounded-2xl z-0"></div>
</div>
</div>
</section>
</main>
<!-- Footer (Shared Component) -->
<footer class="bg-slate-50 dark:bg-emerald-950 full-width py-12 px-8 mt-24">
<div class="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto w-full gap-8">
<div class="flex flex-col gap-2">
<span class="font-['Plus_Jakarta_Sans'] font-bold text-lg text-emerald-900 dark:text-emerald-50 uppercase">ESTATE CURATOR</span>
<span class="font-['Inter'] text-xs tracking-wide uppercase text-emerald-700/50 dark:text-emerald-300/50">
                    © 2024 THE ARCHITECTURAL CURATOR. ALL RIGHTS RESERVED.
                </span>
</div>
<nav class="flex flex-wrap justify-center gap-8">
<a class="font-['Inter'] text-sm tracking-wide uppercase text-emerald-700/50 dark:text-emerald-300/50 hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors" href="#">Privacy Policy</a>
<a class="font-['Inter'] text-sm tracking-wide uppercase text-emerald-700/50 dark:text-emerald-300/50 hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors" href="#">Terms of Service</a>
<a class="font-['Inter'] text-sm tracking-wide uppercase text-emerald-700/50 dark:text-emerald-300/50 hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors" href="#">Accessibility</a>
<a class="font-['Inter'] text-sm tracking-wide uppercase text-emerald-700/50 dark:text-emerald-300/50 hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors" href="#">Contact</a>
</nav>
<div class="flex gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded-full border border-emerald-900/10 text-emerald-900 dark:text-emerald-50 hover:bg-emerald-50 dark:hover:bg-emerald-900 transition-colors">
<span class="material-symbols-outlined text-lg">public</span>
</button>
<button class="w-10 h-10 flex items-center justify-center rounded-full border border-emerald-900/10 text-emerald-900 dark:text-emerald-50 hover:bg-emerald-50 dark:hover:bg-emerald-900 transition-colors">
<span class="material-symbols-outlined text-lg">mail</span>
</button>
</div>
</div>
</footer>
</body></html> */