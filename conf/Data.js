import { pl1, pl11, pl2, pl3, pl4, pl5 } from '../assets';

export const WorldTouristPlaces = [
  {
    id: 1,
    Name: 'Sydney Opera House',
    Coordinates: { latitude: -33.8568, longitude: 151.2153 },
    PlaceImage: [pl11, pl11, pl2, pl3, pl4, pl5],
    Location: 'Sydney, Australia',
    Description: 'The Sydney Opera House is a multi-venue performing arts centre in Sydney, Australia.',
    CostOfExpenses: '$150 - $450',
    Duration: '2 hours',
    Rating: 4.8,
    Reviews: [
      { id: 1, name: 'Alice', review: 'Amazing architecture and great shows.', rating: 5 },
      { id: 2, name: 'Bob', review: 'A must-visit place in Sydney.', rating: 4.7 }
    ],
    PriceRange: { child: 12, adult: 52.00 },
    Attraction: 'Opera, architecture, and views',
    WhyVisit: [
      { id: 1, content: 'Iconic architectural marvel.' },
      { id: 2, content: 'Beautiful harbor views.' }
    ],
    WhatsIncluded: [
      { id: 1, content: 'Guided tour' },
      { id: 2, content: 'Entry to performance' }
    ],
    WhatsNotIncluded: [
      { id: 1, content: 'Food and drinks' }
    ],
    Accessibility: [
      { id: 1, content: 'Wheelchair accessible' }
    ],
    HealthAndSafety: [
      { id: 1, content: 'Regular sanitization' }
    ],
    Restrictions: [
      { id: 1, content: 'No smoking' }
    ],
    LanguagesSpoken: [
      { id: 1, content: 'English' },
      { id: 2, content: 'Spanish' }
    ],
    AdditionalInformation: [
      { id: 1, content: 'Check the schedule for performances.' }
    ],
    WeatherDetails: 'Mild weather',
    Hotels: [
      { id: 1, name: 'Hotel Sydney', location: 'Sydney', rating: 4.5, priceRange: '$150 - $300', amenities: ['Wi-Fi', 'Room Service'] }
    ],
    TourGuides: [
      { id: 1, name: 'John Doe', rating: 4.7 }
    ]
  },
  {
    id: 2,
    Name: 'Eiffel Tower',
    Coordinates: { latitude: 48.8584, longitude: 2.2945 },
    PlaceImage: [pl4, pl11, pl1, pl2, pl3, pl5],
    Location: 'Paris, France',
    Description: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.',
    CostOfExpenses: '$250 - $550',
    Duration: '3 hours',
    Rating: 4.7,
    Reviews: [
      { id: 1, name: 'Charlie', review: 'Breathtaking views of Paris.', rating: 5 },
      { id: 2, name: 'Dana', review: 'An iconic landmark.', rating: 4.5 }
    ],
    PriceRange: { child: 25.00, adult: 50.00 },
    Attraction: 'Sightseeing, dining, and photography',
    WhyVisit: [
      { id: 1, content: 'Iconic symbol of Paris.' },
      { id: 2, content: 'Stunning city views.' }
    ],
    WhatsIncluded: [
      { id: 1, content: 'Access to observation decks' }
    ],
    WhatsNotIncluded: [
      { id: 1, content: 'Meals' }
    ],
    Accessibility: [
      { id: 1, content: 'Elevator access' }
    ],
    HealthAndSafety: [
      { id: 1, content: 'Security checks' }
    ],
    Restrictions: [
      { id: 1, content: 'No large bags' }
    ],
    LanguagesSpoken: [
      { id: 1, content: 'French' },
      { id: 2, content: 'English' }
    ],
    AdditionalInformation: [
      { id: 1, content: 'Buy tickets in advance to avoid queues.' }
    ],
    WeatherDetails: 'Mild weather',
    Hotels: [
      { id: 1, name: 'Hotel Paris', location: 'Paris', rating: 4.6, priceRange: '$200 - $400', amenities: ['Wi-Fi', 'Room Service'] },
      {
        id: 2, name: 'Hotel Luxury Paris', location: 'Paris', rating: 4.8, priceRange: '$350 - $600', amenities: ['Wi-Fi', 'Room Service', 'Free Parking']
      },
      {
        id: 3, name: 'Hotel Paris Premium', location: 'Paris', rating: 3.9, priceRange: '$400 - $700', amenities: ['Wi-Fi', 'Room Service', 'Free Parking']
      },
      {
        id: 4, name: 'Hotel Paris Deluxe', location: 'Paris', rating: 4.9, priceRange: '$450 - $750', amenities: ['Wi-Fi', 'Room Service', 'Free Parking']
      }
    ],
    TourGuides: [
      { id: 1, name: 'Marie Curie', rating: 4.8 }
    ]
  },
  {
    id: 3,
    Name: 'Great Wall of China',
    Coordinates: { latitude: 40.4319, longitude: 116.5704 },
    PlaceImage: [pl5, pl11, pl3, pl2, pl4],
    Location: 'Beijing, China',
    Description: 'The Great Wall of China is a series of fortifications that were built across the historical northern borders of China.',
    CostOfExpenses: '$50 - $150',
    Duration: '6 hours',
    Rating: 4.8,
    Reviews: [
      { id: 1, name: 'Eve', review: 'A wonder of ancient engineering.', rating: 5 },
      { id: 2, name: 'Frank', review: 'Incredible views and history.', rating: 4.8 }
    ],
    PriceRange: { child: 18, adult: 33.00 },
    Attraction: 'Hiking, history, and photography',
    WhyVisit: [
      { id: 1, content: 'One of the Seven Wonders of the World.' },
      { id: 2, content: 'Rich historical significance.' }
    ],
    WhatsIncluded: [
      { id: 1, content: 'Guided tours' }
    ],
    WhatsNotIncluded: [
      { id: 1, content: 'Meals' }
    ],
    Accessibility: [
      { id: 1, content: 'Limited accessibility' }
    ],
    HealthAndSafety: [
      { id: 1, content: 'Regular maintenance' }
    ],
    Restrictions: [
      { id: 1, content: 'No littering' }
    ],
    LanguagesSpoken: [
      { id: 1, content: 'Chinese' },
      { id: 2, content: 'English' }
    ],
    AdditionalInformation: [
      { id: 1, content: 'Wear comfortable hiking shoes.' }
    ],
    WeatherDetails: 'Variable weather',
    Hotels: [
      { id: 1, name: 'Hotel Beijing', location: 'Beijing', rating: 4.7, priceRange: '$100 - $300', amenities: ['Wi-Fi', 'Room Service'] }
    ],
    TourGuides: [
      { id: 1, name: 'Li Wei', rating: 4.9 }
    ]
  },
  {
    id: 4,
    Name: 'Statue of Liberty',
    Coordinates: { latitude: 40.6892, longitude: -74.0445 },
    PlaceImage: [pl2, pl3, pl4, pl5, pl1, pl11],
    Location: 'New York, USA',
    Description: 'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City.',
    CostOfExpenses: '$100 - $500',
    Duration: '4 hours',
    Rating: 4.7,
    Reviews: [
      { id: 1, name: 'Grace', review: 'A symbol of freedom and democracy.', rating: 5 },
      { id: 2, name: 'Henry', review: 'Great views of NYC.', rating: 4.6 }
    ],
    PriceRange: { child: 10.22, adult: 75.34 },
    Attraction: 'Sightseeing, history, and photography',
    WhyVisit: [
      { id: 1, content: 'Iconic symbol of freedom.' },
      { id: 2, content: 'Amazing views of New York City.' }
    ],
    WhatsIncluded: [
      { id: 1, content: 'Ferry ride' }
    ],
    WhatsNotIncluded: [
      { id: 1, content: 'Food and drinks' }
    ],
    Accessibility: [
      { id: 1, content: 'Wheelchair accessible' }
    ],
    HealthAndSafety: [
      { id: 1, content: 'Regular sanitization' }
    ],
    Restrictions: [
      { id: 1, content: 'No large bags' }
    ],
    LanguagesSpoken: [
      { id: 1, content: 'English' },
      { id: 2, content: 'Spanish' }
    ],
    AdditionalInformation: [
      { id: 1, content: 'Book tickets in advance.' }
    ],
    WeatherDetails: 'Mild weather',
    Hotels: [
      { id: 1, name: 'Hotel Liberty', location: 'New York', rating: 4.5, priceRange: '$200 - $400', amenities: ['Wi-Fi', 'Room Service'] }
    ],
    TourGuides: [
      { id: 1, name: 'Emma Brown', rating: 4.8 }
    ]
  },
  {
    id: 5,
    Name: 'Taj Mahal',
    Coordinates: { latitude: 27.1751, longitude: 78.0421 },
    PlaceImage: [pl3, pl4, pl5, pl2, pl3],
    Location: 'Agra, India',
    Description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.',
    CostOfExpenses: '$10 - $50',
    Duration: '3 hours',
    Rating: 4.9,
    Reviews: [
      { id: 1, name: 'user', review: 'A stunning symbol of love and architectural marvel.', rating: 5 },
      { id: 2, name: 'user', review: 'The most beautiful building I have ever seen.', rating: 4.9 }
    ],
    PriceRange: { child: 28.34, adult: 92.40 },
    Attraction: 'Architecture, history, and photography',
    WhyVisit: [
      { id: 1, content: 'One of the Seven Wonders of the World.' },
      { id: 2, content: 'Exquisite architectural design.' },
      { id: 3, content: 'Historical and cultural significance.' }
    ],
    WhatsIncluded: [
      { id: 1, content: 'Entry ticket to the Taj Mahal' },
      { id: 2, content: 'Guided tours' },
      { id: 3, content: 'Access to the gardens' }
    ],
    WhatsNotIncluded: [
      { id: 1, content: 'Meals' },
      { id: 2, content: 'Souvenirs' }
    ],
    Accessibility: [
      { id: 1, content: 'Wheelchair accessible' }
    ],
    HealthAndSafety: [
      { id: 1, content: 'Security screening required' }
    ],
    Restrictions: [
      { id: 1, content: 'No photography inside the main mausoleum' },
      { id: 2, content: 'No food or drinks allowed inside' }
    ],
    LanguagesSpoken: [
      { id: 1, content: 'Hindi' },
      { id: 2, content: 'English' }
    ],
    AdditionalInformation: [
      { id: 1, content: 'Visit early in the morning to avoid crowds.' },
      { id: 2, content: 'Respect the site and its significance.' }
    ],
    WeatherDetails: 'Weather',
    Hotels: [
      { id: 1, name: 'Hotel 1', location: 'Hotel 1, Agra', rating: 4.6, priceRange: '$500 - $1,500', amenities: ['Free Wi-Fi', '24-hour room service', 'Restaurant', 'Bar'] },
      { id: 2, name: 'Hotel 2', location: 'Hotel 2, Agra', rating: 4.8, priceRange: '$800 - $2,000', amenities: ['Free Wi-Fi', '24-hour room service', 'Restaurant', 'Bar', 'Parking'] }
    ],
    TourGuides: [
      { id: 1, name: 'Ravi Kumar', rating: 4.9 },
      { id: 2, name: 'Priya Sharma', rating: 4.8 }
    ]
  }
];

export const accommodations=[
  {
    "id": "b1c64e0e-84f6-4f25-9fc9-920a0d8f5a5d",
    "name": "The Ritz-Carlton, Tokyo",
    "images": [
      "https://example.com/ritz-tokyo-1.jpg",
      "https://example.com/ritz-tokyo-2.jpg"
    ],
    "coordinates": {
      "latitude": 35.6655,
      "longitude": 139.7300
    },
    "email": "info@ritzcarlton-tokyo.com",
    "website": "https://www.ritzcarlton.com/en/hotels/japan/tokyo",
    "address": "Tokyo Midtown 9-7-1 Akasaka Minato-ku, Tokyo 107-6245 Japan",
    "contact": "+81 3-3423-8000"
  },
  {
    "id": "2c3d8a2a-8a25-4b5f-9b39-0c6713a5ef57",
    "name": "Four Seasons Resort Bali at Sayan",
    "images": [
      "https://example.com/fourseasons-bali-1.jpg",
      "https://example.com/fourseasons-bali-2.jpg"
    ],
    "coordinates": {
      "latitude": -8.5060,
      "longitude": 115.2536
    },
    "email": "contactus.bali@fourseasons.com",
    "website": "https://www.fourseasons.com/sayan/",
    "address": "Sayan, Ubud, Gianyar, Bali 80571, Indonesia",
    "contact": "+62 361 977577"
  },
  {
    "id": "3d5e1d5b-9b7e-4fa3-a7eb-8e4d7baf7699",
    "name": "Burj Al Arab Jumeirah",
    "images": [
      "https://example.com/burjalarab-1.jpg",
      "https://example.com/burjalarab-2.jpg"
    ],
    "coordinates": {
      "latitude": 25.1412,
      "longitude": 55.1853
    },
    "email": "reservations@jumeirah.com",
    "website": "https://www.jumeirah.com/en/stay/dubai/burj-al-arab-jumeirah",
    "address": "Jumeirah St, Dubai, United Arab Emirates",
    "contact": "+971 4 301 7777"
  },
  {
    "id": "4e7f6d5c-87df-4f5e-8ab9-d0a12d8f7a8e",
    "name": "The Plaza, New York City",
    "images": [
      "https://example.com/plaza-nyc-1.jpg",
      "https://example.com/plaza-nyc-2.jpg"
    ],
    "coordinates": {
      "latitude": 40.7645,
      "longitude": -73.9744
    },
    "email": "info@theplazany.com",
    "website": "https://www.fairmont.com/the-plaza-new-york/",
    "address": "Fifth Avenue at Central Park South, New York, NY 10019, USA",
    "contact": "+1 212-759-3000"
  },
  {
    "id": "5b6f3d7a-8a7f-4f2f-9b9b-1a123d7b7c9e",
    "name": "Shangri-La Hotel, Paris",
    "images": [
      "https://example.com/shangri-la-paris-1.jpg",
      "https://example.com/shangri-la-paris-2.jpg"
    ],
    "coordinates": {
      "latitude": 48.8625,
      "longitude": 2.2923
    },
    "email": "slpr@shangri-la.com",
    "website": "https://www.shangri-la.com/paris/shangrila/",
    "address": "10 Avenue d'Iéna, 75116 Paris, France",
    "contact": "+33 1 53 67 19 98"
  },
  {
    "id": "6a7d4e8c-9a8b-4f2a-8d7f-2c7d4e8c5b8e",
    "name": "The Oberoi Amarvilas, Agra",
    "images": [
      "https://example.com/oberoi-agra-1.jpg",
      "https://example.com/oberoi-agra-2.jpg"
    ],
    "coordinates": {
      "latitude": 27.1710,
      "longitude": 78.0421
    },
    "email": "reservations@oberoigroup.com",
    "website": "https://www.oberoihotels.com/hotels-in-agra-amarvilas-resort/",
    "address": "Taj East Gate Rd, Paktola, Tajganj, Agra, Uttar Pradesh 282001, India",
    "contact": "+91 562 2231515"
  },
  {
    "id": "7c8d5e8f-9b8d-4b7f-9c7f-3c8d5e7a8c9f",
    "name": "Mandarin Oriental, Bangkok",
    "images": [
      "https://example.com/mandarin-bangkok-1.jpg",
      "https://example.com/mandarin-bangkok-2.jpg"
    ],
    "coordinates": {
      "latitude": 13.7239,
      "longitude": 100.5147
    },
    "email": "mobkk-reservations@mohg.com",
    "website": "https://www.mandarinoriental.com/bangkok/chao-phraya-river/luxury-hotel",
    "address": "48 Oriental Avenue, Bangkok 10500, Thailand",
    "contact": "+66 2 659 9000"
  },
  {
    "id": "8e9f7d8a-8b7e-4b7f-9c8f-4d7b9f7e8c8e",
    "name": "Raffles Hotel, Singapore",
    "images": [
      "https://example.com/raffles-singapore-1.jpg",
      "https://example.com/raffles-singapore-2.jpg"
    ],
    "coordinates": {
      "latitude": 1.2945,
      "longitude": 103.8532
    },
    "email": "singapore@raffles.com",
    "website": "https://www.raffles.com/singapore/",
    "address": "1 Beach Rd, Singapore 189673",
    "contact": "+65 6337 1886"
  },
  {
    "id": "9d8a7e9f-8c8d-4f7f-9d8e-5d8a7e8c9d8f",
    "name": "The Peninsula Hong Kong",
    "images": [
      "https://example.com/peninsula-hongkong-1.jpg",
      "https://example.com/peninsula-hongkong-2.jpg"
    ],
    "coordinates": {
      "latitude": 22.2950,
      "longitude": 114.1722
    },
    "email": "phk@peninsula.com",
    "website": "https://www.peninsula.com/en/hong-kong",
    "address": "Salisbury Rd, Tsim Sha Tsui, Hong Kong",
    "contact": "+852 2920 2888"
  },
  {
    "id": "1f9e8c9d-8e8f-4f7f-9e8d-6d9f8e7d9c8e",
    "name": "The Langham, London",
    "images": [
      "https://example.com/langham-london-1.jpg",
      "https://example.com/langham-london-2.jpg"
    ],
    "coordinates": {
      "latitude": 51.5176,
      "longitude": -0.1438
    },
    "email": "lon.info@langhamhotels.com",
    "website": "https://www.langhamhotels.com/en/the-langham/london/",
    "address": "1C Portland Pl, Marylebone, London W1B 1JA, United Kingdom",
    "contact": "+44 20 7636 1000"
  },
  {
    "id": "2a3b4c5d-9e7f-4f8e-9d7e-7a3b4c5d6e7f",
    "name": "Taj Lake Palace, Udaipur",
    "images": [
      "https://example.com/taj-lake-palace-1.jpg",
      "https://example.com/taj-lake-palace-2.jpg"
    ],
    "coordinates": {
      "latitude": 24.5786,
      "longitude": 73.6803
    },
    "email": "reservations@tajhotels.com",
    "website": "https://www.tajhotels.com/en-in/taj/taj-lake-palace-udaipur/",
    "address": "Pichola, Udaipur, Rajasthan 313001, India",
    "contact": "+91 294 2428800"
  },
  {
    "id": "3d4e5f6a-8b7c-4f9f-9e8f-8d4e5f6a7b9e",
    "name": "Al Maha, a Luxury Collection Desert Resort & Spa, Dubai",
    "images": [
      "https://example.com/almaha-dubai-1.jpg",
      "https://example.com/almaha-dubai-2.jpg"
    ],
    "coordinates": {
      "latitude": 24.8256,
      "longitude": 55.6626
    },
    "email": "almaha@luxurycollection.com",
    "website": "https://www.marriott.com/hotels/travel/dxbal-al-maha-a-luxury-collection-desert-resort-and-spa-dubai/",
    "address": "Dubai Desert Conservation Reserve, Dubai, United Arab Emirates",
    "contact": "+971 4 832 9900"
  },
  {
    "id": "4f5e6a7b-9c8d-4f8e-9f8d-9e5f6a7b8c9e",
    "name": "The Savoy, London",
    "images": [
      "https://example.com/savoy-london-1.jpg",
      "https://example.com/savoy-london-2.jpg"
    ],
    "coordinates": {
      "latitude": 51.5107,
      "longitude": -0.1205
    },
    "email": "savoy@fairmont.com",
    "website": "https://www.thesavoylondon.com/",
    "address": "Strand, London WC2R 0EZ, United Kingdom",
    "contact": "+44 20 7836 4343"
  },
]

export const Flights = [
  {
    "flightNumber": "AA123",
    "airline": "American Airlines",
    "departureAirport": "JFK",
    "arrivalAirport": "LAX",
    "departureTime": "2024-09-01T08:00:00",
    "arrivalTime": "2024-09-01T11:00:00",
    "duration": "6h 00m",
    "price": 350.00,
    "currency": "USD",
    "stops": 0,
    "aircraft": "Boeing 777",
    "class": "Economy",
    "seatAvailability": 12
  },
  {
    "flightNumber": "BA456",
    "airline": "British Airways",
    "departureAirport": "LHR",
    "arrivalAirport": "JFK",
    "departureTime": "2024-09-01T14:00:00",
    "arrivalTime": "2024-09-01T17:00:00",
    "duration": "7h 00m",
    "price": 450.00,
    "currency": "USD",
    "stops": 1,
    "stopoverAirport": "BOS",
    "aircraft": "Airbus A380",
    "class": "Business",
    "seatAvailability": 5
  },
  {
    "flightNumber": "DL789",
    "airline": "Delta Airlines",
    "departureAirport": "ATL",
    "arrivalAirport": "MIA",
    "departureTime": "2024-09-01T09:30:00",
    "arrivalTime": "2024-09-01T11:45:00",
    "duration": "2h 15m",
    "price": 200.00,
    "currency": "USD",
    "stops": 0,
    "aircraft": "Boeing 737",
    "class": "First Class",
    "seatAvailability": 8
  },
  {
    "flightNumber": "EK901",
    "airline": "Emirates",
    "departureAirport": "DXB",
    "arrivalAirport": "SYD",
    "departureTime": "2024-09-01T22:00:00",
    "arrivalTime": "2024-09-02T08:00:00",
    "duration": "14h 00m",
    "price": 1200.00,
    "currency": "USD",
    "stops": 0,
    "aircraft": "Boeing 777",
    "class": "Economy",
    "seatAvailability": 20
  },
  {
    "flightNumber": "LH567",
    "airline": "Lufthansa",
    "departureAirport": "FRA",
    "arrivalAirport": "JNB",
    "departureTime": "2024-09-01T20:00:00",
    "arrivalTime": "2024-09-02T06:00:00",
    "duration": "10h 00m",
    "price": 900.00,
    "currency": "EUR",
    "stops": 1,
    "stopoverAirport": "ZRH",
    "aircraft": "Airbus A340",
    "class": "Premium Economy",
    "seatAvailability": 10
  }
]

export const Notifications = [
  {
    id: 1,
    title: 'New Post',
    content: 'A new post has been created by Alexandra Amara.',
    date: '12:30 PM',
  },
  {
    id: 2,
    title: 'New Comment',
    content: 'A new comment has been posted by John Doe.',
    date: '11:45 PM',
  },
  {
    id: 3,
    title: 'New Booking',
    content: 'A new booking has been made for the Taj Mahal.',
    date: '10:15 PM',
  },
  {
    id: 4,
    title: 'New Review',
    content: 'A new review has been posted by Alexandra Amara for the Taj Mahal.',
    date: '09:00 PM',
  },
  {
    id: 5,
    title: 'New Visit',
    content: 'Alexandra Amara has visited the Taj Mahal.',
    date: '08:00 PM',
  }
];


