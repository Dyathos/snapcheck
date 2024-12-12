'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faWrench, 
  faCog, 
  faGauge,
  faCarBattery,
  faOilCan,
  faGears,
  faCar, 
  faGasPump,
  faBatteryFull, 
  faBolt, 
  faToolbox, 
  faScrewdriver, 
  faHammer, 
  faCarCrash, 
  faCarSide, 
  faRoad, 
  faTrafficLight, 
  faMapMarkerAlt, 
  faThermometer,
  faLightbulb, 
  faFan, 
  faCompass,
} from '@fortawesome/free-solid-svg-icons'

const commonIcons = [
  { icon: faWrench, name: 'Wrench' },
  { icon: faCog, name: 'Cog' },
  { icon: faGauge, name: 'Gauge' },
  { icon: faCarBattery, name: 'Battery' },
  { icon: faOilCan, name: 'Oil' },
  { icon: faGears, name: 'Gears' },
  { icon: faCar, name: 'Car' },
  { icon: faGasPump, name: 'Gas Pump' },
  { icon: faBatteryFull, name: 'Battery Full' },
  { icon: faBolt, name: 'Bolt' },
  { icon: faToolbox, name: 'Toolbox' },
  { icon: faScrewdriver, name: 'Screwdriver' },
  { icon: faHammer, name: 'Hammer' },
  { icon: faCarCrash, name: 'Car Crash' },
  { icon: faCarSide, name: 'Car Side' },
  { icon: faRoad, name: 'Road' },
  { icon: faTrafficLight, name: 'Traffic Light' },
  { icon: faMapMarkerAlt, name: 'Map Marker' },
  { icon: faThermometer, name: 'Thermometer' },
  { icon: faLightbulb, name: 'Lightbulb' },
  { icon: faFan, name: 'Fan' },
  { icon: faCompass, name: 'Compass' },
]

// Retirer toutes les icônes non disponibles
const availableIcons = commonIcons.filter(icon => 
  icon.name !== 'Car Crash' && 
  icon.name !== 'Car Side' && 
  icon.name !== 'Road' && 
  icon.name !== 'Traffic Light' && 
  icon.name !== 'Map Marker' && 
  icon.name !== 'Thermometer' && 
  icon.name !== 'Lightbulb' && 
  icon.name !== 'Fan' && 
  icon.name !== 'Compass'
)

interface IconPickerProps {
  value: string
  onChange: (value: { type: 'icon' | 'image', value: string }) => void
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('icons')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleIconSelect = (iconName: string) => {
    onChange({ type: 'icon', value: iconName })
    setIsOpen(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        onChange({ type: 'image', value: base64 })
        setIsOpen(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const filteredIcons = availableIcons.filter(icon => 
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const displayValue = value ? (
    value.startsWith('data:image') ? (
      <img src={value} alt="Selected" className="w-8 h-8 object-contain" />
    ) : (
      <FontAwesomeIcon icon={availableIcons.find(i => i.name === value)?.icon || faCar} className="w-6 h-6" />
    )
  ) : (
    'Choisir une icône'
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-20 text-3xl flex items-center justify-center"
        >
          {displayValue}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choisir une icône</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="icons" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="icons">Icônes</TabsTrigger>
            <TabsTrigger value="upload">Image</TabsTrigger>
          </TabsList>
          <TabsContent value="icons" className="space-y-4 py-4">
            <Input
              placeholder="Rechercher une icône"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ScrollArea className="h-72">
              <div className="grid grid-cols-4 gap-2">
                {filteredIcons.map((icon) => (
                  <Button
                    key={icon.name}
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center gap-1 p-1"
                    onClick={() => handleIconSelect(icon.name)}
                  >
                    <FontAwesomeIcon icon={icon.icon} className="w-6 h-6" />
                    <span className="text-xs text-center">{icon.name}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Button
                variant="outline"
                className="w-full h-32 flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="text-2xl mb-2">📁</span>
                <span>Cliquez pour importer une image</span>
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <p className="text-sm text-gray-500">
                Formats supportés: PNG, JPG, SVG
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
