export const defenseOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 2,
    valuePrefix: '$',
    valueSuffix: ' USD'
  },
  chart: {
    height: '100%',
    zoomType: 'xy',
    panning: {
      enabled: true
    },
    panKey: 'shift'
  },
  title: {
    text: 'Department of Defense Contracts'
  },
  yAxis: {
    title: {
      text: 'Total Award Value'
    },
    labels: {
      format: '${value}'
    }
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      stacking: 'normal'
    },
    column: {
      allowPointSelect: true,
      stacking: 'normal'
    }
  },
  series: [
    {
      name: 'Companies',
      type: 'column',
      data: [
        ['A&J Enterprise', 15702.03],
        ['Ace Technology Partners LLC', 32822.86],
        ['ACF Technologies, INC.', 21627],
        ['Adellsen Group, LLC, THE', 2176203.92],
        ['Aegir Systems', 623845.68],
        ['AGS, INC.', 1598106.15],
        ['Air Dry CO Of America, LLC', 36040.91],
        ["Alan's Draperies", 7520],
        ['ALEUT Aerospace Engineering, LLC', 3944118.85],
        ["Alexander's, INC", 30414],
        ['All Valley Environmental, INC', 38257.5],
        ['AllCom Global Services, INC.', 750494.63],
        ['Alliance Technical Services, INC.', 4193103.6799999997],
        ['Alturdyne International', 7470],
        ['American Automation, INC.', 40910.64],
        ['American Fire Protection INC', 22410],
        ['American Floor Sanding INC', 8200],
        ['American Medical Response West', 4034687.6],
        ['American Systems Corporation', 2611576.1100000003],
        ['American Water Operations and Maintenance, INC.', 365514543.28],
        ['Analytical Graphics, INC.', 113170.04],
        ['Andersen Van & Storage, INC', 95000],
        ['Anderson Burton Construction, INC.', 7017105.459999999],
        ['Anna Lisa Luna Construction, INC.', 7666.51],
        ['AOS Services INC', 196725.6],
        ['Applied Earthworks INC', 7250.39],
        ['APRO International, INC.', 4653541.87],
        ['Arbiter Systems, Incorporated', 35000],
        ['Arroyo Instruments, LLC', 8440],
        ['ASRC Builders, LLC', 46618],
        ['Asteres INC.', 35000],
        ['Atlantic Diving Supply, INC.', 84054.64],
        ['Atlas Copco Mafi-Trench Company LLC', 2012969],
        ['Atlas Performance Industries, INC.', 1959.83],
        ['Atlas Waste Management INC', 5425],
        ['Avlite Aviation, INC', 1055563.5500000003],
        ['Axxon International, LLC', 189630],
        ['Baudville, INC.', 11458.82],
        ['Beckman Coulter, INC.', 8950],
        ['Bengal Engineering, INC', 148538.7],
        ['Big Red Crane Company, INC.', 68075.61],
        ['Bishop, INC.', 184680],
        ['Black & Veatch Special Projects CORP.', 199773],
        ['Black Gold Industries', 223602.65],
        ['Blue Tech INC.', 85220.53],
        ['Bohannon, Brittany', 13950],
        ['Bonneville Steel of Utah, INC.', 184209.74],
        ['Booz Allen Hamilton INC', 4878009.39],
        ['Boyd Industries, INC.', 9748],
        ['Bragg Investment Company, INC.', 0],
        ['Brenner-Fiedler & Associates INC', 5331],
        ['Bristol Environmental Remediation Services LLC', 365420],
        ['Brodart CO.', 7818],
        ['Brown, Curtis', 31400],
        ['BSE Performance LLC', 35568],
        ['BSH Management Services LLC', 1164499.68],
        ['BTAS INC', 141109.8],
        ['Burgos Group LLC', 1650067.13],
        ['C F W Research & Development CO.', 17086.6],
        ['C U Enterprises LTD.', 1399972.17],
        ['Calibre Engineering, INC.', 630276.2899999999],
        ['Calibre Systems, INC.', 1663407.68],
        ['Call Henry, INC.', 93693676.50999999],
        ['Cape Environmental Management', 10019084.52],
        ['CAPP, INC.', 5309.97],
        ['Caprice Electronics, INC.', 936.54],
        ['Carl Amber Brian Isaiah and Associates CO', 299086.18],
        ['Cartridge Technologies, INC.', 166299.39],
        ['Castleblack Pismo Beach Owner, LLC', 14629.32],
        ['CDW Government LLC', 40100],
        ['Centech Group, INC., THE', 36228612.27],
        ['Centralcare, Incorporated', 311403.2],
        ['CH2M Hill Constructors, INC.', 3767383.08],
        ['Cherokee Nation Environmental Solutions, L.L.C.', 928.9],
        ['Chesapeake Strategies Group, INC.', 831070.44],
        ['Chigosi Company, THE', 228787],
        ['Chloeta Fire, L.L.C.', 1806704.67],
        ['Chromal Plating Company', 253005],
        ['City Appliance Sales and Service', 483441.26],
        ['CMCS - T. Simons JV', 11739353.82],
        ['Coast to Coast Computer Products, INC', 40251.6],
        ['Compass Medical Provider LLC', 251699],
        ['Computer Sites, INC.', 413767.00999999995],
        ['CON Serve INC.', 2258949],
        ['Corporate Allocation SVCS, INC.', 3915078.35],
        ['Courts & Greens', 109056],
        ['Credence Management Solutions Limited Liability Company', 1308199.5],
        ['Crystal Engineering Corporation', 2170],
        ['Culligan Water Conditioning of Lompoc INC', 29100.96],
        ['Cummins Pacific, LLC', 5670.25],
        ['DC Scientific Glass, INC.', 32204.55],
        ['Den-Mat Holdings, LLC', 60.9],
        ['Diesel Forward, INC.', 5159],
        ['Digital Plaza, LLC', 36445],
        ['Direct Project INC.', 763563],
        ['Diverse Pest Management', 142690.71],
        ['Donald L Mooney Enterprises, LLC', 544392],
        ['EA Engineering, Science, and Technology, INC., PBC', 7144969.7],
        ['Ean Holdings, LLC', 10888.8],
        ['Earth Systems Pacific', 11250],
        ['Eastern Rigging Supply Company, INC.', 5128],
        ['Eaton Corporation', 1201127.94],
        ['Eco & Associates INC', 0],
        ["Emie's RE", 11250],
        ['Emrick Machine Tool Rebuilding INC', 77585.04],
        ['EnTech AssociatesgEnTech Signs - Alpha Led LLC', 3950.02],
        ['Esi Acquisition Corp.', 17561.36],
        ['Essnova Solutions, INC.', 633908.4199999999],
        ['Est Companies LLC', 15499.92],
        ['Estate Property Management, INC.', 28355],
        ['Evergreen Fire Alarms, LLC', 3443082],
        ['Exbon Development, INC.', 6409653.49],
        ['Executive Furniture Of washington DC INC', 7867.55],
        ['Executive Suite Services INC', 171264],
        ['Federal Key LLC', 47430.520000000004],
        ['Federal Prison Industries INC', 11011.07],
        ['Federal Solutions Group', 1556593.92],
        ['Filter Factory, INC., THE', 31003.870000000003],
        ['Floor Connection, INC.', 53237.64000000001],
        ['Flythissim Technologies, INC.', 11850],
        ['Force 3, INC.', 1226013.26],
        ['Four Tribes Construction Services, LLC', 5342851],
        ['Gannett Fleming, INC.', 58799.12],
        ['Garda CL Northwest, INC.', 81407.77],
        ['Gemtek Technology INC', 37550],
        ['Get It While Its Hot INC.', 44229.23],
        ['Gibbs International, INC.', 27351.78],
        ['GLR Construction, INC.', 5060284.11],
        ['Goodwill Industries of Southern California', 11544075.05],
        ['Granite Construction Company', 27298275],
        ['Granite Telecommunications, LLC', 2241.24],
        ['Great Western Installations, INC', 36949.62],
        ['Greater Central Coast Officials ASSN', 292691],
        ['Ground Control Systems, INC.', 27578.8],
        ['Grundy Government Services, LLC', 356379.73],
        ['GSI North America INC.', 599485.97],
        ['GSL Solutions INC', 27600],
        ['Gulf Holdings, LLC', 10708.78],
        ['Hardy Diagnostics', 3147.57],
        ['Hardy Media', 155014.00000000003],
        ['Harvey, Jill M.', 42000],
        ['Herman Construction Group, INC.', 30235974.85],
        ['HPI Federal LLC', 106518],
        ['IDSC Holdings LLC', 16600],
        ['Indrasoft INC.', 2944378.2],
        ['Industries For The BLIND, INC.', 475405.81999999995],
        ['InDyne, INC.', 837805550.38],
        ['Innovative Technical Solutions, INC.', 76358341],
        ['Installation Engineering Solutions', 1637411.1399999997],
        ['Integrated Industrial Supply, INC.', 7046.75],
        ['Integration Technologies Group', 13000],
        ['Intelligent International INC.', 106560],
        ['Interscan Corporation', 48318.25],
        ['Invested Advisors, INC.', 17439],
        ['J G Contracting', 8913],
        ['John P Blanchard MD INC', 65800],
        ['Joslyn Sunbank Company LLC', 0],
        ['K.J. Cain Company', 16285],
        ['Kal Architects, INC.', 2173952.67],
        ['Kebros & Assoc LLC', 150381.2],
        ['Keilhauer LTD', 17033.95],
        ['Kipper Tool Company', 7634.4],
        ['Kleanerette Dry Cleaners & Laundry', 22475.2],
        ['Komada LLC', 495384.38],
        ['Konica Minolta Business Solutions U.S.A., INC.', 94527.59],
        ['Kritz Excavating And Trucking, INC.', 31237.5],
        ['Laboratory Corporation Of america', 122000],
        ['Laurus Systems Incorporated', 108394.15],
        ['Lawler Manufacturing INC', 8050],
        ['Legacy Installations LLC', 3732],
        ['Leidos, INC.', 4474626.82],
        ['Lifehealth LLC', 2317214.51],
        ['Lighthouse For The Blind of Houston', 835423.75],
        ['Lockheed Martin Corporation', 5704208.75],
        ['Lockheed Martin Tactical Syste', 0],
        ['Loyal Source Government Services LLC', 584305.4],
        ['LPKF Distribution Incorporated', 21473.48],
        ['Luxfer Magtech, INC.', 47642.6],
        ['M2 Technology, INC.', 483226],
        ['Mac-Air', 107634.43],
        ['Management Solutions, INC.', 4231749.94],
        ['Mantech SRS Technologies, INC.', 598149.91],
        ['Matrix Providers INC.', 922834.95],
        ['Medical North America JV', 2324653.1700000004],
        ['Megabite Electronics, INC.', 4383.34],
        ['Microtechnologies LLC', 929278.52],
        ['Mission Valley Chapel, INC.', 8885.5],
        ['Mobile Fixture And Equipment Company, INC.', 57879.29],
        ['Morro Toro Corporation', 35920],
        ['MSI-MID State Instruments LLC', 7874],
        ['MWH - Cardno TEC - Baker - A Joint Venture', 350385],
        ['MX construction, INC.', 12754665.13],
        ['Nanoscience Instruments, INC.', 146070],
        ['National Industries For The Blind', 255600],
        ['National O & M, INC.', 28560],
        ['NBA Engineering INC', 676506.9199999999],
        ['NEIE Medical Waste Services, LLC', 21655],
        ['Nightingale Corp', 40585.8],
        ['North Star Construction And Engineering, INC', 954548.34],
        ['Office Furniture Group, INC.', 36377.66],
        ['ONEIDA Total Integrated Enterprises, LLC', 3363850.2800000003],
        ['Orion Systems, INC.', 21660],
        ['P C Mechanical, INC', 9023510.620000001],
        ['Pacific Bell Telephone Company', 105195.36],
        ['Pacific Dredge Company, LLC', 7565859.75],
        ['Penn Tool CO INC', 6650],
        ['Peraton INC.', 128570.93],
        ['Phillips Corporation', 44424],
        ['Portable Johns INC', 318.75],
        ['Potter, Paul D.', 4278555],
        ['Power Pro Plus INC.', 2913104.48],
        ['Powerchoice Construction, INC.', 857470.1799999999],
        ['Pre Con Industries, INC.', 1370044],
        ['Preferred Healthcare Registry, INC.', 251920],
        ['Premier Business Products, INC.', 5695.64],
        ['Presentations, INC.', 41680.08],
        ['Pro Med Healthcare Services, LLC', 165504],
        ['Professional Performance Development Group, INC.', 778430.12],
        ['Protel Services, INC.', 582911.47],
        ['Quincon, INC.', 29494],
        ['Quinn Company', 54262],
        ['R K Jimenez Construction, INC', 877206.65],
        ["R-J Intl'l INC", 3920],
        ['Rantec Power Systems INC.', 6665390],
        ['Rare Electric', 23068.5],
        ['Recon Environmental', 305182.91],
        ['Red Mountain LLC', 366741.97],
        ['Reliance Relocation Services, INC.', 37871.04],
        ['Rhodes, Stephenne', 90908.55],
        ['Rockwell American Services, LTD.', 642316.25],
        ['Rodriguez, Pedro V', 3939143.31],
        ['Rore, INC.', 5724748],
        ['Ruprecht Construction INC', 9057424.33],
        ['San Luis Ambulance Service, INC.', 16196.4],
        ['San Luis Butane Distributors', 174830.09],
        ['Schenk, virginia R', 11940],
        ['Schwab Engineering, INC.', 827935.6600000001],
        ['Science Applications International Corporation', 8222385.28],
        ['Scientific Instrument Services, INC.', 4463],
        ['SCR INC', 35624],
        ['SCS Integrated Support Solutions, LLC', 34829.59],
        ['Security Information Systems, INC.', 19699],
        ['Sentinel Security Solutions, INC.', 64276.09],
        ['SERCO INC.', 837594.74],
        ['Shred-It USA INC.', 41440],
        ['Siemens Healthcare Diagnostics INC.', 158512.14],
        ['Siemens Industry INC.', 377769.95999999996],
        ['SLO Sail And Canvas', 312337.2],
        ['Smith, Jennifer Franco', 54707.5],
        ['Space Information Laboratories, LLC', 2499758],
        ['Spohnheimer Consulting Airspace Systems LLC', 36676],
        ['Stassi, Frederica J', 24000],
        ['Steris Corporation', 223004.69],
        ['Sumaria Systems, INC.', 3597336.8],
        ['Superior Fire INC.', 1120927],
        ['Sustainable Furniture, INC.', 51498.11],
        ['Sustainment & Restoration Services, LLC', 2775716],
        ['Sustainment And Restoration Services, LLC', 336296],
        ['SYNTECH, INC.', 4821.62],
        ['SYSCO Ventura, INC.', 398000],
        ['SYSMEX America, INC.', 70974.72],
        ['System Spec, INC.', 77333],
        ['T. Horzen, INC.', 60461.8],
        ['T. Simons CO., INC.', 13878972.95],
        ['Tapestry Solutions, INC.', 28689448.94],
        ['Technica Corporation', 0],
        ['Tetra Tech, INC.', 1177767.1500000001],
        ['Tevet, LLC', 58855.68],
        ['Thermo Electron North America Limited Liability Company', 73962],
        ['Thermo Electron North America LLC', 26096],
        ['Thyssenkrupp Elevator Corporation', 35000],
        ['Thyssenkrupp Elevator Corporation (1267)', 67784],
        ['TS Government Solutions, LLC', 103680],
        ['United Kinetics Corporation', 116485.77],
        ['United Paradyne Corporation', 90167250.47],
        ['URS Federal Services, INC.', 50139.24],
        ['URS Group, INC.', 34768.16],
        ['US Military Corp', 7392],
        [
          'V. Lopez Jr. & Sons General Engineering Contractors, INC.',
          8773264.909999996
        ],
        ['Val-Coast, INC', 4417150.680000001],
        ['Vandenberg Solar I, LLC', 4043796],
        ['Vander Werff, Peter Construction, INC.', 3300000],
        ['Vision Research, INC.', 1116596.78],
        ['VMS Aircraft Company, INC.', 79970],
        ['VMX International LLC', 5736907.72],
        ['VT Milcom INC.', 2964857.92],
        ['VTC Enterprises', 12518999.209999999],
        ['Wasco Sales & Marketing, INC.', 51213.899999999994],
        ['West Pacific Electric Company Corporation', 4104993],
        ['Whitefox Defense Technologies, INC.', 4260],
        ['Wilburn Medical, INC', 20640],
        ['Xerox Corporation', 545077.25],
        ['XNS INC.', 321694.58],
        ['Zamora, Mario', 83900],
        ['Zone 5 Technologies, LLC', 149252]
      ]
    }
  ]
};
