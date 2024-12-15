import { Search } from 'lucide-react'

import { Button } from './ui/button'

export default function SearchIcon() {
  return (
    <div><Button variant="ghost" className="flex items-center gap-2 text-primary font-bold">
      <Search className="h-5 w-5" />
      Buscar
    </Button></div>
  )
}
