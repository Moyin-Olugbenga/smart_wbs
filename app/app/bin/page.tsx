"use client";
import { Bin, BinResult } from "@/classes/Bin"
import { AppSidebar } from "@/components/app-sidebar"
import Image from 'next/image';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { useEffect, useState,} from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Separator } from "@radix-ui/react-separator";
import {Bin as _Bin} from "@prisma/client"

export default function Page() {
    const router = useRouter();
  const [data, setData] = useState<BinResult[]>([]);
  const llink = process.env.NEXT_PUBLIC_API_LINK;

  useEffect(() => {
    const fetchBins = async () => {
      const bins = await Bin.getBins();
      setData(bins);
    };
    fetchBins();
  }, []);

  const createBin = async () => {
    await Bin.createBin();
    setTimeout(() => {
      router.refresh();
    }, 3000);
  };

  const generateUrl = async (uuid: string) => {
    const saveFile = true;
    console.log("Generating URL for:", uuid);
    await axios.post(`${llink}/api/qrcode`, { uuid, saveFile });
    setTimeout(() => {
      router.refresh();
    }, 3000);
  };
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset><header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Bins</h1>
        <div className="ml-auto flex items-center gap-2">
          
              <Button onClick={createBin}>Create Bin</Button>
        </div>
      </div>
    </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
        

              <Table>
                <TableCaption>A list of available bins.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>QR Image</TableHead>
                    <TableHead>Unviewed Notifications</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.map((bin: BinResult) => (
                    <TableRow key={bin.uuid}>
                      <TableCell className="font-medium">{bin.id}</TableCell>
                      <TableCell>{bin.name}</TableCell>
                      <TableCell>{bin.location}</TableCell>

                      <TableCell>
                        {bin.document.length > 0
                          ? bin.document[0].filled_state
                          : "No state recorded yet"}
                      </TableCell>
                      { bin.binUrl != null && bin.filename != null ? 
                      <>
                      <TableCell>{bin.binUrl}</TableCell> 
                      <TableCell><Image src={`/qrcodes/${bin.filename}`} alt="Description of my image" width={100} height={100}/></TableCell></>: 
                       <>
                       <TableCell><Button onClick={() => generateUrl(bin.uuid)}>Generate</Button></TableCell>
                       <TableCell></TableCell>
                       </> }
                      <TableCell><Link href={`${llink}/app/notification?binId=${bin.uuid}`}>{bin._count.notification}</Link></TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                </Table>

            
            
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
