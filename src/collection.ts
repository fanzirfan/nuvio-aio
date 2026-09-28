export function getCollectionJson(addonId = 'irfan.nuvio.aio'): string { const template = [
  {
    "id": "collections-discover",
    "title": "Discover",
    "folders": [
      {
        "id": "collections.discover.popular",
        "title": "Popular",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tmdb.top_movie"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tmdb.top_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🏆",
        "titleLogoUrl": "https://numb3rs.stream/collections/discover/title/popular.webp",
        "coverImageUrl": "https://ultramax.vip/images/for_you_trending.popular.webp",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tmdb.top_movie"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tmdb.top_series"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/discover/backdrop/popular.webp"
      },
      {
        "id": "collections.discover.trending",
        "title": "Trending",
        "sources": [
          {
            "type": "movie",
            "genre": "Day",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tmdb.trending_movie"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tmdb.top_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🔥",
        "titleLogoUrl": "https://numb3rs.stream/collections/discover/title/trending.webp",
        "coverImageUrl": "https://ultramax.vip/images/for_you_trending.trending.webp",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Day",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tmdb.trending_movie"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tmdb.top_series"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/discover/backdrop/trending.webp"
      },
      {
        "id": "collections.discover.top-rated",
        "title": "Top Rated",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tmdb.top_rated_movie"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tmdb.top_rated_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "⭐",
        "titleLogoUrl": "https://numb3rs.stream/collections/discover/title/top-rated.webp",
        "coverImageUrl": "https://ultramax.vip/images/top%20rated.jpg",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tmdb.top_rated_movie"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tmdb.top_rated_series"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/discover/backdrop/top-rated.webp"
      }
    ],
    "pinToTop": true,
    "viewMode": "FOLLOW_LAYOUT",
    "showAllTab": true,
    "focusGlowEnabled": true
  },
  {
    "id": "collections-streaming",
    "title": "Streaming Platform",
    "folders": [
      {
        "id": "collections.streaming.netflix",
        "title": "Netflix",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.nfx"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.nfx"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🎬",
        "titleLogoUrl": "https://numb3rs.stream/collections/streaming/title/netflix.webp",
        "coverImageUrl": "https://numb3rs.stream/collections/streaming/cover/netflix.webp",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.nfx"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.nfx"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/streaming/backdrop/netflix.webp"
      },
      {
        "id": "collections.streaming.disney-plus",
        "title": "Disney Plus",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.dnp"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.dnp"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🎬",
        "titleLogoUrl": "https://numb3rs.stream/collections/streaming/title/disney-plus.webp",
        "coverImageUrl": "https://numb3rs.stream/collections/streaming/cover/disney-plus.webp",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.dnp"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.dnp"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/streaming/backdrop/disney-plus.webp"
      },
      {
        "id": "collections.streaming.prime-video",
        "title": "Prime Video",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.amp"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.amp"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🎬",
        "titleLogoUrl": "https://numb3rs.stream/collections/streaming/title/prime-video.webp",
        "coverImageUrl": "https://numb3rs.stream/collections/streaming/cover/prime-video.webp",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.amp"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.amp"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/streaming/backdrop/prime-video.webp"
      },
      {
        "id": "collections.streaming.apple-tv",
        "title": "Apple TV",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.atp"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.atp"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🎬",
        "titleLogoUrl": "https://numb3rs.stream/collections/streaming/title/apple-tv.webp",
        "coverImageUrl": "https://numb3rs.stream/collections/streaming/cover/apple-tv.webp",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.atp"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.atp"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/streaming/backdrop/apple-tv.webp"
      },
      {
        "id": "collections.streaming.hbo-max",
        "title": "HBO Max",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.hbm"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.hbm"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🎬",
        "titleLogoUrl": "https://numb3rs.stream/collections/streaming/title/hbo-max.webp",
        "coverImageUrl": "https://numb3rs.stream/collections/streaming/cover/hbo-max.webp",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.hbm"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.hbm"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/streaming/backdrop/hbo-max.webp"
      },
      {
        "id": "collections.streaming.hulu",
        "title": "Hulu",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.hlu"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.hlu"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🎬",
        "titleLogoUrl": "https://numb3rs.stream/collections/streaming/title/hulu.webp",
        "coverImageUrl": "https://numb3rs.stream/collections/streaming/cover/hulu.webp",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.hlu"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.hlu"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/streaming/backdrop/hulu.webp"
      },
      {
        "id": "collections.streaming.paramount-plus",
        "title": "Paramount Plus",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.pmp"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.pmp"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🎬",
        "titleLogoUrl": "https://numb3rs.stream/collections/streaming/title/paramount-plus.webp",
        "coverImageUrl": "https://numb3rs.stream/collections/streaming/cover/paramount-plus.webp",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.pmp"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.pmp"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/streaming/backdrop/paramount-plus.webp"
      },
      {
        "id": "collections.streaming.crunchyroll",
        "title": "Crunchyroll",
        "sources": [
          {
            "type": "movie",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.cru"
          },
          {
            "type": "series",
            "genre": "",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "streaming.cru"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "🎬",
        "titleLogoUrl": "https://numb3rs.stream/collections/streaming/title/crunchyroll.webp",
        "coverImageUrl": "https://numb3rs.stream/collections/streaming/cover/crunchyroll.webp",
        "catalogSources": [
          {
            "type": "movie",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.cru"
          },
          {
            "type": "series",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "streaming.cru"
          }
        ],
        "focusGifEnabled": false,
        "heroBackdropUrl": "https://numb3rs.stream/collections/streaming/backdrop/crunchyroll.webp"
      }
    ],
    "pinToTop": true,
    "viewMode": "FOLLOW_LAYOUT",
    "showAllTab": true,
    "focusGlowEnabled": true
  },
  {
    "id": "genres",
    "title": "Genres",
    "folders": [
      {
        "id": "action",
        "title": "Action",
        "sources": [
          {
            "type": "movie",
            "genre": "Action",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Action",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/action/action-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Action",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Action",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Advanture",
        "title": "Advanture",
        "sources": [
          {
            "type": "movie",
            "genre": "Adventure",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Adventure",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/adventure/adventure-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Adventure",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Adventure",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Animation",
        "title": "Animation",
        "sources": [
          {
            "type": "movie",
            "genre": "Animation",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Animation",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/animation/animation-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Animation",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Animation",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Comedy",
        "title": "Comedy",
        "sources": [
          {
            "type": "movie",
            "genre": "Comedy",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Comedy",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverEmoji": "lections/nuvio-assets/blob/main/assets/collection_covers/genre/wide/comedy%20wide.jpg?raw=true",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/comedy/comedy-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Comedy",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Comedy",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Crime",
        "title": "Crime",
        "sources": [
          {
            "type": "movie",
            "genre": "Crime",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Crime",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/crime/crime-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Crime",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Crime",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Documentary",
        "title": "Documentary",
        "sources": [
          {
            "type": "movie",
            "genre": "Documentary",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Documentary",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/documentary/documentary-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Documentary",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Documentary",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Drama",
        "title": "Drama",
        "sources": [
          {
            "type": "movie",
            "genre": "Drama",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Drama",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/drama/drama-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Drama",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Drama",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Horror",
        "title": "Horror",
        "sources": [
          {
            "type": "movie",
            "genre": "Horror",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Horror",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/horror/horror-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Horror",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Horror",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Romance",
        "title": "Romance",
        "sources": [
          {
            "type": "movie",
            "genre": "Romance",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Romance",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/romance/romance-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Romance",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Romance",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Sci-Fi",
        "title": "Sci-Fi",
        "sources": [
          {
            "type": "movie",
            "genre": "Science Fiction",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Science Fiction",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/sci-fi/sci-fi-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Science Fiction",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Science Fiction",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      },
      {
        "id": "Thriller",
        "title": "Thriller",
        "sources": [
          {
            "type": "movie",
            "genre": "Thriller",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Thriller",
            "addonId": "irfan.nuvio.aio",
            "provider": "addon",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "hideTitle": false,
        "tileShape": "LANDSCAPE",
        "coverImageUrl": "https://raw.githubusercontent.com/rrevanth/nuvio-assets/refs/heads/main/genres/thriller/thriller-landscape.png",
        "catalogSources": [
          {
            "type": "movie",
            "genre": "Thriller",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_movie"
          },
          {
            "type": "series",
            "genre": "Thriller",
            "addonId": "irfan.nuvio.aio",
            "catalogId": "tvdb.genres_series"
          }
        ],
        "focusGifEnabled": false
      }
    ],
    "pinToTop": true,
    "viewMode": "FOLLOW_LAYOUT",
    "showAllTab": true,
    "focusGlowEnabled": true
  }
];
  const jsonStr = JSON.stringify(template, null, 2);
  if (addonId !== 'irfan.nuvio.aio') {
    return jsonStr.split('"addonId": "irfan.nuvio.aio"').join(`"addonId": "${addonId}"`);
  }
  return jsonStr;
}