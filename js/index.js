// Variables globales
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let categoriaActual = 'all';



/*** 1. DATASET DE PRODUCTOS (Optimizado) ***/
// Constantes para evitar errores de "dedo" en categorías
const CAT = {
    SKINCARE: "skincare",
    BOLSOS: "Bolsos & Carteras",
    PERFUMES: "perfumes",
    MAKEUP: "makeup",
};

const productos = [
    { id: "01", nombre: "Crema Blanqueadora para rostro y cuerpo", precio: "$a consultar", img: "./img/Skincare/Skincare (1).jpg", categoria: CAT.SKINCARE, desc: "El Aichun Beauty crema blanqueadora para rostro y cuerpo, es un producto diseñado para aclarar y unificar el tono de la piel." },
    { id: "02", nombre: "CeraVe, Limpiador suavizante", precio: "$a consultar", img: "./img/Skincare/Skincare (3).jpg", categoria: CAT.SKINCARE, desc: "El CeraVe SA Smoothing Cleanser, es un limpiador facial diseñado para ayudar a exfoliar suavemente la piel." },
    { id: "03", nombre: "CeraVe limpiador hidratante", precio: "$a consultar", img: "./img/Skincare/Skincare (29).jpg", categoria: CAT.SKINCARE, desc: "Limpiador esencial que ayuda a restaurar la barrera protectora de la piel." },
    { id: "04", nombre: "Bolso de Hombro Teri de Carolina Herrera", precio: "$a consultar", img: "./img/B&C/B&C (02).jpg", categoria: CAT.BOLSOS, desc: "Elegante bolso de hombro de la colección Carolina Herrera, ideal para cualquier ocasión." },
    { id: "05", nombre: "CeraVe Locion para pieles asperas", precio: "$a consultar", img: "./img/Skincare/Skincare (4).jpg", categoria: CAT.SKINCARE, desc: "Está formulado para suavizar y mejorar la textura de la piel áspera y con protuberancias, gracias a su combinación de ácido salicílico y ácido hialurónico." },
    { id: "06", nombre: "CeraVe gel limpiador espumoso", precio: "$a consultar", img: "./img/Skincare/Skincare (5).jpg", categoria: CAT.SKINCARE, desc: "Diseñado para limpiar la piel de manera suave pero efectiva. Estegel limpiador crea una espuma ligera que elimina el exceso de grasa." },
    { id: "07", nombre: "Coach Teri | Incluye strap largo", precio: "$a consultar", img: "./img/B&C/B&C (11).jpg", categoria: CAT.BOLSOS, desc: "Es un bolso 2 en 1. Incluye una cadena corta dorada para llevar al hombro y un strap largo ajustable para usarlo como crossbody." },
    { id: "08", nombre: "Coach Bolsa de Hombro/Bandolera", precio: "$a consultar", img: "./img/B&C/B&C (10).jpg", categoria: CAT.BOLSOS, desc: "Es una pieza versátil que funciona tanto para un look casual de fin de semana como para un entorno de oficina relajado." },
    { id: "09", nombre: "Coach Tapi Pequeña", precio: "$a consultar", img: "./img/B&C/B&C (9).jpg", categoria: CAT.BOLSOS, desc: "Esta elegante bolsa compacta es ideal para quienes buscan versatilidad y el estilo icónico de Coach." },
    { id: "10", nombre: "Coach Nolita 19 en Lona de Firma", precio: "$a consultar", img: "./img/B&C/B&C (8).jpg", categoria: CAT.BOLSOS, desc: "El Nolita 19 es uno de los diseños más icónicos y versátiles de Coach. Se define por ser un bolso pequeño (estilo baguette o pochette) que funciona tanto de mano como al hombro." },
    { id: "11", nombre: "Dior Luna | incluye caja y strap largo", precio: "$a consultar", img: "./img/B&C/B&C (6).jpg", categoria: CAT.BOLSOS, desc: "Bolso de hombro con silueta ligeramente curvada, disponible en dos variantes: Azul Oblique (clásico) y Negro (monocromático)." },
    { id: "12", nombre: "Coach Lunita Satén", precio: "$a consultar", img: "./img/B&C/B&C (7).jpg", categoria: CAT.BOLSOS, desc: "Presenta una forma de media luna o hobo estructurada, muy popular por su comodidad para llevar bajo el brazo." },
    { id: "13", nombre: "Koala de caballero LV top con caja", precio: "$a consultar", img: "./img/B&C/B&C (3).jpg", categoria: CAT.BOLSOS, desc: "(conocidos comúnmente como crossbody bags) de la marca de lujo Louis Vuitton. Ambos presentan un diseño vertical y compacto, ideal para llevar lo esencial de manera cómoda y con un estilo urbano." },
    { id: "14", nombre: "Bolso de Hombro Teri de Carolina Herrera", precio: "$a consultar", img: "./img/B&C/B&C (02).jpg", categoria: CAT.BOLSOS, desc: "Es una pieza de diseño minimalista y silueta curvada que destaca por su versatilidad. " },
    { id: "15", nombre: "Diadema 3 piezas cintillo + muñequera (blanca y negro)", precio: "$a consultar", img: "./img/Skincare/Skincare (79).jpg", categoria: CAT.SKINCARE, desc: "Este práctico set es el compañero ideal para tu rutina de cuidado facial matutina o nocturna." },
    { id: "16", nombre: "Diadema 3 piezas cintillo + muñequera (leopardo)", precio: "$a consultar", img: "./img/Skincare/Skincare (78).jpg", categoria: CAT.SKINCARE, desc: "Diseñado para ofrecer comodidad y evitar los pequeños desastres típicos al lavarse la cara." },
    { id: "17", nombre: "Diadema 3 piezas cintillo + muñequera (blanca)", precio: "$a consultar", img: "./img/Skincare/Skincare (77).jpg", categoria: CAT.SKINCARE, desc: "Compañero ideal para tu rutina de cuidado facial matutina o nocturna." },
    { id: "18", nombre: "Diadema 3 piezas cintillo + muñequera (roja)", precio: "$a consultar", img: "./img/Skincare/Skincare (76).jpg", categoria: CAT.SKINCARE, desc: "Comodidad y estilo para evitar que el agua baje por tus brazos." },
    { id: "19", nombre: "Diadema 3 piezas cintillo + muñequera (negra)", precio: "$a consultar", img: "./img/Skincare/Skincare (75).jpg", categoria: CAT.SKINCARE, desc: "Set esencial para rutinas de Skincare en color negro mate." },
    { id: "20", nombre: "Acqua di Giò Profondo Elixir", precio: "$a consultar", img: "./img/Perfumes/Perfumes (57).jpg", categoria: CAT.PERFUMES, desc: "Interpretación más intensa, oscura y mística del clásico ADN marino de Armani." },
    { id: "21", nombre: "Afnan 9 PM pour Femme (rosa)", precio: "$a consultar", img: "./img/Perfumes/Perfumes (47).jpg", categoria: CAT.PERFUMES, desc: "Fragancia de la familia Ámbar Floral, diseñada para sentirse aireada pero con presencia." },
    { id: "22", nombre: "Afnan 9 PM ", precio: "$a consultar", img: "./img/Perfumes/Perfumes (38).jpg", categoria: CAT.PERFUMES, desc: "Fragancia Ámbar Vainilla para hombres, diseñada específicamente para destacar." },
    { id: "23", nombre: "Afnan 9 AM ", precio: "$a consultar", img: "./img/Perfumes/Perfumes (37).jpg", categoria: CAT.PERFUMES, desc: "Fragancia diseñada para la luz del día, la oficina y la frescura matutina." },
    { id: "24", nombre: "Afnan 9 PM pour Femme (morado)", precio: "$a consultar", img: "./img/Perfumes/Perfumes (35).jpg", categoria: CAT.PERFUMES, desc: "Equilibra la frescura frutal con una base cálida y adictiva." },
    { id: "25", nombre: "Acqua di Giò Absolu de Giorgio Armani", precio: "$a consultar", img: "./img/Perfumes/Perfumes (34).jpg", categoria: CAT.PERFUMES, desc: "Equilibra el frescor acuático con la sensualidad de la madera." },
    { id: "26", nombre: "Paco Rabanne One Million Lucky", precio: "$a consultar", img: "./img/Perfumes/Perfumes (31).jpg", categoria: CAT.PERFUMES, desc: "Fragancia amaderada floral para quienes buscan proyectar confianza y audacia." },
    { id: "27", nombre: "Victoria's Secret Bombshell Seductión", precio: "$a consultar", img: "./img/Perfumes/Perfumes (29).jpg", categoria: CAT.PERFUMES, desc: "Variante más sensual y etérea de la línea original Bombshell." },
    { id: "28", nombre: "Paco Rabanne Invictus (clasico)", precio: "$a consultar", img: "./img/Perfumes/Perfumes (79).jpg", categoria: CAT.PERFUMES, desc: "Simboliza la victoria y el espíritu competitivo con su frasco en forma de trofeo." },
    { id: "29", nombre: "Paco Rabanne Invictus Victory Absolu", precio: "$a consultar", img: "./img/Perfumes/Perfumes (27).jpg", categoria: CAT.PERFUMES, desc: "Mezcla ganadora de pimienta negra fresca, ámbar sensual y sándalo adictivo." },
    { id: "30", nombre: "Carolina Herrera 212 VIP Black", precio: "$a consultar", img: "./img/Perfumes/Perfumes (26).jpg", categoria: CAT.PERFUMES, desc: "Fragancia explosiva y masculina, un referente de la vida nocturna." },
    { id: "31", nombre: "Paco Rabanne Phantom Intense", precio: "$a consultar", img: "./img/Perfumes/Perfumes (24).jpg", categoria: CAT.PERFUMES, desc: "Mezcla fascinante entre la frescura de la lavanda y una dulzura moderna cremosa." },
    { id: "32", nombre: "Lattafa Asad Zanzibar", precio: "$a consultar", img: "./img/Perfumes/Perfumes (17).jpg", categoria: CAT.PERFUMES, desc: "Es una fragancia marina, tropical y especiada. A diferencia de las fragancias azules tradicionales que huelen a gel de ducha, esta tiene un carácter cremoso y exótico que recuerda a unas vacaciones de lujo en la playa." },
    { id: "33", nombre: "Lattafa Yara candy", precio: "$a consultar", img: "./img/Perfumes/Perfumes (15).jpg", categoria: CAT.PERFUMES, desc: "Es una fragancia extremadamente dulce y chispeante. Huele a dulces de frutas con un toque ácido de manzana verde que evita que sea demasiado pesado. Es muy juvenil, alegre y juguetón." },
    { id: "34", nombre: "Lattafa Yara moi", precio: "$a consultar", img: "./img/Perfumes/Perfumes (14).jpg", categoria: CAT.PERFUMES, desc: "Yara Moi pertenece a la familia olfativa Ámbar Floral. Es una fragancia que equilibra la dulzura de las frutas blancas con una base cálida y profunda." },
    { id: "35", nombre: "Lattafa Yara", precio: "$a consultar", img: "./img/Perfumes/Perfumes (13).jpg", categoria: CAT.PERFUMES, desc: "Yara es una fragancia de la familia Ámbar Vainilla. Se describe a menudo como un batido de fresagourmet o una nube de malvavisco, gracias a su carácter dulce y lactónico (lechoso)." },
    { id: "36", nombre: "Paco Rabanne Invictus Victory (Eau de Parfum Extrême)", precio: "$a consultar", img: "./img/Perfumes/Perfumes (39).jpg", categoria: CAT.PERFUMES, desc: "A diferencia del Invictus original que es fresco y marino, la versión Victory es una bomba de dulzura nocturna y energía." },
    { id: "37", nombre: "Lattafa Asad", precio: "$a consultar", img: "./img/Perfumes/Perfumes (16).jpg", categoria: CAT.PERFUMES, desc: "Asad es una fragancia de la familia Ámbar Especializada para hombres. A diferencia de los perfumes frescos tradicionales, este es cálido, denso y con mucha textura." },
    { id: "38", nombre: "Jean paul gaultier Scandal intense", precio: "$a consultar", img: "./img/Perfumes/Perfumes (12).jpg", categoria: CAT.PERFUMES, desc: "Es una fragancia Ámbar Amaderada. Imagina un caramelo salado pero maduro, envuelto en maderas finas. Es densa, rica y proyecta una imagen de confianza absoluta." },
    { id: "39", nombre: "Armaf Mandarin sky", precio: "$a consultar", img: "./img/Perfumes/Perfumes (10).jpg", categoria: CAT.PERFUMES, desc: "Es una fragancia de la familia Ámbar Amaderada para hombres. Aunque el nombre sugiere algo muy cítrico y fresco, en realidad es un perfume predominantemente dulce y juguetón, con un fondo cremoso." },
    { id: "40", nombre: "Armaf Odyssey Candee", precio: "$a consultar", img: "./img/Perfumes/Perfumes (8).jpg", categoria: CAT.PERFUMES, desc: "La estructura de este perfume está diseñada para evolucionar de lo fresco y jugoso hacia algo cálido y comestible." },
    { id: "41", nombre: "Paco rabanne One million", precio: "$a consultar", img: "./img/Perfumes/Perfumes (7).jpg", categoria: CAT.PERFUMES, desc: "La fragancia se clasifica como Amaderada Especiada y se caracteriza por una evolución que va de lo fresco a lo profundamente cálido." },
    { id: "42", nombre: "Victorinox Swiss Army", precio: "$a consultar", img: "./img/Perfumes/Perfumes (5).jpg", categoria: CAT.PERFUMES, desc: "El icónico frasco plateado. Huele a limpio, a verde y a montaña. Sus notas principales son menta, bergamota y lavanda. Es el estándar de fragancia de día para muchos hombres." },
    { id: "43", nombre: "Coach Carterita (beige)", precio: "$a consultar", img: "./img/B&C/B&C (17).jpg", categoria: CAT.BOLSOS, desc: "Esta es una bolsa estilo satchel de la marca Coach (o inspirada en ella) con un diseño llamativo y coqueto." },
    { id: "44", nombre: "Coach Carterita (negro)", precio: "$a consultar", img: "./img/B&C/B&C (16).jpg", categoria: CAT.BOLSOS, desc: "Esta es una bolsa estilo satchel de la marca Coach (o inspirada en ella) con un diseño llamativo y coqueto." },
    { id: "45", nombre: "Coach Carterita (marron)", precio: "$a consultar", img: "./img/B&C/B&C (15).jpg", categoria: CAT.BOLSOS, desc: "Esta es una bolsa estilo satchel de la marca Coach (o inspirada en ella) con un diseño llamativo y coqueto." },
    { id: "46", nombre: "Coach Carterita (cafe claro)", precio: "$a consultar", img: "./img/B&C/B&C (14).jpg", categoria: CAT.BOLSOS, desc: "Esta es una bolsa estilo satchel de la marca Coach (o inspirada en ella) con un diseño llamativo y coqueto." },
    { id: "47", nombre: "Coach Carterita (blanca con estampado)", precio: "$a consultar", img: "./img/B&C/B&C (01).jpg", categoria: CAT.BOLSOS, desc: "Esta es una bolsa estilo satchel de la marca Coach (o inspirada en ella) con un diseño llamativo y coqueto." },
    { id: "48", nombre: "Coach Nolita 19", precio: "$a consultar", img: "./img/B&C/B&C.jpg", categoria: CAT.BOLSOS, desc: "El Coach Nolita 19, es el equilibrio perfecto entre una billetera grande y un bolso pequeño." },
    { id: "49", nombre: "Carolina herrera 212 MEN NYC", precio: "$a consultar", img: "./img/Perfumes/Perfumes (6).jpg", categoria: CAT.PERFUMES, desc: "Es una fragancia de la familia Almizcle Amaderado Floral. Su aroma se define por un contraste entre una frescura verde metálica y la calidez sensual del almizcle." },
    { id: "50", nombre: "Versace eros energy", precio: "$a consultar", img: "./img/Perfumes/Perfumes (2).jpg", categoria: CAT.PERFUMES, desc: "A diferencia de sus hermanos azucarados, Energy se aleja de la vainilla pesada para enfocarse en una frescura casi electrizante." },
    { id: "51", nombre: "Paco rabanne invictus intense", precio: "$a consultar", img: "./img/Perfumes/Perfumes (1).jpg", categoria: CAT.PERFUMES, desc: "Esta es una versión más robusta, oscura y amaderada que el Invictus original, diseñada para proyectar poder y sensualidad" },
    { id: "52", nombre: "Roll-on volcánico absorbente de aceite Karité", precio: "$a consultar", img: "./img/Makeup/Boutique (73).jpg", categoria: CAT.MAKEUP, desc: "Está diseñado para controlar el exceso de grasa en la piel, especialmente en la zona T (frente, nariz y mentón)." },
    { id: "53", nombre: "Mascaras de pestañas efecto de pestañas postizas Dolce bella", precio: "$a consultar", img: "./img/Makeup/Boutique (76).png", categoria: CAT.MAKEUP, desc: "Este producto es ideal para quienes buscan una mirada impactante sin necesidad de usar pestañas postizas." },
    { id: "54", nombre: "Cera para cejas Got2b", precio: "$a consultar", img: "./img/Makeup/Boutique (75).png", categoria: CAT.MAKEUP, desc: "Se utiliza para definir, fijar y dar forma a las cejas. Su fórmula permite mantener las cejas en su lugar durante todo el día, evitando que se despeinen o pierdan su forma." },
    { id: "55", nombre: "Corrector liquido Dolce bella", precio: "$a consultar", img: "./img/Makeup/Boutique (74).png", categoria: CAT.MAKEUP, desc: "Se utiliza principalmente para corregir imperfecciones en el maquillaje. Su función es cubrir manchas, ojeras, granitos y otras imperfecciones de la piel." },
    { id: "56", nombre: "Polvo y base 2 en 1 Ushas", precio: "$a consultar", img: "./img/Makeup/Boutique (71).png", categoria: CAT.MAKEUP, desc: "Diseñado para quienes buscan un maquillaje rapido y efectivo con buena cobertura y un acabado mate duradero." },
    { id: "57", nombre: "Rubor liquido Sheglam", precio: "$a consultar", img: "./img/Makeup/Boutique (70).jpg", categoria: CAT.MAKEUP, desc: "Diseñado para aportar color, luminosidad a la mejillas y frescura al rostro con la facilidad de uso que ofrecen los productos liquidos." },
    { id: "58", nombre: "Plantilla para rimel", precio: "$a consultar", img: "./img/Makeup/Boutique (69).jpg", categoria: CAT.MAKEUP, desc: "Es util para lograr una aplicacion mas limpia y efectiva del rimel mejorando el resultado final de tu maquillaje." },
    { id: "59", nombre: "Polvo compacto maybelline para la piel grasa", precio: "$a consultar", img: "./img/Makeup/Boutique (66).jpg", categoria: CAT.MAKEUP, desc: "Esta diseñado para ayudar a controlar el brillo y la oleosidad de la piel." },
    { id: "60", nombre: "Agua de rosas con vitamina E", precio: "$a consultar", img: "./img/Skincare/Skincare (73).png", categoria: CAT.MAKEUP, desc: "Es un tonico natural que elimina las impurezas y deja la piel suave e hidratada." },
    { id: "61", nombre: "Sauvage Dior Elixir", precio: "$a consultar", img: "./img/Perfumes/Perfumes (68).jpg", categoria: CAT.PERFUMES, desc: "el Sauvage Elixir redefine el concepto de concentración. No es un Eau de Parfum, es un Elixir, lo que significa que tiene una densidad de aceites altísima." },
    { id: "62", nombre: "Protector solar Neutrogena factor 45 SPF", precio: "$a consultar", img: "./img/Skincare/Skincare (74).jpg", categoria: CAT.MAKEUP, desc: "Este protector sirve para proteger la piel de los dañinos rayos del sol y previene quemaduras solares." },
    { id: "63", nombre: "Mascara de pestañas", precio: "$a consultar", img: "./img/Makeup/Boutique (65).png", categoria: CAT.MAKEUP, desc: "Producto diseñado para realzar y definir las pestañas." },
    { id: "64", nombre: "Mascara de pestañas colossal", precio: "$a consultar", img: "./img/Makeup/Boutique (64).jpg", categoria: CAT.MAKEUP, desc: "Máscara de pestañas que proporciona un volumen intenso y alarga las pestañas." },
    { id: "65", nombre: "Plantilla para deliniado y sombra.", precio: "$a consultar", img: "./img/Makeup/Boutique (63).jpg", categoria: CAT.MAKEUP, desc: " Herramienta que ayuda a delinear de manera precisa y simétrica los ojos." },
    { id: "66", nombre: "Bandanas para maquillaje", precio: "$a consultar", img: "./img/Makeup/Boutique (60).png", categoria: CAT.MAKEUP, desc: "Bandanas decoradas con diseños de Sanrio para usar durante el maquillaje." },
    { id: "67", nombre: "Rubor barbie alta pigmentacion", precio: "$a consultar", img: "./img/Makeup/Boutique (59).png", categoria: CAT.MAKEUP, desc: "Diseñado para añadir color y definición a las mejillas. El rubor se utiliza para dar un aspecto saludable y radiante al rostro. " },
    { id: "68", nombre: "Tintass de labios Sanrio", precio: "$a consultar", img: "./img/Makeup/Boutique (57).png", categoria: CAT.MAKEUP, desc: "Tintass labiales con colores y diseños inspirados en Sanrio." },
    { id: "69", nombre: "Grenobil lapiz de cejas con cepillo", precio: "$a consultar", img: "./img/Makeup/Boutique (56).png", categoria: CAT.MAKEUP, desc: "Lápiz de cejas con un cepillo en el extremo para peinarlas y definirlas." },
    { id: "70", nombre: "Grenobil lapiz labial", precio: "$a consultar", img: "./img/Makeup/Boutique (55).png", categoria: CAT.MAKEUP, desc: "Tintas labiales de la marca Grenobil en diferentes tonalidades." },
    { id: "71", nombre: "Grenobil tintas de labios", precio: "$a consultar", img: "./img/Makeup/Boutique (54).png", categoria: CAT.MAKEUP, desc: "Tintas de labios de diferentes colores de la nuestra marca favrita grenobil." },
    { id: "72", nombre: "Balsamo fresita", precio: "$a consultar", img: "./img/Makeup/Boutique (53).png", categoria: CAT.MAKEUP, desc: "Bálsamo labial con aroma a fresa para hidratar los labios." },
    { id: "73", nombre: "Esponja para difuminar", precio: "$a consultar", img: "./img/Makeup/Boutique (44).png", categoria: CAT.MAKEUP, desc: "Bálsamo labial con aroma a fresa para hidratar los labios." },
    { id: "74", nombre: "Base febble", precio: "$a consultar", img: "./img/Makeup/Boutique (42).png", categoria: CAT.MAKEUP, desc: "Base de maquillaje de la marca Febble para una cobertura natural." },
    { id: "75", nombre: "Laminador de cejas fitme", precio: "$a consultar", img: "./img/Makeup/Boutique (42).png", categoria: CAT.MAKEUP, desc: "Producto para fijar y dar forma a las cejas de la línea Fit Me." },
    { id: "76", nombre: "Grenobil rubor en crema", precio: "$a consultar", img: "./img/Makeup/Boutique (40).png", categoria: CAT.MAKEUP, desc: "Rubor en formato de crema para un acabado suave y natural." },
    { id: "77", nombre: "esponja para difuminar", precio: "$a consultar", img: "./img/Makeup/Boutique (39).png", categoria: CAT.MAKEUP, desc: "Esponja para difuminar el maquillaje de forma uniforme." },
    { id: "78", nombre: "Mascara de pestañas fitme", precio: "$a consultar", img: "./img/Makeup/Boutique (38).jpg", categoria: CAT.MAKEUP, desc: "Máscara de pestañas de la línea Fitme para dar volumen y longitud." },
    { id: "79", nombre: "Blush con sellito", precio: "$a consultar", img: "./img/Makeup/Boutique (36).jpg", categoria: CAT.MAKEUP, desc: "Rubor con un diseño impreso para un acabado diferente." },
    { id: "80", nombre: "Corrector febble", precio: "$a consultar", img: "./img/Makeup/Boutique (35).png", categoria: CAT.MAKEUP, desc: "Es un producto cosmetico diseado para corregir imperfecciones en la piel, como manchas,ojeras rojeces y otras irregularidades." },
    { id: "81", nombre: "Sombras de cejas febble", precio: "$a consultar", img: "./img/Makeup/Boutique (34).png", categoria: CAT.MAKEUP, desc: "Sombras para cejas de la marca Febble en tonos naturales." },
    { id: "82", nombre: "Lentes de contacto", precio: "$a consultar", img: "./img/Makeup/Boutique (33).png", categoria: CAT.MAKEUP, desc: "Lentes de contacto con colores variados para cambiar el aspecto de los ojos." },
    { id: "83", nombre: "S.f.r color Rubor en crema", precio: "$a consultar", img: "./img/Makeup/Boutique (31).png", categoria: CAT.MAKEUP, desc: "Rubor en formato de crema de la marca S.f.r color." },
    { id: "85", nombre: "Sombra liquida glitter", precio: "$a consultar", img: "./img/Makeup/Boutique (30).png", categoria: CAT.MAKEUP, desc: "Sombra de ojos líquida con partículas brillantes para un acabado espectacular." },
    { id: "86", nombre: "Laminador de cejas", precio: "$a consultar", img: "./img/Makeup/Boutique (29).png", categoria: CAT.MAKEUP, desc: "Producto para fijar y dar forma a las cejas de la línea Wardabeauty." },
    { id: "87", nombre: "Mascaras de pestañas glitter", precio: "$a consultar", img: "./img/Makeup/Boutique (28).png", categoria: CAT.MAKEUP, desc: "Máscara de pestañas con partículas brillantes para un efecto llamativo." },
    { id: "88", nombre: "Polvo de hadas", precio: "$a consultar", img: "./img/Makeup/Boutique (27).png", categoria: CAT.MAKEUP, desc: "Polvo con destellos de brillo para un acabado mágico en el maquillaje." },
    { id: "89", nombre: "Polvo de hadas hello kitty", precio: "$a consultar", img: "./img/Makeup/Boutique (26).png", categoria: CAT.MAKEUP, desc: "Polvo de hadas con diseño de Hello Kitty para un toque divertido en el maquillaje." },
    { id: "90", nombre: "Ushas Gloss shiny", precio: "$a consultar", img: "./img/Makeup/Boutique (25).png", categoria: CAT.MAKEUP, desc: "Gloss labial con brillo intenso de la marca Ushas." },
    { id: "90", nombre: "Ushas Polvo de hadas en spray", precio: "$a consultar", img: "./img/Makeup/Boutique (24).png", categoria: CAT.MAKEUP, desc: "El polvo de hadas en spay de la marca ushas es un producto cosmetico que se utiliza principalmente como iluminador para resaltar y dar brillo a ciertas areas del rostro." },
    { id: "91", nombre: "Pigmento para cejas semipermanente", precio: "$a consultar", img: "./img/Makeup/Boutique (23).png", categoria: CAT.MAKEUP, desc: "Pigmento para cejas de larga duración para un efecto semipermanente." },
    { id: "92", nombre: "Blush liquido", precio: "$a consultar", img: "./img/Makeup/Boutique (22).png", categoria: CAT.MAKEUP, desc: "Rubor líquido con diseño de Sanrio para un toque especial en el maquillaje." },
    { id: "93", nombre: "Ushas base flawless fit", precio: "$a consultar", img: "./img/Makeup/Boutique (21).png", categoria: CAT.MAKEUP, desc: "Base de maquillaje de la marca Ushas para una cobertura impecable." },
    { id: "94", nombre: "Tintas de labios", precio: "$a consultar", img: "./img/Makeup/Boutique (20).png", categoria: CAT.MAKEUP, desc: "Tintas labial de la línea Wardabeauty en un tono específico." },
    { id: "95", nombre: "Corrector perfect cover", precio: "$a consultar", img: "./img/Makeup/Boutique (19).png", categoria: CAT.MAKEUP, desc: "Corrector de alta cobertura de la marca Kimbeauty." },
    { id: "96", nombre: "S.f.r color corrector", precio: "$a consultar", img: "./img/Makeup/Boutique (18).png", categoria: CAT.MAKEUP, desc: "Corrector de la marca S.f.r color para corregir imperfecciones y ojeras." },
    { id: "97", nombre: "Mascaras de pestañas Transparente", precio: "$a consultar", img: "./img/Makeup/Boutique (17).png", categoria: CAT.MAKEUP, desc: "Este rímel transparente contiene ácido hialurónico que ayuda a hidratar y fortalecer las pestañas. Ideal para darles un aspecto saludable y natural." },
    { id: "98", nombre: "Ushas Base liquida", precio: "$a consultar", img: "./img/Makeup/Boutique (16).jpg", categoria: CAT.MAKEUP, desc: "Esta base líquida proporciona una cobertura media a completa, dejando la piel con un acabado natural y radiante. Ayuda a unificar el tono de la piel y a cubrir imperfecciones." },
    { id: "99", nombre: "Corrector Pro.conceal", precio: "$a consultar", img: "./img/Makeup/Boutique (15).png", categoria: CAT.MAKEUP, desc: "Este corrector ayuda a corregir imperfecciones como ojeras, manchas y rojeces. Su fórmula de alta cobertura es fácil de difuminar y se adapta perfectamente al tono de la piel." },
    { id: "100", nombre: "Mac Duo mascaras de pestañas", precio: "$a consultar", img: "./img/Makeup/Boutique (14).png", categoria: CAT.MAKEUP, desc: "Tiene un lado con color para dar volumen y longitud a las pestañas, y el otro lado tiene un color azul para agregar un toque divertido y original al maquillaje de ojos." },
    { id: "101", nombre: "Paleta de sombras 12 tonos Sevencool", precio: "$a consultar", img: "./img/Makeup/Boutique (13).png", categoria: CAT.MAKEUP, desc: "Contiene 12 tonos diferentes, tanto mate como brillantes, para crear una variedad de looks." },
    { id: "102", nombre: "Delineador con sello Karite", precio: "$a consultar", img: "./img/Makeup/Boutique (12).png", categoria: CAT.MAKEUP, desc: "Este delineador cuenta con un sello en uno de sus extremos que facilita la creación de un delineado perfecto y simétrico. Ideal para quienes buscan un delineado preciso y fácil de lograr." },
    { id: "103", nombre: "Grenobil Primer", precio: "$a consultar", img: "./img/Makeup/Boutique (11).png", categoria: CAT.MAKEUP, desc: "Este primer ayuda a minimizar la apariencia de los poros, creando una base suave y uniforme para la aplicación del maquillaje. Ayuda a que el maquillaje se mantenga en su lugar por más tiempo." },
    { id: "104", nombre: "Grenobil corrector de alta cobertura", precio: "$a consultar", img: "./img/Makeup/Boutique (10).png", categoria: CAT.MAKEUP, desc: "proporciona una cobertura completa y de larga duración para ocultar imperfecciones, manchas y ojeras y Ayuda a unificar el tono de la piel." },
    { id: "105", nombre: "Grenobil Cera para estilizar cejas", precio: "$a consultar", img: "./img/Makeup/Boutique (9).png", categoria: CAT.MAKEUP, desc: "Producto para fijar y dar forma a las cejas, proporcionando un acabado natural y definido." },
    { id: "106", nombre: "Delineador blanco", precio: "$a consultar", img: "./img/Makeup/Boutique (8).png", categoria: CAT.MAKEUP, desc: "Lapiz o gel delineador de ojos en color blanco para realzar y agrandar los ojos." },
    { id: "107", nombre: "Serum vitamina C Dissar", precio: "$a consultar", img: "./img/Skincare/Skincare (56).jpg", categoria: CAT.SKINCARE, desc: "Se utiliza para mejorar la luminosidad, textura y uniformidad de la piel." },
    { id: "108", nombre: "Rizador de pestañas", precio: "$a consultar", img: "./img/Makeup/Boutique (5).png", categoria: CAT.MAKEUP, desc: "Herramienta para curvar las pestañas y abrir la mirada." },
    { id: "109", nombre: "Mascaras de pestañas maybelline", precio: "$a consultar", img: "./img/Makeup/Boutique (3).jpg", categoria: CAT.MAKEUP, desc: "Esta Mascara generalmente viene en un tubo con un aplicador de cepillo que se utiliza para aplicar el producto en las pestañas." },
    { id: "110", nombre: "Serum renovador de retinol para la piel Cerave", precio: "$a consultar", img: "./img/Skincare/Skincare (54).jpg", categoria: CAT.SKINCARE, desc: "Tiene varios beneficios para la piel, el retinol es un derivado de la vitamina A. que se utiliza comunmente en productos para el cuidado de la piel." },
    { id: "111", nombre: "Combo de productos Dissar vitamina C", precio: "$a consultar", img: "./img/Skincare/Skincare (71).jpg", categoria: CAT.SKINCARE, desc: "Combo facial vitamina C Contiene: <br> -Gel limpiador hidratante <br> -Serum <br> - Crema de tarro lujo <br> -Jabon en barra <br> -Crema aclarante de orejas<br>" },
    { id: "112", nombre: "Combo Premiun anti-acné de Dissar", precio: "$a consultar", img: "./img/Skincare/Skincare (70).jpg", categoria: CAT.SKINCARE, desc: "Combo facial anti-acne completo Contiene: <br> -Gel limpiador hidratante <br> -Serum <br> - Crema de tarro <br> -Tonico <br>" },
    { id: "113", nombre: "Combo Premiun Rose de Dissar vitamina C", precio: "$a consultar", img: "./img/Skincare/Skincare (69).jpg", categoria: CAT.SKINCARE, desc: "Combo facial con esencia de rosas completo Contiene: <br> -Gel limpiador hidratante <br> -Serum <br> - Crema de tarro <br> -Tonico <br>" },
    { id: "114", nombre: "Protector solar con filtros minerales y antioxidantes SPF30", precio: "$a consultar", img: "./img/Skincare/Skincare (66).jpg", categoria: CAT.SKINCARE, desc: "Tiene varias funciones y beneficios para lapiel de los rayos UV dañinos y proporcionar una barrera de proteccion contra el sol." },
    { id: "115", nombre: "Blanqueador de pies", precio: "$a consultar", img: "./img/Skincare/Skincare (64).jpg", categoria: CAT.SKINCARE, desc: "Es un producto diseado especificamente para proporcionar diversos beneficos para la piel de lospies, este es efectivo para el blanqueamiento de los pies, hidratacion intensa, reparacion y suavidad de la piel." },
    { id: "116", nombre: "Grenobil Jabon de arroz", precio: "$a consultar", img: "./img/Skincare/Skincare (63).png", categoria: CAT.SKINCARE, desc: "Limpieza suavement y es nutritiva para la piel, ademas su deliciosa aroma a arroz con leche te proporcionara una experiencia sensacional unica en cada uso." },
    { id: "117", nombre: "Grenobil Jabon blanqueador removedor de manchas oscuras", precio: "$a consultar", img: "./img/Skincare/Skincare (62).png", categoria: CAT.SKINCARE, desc: "Elimina manchas oscuras en la piel y promover un tono mas uniforme, ademas contiene ingredientes especiales como la vitamina c." },
    { id: "118", nombre: "Serum rosas Ushas", precio: "$a consultar", img: "./img/Skincare/Skincare (61).png", categoria: CAT.SKINCARE, desc: "Este serum, proporciona hidratacion luminosidad y elasticidad, ayuda a lucir una piel radiante, indicado para las pieles secas, dañadas o envejecidas." },
    { id: "119", nombre: "Serum de extracto de perlas Ushas", precio: "$a consultar", img: "./img/Skincare/Skincare (60).png", categoria: CAT.SKINCARE, desc: "Las perlas de mar estan cargadas de antioxidantes y aminoacidos que iluminas, regeneran y disminuyen el evejecimineto." },
    { id: "120", nombre: "Serum de vitamina C Ushas", precio: "$a consultar", img: "./img/Skincare/Skincare (59).png", categoria: CAT.SKINCARE, desc: "Este serum ayuda a atenuar cicatrices de un tono mas uniforme, aporta luminosidad, minimiza irritaciones y protege de los agentes externos." },
    { id: "121", nombre: "Ushas Gel hidratante de ácido hialurónico", precio: "$a consultar", img: "./img/Skincare/Skincare (58).png", categoria: CAT.SKINCARE, desc: "Te ayudara a controlar la oleosidad, su componente de acido hialurónico es ideal para mantener el rostro protegido y renovado." },
    { id: "122", nombre: "Ushas Espuma facial limpiadora", precio: "$a consultar", img: "./img/Skincare/Skincare (57).png", categoria: CAT.SKINCARE, desc: "Este producto limpia profundamente la suciedad, polvo y efecto de la contaminacion, elimina impurezas limpiando profundamente los poros." },
    { id: "123", nombre: "Serum rejuvenecedor de retinol Cerave", precio: "$a consultar", img: "./img/Skincare/Skincare (53).jpg", categoria: CAT.SKINCARE, desc: "Es un producto diseñado para ayudar a reducir los signos del evejecimineto en la piel, como las arrugas lineas finas y manchas oscuras." },
    { id: "124", nombre: "Serum hidratante de ácido hialurónico Cerave", precio: "$a consultar", img: "./img/Skincare/Skincare (52).jpg", categoria: CAT.SKINCARE, desc: "Proporciona una hidratacion intensa y dudadera a la piel, ayudando a mantenerla suave, firme y saludable." },
    { id: "125", nombre: "Bioaqua limpiador facial anti-acné", precio: "$a consultar", img: "./img/Skincare/Skincare (50).jpg", categoria: CAT.SKINCARE, desc: "Esta formulado para limpiar en profundidad, reducir la inflamacion, prevenir brotes todo con el objetivo de mehorar la apariencia y salud de la piel propensa al acné." },
    { id: "126", nombre: "Dissar contorno de ojos de vitamina C y acido hialurónico", precio: "$a consultar", img: "./img/Skincare/Skincare (46).png", categoria: CAT.SKINCARE, desc: "Esta formulado para hidratar, iluminar, reducir arrugas y desinflarmar la delicada piel del contorno de ojos." },
    { id: "127", nombre: "Kit The Ordinary de 3 serums", precio: "$a consultar", img: "./img/Skincare/Skincare (48).jpg", categoria: CAT.SKINCARE, desc: "-Peeling Solution <br> -Caffeine Solution <br> Y por ultimo Niacinamide." },
    { id: "128", nombre: "Bioaqua balsamo hidratante", precio: "$a consultar", img: "./img/Skincare/Skincare (45).png", categoria: CAT.SKINCARE, desc: "El bálsamo hidratante de bioaqua es un producto que se utiliza para hidratar y nutrir lapiel, alivia la sequedad,irritacion y descamacion de la piel." },
    { id: "129", nombre: "Protector solar La Roche-Posay de 50 SPF", precio: "$a consultar", img: "./img/Skincare/Skincare (44).jpg", categoria: CAT.SKINCARE, desc: "Deja tu piel suave y protegida. ¡No te preocupes por el color blanco, se funde perfectamente con tu piel para una protección invisible." },
    { id: "130", nombre: "Cerave loción hidratante", precio: "$a consultar", img: "./img/Skincare/Skincare (43).jpg", categoria: CAT.SKINCARE, desc: "¡Hidratación y confort para tu piel con la Loción Hidratante de CeraVe, Deja que tus poros respiren con esta fórmula ligera y sin aceites, con ceramidas esenciales y Ácido Hialurónico." },
    { id: "131", nombre: "Cerave Protector solar mineral hidratante facial y corporal", precio: "$a consultar", img: "./img/Skincare/Skincare (42).png", categoria: CAT.SKINCARE, desc: "Sirve para proteger la piel de los daños causados por la radiacion ultravioleta (UV) del sol." },
    { id: "132", nombre: "Bioaqua serum de ácido hialuronico", precio: "$a consultar", img: "./img/Skincare/Skincare (41).png", categoria: CAT.SKINCARE, desc: "Es un producto versátil y efectivo que puede proporcionar una hidratación profunda, mejora la textura y ayuda a reducir los signos del evejecimineto." },
    { id: "133", nombre: "Serum en cápsulas de vitaminas C", precio: "$a consultar", img: "./img/Skincare/Skincare (40).png", categoria: CAT.SKINCARE, desc: "Es un producto que puede proporcionar proteccion antioxidante para ayudar a defenderse de los radicales libres para la piel." },
    { id: "134", nombre: "Cepillo Capilar", precio: "$a consultar", img: "./img/Skincare/Skincare (39).png", categoria: CAT.SKINCARE, desc: "Es un dispositivo diseñado para facilitar la limpieza y masaje del cuero cabelludo durante el lavado del cabello." },
    { id: "135", nombre: "Crema vegana hidratante", precio: "$a consultar", img: "./img/Skincare/Skincare (36).png", categoria: CAT.SKINCARE, desc: "es un producto que ofrece hidratacion, nutricion y cuidado natural para la piel, ideal para aquellas personas que buscan productos respetuosos con el medio ambiente y libres de origen animal." },
    { id: "136", nombre: "Gel de aloe vera 98%", precio: "$a consultar", img: "./img/Skincare/Skincare (34).jpg", categoria: CAT.SKINCARE, desc: "Es muy efectivo para controlar la grasa en la piel, eliminando así problemas como acné, granos, barros y puntos negros." },
    { id: "137", nombre: "Cerave limpiador para el control del acné", precio: "$a consultar", img: "./img/Skincare/Skincare (33).jpg", categoria: CAT.SKINCARE, desc: "Este producto elimina el acné, reduce los puntos negros y mejora la apariencia de los poros."},
    { id: "138", nombre: "Crecimiento de pestañas", precio: "$a consultar", img: "./img/Skincare/Skincare (32).jpg", categoria: CAT.SKINCARE, desc: "Mavala Double-Lash, Contiene ingredientes activos que ayudan a nutrir y fortalecer las pestañas, promoviendo un crecimiento saludable y voluminoso." },
    { id: "139", nombre: "Crema aclarante de zonas intimas", precio: "$a consultar", img: "./img/Skincare/Skincare (31).jpg", categoria: CAT.SKINCARE, desc: "Esta fórmula especializada aclara eficazmente zonas íntimas, brindando una apariencia uniforme y luminosa." },
    { id: "140", nombre: "Cerave limpiador renovador SA", precio: "$a consultar", img: "./img/Skincare/Skincare (30).jpg", categoria: CAT.SKINCARE, desc: "Ayudar a exfoliar suavemente la piel, eliminar las células muertas y promover una piel más suave y renovada." },
    { id: "141", nombre: "CeraVe Limpiador Hidratante", precio: "$a consultar", img: "./img/Skincare/Skincare (29).jpg", categoria: CAT.SKINCARE, desc: "Producto para cuidado de la piel diseñado para limpiar suavemente la piel sin eliminar sus aceites naturales." },
    { id: "142", nombre: "Cepillo capilar", precio: "$a consultar", img: "./img/Skincare/Skincare (28).jpg", categoria: CAT.SKINCARE, desc: "Es un dispositivo diseñado para facilitar la limpieza y masaje del cuero cabelludo durante el lavado del cabello." },
    { id: "143", nombre: "Acido glicólico 7%", precio: "$a consultar", img: "./img/Skincare/Skincare (27).jpg", categoria: CAT.SKINCARE, desc: "Mejora la textura de la piel, reducir la apariencia de poros dilatados, suavizar líneas finas y arrugas, y promover una tez más radiante y uniforme." },
    { id: "144", nombre: "Crema Suspencion de vitamina C al 30% en silicona", precio: "$a consultar", img: "./img/Skincare/Skincare (26).jpg", categoria: CAT.SKINCARE, desc: "Ayuda a mejorar la apariencia de la piel, ya que la vitamina C es conocida por sus propiedades antioxidantes." },
    { id: "145", nombre: "Serum solución de cafeína 5% + EGCG", precio: "$a consultar", img: "./img/Skincare/Skincare (25).jpg", categoria: CAT.SKINCARE, desc: "Reduce visiblemente la apariencia de ojeras, bolsas debajo de los ojos e hinchazónen el área del contorno de ojos." },
    { id: "146", nombre: "Crema Factores hidratantes naturales", precio: "$a consultar", img: "./img/Skincare/Skincare (24).jpg", categoria: CAT.SKINCARE, desc: "Es un producto de cuidado de la piel que combina ingredientes hidratantes y humectantes para ayudar a mantener la piel suave, hidratada y protegida." },
    { id: "147", nombre: "Protector solar con color SPF 100", precio: "$a consultar", img: "./img/Skincare/Skincare (23).jpg", categoria: CAT.SKINCARE, desc: "Es un producto que combina la protección solar alta intensidad con un tono de color que ayuda a igualar el tono de la piel." },
    { id: "148", nombre: "Protector solar Disaar SPF 50", precio: "$a consultar", img: "./img/Skincare/Skincare (22).jpg", categoria: CAT.SKINCARE, desc: "Protege tu piel de rayos solares. Su fórmula combina protección UV con un ligero tono que se adapta a tu piel." },
    { id: "149", nombre: "Ushas gel de aloe vera 99%", precio: "$a consultar", img: "./img/Skincare/Skincare (51).jpg", categoria: CAT.SKINCARE, desc: "Es muy efectivo para controlar la grasa en la piel, eliminando así problemas como acné, granos, barros y puntos negros." },
    { id: "150", nombre: "Serum retinol en escualeno 0.2%", precio: "$a consultar", img: "./img/Skincare/Skincare (20).jpg", categoria: CAT.SKINCARE, desc: "Es un potente tratamiento antienvejecimiento que aprovecha el poder del retinol puro y Devuelve ese brillo juvenil a tu piel." },
    { id: "151", nombre: "Serum solución exfoliante AHA 30% + BHA 2%", precio: "$a consultar", img: "./img/Skincare/Skincare (19).jpg", categoria: CAT.SKINCARE, desc: "Combate el acné y recupera la claridad e incluso tonifica tu piel y tambien suaviza la textura de la piel." },
    { id: "152", nombre: "Serum alpha arbutin 2% + HA", precio: "$a consultar", img: "./img/Skincare/Skincare (18).jpg", categoria: CAT.SKINCARE, desc: "Sérum creado para combatir la hiperpigmentación y unificar el tono de la piel gracias a sus propiedades inhibitorias de la melanina." },
    { id: "153", nombre: "Serum Niacinamida 10% + Zinc 1%", precio: "$a consultar", img: "./img/Skincare/Skincare (17).jpg", categoria: CAT.SKINCARE, desc: "Reduce la aparición de manchas,  enrojecimiento, poros dilatados, tono desigual y piel grasa." },
    { id: "154", nombre: "Serum ácido láctico 5% + HA", precio: "$a consultar", img: "./img/Skincare/Skincare (16).jpg", categoria: CAT.SKINCARE, desc: "Es un compuesto perfecto para hidratar pieles muy secas y cuidar las más sensibles, consiguiendo con ello un efecto peeling de forma natural." },
    { id: "155", nombre: "Serum Ácido hialurónico", precio: "$a consultar", img: "./img/Skincare/Skincare (14).jpg", categoria: CAT.SKINCARE, desc: "sérum hidratante formulado con Ácido Hialurónico Vegano y Vitamina B5 que potencia los factores de hidratación naturales de la dermis para lograr una piel protegida y profundamente hidratada." },
    { id: "156", nombre: "Piedra depilatoria", precio: "$a consultar", img: "./img/Skincare/Skincare (13).jpg", categoria: CAT.SKINCARE, desc: "Se utiliza para eliminar el vello no deseado, se humedece con agua y se frota suavemente sobre la piel en la direccion opuesta al crecimiento del vello." },
    { id: "157", nombre: "Cepillo exfoliante facial", precio: "$a consultar", img: "./img/Skincare/Skincare (12).jpg", categoria: CAT.SKINCARE, desc: "Ayuda a eliminar suavemente las impurezas y células muertas de la piel. Se recomienda usarlo con el limpiador facial favorito una vez al día para una limpieza profunda y una piel más suave y radiante." },
    { id: "158", nombre: "Bioaqua gel aclarante de zonas íntimas", precio: "$a consultar", img: "./img/Skincare/Skincare (10).jpg", categoria: CAT.SKINCARE, desc: "Está diseñado para aclarar y mejorar el tono de la piel en áreas sensibles como la zona genital, las axilas y otras partes del cuerpo." },
    { id: "159", nombre: "CeraVe Tratamiento Concentrado Anti-Imperfecciones", precio: "$a consultar", img: "./img/Skincare/Skincare (9).jpg", categoria: CAT.SKINCARE, desc: "Es un tratamiento específico para pieles propensas al acné y las imperfecciones." },
    { id: "160", nombre: "Cerave protector solar mineral hidratante SPF 50 (facial)", precio: "$a consultar", img: "./img/Skincare/Skincare (8).jpg", categoria: CAT.SKINCARE, desc: "Es un protector solar facial que sirve para proteger la piel de los dañinos rayos UVA y UVB del sol." },
    { id: "161", nombre: "Crema facial limpiadora", precio: "$a consultar", img: "./img/Skincare/Skincare (7).jpg", categoria: CAT.SKINCARE, desc: "Es un producto de belleza diseñado para aclarar y blanquear la piel del rostro. Ayuda a reducir la apariencia de manchas oscuras, pecas, cicatrices y otros." },
    { id: "162", nombre: "CeraVe gel limpiador espumoso", precio: "$a consultar", img: "./img/Skincare/Skincare (5).jpg", categoria: CAT.SKINCARE, desc: "Diseñado para limpiar la piel de manera suave pero efectiva. Este gel limpiador crea una espuma ligera que elimina el exceso de grasa." },
    { id: "163", nombre: "CeraVe Locion para pieles asperas", precio: "$a consultar", img: "./img/Skincare/Skincare (4).jpg", categoria: CAT.SKINCARE, desc: "Está formulado para suavizar y mejorar la textura de la piel áspera y con protuberancias, gracias a su combinación de ácido salicílico y ácido hialurónico." },
    { id: "164", nombre: "9 PM Elixir de Afnan", precio: "$a consultar", img: "./img/Perfumes/Perfumes (80).jpg", categoria: CAT.PERFUMES, desc: "Fragancia explosiva y masculina, un referente de la vida nocturna." },
    { id: "165", nombre: "Valentino Donna Born In Roma Pink PP", precio: "$a consultar", img: "./img/Perfumes/Perfumes (81).jpg", categoria: CAT.PERFUMES, desc: "una edición vibrante y audaz que destaca tanto por su aroma como por su icónico diseño en color fucsia intenso." },
    { id: "166", nombre: "Valentino Uomo Born In Roma Extradose", precio: "$a consultar", img: "./img/Perfumes/Perfumes (82).jpg", categoria: CAT.PERFUMES, desc: "una fragancia masculina que destaca por ser una versión más intensa, rebelde y magnética de la línea original." },
    { id: "167", nombre: "Club de Nuit Intense Man Limited Edition (Parfum)", precio: "$a consultar", img: "./img/Perfumes/Perfumes (83).jpg", categoria: CAT.PERFUMES, desc: "Es una fragancia Amaderada Especiada. Es mundialmente conocida por su similitud con Creed Aventus, pero con una mayor concentración de aceites." },
    { id: "168", nombre: "Odyssey Mandarin Sky Elixir", precio: "$a consultar", img: "./img/Perfumes/Perfumes (84).jpg", categoria: CAT.PERFUMES, desc: "Pertenece a la familia Ámbar Amaderada. Es conocido por tener una vibra similar al famoso Scandal Pour Homme, pero con el toque distintivo de la línea Odyssey." },
    { id: "169", nombre: "Coach C dorada ", precio: "$a consultar", img: "./img/B&C/B&C (4).jpg", categoria: CAT.BOLSOS, desc: "El Coach C dorada , es el equilibrio perfecto entre una billetera grande y un bolso pequeño, diferentes colores : blanco, beige, marron" },
    { id: "170", nombre: "Coach Lana 23 Top con caja ", precio: "$a consultar", img: "./img/B&C/B&C (13).jpg", categoria: CAT.BOLSOS, desc: "específicamente inspirada en el modelo Lana. Es una pieza que combina un diseño minimalista con una estructura muy funcional y elegante." },


];
/*** HASTA AQUI, DATASET DE PRODUCTOS ***/  


/*** 2. LÓGICA DE MEZCLA (SHUFFLE)*****/
function mezclarProductos(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
/*** HASTA AQUI, LÓGICA DE MEZCLA (SHUFFLE)*****/


/*** 3. LÓGICA DE CONTADORES (Optimizado con Map) ****/
function actualizarContadores(productosFiltrados = productos) {
    const conteo = productosFiltrados.reduce((acc, prod) => {
        acc[prod.categoria] = (acc[prod.categoria] || 0) + 1;
        return acc;
    }, { all: productosFiltrados.length });

    $('.category_item').each(function() {
        const $el = $(this);
        const cat = $el.attr('category');
        const cantidad = conteo[cat] || 0;
        const textoBase = $el.contents().filter(function() { return this.nodeType === 3; }).text().trim();
        $el.html(`${textoBase} <span class="count-badge" style="font-size:0.85em; opacity:0.7;">(${cantidad})</span>`);
    });
}
/*** HASTA AQUI, LÓGICA DE CONTADORES ****/


/**** 4. LÓGICA DE FAVORITOS *****/
const updateFavoritesInLocalStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showHTML();
};

const showFavoriteFeedback = (message, alertClass) => {
    const $container = $('#fav-result-message');
    if (!$container.length) return;

    const html = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert" style="margin: 10px; font-size: 0.85em; border-radius: 12px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" style="padding: 0.8rem;"></button>
        </div>`;
    
    $container.html(html);
    setTimeout(() => $container.find('.alert').fadeOut('slow', function() { $(this).remove(); }), 3000);
};

const toggleFavorite = (product) => {
    const index = favorites.findIndex(fav => String(fav.id) === String(product.id));
    if (index > -1) {
        favorites.splice(index, 1);
        showFavoriteFeedback('<i class="fa-solid fa-heart-crack me-2"></i> Eliminado de tus deseos', 'alert-danger');
    } else {
        favorites.push(product);
        showFavoriteFeedback('<i class="fa-solid fa-heart me-2"></i> ¡Añadido a tus deseos!', 'alert-success');
    }
    updateFavoritesInLocalStorage();
};

const removeFavorite = (productId) => {
    favorites = favorites.filter(fav => String(fav.id) !== String(productId));
    updateFavoritesInLocalStorage();
};

const showHTML = () => {
    const $listFavorites = $('#favorites-container');
    const $counterFavorites = $('.counter-favorite');

    if ($listFavorites.length) {
        if (favorites.length === 0) {
            $listFavorites.html(`
                <div class="empty-wishlist text-center py-5 px-3">
                    <i class="fa-regular fa-heart fa-3x mb-3" style="color: #ccc; opacity: 0.6;"></i>
                    <h5 style="color: #555; font-weight: 600;">Tu lista está vacía</h5>
                    <p class="text-muted small">Parece que aún no has guardado tus productos favoritos.</p>
                    <a href="tienda.html" class="btn btn-outline-primary btn-sm mt-2" style="border-radius: 20px;">Ir a la tienda</a>
                </div>`);
        } else {
            const productsHtml = favorites.map(fav => `
                <div class="card-favorite animate__animated animate__fadeIn">
                    <img src="${fav.image}" alt="${fav.title}" class="favorite-image">
                    <div class="info-fav" style="flex-grow: 1; margin-left: 15px;">
                        <p class="title" style="color: #444; margin:0; font-size: 0.85em; font-weight: 600;">${fav.title}</p>
                        <p class="price" style="color: #85bb65; margin:0; font-weight: bold; font-size: 0.9em;">${fav.price}</p>
                    </div>
                    <button class="remove-favorite btn btn-light btn-sm" data-id="${fav.id}" style="border-radius: 50%;">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                </div>`).join('');
            
            $listFavorites.html('<div id="fav-result-message"></div>' + productsHtml);
            $listFavorites.find('.remove-favorite').on('click', function() {
                removeFavorite($(this).data('id'));
            });
        }
    }

    $counterFavorites.text(favorites.length).css('display', favorites.length > 0 ? 'flex' : 'none');

    $('.producto-index').each(function() {
        const id = String($(this).data('product-id'));
        const isFav = favorites.some(fav => String(fav.id) === id);
        $(this).find('#added-favorite').toggle(isFav);
        $(this).find('#favorite-regular').toggle(!isFav);
    });
};

/**** BLOQUE DE CONTROL DE SCROLL (NO MODIFICA LO ANTERIOR) *****/
$(document).ready(function() {
    const myOffcanvas = document.getElementById('offcanvasRight');

    // Cuando la lista de favoritos comienza a mostrarse
    myOffcanvas.addEventListener('show.bs.offcanvas', function () {
        $('body').css('overflow', 'hidden');
    });

    // Cuando la lista de favoritos se oculta completamente
    myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
        $('body').css('overflow', 'auto');
    });
});
/**** HASTA AQUI, LÓGICA DE FAVORITOS *****/


/*** 5. RENDERIZADO Y BÚSQUEDA (Optimizado) ****/
function renderizarProductos(listaAMostrar) {
    const $contenedor = $('#contenedor-productos');
    if (!$contenedor.length) return;

    const html = listaAMostrar.map(prod => `
        <div class="producto-index product product-item" category="${prod.categoria}" data-product-id="${prod.id}" style="opacity: 0; transform: translateY(20px);">
            <div class="img-wrapper">
                <img class="ppp" src="${prod.img}" alt="${prod.nombre}" loading="lazy">
            </div>
            <div class="price content-card-product" data-product-id="${prod.id}">
                <h3>${prod.nombre}</h3>
                <span class="precio">${prod.precio}</span>
                <div class="actions-wrapper">
                    <button type="button" class="btn-open-modal" id="icons" title="Ver detalles">
                        <span class="fas fa-eye eye" data-name="p-${prod.id}"></span>
                    </button>
                    <button class="favorite" id="icons" title="Añadir a deseos">
                        <span class="fa-regular fa-heart" id="favorite-regular"></span>
                        <span class="fa-solid fa-heart" id="added-favorite" style="display:none;"></span>
                    </button>
                </div>
            </div>
        </div>`).join('');

    $contenedor.html(html);
    
    // Animación de entrada escalonada
    $('.product-item').each(function(i) {
        $(this).delay(50 * i).animate({ 'opacity': 1 }, {
            step: function(now) {
                $(this).css('transform', `translateY(${20 * (1 - now)}px)`);
            },
            duration: 400
        });
    });

    showHTML();
    configurarEventosModales();
}

function search() {
    const filter = ($('#find').val() || '').toLowerCase().trim();
    const $resultMessage = $('#result-message');

    const coincidenPorNombre = productos.filter(p => 
        p.nombre.toLowerCase().includes(filter) || 
        p.categoria.toLowerCase().includes(filter)
    );
    
    const visibles = coincidenPorNombre.filter(p => 
        categoriaActual === 'all' || p.categoria === categoriaActual
    );

    renderizarProductos(visibles);
    actualizarContadores(coincidenPorNombre);

    if (filter) {
        let message, alertClass;
        const categoriasSugeridas = [...new Set(coincidenPorNombre.map(p => p.categoria))];

        if (visibles.length > 0) {
            alertClass = 'alert-success';
            // Mensaje más preciso y profesional
            message = `<i class="fa-solid fa-magnifying-glass me-2"></i> Hemos encontrado <strong>${visibles.length}</strong> coincidencia(s) para tu búsqueda.`;
        } else if (categoriasSugeridas.length > 0) {
            alertClass = 'alert-info'; // 'info' suele ser más amigable que 'warning' para sugerencias
            // Redacción orientada a ayudar al usuario
            const listaCats = categoriasSugeridas.join(', ');
            message = `<i class="fa-solid fa-circle-info me-2"></i> Sin resultados en la categoria actual, pero puedes encontrar coincidencias en: <strong>${listaCats}</strong>.`;
        } else {
            alertClass = 'alert-light border'; // Un estilo más sutil para "no resultados"
            // Evitamos palabras negativas como "error" o "nada"
            message = `<i class="fa-solid fa-circle-question me-2"></i> Lo sentimos, no encontramos resultados para "<strong>${filter}</strong>". Intenta con otros términos.`;
        }

        $resultMessage.html(`
            <div class="alert ${alertClass} alert-dismissible fade show animate__animated animate__fadeInUp" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
            </div>`);

        $resultMessage.find('.btn-close').on('click', () => { 
            $('#find').val(''); 
            search(); 
        });
    } else {
        $resultMessage.empty();
    }
}
/*** HASTA AQUI, RENDERIZADO Y BÚSQUEDA ****/



/**** 6. MODALES Y ZOOM (Profesional) ****/
function generarModalesHTML() {
    // Definimos el número de teléfono como constante para facilitar cambios
    const PHONE_NUMBER = "584125869719";
    const SITE_URL = window.location.href; // URL actual para que WhatsApp genere la vista previa

    const html = productos.map(prod => {
        // Formateamos el mensaje con la lógica original pero más profesional
        const mensajeWa = 
            `✨ *Consulta de Producto - Ashley Beauty* ✨\n\n` +
            `Hola, me gustaría información sobre:\n\n` +
            `🧩 *Producto:* ${prod.nombre}\n` +
            `💰 *Precio:* ${prod.precio}\n` +
            `🖼️ *Referencia:* ${SITE_URL}\n\n` + // Esto ayuda a que WA jale la imagen del sitio
            `¿Tienen disponibilidad? ¡Gracias!`;

        const urlWa = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(mensajeWa)}`;

        // Usamos Template Literals para un HTML más limpio
        return `
            <div class="preview" data-target="p-${prod.id}">
                <i class="fas fa-times close-icon" aria-label="Cerrar"></i>
                
                <div class="img-container">
                    <img src="${prod.img}" alt="${prod.nombre}" loading="lazy">
                </div>

                <h3>${prod.nombre}</h3>
                
                <p class="desc-modal">
                    ${prod.desc ? prod.desc : "Consulta todos los detalles directamente con nuestras asesoras por WhatsApp."}
                </p>
                
                <div class="price">${prod.precio}</div>

                <div class="buttons">
                    <a class="cart btn-whatsapp-track" 
                       href="${urlWa}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       data-product-name="${prod.nombre}">
                        <i class="fab fa-whatsapp whatsapp-icon-fix"></i>
                        <span>Consultar ahora</span>
                    </a>
                </div>
            </div>`;
    }).join('');

    // Inyección segura en el DOM
    const container = $('.products-preview');
    if (container.length) {
        container.html(html);
        // Aseguramos que la inicialización del zoom ocurra después de renderizar
        if (typeof initZoomProduct === "function") {
            initZoomProduct();
        }
    }
}


function configurarEventosModales() {
    const $previewContainer = $('.products-preview');
    
    $('.btn-open-modal').off('click').on('click', function() {
        const target = $(this).find('.eye').attr('data-name');
        $previewContainer.fadeIn(300).addClass('active').css('display', 'flex');
        $(`.preview[data-target="${target}"]`).addClass('active animate__animated animate__zoomIn');
        $('body').addClass('no-scroll');
    });

    $('.fa-times, .products-preview').off('click').on('click', function(e) {
        if (e.target !== this && !$(e.target).hasClass('fa-times')) return;
        $previewContainer.fadeOut(300, function() {
            $(this).removeClass('active');
            $('.preview').removeClass('active animate__animated animate__zoomIn');
        });
        $('body').removeClass('no-scroll');
        resetAllZooms();
    });
}

function initZoomProduct() {
    const containers = document.querySelectorAll('.img-container');

    containers.forEach(container => {
        const img = container.querySelector('img');
        let scale = 1;
        const MIN_SCALE = 1;
        const MAX_SCALE = 4;
        let initialDistance = 0;

        // Función para mover el punto de enfoque según el mouse
        const moveFocus = (e) => {
            if (scale > 1) {
                const rect = container.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                img.style.transformOrigin = `${x}% ${y}%`;
            }
        };

        // Evento para mover la imagen cuando ya hay zoom aplicado
        container.addEventListener('mousemove', moveFocus);

        // Escritorio: Scroll zoom centrado en cursor
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY * -0.01;
            scale = Math.min(Math.max(MIN_SCALE, scale + delta), MAX_SCALE);

            moveFocus(e); // Actualiza el punto de vista antes de escalar
            img.style.transform = `scale(${scale})`;
        }, { passive: false });

        // Móvil: Pinch-to-zoom
        container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialDistance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
            }
        });

        container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                const delta = (currentDistance - initialDistance) * 0.01;
                scale = Math.min(Math.max(MIN_SCALE, scale + delta), MAX_SCALE);
                img.style.transform = `scale(${scale})`;
                initialDistance = currentDistance;
            }
        }, { passive: false });

        // Reset al salir
        container.addEventListener('mouseleave', () => {
            scale = 1;
            img.style.transform = `scale(1)`;
            img.style.transformOrigin = `center center`;
        });
    });
}

function resetAllZooms() {
    $('.img-container img').css({ 'transform': 'scale(1)', 'transform-origin': 'center center' });
}
/**** HASTA AQUI, MODALES Y LÓGICA DE ZOOM ****/


/***** 7. INICIALIZACIÓN GLOBAL ******/
$(document).ready(function() {
    // Pipeline de carga
    mezclarProductos(productos);
    generarModalesHTML();
    renderizarProductos(productos);
    actualizarContadores();

    // Event Delegation para mejor rendimiento
    $(document).on('click', '.btn-whatsapp-track', function() {
        const nombreProducto = $(this).data('product-name');
        if (typeof gtag === 'function') {
            gtag('event', 'click_whatsapp', { 'product_name': nombreProducto });
        }
    });

    $(document).on('click', '.favorite', function(e) {
        e.preventDefault();
        const $card = $(this).closest('.producto-index');
        toggleFavorite({
            id: $card.data('product-id'),
            title: $card.find('h3').text(),
            price: $card.find('.precio').text(),
            image: $card.find('img.ppp').attr('src')
        });
    });

    $('.category_item').click(function(e) {
        e.preventDefault();
        $('.category_item').removeClass('ct_item-active');
        $(this).addClass('ct_item-active');
        categoriaActual = $(this).attr('category');
        
        $('.product-item').css({'opacity': '0', 'transform': 'scale(0.9)'});
        setTimeout(search, 300);
    });

    // Debounce simple para la búsqueda
    let searchTimeout;
    $('#find').on('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(search, 300);
    });

    $('#button-header-favorite').click(() => $('.container-list-favorites').addClass('show'));
    $('#btn-close').click(() => $('.container-list-favorites').removeClass('show'));
});
/***** HASTA AQUI, INICIALIZACIÓN GLOBAL ******/


/*********   *********/
function verificarImagenes() {
    productos.forEach(prod => {
        const img = new Image();
        img.src = prod.img;
        img.onerror = () => console.error(`Error: No se encontró la imagen del producto ID: ${prod.id} en la ruta: ${prod.img}`);
    });
}

// Ejecútala una vez al cargar la página
verificarImagenes();
/*********   *********/





/***** SLIDER ******/
const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {
    let counter = 0;
    const products = slider.querySelectorAll(".product");
    const btnLeft = slider.querySelector(".left");
    const btnRight = slider.querySelector(".right");

    function getVisibleItems() {
        // Calculamos cuántos productos caben en el contenedor actual
        const containerWidth = slider.querySelector(".container-products")?.offsetWidth || slider.offsetWidth;
        const itemWidth = products[0].offsetWidth + 15; // 15 es el gap/margin aproximado
        return Math.floor(containerWidth / itemWidth);
    }

    function scroll() {
        // Usamos el ancho real del primer producto para el movimiento
        const itemWidth = products[0].clientWidth + 20; // Ajusta el 20 al margen real (gap)
        products.forEach((item) => {
            item.style.transform = `translateX(-${counter * itemWidth}px)`;
        });
    }

    btnRight.addEventListener("click", () => {
        const visibleItems = getVisibleItems();
        // El límite ahora es el total menos los que ya se ven en pantalla
        const maxScroll = products.length - visibleItems;

        if (counter < maxScroll) {
            counter++;
        } else {
            counter = 0; // Reinicia al inicio
        }
        scroll();
    });

    btnLeft.addEventListener("click", () => {
        const visibleItems = getVisibleItems();
        const maxScroll = products.length - visibleItems;

        if (counter > 0) {
            counter--;
        } else {
            counter = maxScroll; // Salta al final correctamente
        }
        scroll();
    });

    // Resetear posición si cambian el tamaño de la pantalla (de horizontal a vertical)
    window.addEventListener("resize", () => {
        counter = 0;
        scroll();
    });
});


$(document).ready(function() {
    // 1. Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    let catDesdeUrl = urlParams.get('cat');

    // 2. Si existe el parámetro 'cat', filtrar
    if (catDesdeUrl) {
        // Normalizamos: pasamos a minúsculas para comparar fácil
        let categoriaFiltrar = decodeURIComponent(catDesdeUrl).toLowerCase();

        // AJUSTE ESPECIAL: Si el parámetro es "bolsos", lo direccionamos a la constante real
        if (categoriaFiltrar === 'bolsos') {
            categoriaFiltrar = "Bolsos & Carteras";
        }

        // Actualizamos la variable global
        if (typeof categoriaActual !== 'undefined') {
            categoriaActual = categoriaFiltrar;
        }

        // 3. Lógica de marcado visual
        // Quitamos la clase activa de TODOS los botones
        $('.category_item').removeClass('ct_item-active');
        
        // Marcamos el botón correspondiente (buscando tanto el nombre original como el ajustado)
        $(`.category_item[category="${categoriaFiltrar}"]`).addClass('ct_item-active');

        // 4. Ejecutar el filtrado del array
        const productosFiltrados = productos.filter(p => 
            p.categoria.toLowerCase() === categoriaFiltrar.toLowerCase()
        );

        // 5. Renderizar resultados
        if (productosFiltrados.length > 0) {
            renderizarProductos(productosFiltrados);
        } else {
            // Si no hay productos, mostramos todos pero mantenemos el botón marcado
            renderizarProductos(productos);
        }
        
    } else {
        // Si no hay parámetro, "Todo" debe ser el único activo
        $('.category_item').removeClass('ct_item-active');
        $('.category_item[category="all"]').addClass('ct_item-active');
        renderizarProductos(productos);
    }
});
/***** HASTA AQUI ----- SLIDER ******/




/******** BOTON HACIA ARRIBA   ********/
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    // Usamos scrollY que es el estándar moderno
    if (window.scrollY > 200) { 
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});

// Opcional: Forzar el scroll suave al hacer clic desde JS
toTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
/********  HASTA AQUI BOTON HACIA ARRIBA   ********/

