const TITLES = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Dark Knight',
  'The Godfather Part II',
  '12 Angry Men',
  'Schindler\'s List',
  'The Lord of the Rings: The Return of the King',
  'Pulp Fiction',
  'The Lord of the Rings: The Fellowship of the Ring',
  'Forrest Gump'
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const AGE_RATINGS = [0, 13, 17, 18];

const DIRECTORS = [
  'Frank Darabont',
  'Francis Ford Coppola',
  'Christopher Nolan',
  'Sidney Lumet',
  'Steven Spielberg',
  'Peter Jackson',
  'Quentin Tarantino',
  'Robert Zemeckis'
];

const WRITERS = [
  'Stephen King',
  'Frank Darabont',
  'Mario Puzo',
  'Francis Ford Coppola',
  'Jonathan Nolan',
  'Christopher Nolan',
  'David S. Goyer',
  'Reginald Rose',
  'Thomas Keneally',
  'Steven Zaillian',
  'J.R.R. Tolkien',
  'Fran Walsh',
  'Philippa Boyens',
  'Quentin Tarantino',
  'Roger Avary',
  'Winston Groom',
  'Eric Roth'
];

const ACTORS = [
  'Tim Robbins',
  'Morgan Freeman',
  'Bob Gunton',
  'Marlon Brando',
  'Al Pacino',
  'James Caan',
  'Christian Bale',
  'Heath Ledger',
  'Aaron Eckhart',
  'Robert De Niro',
  'Robert Duvall',
  'Henry Fonda',
  'Lee J. Cobb',
  'Martin Balsam',
  'Liam Neeson',
  'Ralph Fiennes',
  'Ben Kingsley',
  'Elijah Wood',
  'Viggo Mortensen',
  'Ian McKellen',
  'John Travolta',
  'Uma Thurman',
  'Samuel L. Jackson',
  'Orlando Bloom',
  'Tom Hanks',
  'Robin Wright',
  'Gary Sinise'
];

const СOUNTRIES = [
  'United States',
  'United Kingdom',
  'New Zealand',
  'Finland',
  'Germany',
  'France'
];

const GENRES = [
  'Drama',
  'Crime',
  'Action',
  'Biography',
  'History',
  'Adventure',
  'Romance'
];

const DESCRIPTIONS = [
  'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
  'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
  'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.',
  'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
  'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
  'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
  'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
  'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.'
];

const FIRST_NAMES = [
  'Gloria',
  'Faye',
  'Ivory',
  'Wynne',
  'Donald',
  'Tabitha',
  'Vanessa',
  'Alan',
  'Ted',
  'Warwick',
  'Manfred',
  'Sarah',
  'Walter',
  'Kenneth',
  'Vernon'
];

const SECOND_NAMES = [
  'Stone',
  'Hawkins',
  'Burke',
  'Simmons',
  'Boyd',
  'Hines',
  'Montgomery',
  'Simonds',
  'Read',
  'Hurlbutt',
  'Alvarado',
  'Reynolds',
  'Pierpoint',
  'Crawford',
  'Nicholls',
  'Berry'
];

const COMMENTS = [
  'going to need every single one of you to RUN to the theater to see this when its playing near you. just the most poignant little film that made me cry so much. i am very happy it exists and will be rewatching it one million more times when i am sad. and thats all i know for sure',
  'ZZZZZZZZZZzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz \n sorry nana connie was on the keyboard',
  'Yeah the flying is amazing and it has the most thrilling action finale Ive seen in a blockbuster in years but honestly one of the most exciting things about this movie is that Tom Cruise finally made a movie that acknowledges hes getting older',
  'Miles and Glen didnt kiss at the end so thats why i give it 4 stars.',
  'Exquisite piece of dad movie filmmaking',
  'During the screening of TOP GUN: MAVERICK, a man in his fifties yelled out in what sounded like a fit of pure ecstasy during one of the aerial stunts. He sounded like he was being raptured. \n I cannot wait for the dads of the world to experience this movie this summer.',
  'HOLY MOLY I LOVE HOT MEN',
  'Jesus? What the fuck.',
  'I know when that hotline bling that could only mean one thing',
  'My screen debut! \n Just kidding, sort of, I was an extra in this and its the first time Ive ever seen myself on screen and it was weird and .000000000002 seconds but Im going to choose to celebrate it. \n What a scary, enthralling, perfect movie.',
  'why was the grabber so fun with his funky masks and balloons',
  'redownloading duolingo to pick back up on my french lessons with the little green owl as we SPEAK!',
  'you know I was skeptical that mrs harris would be going to paris but then she went to paris and I lost my shit',
  'So stupid and so sweet. Lesley Manville made me cry 3 times. The outfit the French hunk is wearing on the Seine is the hottest thing Ive ever seen, my dream clothes. When the mean, rich French bitch did something horrendously bitchy to Mrs. Harris, a septuagenarian (octogenarian?) behind me grumbled, “What a bitch!” Les Mrsrables.',
  'rebecca hall is really in her reputation era',
  'Imagine being the poor intern that has to stand there and listen to Rebecca Halls demented eight minute monologue and then go home and pretend everythings fine',
  'Oh I was so into this - wickedly good, nasty performances from Rebecca Hall and Tim Roth but I also loved how the script is just constantly fucking with someone and that seesaws between us and them all the time. Much to be said on gaslighting and mothering and protecting and leaving but its also just such horrible fun to watch without thinking about any of it',
  'Resurrection is not to be enjoyed but rather endured. Infused with a tormenting ambiguity, Andrew Semans’ film is an unflinching tale of trauma and haunted memories, and though it edges close to narrative implosion, Rebecca Halls intensely committed performance prevents the piece from becoming another abstract thriller of little substance.',
  'Jordan Peele puts his whole bussy in his movies and i love him for that',
  'tfw youre so hungry you could eat a horse'
];

export {
  TITLES,
  POSTERS,
  AGE_RATINGS,
  DIRECTORS,
  WRITERS,
  ACTORS,
  СOUNTRIES,
  GENRES,
  DESCRIPTIONS,
  FIRST_NAMES,
  SECOND_NAMES,
  COMMENTS
};
