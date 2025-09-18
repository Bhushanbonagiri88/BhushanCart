import { configureStore, createSlice, current } from "@reduxjs/toolkit";


// ---------------- Products Slice ----------------
const productSlice = createSlice({
  name: "products",
  initialState: {
   veg: [
  { id: 101, name: "Potato", price: 100, image: "/images/potato.jpg", description: "Fresh and healthy potatoes" },
  { id: 102, name: "Tomato", price: 50, image: "/images/tomato.jpg", description: "Juicy red tomatoes" },
  { id: 103, name: "Carrot", price: 80, image: "/images/carrot.jpg", description: "Crunchy and sweet carrots" },
  { id: 104, name: "Cabbage", price: 60, image: "/images/cabbage.jpg", description: "Fresh green cabbage" },
  { id: 105, name: "Spinach", price: 40, image: "/images/spinach.jpg", description: "Healthy leafy spinach" },
  { id: 106, name: "Cauliflower", price: 90, image: "/images/cauliflower.jpg", description: "White and fresh cauliflower" },
  { id: 107, name: "Bell Pepper", price: 120, image: "/images/bellpepper.jpg", description: "Colorful and crisp bell peppers" },
  { id: 108, name: "Onion", price: 70, image: "/images/onion.jpg", description: "Fresh and pungent onions" },
  { id: 109, name: "Garlic", price: 150, image: "/images/garlic.jpg", description: "Aromatic and healthy garlic" },
  { id: 110, name: "Ginger", price: 130, image: "/images/ginger.jpg", description: "Fresh and zesty ginger" },
  { id: 111, name: "Cucumber", price: 55, image: "/images/cucumber.jpg", description: "Cool and refreshing cucumber" },
  { id: 112, name: "Broccoli", price: 110, image: "/images/broccoli.jpg", description: "Nutritious green broccoli" },
  { id: 113, name: "Beetroot", price: 90, image: "/images/beetroot.jpg", description: "Rich and earthy beetroots" },
  { id: 114, name: "Pumpkin", price: 120, image: "/images/pumpkin.jpg", description: "Sweet and fresh pumpkin" },
  { id: 115, name: "Peas", price: 100, image: "/images/peas.jpg", description: "Sweet and fresh green peas" },
  { id: 116, name: "Brinjal", price: 80, image: "/images/brinjal.jpg", description: "Fresh purple brinjals" },
  { id: 117, name: "Lady Finger", price: 75, image: "/images/ladyfinger.jpg", description: "Fresh and tender lady finger" },
  { id: 118, name: "Mushroom", price: 160, image: "/images/mushroom.jpg", description: "Soft and fresh mushrooms" },
  { id: 119, name: "Coriander", price: 40, image: "/images/coriander.jpg", description: "Fresh coriander leaves" },
  { id: 120, name: "Green Chilli", price: 45, image: "/images/greenchilli.jpg", description: "Spicy green chillies" }
],
laptops: [
  { id: 201, name: "Dell Inspiron 15", price: 45000, image: "/laptops/dell_inspiron15.jpg", description: "15.6-inch laptop with Intel i5 processor and 8GB RAM" },
  { id: 202, name: "HP Pavilion 14", price: 52000, image: "/laptops/hp_pavilion14.jpg", description: "Compact 14-inch laptop with Ryzen 5 and fast SSD" },
  { id: 203, name: "Lenovo ThinkPad E14", price: 60000, image: "/laptops/lenovo_thinkpadE14.jpg", description: "Durable laptop with Intel i5 and business features" },
  { id: 204, name: "Asus Vivobook 15", price: 48000, image: "/laptops/asus_vivobook15.jpg", description: "Stylish laptop with Intel i3 and slim design" },
  { id: 205, name: "Acer Aspire 7", price: 58000, image: "/laptops/acer_aspire7.jpg", description: "Gaming laptop with Ryzen 5 and NVIDIA GTX graphics" },
  { id: 206, name: "Apple MacBook Air M1", price: 95000, image: "/laptops/macbook_air_m1.jpg", description: "Lightweight laptop with Apple M1 chip and Retina display" },
  { id: 207, name: "Apple MacBook Pro 14", price: 180000, image: "/laptops/macbook_pro14.jpg", description: "Professional laptop with M2 Pro chip and Liquid Retina XDR" },
  { id: 208, name: "Dell XPS 13", price: 120000, image: "/laptops/dell_xps13.jpg", description: "Premium ultrabook with 13-inch InfinityEdge display" },
  { id: 209, name: "HP Omen 16", price: 130000, image: "/laptops/hp_omen16.jpg", description: "High-performance gaming laptop with RTX 3060" },
  { id: 210, name: "MSI GF63 Thin", price: 90000, image: "/laptops/msi_gf63.jpg", description: "Affordable gaming laptop with GTX 1650" },
  { id: 211, name: "Lenovo Legion 5", price: 140000, image: "/laptops/lenovo_legion5.jpg", description: "Gaming laptop with Ryzen 7 and RTX 3070" },
  { id: 212, name: "Asus ROG Strix G15", price: 160000, image: "/laptops/asus_rog_strix_g15.jpg", description: "Powerful gaming laptop with RGB keyboard" },
  { id: 213, name: "Acer Swift 3", price: 65000, image: "/laptops/acer_swift3.jpg", description: "Thin and light laptop with Intel i5" },
  { id: 214, name: "Microsoft Surface Laptop 5", price: 135000, image: "/laptops/surface_laptop5.jpg", description: "Premium Windows laptop with touchscreen" },
  { id: 215, name: "Samsung Galaxy Book 2", price: 78000, image: "/laptops/samsung_galaxybook2.jpg", description: "Slim laptop with AMOLED display" },
  { id: 216, name: "Razer Blade 15", price: 200000, image: "/laptops/razer_blade15.jpg", description: "High-end gaming laptop with RTX 3080" },
  { id: 217, name: "LG Gram 16", price: 110000, image: "/laptops/lg_gram16.jpg", description: "Ultra-lightweight laptop with long battery life" },
  { id: 218, name: "Asus TUF Gaming F15", price: 95000, image: "/laptops/asus_tuf_f15.jpg", description: "Rugged gaming laptop with durable design" },
  { id: 219, name: "HP EliteBook 840", price: 125000, image: "/laptops/hp_elitebook840.jpg", description: "Business-class laptop with Intel i7" },
  { id: 220, name: "Dell Alienware m15", price: 210000, image: "/laptops/dell_alienware_m15.jpg", description: "Premium gaming laptop with futuristic design" }
],

    mobiles: [
      { id: 1, name: "Realme Narzo 60", price: 14999, image: "/images/realme-narzo60.jpg", description: "Realme Narzo with AMOLED display and fast charging" },
      { id: 2, name: "Redmi Note 12", price: 16999, image: "/images/redmi-note12.jpg", description: "Redmi Note series with Snapdragon processor" },
      { id: 3, name: "iPhone 14", price: 69999, image: "/images/iphone14.jpg", description: "Apple iPhone 14 with A15 Bionic chip" },
      { id: 4, name: "Samsung Galaxy S23", price: 74999, image: "/images/samsung-s23.jpg", description: "Samsung flagship with stunning AMOLED display" },
      { id: 5, name: "OnePlus 11", price: 58999, image: "/images/oneplus11.jpg", description: "OnePlus 11 with Hasselblad camera and OxygenOS" },
      { id: 6, name: "Vivo V27", price: 28999, image: "/images/vivo-v27.jpg", description: "Vivo V27 with curved AMOLED and portrait camera" },
      { id: 7, name: "Oppo Reno 10", price: 32999, image: "/images/oppo-reno10.jpg", description: "Oppo Reno with periscope zoom lens" },
      { id: 8, name: "Poco X5 Pro", price: 22999, image: "/images/poco-x5pro.jpg", description: "Poco X5 Pro with Snapdragon 778G" },
      { id: 9, name: "iQOO Neo 7", price: 27999, image: "/images/iqoo-neo7.jpg", description: "iQOO Neo with Dimensity 8200 and gaming features" },
      { id: 10, name: "Samsung Galaxy A54", price: 34999, image: "/images/samsung-a54.jpg", description: "Samsung A series midrange with 120Hz AMOLED" },
      { id: 11, name: "Nothing Phone 1", price: 32999, image: "/images/nothing-phone1.jpg", description: "Unique transparent design with Glyph lights" },
      { id: 12, name: "Motorola Edge 40", price: 28999, image: "/images/moto-edge40.jpg", description: "Motorola Edge with curved pOLED display" },
      { id: 13, name: "Realme GT Neo 3", price: 36999, image: "/images/realme-gtneo3.jpg", description: "150W fast charging beast from Realme" },
      { id: 14, name: "Redmi K50i", price: 24999, image: "/images/redmi-k50i.jpg", description: "Powerful Dimensity 8100 processor" },
      { id: 15, name: "iPhone 13", price: 59999, image: "/images/iphone13.jpg", description: "Apple iPhone 13 with A15 Bionic chip" },
      { id: 16, name: "Samsung Galaxy Z Flip 4", price: 89999, image: "/images/samsung-zflip4.jpg", description: "Folding smartphone with premium design" },
      { id: 17, name: "OnePlus Nord 3", price: 28999, image: "/images/oneplus-nord3.jpg", description: "Affordable OnePlus with great performance" },
      { id: 18, name: "Vivo Y100", price: 21999, image: "/images/vivo-y100.jpg", description: "Stylish Vivo with color changing glass" },
      { id: 19, name: "Oppo F23", price: 24999, image: "/images/oppo-f23.jpg", description: "Oppo smartphone with fast charging and AMOLED" },
      { id: 20, name: "Infinix Zero Ultra", price: 20999, image: "/images/infinix-zero-ultra.jpg", description: "Budget flagship with curved display" }
    ],
  cameras: [
  { id: 301, name: "Canon EOS 1500D", price: 35000, image: "/cameras/canon_eos1500d.jpg", description: "DSLR camera with 24.1MP sensor and DIGIC 4+" },
  { id: 302, name: "Nikon D3500", price: 40000, image: "/cameras/nikon_d3500.jpg", description: "DSLR camera with 24.2MP sensor and great battery life" },
  { id: 303, name: "Sony Alpha A6100", price: 65000, image: "/cameras/sony_a6100.jpg", description: "Mirrorless camera with fast autofocus and 4K video" },
  { id: 304, name: "Fujifilm X-T200", price: 55000, image: "/cameras/fujifilm_xt200.jpg", description: "Compact mirrorless camera with 24.2MP sensor" },
  { id: 305, name: "Canon EOS R10", price: 95000, image: "/cameras/canon_eos_r10.jpg", description: "Mirrorless camera with advanced AF and 4K 60fps" },
  { id: 306, name: "Nikon Z50", price: 88000, image: "/cameras/nikon_z50.jpg", description: "Mirrorless camera with APS-C sensor and 4K video" },
  { id: 307, name: "Sony ZV-E10", price: 72000, image: "/cameras/sony_zve10.jpg", description: "Mirrorless vlogging camera with flip screen" },
  { id: 308, name: "Panasonic Lumix G7", price: 60000, image: "/cameras/panasonic_g7.jpg", description: "Mirrorless 4K camera with interchangeable lenses" },
  { id: 309, name: "GoPro Hero 11", price: 48000, image: "/cameras/gopro_hero11.jpg", description: "Action camera with 5.3K video and HyperSmooth" },
  { id: 310, name: "DJI Osmo Pocket 2", price: 35000, image: "/cameras/dji_osmo_pocket2.jpg", description: "Handheld gimbal camera with 4K video" },
  { id: 311, name: "Canon PowerShot G7X Mark III", price: 62000, image: "/cameras/canon_g7x_mk3.jpg", description: "Compact vlogging camera with 4K video and live streaming" },
  { id: 312, name: "Olympus OM-D E-M10 Mark IV", price: 78000, image: "/cameras/olympus_em10_mk4.jpg", description: "Mirrorless camera with 20MP sensor and flip-down touchscreen" }
],
smartHome: [
  { id: 401, name: "Amazon Echo Dot (5th Gen)", price: 5500, image: "/smarthome/echo_dot5.jpg", description: "Smart speaker with Alexa voice assistant" },
  { id: 402, name: "Google Nest Mini", price: 4500, image: "/smarthome/google_nest_mini.jpg", description: "Compact smart speaker with Google Assistant" },
  { id: 403, name: "Philips Hue Smart Bulb", price: 1500, image: "/smarthome/philips_hue_bulb.jpg", description: "Smart LED bulb with app and voice control" },
  { id: 404, name: "TP-Link Smart Plug", price: 1200, image: "/smarthome/tplink_smart_plug.jpg", description: "Wi-Fi enabled plug for controlling devices remotely" },
  { id: 405, name: "Mi Smart LED Strip", price: 2500, image: "/smarthome/mi_led_strip.jpg", description: "Smart RGB light strip with app control" },
  { id: 406, name: "Ring Video Doorbell", price: 10000, image: "/smarthome/ring_doorbell.jpg", description: "Smart video doorbell with two-way audio" },
  { id: 407, name: "Google Nest Hub", price: 8000, image: "/smarthome/nest_hub.jpg", description: "Smart display with Google Assistant" },
  { id: 408, name: "Amazon Fire TV Stick 4K", price: 4500, image: "/smarthome/fire_tv_stick.jpg", description: "Streaming device with Alexa voice remote" },
  { id: 409, name: "Eufy RoboVac 11S", price: 17000, image: "/smarthome/eufy_robovac.jpg", description: "Slim robotic vacuum cleaner with smart sensors" },
  { id: 410, name: "Arlo Pro 4 Security Camera", price: 18000, image: "/smarthome/arlo_pro4.jpg", description: "Wireless smart security camera with night vision" },
  { id: 411, name: "Smart Thermostat", price: 12000, image: "/smarthome/smart_thermostat.jpg", description: "Wi-Fi thermostat with energy-saving features" },
  { id: 412, name: "Samsung SmartThings Hub", price: 7000, image: "/smarthome/smartthings_hub.jpg", description: "Central hub to connect and control all smart devices" }
],
mensClothing: [
  { id: 501, name: "Casual T-Shirt", price: 800, image: "/clothing/men_tshirt.jpg", description: "Comfortable cotton round-neck t-shirt" },
  { id: 502, name: "Formal Shirt", price: 1500, image: "/clothing/men_formalshirt.jpg", description: "Slim fit formal shirt for office wear" },
  { id: 503, name: "Denim Jeans", price: 2000, image: "/clothing/men_jeans.jpg", description: "Classic blue slim fit denim jeans" },
  { id: 504, name: "Chinos", price: 1800, image: "/clothing/men_chinos.jpg", description: "Casual slim-fit chinos for everyday wear" },
  { id: 505, name: "Hoodie", price: 2200, image: "/clothing/men_hoodie.jpg", description: "Warm fleece hoodie with front pocket" },
  { id: 506, name: "Leather Jacket", price: 5500, image: "/clothing/men_leatherjacket.jpg", description: "Stylish black faux leather jacket" },
  { id: 507, name: "Blazer", price: 4500, image: "/clothing/men_blazer.jpg", description: "Single-breasted slim-fit blazer" },
  { id: 508, name: "Kurta Pajama Set", price: 2500, image: "/clothing/men_kurta.jpg", description: "Traditional kurta pajama for festive wear" },
  { id: 509, name: "Track Pants", price: 1200, image: "/clothing/men_trackpants.jpg", description: "Comfortable cotton-blend track pants" },
  { id: 510, name: "Sweater", price: 2000, image: "/clothing/men_sweater.jpg", description: "Woolen round-neck winter sweater" },
  { id: 511, name: "Shorts", price: 900, image: "/clothing/men_shorts.jpg", description: "Casual cotton shorts for summer" },
  { id: 512, name: "Suit Set", price: 8500, image: "/clothing/men_suit.jpg", description: "Formal two-piece suit with trousers" }
],
womensClothing: [
  { id: 601, name: "Casual Top", price: 900, image: "/clothing/women_top.jpg", description: "Comfortable cotton casual top" },
  { id: 602, name: "Formal Blouse", price: 1500, image: "/clothing/women_blouse.jpg", description: "Elegant office wear blouse" },
  { id: 603, name: "Jeans", price: 2000, image: "/clothing/women_jeans.jpg", description: "Slim fit stretchable denim jeans" },
  { id: 604, name: "Skirt", price: 1700, image: "/clothing/women_skirt.jpg", description: "Chic knee-length A-line skirt" },
  { id: 605, name: "Kurti", price: 1800, image: "/clothing/women_kurti.jpg", description: "Traditional printed cotton kurti" },
  { id: 606, name: "Saree", price: 3500, image: "/clothing/women_saree.jpg", description: "Designer saree with blouse piece" },
  { id: 607, name: "Anarkali Suit", price: 4000, image: "/clothing/women_anarkali.jpg", description: "Festive wear Anarkali suit set" },
  { id: 608, name: "Leggings", price: 800, image: "/clothing/women_leggings.jpg", description: "Stretchable cotton leggings" },
  { id: 609, name: "Jumpsuit", price: 2500, image: "/clothing/women_jumpsuit.jpg", description: "Trendy sleeveless jumpsuit" },
  { id: 610, name: "Hoodie", price: 2200, image: "/clothing/women_hoodie.jpg", description: "Warm fleece hoodie for casual wear" },
  { id: 611, name: "Maxi Dress", price: 3000, image: "/clothing/women_maxidress.jpg", description: "Elegant floral maxi dress" },
  { id: 612, name: "Party Gown", price: 6000, image: "/clothing/women_gown.jpg", description: "Designer gown for party and events" }
],
kidsWear: [
  { id: 701, name: "Boys T-Shirt", price: 600, image: "/clothing/kids_boy_tshirt.jpg", description: "Cotton round-neck printed t-shirt for boys" },
  { id: 702, name: "Girls Frock", price: 1200, image: "/clothing/kids_girl_frock.jpg", description: "Cute floral frock for girls" },
  { id: 703, name: "Kids Jeans", price: 1000, image: "/clothing/kids_jeans.jpg", description: "Comfortable denim jeans for kids" },
  { id: 704, name: "Boys Shirt", price: 900, image: "/clothing/kids_boy_shirt.jpg", description: "Casual checked shirt for boys" },
  { id: 705, name: "Girls Skirt", price: 950, image: "/clothing/kids_girl_skirt.jpg", description: "Trendy pleated skirt for girls" },
  { id: 706, name: "Kids Hoodie", price: 1500, image: "/clothing/kids_hoodie.jpg", description: "Warm and soft hoodie for kids" },
  { id: 707, name: "Kids Pajama Set", price: 1100, image: "/clothing/kids_pajama.jpg", description: "Cotton pajama set for kids" },
  { id: 708, name: "Girls Party Dress", price: 2000, image: "/clothing/kids_girl_dress.jpg", description: "Fancy party wear dress for girls" },
  { id: 709, name: "Boys Kurta Pajama", price: 1800, image: "/clothing/kids_boy_kurta.jpg", description: "Traditional kurta pajama for boys" },
  { id: 710, name: "Kids Romper", price: 750, image: "/clothing/kids_romper.jpg", description: "Cute romper for toddlers" },
  { id: 711, name: "School Uniform", price: 1300, image: "/clothing/kids_uniform.jpg", description: "Standard school uniform set" },
  { id: 712, name: "Kids Sweater", price: 1400, image: "/clothing/kids_sweater.jpg", description: "Woolen sweater for winter wear" }
],
slippers: [
  { id: 801, name: "Men's Flip Flops", price: 400, image: "/footwear/mens_flipflops.jpg", description: "Casual rubber flip flops for men" },
  { id: 802, name: "Women's House Slippers", price: 600, image: "/footwear/womens_slippers.jpg", description: "Soft and cozy indoor slippers for women" },
  { id: 803, name: "Kids Cartoon Slippers", price: 350, image: "/footwear/kids_cartoon_slippers.jpg", description: "Cute cartoon printed slippers for kids" },
  { id: 804, name: "Men's Leather Slippers", price: 900, image: "/footwear/mens_leather_slippers.jpg", description: "Durable leather slippers for men" },
  { id: 805, name: "Women's Beach Slippers", price: 500, image: "/footwear/womens_beach_slippers.jpg", description: "Colorful beach wear slippers for women" },
  { id: 806, name: "Kids Animal Slippers", price: 450, image: "/footwear/kids_animal_slippers.jpg", description: "Soft animal design slippers for kids" },
  { id: 807, name: "Men's Sports Slippers", price: 650, image: "/footwear/mens_sports_slippers.jpg", description: "Lightweight sports slippers for men" },
  { id: 808, name: "Women's Fancy Slippers", price: 750, image: "/footwear/womens_fancy_slippers.jpg", description: "Trendy fancy slippers for women" },
  { id: 809, name: "Kids LED Slippers", price: 550, image: "/footwear/kids_led_slippers.jpg", description: "Fun slippers with LED lights for kids" },
  { id: 810, name: "Men's Comfort Slippers", price: 700, image: "/footwear/mens_comfort_slippers.jpg", description: "Soft cushioned slippers for men" },
  { id: 811, name: "Women's Stylish Slippers", price: 800, image: "/footwear/womens_stylish_slippers.jpg", description: "Elegant slippers for casual outings" },
  { id: 812, name: "Kids Winter Slippers", price: 600, image: "/footwear/kids_winter_slippers.jpg", description: "Warm and fluffy slippers for kids" }
],
shoes: [
  { id: 901, name: "Men's Running Shoes", price: 2200, image: "/footwear/mens_running_shoes.jpg", description: "Lightweight running shoes for men" },
  { id: 902, name: "Women's Sneakers", price: 2500, image: "/footwear/womens_sneakers.jpg", description: "Trendy casual sneakers for women" },
  { id: 903, name: "Kids Sports Shoes", price: 1500, image: "/footwear/kids_sports_shoes.jpg", description: "Comfortable sports shoes for kids" },
  { id: 904, name: "Men's Formal Shoes", price: 3000, image: "/footwear/mens_formal_shoes.jpg", description: "Classic leather formal shoes for men" },
  { id: 905, name: "Women's Heels", price: 2800, image: "/footwear/womens_heels.jpg", description: "Elegant high heel shoes for women" },
  { id: 906, name: "Kids School Shoes", price: 1200, image: "/footwear/kids_school_shoes.jpg", description: "Black school shoes for kids" },
  { id: 907, name: "Men's Loafers", price: 2600, image: "/footwear/mens_loafers.jpg", description: "Stylish casual loafers for men" },
  { id: 908, name: "Women's Flats", price: 2000, image: "/footwear/womens_flats.jpg", description: "Comfortable flat shoes for women" },
  { id: 909, name: "Kids Casual Shoes", price: 1300, image: "/footwear/kids_casual_shoes.jpg", description: "Everyday casual shoes for kids" },
  { id: 910, name: "Men's Boots", price: 3500, image: "/footwear/mens_boots.jpg", description: "Rugged leather boots for men" },
  { id: 911, name: "Women's Sandals", price: 1800, image: "/footwear/womens_sandals.jpg", description: "Trendy open-toe sandals for women" },
  { id: 912, name: "Kids LED Shoes", price: 1700, image: "/footwear/kids_led_shoes.jpg", description: "Fun LED light-up shoes for kids" }
],
cricket: [
  { id: 1001, name: "Cricket Bat", price: 3500, image: "/sports/cricket_bat.jpg", description: "Professional English willow cricket bat" },
  { id: 1002, name: "Cricket Ball", price: 400, image: "/sports/cricket_ball.jpg", description: "Durable leather cricket ball" },
  { id: 1003, name: "Batting Gloves", price: 1200, image: "/sports/batting_gloves.jpg", description: "Comfortable cricket batting gloves" },
  { id: 1004, name: "Batting Pads", price: 2200, image: "/sports/batting_pads.jpg", description: "Lightweight cricket batting pads" },
  { id: 1005, name: "Cricket Helmet", price: 2500, image: "/sports/cricket_helmet.jpg", description: "Protective cricket helmet" },
  { id: 1006, name: "Cricket Stumps Set", price: 1500, image: "/sports/cricket_stumps.jpg", description: "Wooden stumps and bails set" },
  { id: 1007, name: "Wicket Keeping Gloves", price: 1800, image: "/sports/keeping_gloves.jpg", description: "Professional wicket keeping gloves" },
  { id: 1008, name: "Cricket Kit Bag", price: 3000, image: "/sports/cricket_kitbag.jpg", description: "Spacious cricket kit bag" },
  { id: 1009, name: "Cricket Shoes", price: 2800, image: "/sports/cricket_shoes.jpg", description: "Studded cricket shoes for better grip" },
  { id: 1010, name: "Cricket Jersey", price: 1200, image: "/sports/cricket_jersey.jpg", description: "Lightweight cricket team jersey" },
  { id: 1011, name: "Cricket Cap", price: 500, image: "/sports/cricket_cap.jpg", description: "Breathable cricket cap" },
  { id: 1012, name: "Cricket Kit Combo", price: 8500, image: "/sports/cricket_combo.jpg", description: "Complete cricket kit for players" }
],
football: [
  { id: 1101, name: "Football", price: 1200, image: "/sports/football.jpg", description: "Durable synthetic leather football" },
  { id: 1102, name: "Football Shoes", price: 2800, image: "/sports/football_shoes.jpg", description: "Studded football boots for firm grip" },
  { id: 1103, name: "Goalkeeper Gloves", price: 1500, image: "/sports/goalkeeper_gloves.jpg", description: "High grip goalkeeper gloves" },
  { id: 1104, name: "Football Jersey", price: 1300, image: "/sports/football_jersey.jpg", description: "Lightweight breathable football jersey" },
  { id: 1105, name: "Shin Guards", price: 800, image: "/sports/shin_guards.jpg", description: "Protective shin guards for players" },
  { id: 1106, name: "Football Socks", price: 400, image: "/sports/football_socks.jpg", description: "Comfortable long football socks" },
  { id: 1107, name: "Football Shorts", price: 900, image: "/sports/football_shorts.jpg", description: "Quick-dry football shorts" },
  { id: 1108, name: "Goal Post Set", price: 5000, image: "/sports/goal_post.jpg", description: "Portable goal post set for training" },
  { id: 1109, name: "Football Training Cones", price: 600, image: "/sports/training_cones.jpg", description: "Set of 20 training cones" },
  { id: 1110, name: "Football Captain Armband", price: 300, image: "/sports/armband.jpg", description: "Stretchable captain armband" },
  { id: 1111, name: "Football Backpack", price: 1600, image: "/sports/football_bag.jpg", description: "Spacious football gear backpack" },
  { id: 1112, name: "Whistle & Stopwatch", price: 700, image: "/sports/referee_set.jpg", description: "Referee whistle and stopwatch combo" }
],
groceries: [
  { id: 1201, name: "Basmati Rice (5kg)", price: 650, image: "/groceries/rice.jpg", description: "Premium quality long-grain basmati rice" },
  { id: 1202, name: "Wheat Flour (10kg)", price: 480, image: "/groceries/flour.jpg", description: "Freshly milled whole wheat flour" },
  { id: 1203, name: "Sugar (5kg)", price: 300, image: "/groceries/sugar.jpg", description: "Fine quality white sugar" },
  { id: 1204, name: "Salt (1kg)", price: 25, image: "/groceries/salt.jpg", description: "Iodized cooking salt" },
  { id: 1205, name: "Sunflower Oil (1L)", price: 160, image: "/groceries/sunflower_oil.jpg", description: "Refined sunflower cooking oil" },
  { id: 1206, name: "Mustard Oil (1L)", price: 180, image: "/groceries/mustard_oil.jpg", description: "Pure cold-pressed mustard oil" },
  { id: 1207, name: "Tur Dal (1kg)", price: 140, image: "/groceries/tur_dal.jpg", description: "Premium quality split pigeon peas" },
  { id: 1208, name: "Chana Dal (1kg)", price: 120, image: "/groceries/chana_dal.jpg", description: "Fresh split chickpeas" },
  { id: 1209, name: "Masoor Dal (1kg)", price: 110, image: "/groceries/masoor_dal.jpg", description: "High-protein red lentils" },
  { id: 1210, name: "Cooking Spices Pack", price: 500, image: "/groceries/spices.jpg", description: "Assorted spices for Indian cooking" },
  { id: 1211, name: "Tea Powder (500g)", price: 250, image: "/groceries/tea.jpg", description: "Strong and refreshing tea powder" },
  { id: 1212, name: "Coffee (200g)", price: 300, image: "/groceries/coffee.jpg", description: "Premium instant coffee powder" }
],
dairy: [
  { id: 1301, name: "Full Cream Milk (1L)", price: 60, image: "/dairy/milk.jpg", description: "Fresh and pure full cream milk" },
  { id: 1302, name: "Toned Milk (1L)", price: 50, image: "/dairy/toned_milk.jpg", description: "Healthy and nutritious toned milk" },
  { id: 1303, name: "Curd (500g)", price: 40, image: "/dairy/curd.jpg", description: "Fresh and thick curd" },
  { id: 1304, name: "Paneer (200g)", price: 90, image: "/dairy/paneer.jpg", description: "Soft and fresh paneer cubes" },
  { id: 1305, name: "Cheese Slices (200g)", price: 120, image: "/dairy/cheese_slices.jpg", description: "Delicious processed cheese slices" },
  { id: 1306, name: "Butter (500g)", price: 250, image: "/dairy/butter.jpg", description: "Creamy salted butter" },
  { id: 1307, name: "Ghee (1L)", price: 550, image: "/dairy/ghee.jpg", description: "Pure clarified butter (desi ghee)" },
  { id: 1308, name: "Flavored Yogurt (100g)", price: 35, image: "/dairy/yogurt.jpg", description: "Fruit flavored yogurt cup" },
  { id: 1309, name: "Milk Powder (500g)", price: 240, image: "/dairy/milk_powder.jpg", description: "Instant full cream milk powder" },
  { id: 1310, name: "Condensed Milk (400g)", price: 150, image: "/dairy/condensed_milk.jpg", description: "Sweetened condensed milk" },
  { id: 1311, name: "Whipping Cream (250ml)", price: 180, image: "/dairy/cream.jpg", description: "Rich and thick whipping cream" },
  { id: 1312, name: "Khoa (250g)", price: 120, image: "/dairy/khoa.jpg", description: "Fresh khoa for sweets and desserts" }
]

  },
  reducers: {}
});



// // ---------------- Initial States ----------------
// const initialStateCart = JSON.parse(localStorage.getItem("cart")) || [];
// const initialStateWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
// const initialStateOrders = JSON.parse(localStorage.getItem("orders")) || [];
// const initialStateUser =
//   JSON.parse(localStorage.getItem("registerUser")) || {
//     users: [],
//     currentUsername: null,
//     isAuthenticated: false,
//   };

// // ---------------- Cart Slice ----------------
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: initialStateCart,
//   reducers: {
//     addToCart(state, action) {
//       const item = state.find((product) => product.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeFromCart(state, action) {
//       return state.filter((item) => item.id !== action.payload.id);
//     },
//     increaseItem(state, action) {
//       const index = state.findIndex((item) => item.id === action.payload.id);
//       if (index !== -1) state[index].quantity += 1;
//     },
//     decreaseItem(state, action) {
//       const index = state.findIndex((item) => item.id === action.payload.id);
//       if (index !== -1) {
//         if (state[index].quantity > 1) {
//           state[index].quantity -= 1;
//         } else {
//           state.splice(index, 1);
//         }
//       }
//     },
//     clearCart() {
//       return [];
//     },
//   },
// });

// // ---------------- Wishlist Slice ----------------
// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: initialStateWishlist,
//   reducers: {
//     addToWishlist(state, action) {
//       const exists = state.find((item) => item.id === action.payload.id);
//       if (!exists) {
//         state.push(action.payload);
//       }
//     },
//     removeFromWishlist(state, action) {
//       return state.filter((item) => item.id !== action.payload.id);
//     },
//     clearWishlist() {
//       return [];
//     },
//   },
// });

// // ---------------- Orders Slice ----------------
// const ordersSlice = createSlice({
//   name: "orders",
//   initialState: initialStateOrders,
//   reducers: {
//     addOrder(state, action) {
//       state.push(action.payload);
//     },
//   },
// });

// // ---------------- User Slice ----------------
// const registerSlice = createSlice({
//   name: "registerUser",
//   initialState: initialStateUser,
//   reducers: {
//     register: (state, action) => {
//       // action.payload = { username, email, password }
//       state.users.push(action.payload);
//     },
//     loginUser: (state, action) => {
//       const { username, password } = action.payload;
//       const user = state.users.find(
//         (u) => u.username === username && u.password === password
//       );

//       if (user) {
//         state.currentUsername = user.username;
//         state.isAuthenticated = true;
//       } else {
//         state.currentUsername = null;
//         state.isAuthenticated = false;
//       }
//     },
//     logoutUser: (state) => {
//       state.isAuthenticated = false;
//       state.currentUsername = null;
//     },
//   },
// });

// // ---------------- Store ----------------
// const store = configureStore({
//   reducer: {
//     products: productSlice.reducer,
//     cart: cartSlice.reducer,
//     wishlist: wishlistSlice.reducer,
//     orders: ordersSlice.reducer,
//     registerUser: registerSlice.reducer, // ✅ added user slice
//   },
// });

// // ---------------- Persist to LocalStorage ----------------
// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem("cart", JSON.stringify(state.cart));
//   localStorage.setItem("orders", JSON.stringify(state.orders));
//   localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
//   localStorage.setItem("registerUser", JSON.stringify(state.registerUser)); // ✅ save users too
// });

// // ---------------- Exports ----------------
// export const { addToCart, removeFromCart, increaseItem, decreaseItem, clearCart } =
//   cartSlice.actions;
// export const { addToWishlist, removeFromWishlist, clearWishlist } =
//   wishlistSlice.actions;
// export const { addOrder } = ordersSlice.actions;
// export const { setProducts } = productSlice.actions;
// export const { register: registerUser, loginUser, logoutUser } = registerSlice.actions;
// Store.js


// ---------------- Initial States ----------------
const initialStateCart = JSON.parse(localStorage.getItem("cart")) || [];
const initialStateWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const initialStateOrders = JSON.parse(localStorage.getItem("orders")) || [];
const initialStateUser =
  JSON.parse(localStorage.getItem("registerUser")) || {
    users: [],
    currentUsername: null,
    isAuthenticated: false,
  };



// ---------------- Cart Slice ----------------
const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    addToCart(state, action) {
      const item = state.find((product) => product.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    increaseItem(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state[index].quantity += 1;
    },
    decreaseItem(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    clearCart() {
      return [];
    },
  },
});

// ---------------- Wishlist Slice ----------------
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialStateWishlist,
  reducers: {
    addToWishlist(state, action) {
      const exists = state.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromWishlist(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    clearWishlist() {
      return [];
    },
  },
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialStateOrders,
  reducers: {
    addOrder(state, action) {
      state.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state)); // persist
    },
    clearOrders(state) {
      localStorage.setItem("orders", JSON.stringify([])); // clear localStorage
      return [];
    },
  },
});


// ---------------- User Slice ----------------
const registerSlice = createSlice({
  name: "registerUser",
  initialState: initialStateUser,
  reducers: {
    register: (state, action) => {
      // action.payload = { username, email, password }
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        state.currentUsername = user.username;
        state.isAuthenticated = true;
      } else {
        state.currentUsername = null;
        state.isAuthenticated = false;
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUsername = null;
    },
  },
});

// ---------------- Store ----------------
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    orders: ordersSlice.reducer,
    registerUser: registerSlice.reducer,
  },
});

// ---------------- Persist to LocalStorage ----------------
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  localStorage.setItem("orders", JSON.stringify(state.orders));
  localStorage.setItem("registerUser", JSON.stringify(state.registerUser));
});

// ---------------- Exports ----------------
export const {
  addToCart,
  removeFromCart,
  increaseItem,
  decreaseItem,
  clearCart,
} = cartSlice.actions;

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const { addOrder, clearOrders } = ordersSlice.actions;

export const { setProducts } = productSlice.actions;

export const { register: registerUser, loginUser, logoutUser } = registerSlice.actions;



export default store;




