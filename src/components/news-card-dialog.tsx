import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export function NewsCardDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-2">Ver mais</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-[700px]">
        <DialogHeader>
          <DialogTitle>Anunciando nosso novo lançamento</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <img
            src="/PARASEMPRE.webp"
            alt="News"
            className="w-[350px] h-[200px]"
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold mb-4">Anunciando nosso última lançamento</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna eget nunc varius lacinia.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
