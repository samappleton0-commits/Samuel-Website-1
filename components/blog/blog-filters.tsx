'use client'

import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import {
  Search,
  X,
  Loader2,
} from 'lucide-react'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type Props = {
  categories: string[]
  currentSearch: string
  currentCategory: string
}

const PLACEHOLDERS = [
  'Search articles...',
  'Search web development...',
  'Search programming...',
  'Search technology...',
  'Search tutorials...',
  'Search ICT...',
]

export default function BlogFilters({
  categories,
  currentSearch,
  currentCategory,
}: Props) {

  const router = useRouter()

  const searchParams = useSearchParams()

  const [search, setSearch] = useState(currentSearch)

  const [loading, setLoading] = useState(false)

  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // =====================================
  // ANIMATED PLACEHOLDER
  // =====================================

  useEffect(() => {

    const interval = setInterval(() => {

      setPlaceholderIndex((prev) =>

        prev === PLACEHOLDERS.length - 1

          ? 0

          : prev + 1

      )

    }, 3000)

    return () => clearInterval(interval)

  }, [])

  // =====================================
  // KEEP LOCAL STATE IN SYNC
  // =====================================

  useEffect(() => {

    setSearch(currentSearch)

  }, [currentSearch])

  // =====================================
  // UPDATE URL
  // =====================================

  const updateURL = useCallback(

    (
      key: string,
      value: string
    ) => {

      const params = new URLSearchParams(
        searchParams.toString()
      )

      if (value.trim()) {

        params.set(key, value.trim())

      } else {

        params.delete(key)

      }

      // Reset pagination
      params.delete('page')

      setLoading(true)

      router.push(`/blog?${params.toString()}`)

    },

    [router, searchParams]

  )

  // =====================================
  // LIVE SEARCH (350ms)
  // =====================================

  useEffect(() => {

    if (debounceRef.current) {

      clearTimeout(debounceRef.current)

    }

    debounceRef.current = setTimeout(() => {

      if (search !== currentSearch) {

        updateURL(
          'search',
          search
        )

      }

    }, 350)

    return () => {

      if (debounceRef.current) {

        clearTimeout(debounceRef.current)

      }

    }

  }, [

    search,

    currentSearch,

    updateURL,

  ])

  // =====================================
  // STOP LOADING
  // =====================================

  useEffect(() => {

    setLoading(false)

  }, [

    currentSearch,

    currentCategory,

  ])

  // =====================================
  // ESC TO CLEAR
  // =====================================

  useEffect(() => {

    function handleKeyDown(
      event: KeyboardEvent
    ) {

      if (
        event.key === 'Escape'
      ) {

        setSearch('')

        updateURL(
          'search',
          ''
        )

        inputRef.current?.blur()

      }

    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () =>

      window.removeEventListener(
        'keydown',
        handleKeyDown
      )

  }, [updateURL])

  // =====================================
  // CLEAR ALL
  // =====================================

  function clearFilters() {

    setSearch('')

    setLoading(true)

    router.push('/blog')

  }

  const placeholder = useMemo(
    () => PLACEHOLDERS[placeholderIndex],
    [placeholderIndex]
  )

    return (

    <section

      className="
        mb-12
        space-y-8
      "

    >

      {/* SEARCH BAR */}

      <div className="mx-auto max-w-3xl">

        <div

          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            bg-card
            shadow-sm
            transition-all
            duration-300
            focus-within:border-primary
            focus-within:ring-2
            focus-within:ring-primary/20
          "

        >

          <div className="flex items-center gap-3 px-5 py-4">

            <Search

              size={20}

              className="
                shrink-0
                text-muted-foreground
              "

            />

            <input

              ref={inputRef}

              value={search}

              onChange={(e)=>

                setSearch(

                  e.target.value

                )

              }

              placeholder={placeholder}

              aria-label="Search blog articles"

              className="
                w-full
                bg-transparent
                text-sm
                outline-none
                placeholder:text-muted-foreground/70
              "

            />

            {loading && (

              <Loader2

                size={18}

                className="
                  animate-spin
                  text-primary
                "

              />

            )}

            {!loading && search && (

              <button

                type="button"

                aria-label="Clear search"

                onClick={()=>

                  setSearch('')

                }

                className="
                  rounded-full
                  p-1
                  transition
                  hover:bg-muted
                "

              >

                <X size={16}/>

              </button>

            )}

          </div>

        </div>

      </div>

      {/* CATEGORY PILLS */}

      <div

        className="
          flex
          flex-wrap
          justify-center
          gap-3
        "

      >

        {categories.map((item)=>{

          const active =

            (item === 'All' && !currentCategory)

            ||

            item === currentCategory

          return (

            <button

              key={item}

              type="button"

              aria-pressed={active}

              onClick={()=>

                updateURL(

                  'category',

                  item === 'All'

                    ? ''

                    : item

                )

              }

              className={`

                rounded-full

                border

                px-5

                py-2.5

                text-sm

                font-semibold

                transition-all

                duration-200

                ${

                  active

                    ?

                    'border-primary bg-primary text-white shadow-lg shadow-primary/20'

                    :

                    'border-border bg-background hover:border-primary hover:text-primary hover:shadow-md'

                }

              `}

            >

              {item}

            </button>

          )

        })}

      </div>

      {/* ACTIVE FILTERS */}

      {(currentSearch || currentCategory) && (

        <div

          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
          "

        >

          {currentSearch && (

            <span

              className="
                rounded-full
                bg-primary/10
                px-4
                py-2
                text-sm
                text-primary
              "

            >

              🔍 "{currentSearch}"

            </span>

          )}

          {currentCategory && (

            <span

              className="
                rounded-full
                bg-primary/10
                px-4
                py-2
                text-sm
                text-primary
              "

            >

              🏷 {currentCategory}

            </span>

          )}

          <button

            onClick={clearFilters}

            className="
              rounded-full
              border
              px-4
              py-2
              text-sm
              font-semibold
              transition
              hover:border-primary
              hover:bg-primary
              hover:text-white
            "

          >

            <span className="flex items-center gap-2">

              <X size={16}/>

              Clear Filters

            </span>

          </button>

        </div>

      )}

    </section>

  )

}