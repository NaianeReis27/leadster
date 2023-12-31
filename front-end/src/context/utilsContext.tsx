import {
  ReactNode,
  useState,
  createContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'

import { Data } from '../interfaces/api.interfaces'
export interface UtilsContextData {
  embed: () => void
  thumb: (
    url: string,
    setThumb: Dispatch<SetStateAction<string | undefined>>
  ) => void
  setSelectedVideos: Dispatch<SetStateAction<Data | null>>
  urlEmbeded: string | undefined
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  selectedVideos: Data | null
}

export interface UtilsContextProps {
  children: ReactNode
}

export const UtilsContext = createContext<UtilsContextData>(
  {} as UtilsContextData,
)

export const UtilsProvider = ({ children }: UtilsContextProps) => {
  const [selectedVideos, setSelectedVideos] = useState<Data | null>(null)
  const [isOpen, setOpen] = useState(false)
  const [urlEmbeded, setUrlEmbeded] = useState<string>()

  useEffect(() => {
    embed()
  }, [isOpen])

  const thumb = (
    url: string,
    setThumb: Dispatch<SetStateAction<string | undefined>>,
  ) => {
    const valid = url.toString().split('watch?v=')[1].substring(0, 11)
    const imageThumb = `https://img.youtube.com/vi/${valid}/hqdefault.jpg`
    setThumb(imageThumb)
  }

  const embed = () => {
    if (selectedVideos) {
      const valid = selectedVideos.url.split('watch?v=')[1].substring(0, 11)
      const video = `https://www.youtube.com/embed/${valid}?version=3&enablejsapi=1`
      setUrlEmbeded(video)
    }
  }

  return (
    <UtilsContext.Provider
      value={{
        thumb,
        embed,
        setSelectedVideos,
        urlEmbeded,
        isOpen,
        setOpen,
        selectedVideos,
      }}
    >
      {children}
    </UtilsContext.Provider>
  )
}
