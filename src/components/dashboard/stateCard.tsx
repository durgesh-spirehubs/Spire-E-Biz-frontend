import {Card ,CardContent,CardHeader} from "@/components/ui/card"
const StateCard = () => {
    return(
        <Card className="bg-[linear-gradient(200deg,_rgb(255,155,222)_40%,_rgb(153,93,145)_100%)] rounded-2xl p-6 text-white">
            <CardHeader>
              Purchase Orders   
            </CardHeader>
            <CardContent>
              $45,231.89
            </CardContent>
        </Card>
    
    )
}
export default StateCard;