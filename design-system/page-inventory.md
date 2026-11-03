# Page inventory

The draft website at https://aquemi-official.github.io/aquemi-web/ has 34 pages built from this system (pass 11 added urs-guide, project-plan, first-system and buying, DR-026; pass 12 added ind-personal-care, ind-hospital-lab and ind-process, DR-027, renamed projects "Applications" and news "Technical notes", and made the header a mega menu, DR-029). Aquemi offers a modular Purified Water package in PP with PVC pretreatment (pretreatment, RO, DI/EDI, distribution); the WFI, pure steam and biotechnology pages are retired to `content/retired/`. The repository is `Aquemi-Official/aquemi-web`; page copy lives in `content/pages.json`. Use this list when you design or write any page, deck or document so page names and structure match the site.

Every page is: NavBar, Hero, an optional SectionNav (pages whose blocks carry a short `nav` label, four or more), content sections, a closing navy Band, Footer, and the BackToTop button (shown once the reader is well down the page). The sections each page uses are listed below in order, each as `type (nav label, or heading when it has none, #anchor, fold: Look component)`; generated from the page files by the pass 12 integrator; `closing` notes a `cta.include` checklist, `cta.returns` and an explicit `cta.proof`.

## Home

| Page | Headline | Sections |
| --- | --- | --- |
| [Home](https://aquemi-official.github.io/aquemi-web/#home) | Modular Purified Water systems, from pretreatment to point of use | path (One package, one water path: SystemRun), table as router (Start from where your project is, #start: ManifoldRouter), grid (Same package, different limits by industry, #industries: IndustryDrops), steps (From order to water in use, #steps: ProjectRun), grid (Service after handover, #service: ExplodedService), faq (Questions before the first call, #faq), closing (checklist, returns) |

## Systems

| Page | Headline | Sections |
| --- | --- | --- |
| [All systems](https://aquemi-official.github.io/aquemi-web/#systems) | Purified Water systems, designed to meet USP limits | diagram (Modules, #modules: StrataRun), spec (Budget, #budget: BudgetBento), spec (Site, #site: LimitPlan), table as evidence (By standard, #standards, fold 5: StandardWires), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Purified Water (PW) generation](https://aquemi-official.github.io/aquemi-web/#sys-pw) | Purified Water, sized for your coldest day | spec as gauges (Limits, #limits: LimitStack), diagram (How it works, #process: WindingRoute), spec as callouts (Skid design, #design, fold 6: SkidSheet), docs (Documents, #documents: DocHotspots), options as modules (Options, #options, fold 3: GhostSkid), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Storage and distribution loops](https://aquemi-official.github.io/aquemi-web/#sys-storage) | Loops that hold quality to every outlet | spec as rules (Design rules, #rules, fold 4: RuleFigures), diagram (How it works, #loop: LoopCircuit), table (Sanitization, #sanitization: MethodBento), spec as callouts (Fabrication, #tank, fold 5: TankGa), docs (Documents, #documents: SheetStack), options as modules (Options, #options: LoopDock), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Pretreatment](https://aquemi-official.github.io/aquemi-web/#sys-pretreatment) | Keep chlorine and scale off your membranes | spec as gauges (RO inlet targets, #inlet: MembraneFace), diagram (The train, #train: SectionTrain), table as failures (Feed water, #feed-water, fold 3: MembraneAtlas), table as router (Chlorine or chloramine, #chloramine: DecisionValve), docs (Documents, #documents: DocPipe), options as modules (Options, #options: OptionTaps), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Monitoring and controls](https://aquemi-official.github.io/aquemi-web/#sys-monitoring) | Water data you can defend | diagram (Architecture, #layers: LayerStack), spec as callouts (Measurements, #instruments, fold 5: SignalDial), table (Alarms, #alarms: HmiTrend), table as evidence (Data integrity, #data-integrity, fold 3: ClauseCrosswalk), options as modules (Options, #options: OptionChecker), faq (FAQ, #remote-access), related (Where to go next), closing (checklist, returns) |

## Services

| Page | Headline | Sections |
| --- | --- | --- |
| [Services](https://aquemi-official.github.io/aquemi-web/#services) | Purified Water services, from design to upgrades | table as router (Where to start, #start: StairRouter), steps (Stages, #durations: HoldTimeline), faq (FAQ, #faq), related (Where buyers go next), closing (checklist, returns) |
| [Writing your URS](https://aquemi-official.github.io/aquemi-web/#urs-guide) | Writing a URS for a Purified Water system | table as evidence (Wrong choice, #pp-rows: ReaderSplit), steps (Outline, #outline: BinderTabs), table (Must-haves, #priority: JointSpine), table as failures (Clauses, #clauses: StrikeGaps), table as grades (Polypropylene rows, #allow-pp: DerivationSheet), table as evidence (For consultants, #specification, fold 3: PipeCollage), faq (FAQ, #faq), related (Where the URS goes next), closing (checklist, returns) |
| [How a project runs](https://aquemi-official.github.io/aquemi-web/#project-plan) | How a project runs, from order to water in use | steps (Stages, #stages: CutoverSchedule), table as evidence (Who does what, #who: ReaderSplit), table (Notice, #notice: ResponseLanes), table (Changes, #changes: ReturnSlips), spec (Progress, #reporting, fold 4: BatteryLimit), faq (FAQ, #faq), related (Before and after each stage), closing (checklist, returns) |
| [Process design and engineering](https://aquemi-official.github.io/aquemi-web/#svc-design) | Purified Water system design, traced to your URS | table as failures (Why design, #failures: RedlineSheet), steps (Stages, #stages: FidelityLadder), docs (What you receive, #deliverables: IssuedSet), table (Traceability, #trace: TraceLines), faq (FAQ, #faq), related (Where the design goes next), closing (checklist, returns) |
| [Fabrication](https://aquemi-official.github.io/aquemi-web/#svc-fabrication) | Trace any joint back to its welder and material | table as evidence (Joint log, #joint-log, fold 4: JointTag, plain seam), spec as callouts (Our standard, #standard, fold 6: JointMacro), docs (Dossier, #dossier: SpoolDossier), steps (Hold points, #steps: JointSteps), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [FAT and SAT](https://aquemi-official.github.io/aquemi-web/#svc-fat-sat) | Watch it run on water before it ships | table as versus (FAT and SAT, #versus, fold 3: VersusSpread), prose as explainer (Why water, #wet-run: WetRunHmi), steps (Process, #steps: TestSheet), options (Witnessing, #witness: WitnessPlan), faq (FAQ, #faq), related (Before and after FAT), closing (checklist, returns) |
| [Commissioning and qualification](https://aquemi-official.github.io/aquemi-web/#svc-cq) | IQ, OQ and a year of PQ | steps (Stages, #stages: StageTiles), table as roles (Who signs, #roles, fold 5: SignatureBlocks), spec (IQ and OQ, #iq-oq, fold 5: WalkdownPins), steps (PQ, #pq: PqCalendar), spec as gauges (Alert levels, #alert-levels: CutBand), faq (FAQ, #faq), related (Before and after qualification), closing (checklist, returns) |
| [Service and spare parts](https://aquemi-official.github.io/aquemi-web/#svc-service) | Service that keeps your water in specification and your system qualified | table as plans (Plans, #plans, fold 3: PlanChecker), spec (Running cost, #running-cost, fold 2: CostSkid), spec (Calibration, #calibration, fold 2: SignalDial), grid as route (Visits, #visit: VisitPlan), table (Like for like, #spares, fold 3: SpareSheet), steps (Faults, #response: ResponseClock), faq (FAQ, #faq), related (Where service connects), closing (checklist, returns) |
| [Upgrades and retrofits](https://aquemi-official.github.io/aquemi-web/#svc-upgrades) | Upgrade the system you have | table as roles (Findings, #observation: ApprovalMerge), table as router (Upgrades, #upgrades: RetrofitPlant), table as failures (Controls, #data-integrity-gaps, fold 3: StrikeGaps), grid as route (Assessment, #assessment: ReviewReticles), steps (How it runs, #steps: GateLine), faq (FAQ, #faq), related (Before and after the upgrade), closing (checklist, returns) |

## Industries

| Page | Headline | Sections |
| --- | --- | --- |
| [Industries](https://aquemi-official.github.io/aquemi-web/#industries) | Your product sets the grade | grid (Where it goes, #map: ApplicationWheel), table (By use, #matrix: UseMatrix), table as router (Where to start, #start: PidRoutes), spec as rules (Fit, #fit: FitReadout), diagram (Same package, #same-water: LimitWriters), grid (First system, #first-system: GradeEditorial), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Your first system](https://aquemi-official.github.io/aquemi-web/#first-system) | Planning your site's first Purified Water system | table as evidence (Is it for you, #fit: ReaderSplit), table as grades (Your water, #grade: DerivationSheet), spec (Your site, #site: RoomLimit), spec (Your team, #team: TimeCard), spec (Cost, #cost: CostBalance), steps (Steps, #steps: ReleaseRun), grid (Your case, #case: IndustryFeed), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Pharmaceutical](https://aquemi-official.github.io/aquemi-web/#ind-pharma) | Water matched to your dosage forms | table as router (Where to start, #start: CheckerRouter), table as grades (Grade by dosage form, #grades, fold 4: GradeLadder), table as evidence (Inspectors, #inspectors, fold 3: BinderSpines), options as decisions (Decisions, #decide, fold 3: DecisionPlant), table as grades (Natural health products, #nhp: GradeSwitch), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Medical devices](https://aquemi-official.github.io/aquemi-web/#ind-meddevice) | Final rinse water you can defend at audit | table as router (Where to start, #start: NumeralIndex), spec (Supplier quality, #supplier-quality: Colophon), table as grades (Grade by step, #grades: GradeMains), prose as explainer (At the washer, #rinse: WasherTrace), grid (What we build, #systems: WasherZones), table as evidence (Auditors, #audits, fold 2: AuditManifold), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Contract manufacturing (CDMO)](https://aquemi-official.github.io/aquemi-web/#ind-cdmo) | One water system, every client's auditor | table as router (Where to start, #start: SuiteLoop), docs (Audit pack, #audit-pack, fold 4: AuditSkid), options as modules (Redundancy, #redundancy, fold 3: DuplexTrains), steps (Tech transfer, #program: TieInRun), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Cosmetics and personal care](https://aquemi-official.github.io/aquemi-web/#ind-personal-care) | Your product's class sets the water | table as router (Where to start, #start: MultiportRouter), table as grades (Water by product, #grade: CalcPad), grid (Where water goes, #uses: PlantStations), spec as callouts (Microbial control, #microbes: SensorLoop), spec (Fit, #fit, fold 4: ScopeSeam), options as modules (From exchange DI, #from-di, fold 3: ModulePlinth), docs (Records, #records: SheetPreviews), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Hospitals and laboratories](https://aquemi-official.github.io/aquemi-web/#ind-hospital-lab) | Critical and reagent water, specified by your standard | table as router (Where to start, #start: StairRouter), table as evidence (Grades, #grades: GradeCrosswalk), grid as route (Reprocessing, #reprocessing: DrawingRegister), grid as route (Laboratories, #labs: BuildingLoop), diagram (Treatment train, #train: TrainStrip), docs (For consultants, #specification: SpineShelf), steps (Validation, #validation: GateLine), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Food, beverage and industrial](https://aquemi-official.github.io/aquemi-web/#ind-process) | Demineralized water to the limit your process sets | table as router (Where to start, #start: ManifoldRouter), table as evidence (Your limit, #limits: LimitFolders), table (Food and beverage, #food, fold 4: ScenePlates), table as router (Industrial and energy, #industrial: RiserValves), options as modules (Configurations, #generation: OptionTaps), spec (From exchange DI, #from-ion-exchange, fold 2: CostSkid), spec as callouts (Fit, #fit, fold 4: ParamTiles), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |

## Compliance

| Page | Headline | Sections |
| --- | --- | --- |
| [Standards we design to](https://aquemi-official.github.io/aquemi-web/#compliance) | Every standard, its number, its proof | spec as gauges (Limits, #limits: LimitBento), standards-map (Map, #map: StandardsOrbit), table as evidence (Pharmacopoeia, #pharmacopoeia, fold 3: ProofFolders), table as evidence (GMP, #gmp, fold 2: CutawayRail), table as evidence (Engineering, #engineering, fold 2: SkidTags), faq (FAQ, #faq), related (Where to go next), closing (checklist, returns) |
| [Documentation package](https://aquemi-official.github.io/aquemi-web/#cmp-documentation) | Every document your auditor asks for | docs (Index, #index, fold 4: IndexSheet), table as evidence (By stage, #by-stage, fold 2: StageStacks), steps (Review cycle, #review: RevisionSheet), spec (Delivery, #delivery: PdfAnatomy), spec (Site safety, #safety, fold 3: CostSkid), form (Specimens, #samples), faq (FAQ, #faq), related (Where each document comes from), closing (checklist, returns) |
| [Quality management](https://aquemi-official.github.io/aquemi-web/#cmp-quality) | Audit our quality system before you award | table as evidence (Processes, #s-0-processes, fold 3: RecordSheet), grid (Certification, #certification: CertSeals), steps (NCR and CAPA, #s-2-ncr-and-capa: NcrTiles), table (Suppliers, #suppliers, fold 2: MarkingMatch), spec (Terms, #buying: TermsSheet), table as evidence (Access, #access: AuditManifold), form (Request, #audit), faq (FAQ, #s-7-faq), related (What auditors read next), closing (checklist, returns) |

## Applications

| Page | Headline | Sections |
| --- | --- | --- |
| [Applications](https://aquemi-official.github.io/aquemi-web/#projects) | Purified Water configurations, engineered to your demand and feed water | grid (Configurations, #configurations: ConfigCards), table as router (By industry, #by-industry: NumeralIndex), prose as explainer (Records, #record: RecordAnatomy), table as router (Qualify us, #verify: CheckLedger), faq (FAQ, #s-4-faq), related (Where to check us next), closing (checklist, returns) |

## Company

| Page | Headline | Sections |
| --- | --- | --- |
| [About](https://aquemi-official.github.io/aquemi-web/#about) | One polypropylene Purified Water package, built in Ontario, commissioned and qualified on your site | spec (Company, #facts: Colophon), grid (Team, #people: SourceSkid), grid (Canada, #canada: SiteTiles), faq (FAQ, #faq), related (Check what we say here), closing (checklist, returns) |
| [Buying from Aquemi](https://aquemi-official.github.io/aquemi-web/#buying) | How buying from us works | spec (Terms, #terms: TermsSheet), table (Proposal, #proposal: JointSpine), steps (Your RFQ, #answer: BinderTabs), table as evidence (Compare, #compare: ReaderSplit), spec (Capital request, #capital: CostBalance), docs (Onboarding, #onboarding: CodeIndex), steps (Order, #order: ReleaseRun), faq (FAQ, #faq), related (What procurement reads next), closing (checklist, returns) |
| [Careers](https://aquemi-official.github.io/aquemi-web/#careers) | Design, build and service Purified Water packages | table as router (Roles, #roles: RoleLoop), spec (Pay & terms, #terms, fold 3: TimeCard), steps (Hiring, #hiring: HirePath), form (Apply, #apply), faq (FAQ, #faq), related (The team and the work), closing (checklist, returns) |
| [Technical notes](https://aquemi-official.github.io/aquemi-web/#news) | Water questions, answered in three sentences | register (Notes, #notes, fold 6: RevisionRegister), table (PP or stainless, #pp-or-stainless: MacroLeaders), steps (Chemical sanitization, proven at every outlet, #pp-sanitization: CapaRing), spec (A published case, read as precedent, #pp-precedent: Colophon), faq (FAQ, #faq), form (Subscribe, #subscribe), closing (checklist, returns) |

## Contact

| Page | Headline | Sections |
| --- | --- | --- |
| [Request a proposal](https://aquemi-official.github.io/aquemi-web/#contact-proposal) | Tell us what you need. An engineer replies. | contact-routes (Three ways in), form (Send, #intake), table (Requests, #requests, fold 7: RequestMenu), closing (call variant, checklist, returns) |
| [Service request](https://aquemi-official.github.io/aquemi-web/#contact-service) | Service for Aquemi systems and [makes and equipment types serviced] | contact-routes (Three ways in), table as router (Response times, #s-1-response-times: RiserValves), form (Request, #request), faq (FAQ, #s-3-faq), closing (checklist) |
| [Locations](https://aquemi-official.github.io/aquemi-web/#contact-locations) | Where we are, how fast we reach you | contact-routes (Three ways in), table (Contacts, #locations, fold 4: SitePlates), table as router (Coverage, #coverage: CoverageMap), form (Visit, #visit), closing (checklist, returns) |

## Site sections and their components

| Site section | Component |
| --- | --- |
| page frame | Page, NavBar, Footer |
| hero | Hero: the page's Illustration with callouts to its `facts` when it has a drawing, otherwise KeyFacts; hub and company pages show a section index unless the page sets `hero_index: false`; `figure.look` draws a HeroScene instead (pass 12: module-lineup on systems, service-ring on services, site-room on first-system, use-fan on projects; round C: compliance-matrix on compliance, shop-bay on about and careers, reply-flow on contact-proposal, site-map on contact-locations: an IsoKit scene with numbered tags keyed to the hero's index or to one block's rows; compliance-matrix is an HTML ruled sheet with the package under its corner and no key) |
| prose | Prose inside SplitSection |
| grid | LinkGrid (rows; item `icon` → Icon in the index column, replacing the end drawing) |
| grid `as: "route"` | VisitRoute (numbered stops on one route, rows that snake on desktop, vertical on phones; last item `end: true` is the sign-off) |
| related | RelatedLinks |
| path | WaterPath |
| options | OptionList (rows; item `icon` → Icon) |
| steps | ProcessSteps (rows; item `icon` → Icon beside the number, not with hold points; item `link` → the row links to that page, plain rows only; item `hold` → stamped hold point with signature line, list drawn as a routed line with valves) |
| diagram | ProcessDiagram |
| readout | Readout |
| band | Band |
| tags | StandardsGrid (sunken band) |
| closing call to action | Closing (navy band), optional `include` checklist, optional `proof` box (explicit `cta.proof` only) |
| faq | FAQ inside SplitSection (an item may add `link`, a page id or `page#anchor`, with optional `link_label` and `intent`: one link after the answer, DR-009) |
| docs | DocList (hairline rows: index, code from `DOC_CODES` or an item's explicit `code`, name, detail; item `key` or block `key: N` emphasizes the deciding documents; block `link`, `link_label`, `intent` → one "Full index →" link under the list) |
| case | CaseStudy (an item with `art`, `outcomes` or `timeline` renders as the project record: drawing with what changed, outcome figures, order-to-release timeline). No page uses it today: the record returns on projects after the first delivered project, with its client's written approval (DR-016 rule 8); the template taken off the page is in git at dbee6fc |
| spec | SpecTable (`caption` shown as the section eyebrow; rows keep their order, `hl` rows tinted, optional row `link` with `link_label`; default words the linked block's heading, else the page's name) |
| spec as gauges | LimitGauges (limits as dials, two across when there are two; row `link`, `link_label`, `intent` → one link at the cell's foot; sys-pw, sys-pretreatment, sys-monitoring, svc-cq, ind-pharma, compliance) |
| spec as rules | LimitGauges rule variant (design rules as horizontal threshold bars; row `rule` sets the threshold; row `link`, `link_label`, `intent` → one link under the rule; sys-storage) |
| options `as: "decisions"` | OptionList decisions (framed rows, ? tag, fork mark on two-way decisions, optional `by`; item `link` → the row links to that page; ind-pharma) |
| spec as callouts | ParameterCallouts (rows with `at` on the page's drawing, the rest as SpecTable; sys-pw, sys-storage, sys-monitoring, svc-fabrication) |
| table | CompareTable (phones: records up to three value columns, tabs from four; link columns end each row; a cell is a string or `{t, link, intent}` in every table shape) |
| table `as: "plans"` | PlanTiers (plans side by side, phones stacked; "Suits" and "Price" rows head each plan; optional `recommend`; one page-CTA button per plan; a plan column `{t, intent}` gives that plan's button its own intent) |
| steps `as: "row"` | ProcessSteps row (a short sequence read across: rule on top, flow number, name, one sentence). No page uses it today: about cut its "How we work" row |
| contact-routes | ContactRoutes (the ways in as cards, each with three next steps and a response clock; `current` route marked "This page" and jumps to the form; `urgent` route on limestone with the phone set large, first on phones; in use on contact-proposal, contact-service, contact-locations) |
| register | NotesRegister (topic filter chips, featured note panel, register table date · no. · topic · title · standard; undated items show "Planned" in this base renderer, which no page uses; phones two-line rows, chips scroll). news renders its register with the RevisionRegister look, where an undated row shows the page that answers it and counts as a topic (DR-028) |
| standards-map | StandardsMap (zones of the water system on one pipe, each labelled with its standards; code chips scroll to the row that proves them; phones stacked rows with chips) |
| prose `as: "explainer"` | Explainer (one idea as a figure plus 3-4 numbered callouts; `figure` kind `levels` (bars against a dashed limit) or `art` (the page's drawing with numbered pins)) |
| form | EnquiryForm (with TextField and Button) inside SplitSection; with `steps` it renders the stepped variant; a field of kind `note` (with `when`, `label`, `link`, `action`) sends a request this form does not take to another page's form |
| block `nav` label | SectionNav (rendered by the page, not a block) |
| phone behaviour of a look (pass 12) | PhoneKit (shared, runs with motion off, only below the look's breakpoint): picker or accordion and a sticky compact figure keyed to the row on the reading line; used by ManifoldRouter, StairRouter, PidRoutes, TieInRun, JointSteps, ProjectRun, DecisionValve, BudgetBento, RuleFigures, MethodBento, CutoverSchedule and the pass 12 phone strips (each look's README, "Phones (pass 12)") |
| `[bracketed facts]` in any copy | Placeholder |

Every block opens with the standard section head (`wSecHead`: optional eyebrow, `h`, optional `intro`). Every site section has a component. A new kind of section needs a new component here first, then the site.
