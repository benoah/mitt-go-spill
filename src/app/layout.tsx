import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // TODO: Vurder om 'next/font/google' er den mest optimale måten å laste Geist på, eller om lokal hosting via 'next/font/local' gir bedre ytelse/kontroll for produksjon.
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], // TODO: Bekreft om "latin" er det eneste subset du trenger. Hvis appen støtter flere språk/tegnsett, kan det være nødvendig med flere.
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], // TODO: Samme som for geistSans, bekreft nødvendige subsets.
});

// TODO: Metadata er bra! Vurder å legge til flere felt for bedre SEO og deling på sosiale medier:
//       - openGraph: { title, description, images: [{ url, width, height, alt }], siteName, type: 'website', locale }
//       - twitter: { card: 'summary_large_image', title, description, images: ['url'] }
//       - icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' } // Sørg for at disse filene finnes i /public
//       - themeColor: (hvis du har en primær merkefarge, for nettleserens UI)
//       - manifest: '/manifest.json' (for PWA-funksjonalitet)
export const metadata: Metadata = {
  title: "Go Game", // TODO: Gjør denne tittelen mer beskrivende og unik for merkevaren/spillet, f.eks. "Go Game - Spill Klassisk Go Online".
  description: "Play the classic game of Go", // TODO: Utvid beskrivelsen for å være mer engasjerende og inkluder nøkkelord, f.eks. "Opplev Go Game, et moderne og intuitivt brettspill. Spill klassisk Go mot venner eller AI, lær strategier og klatre på ledertavlen."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TODO: Sjekk om 'en' er det primære språket. Hvis norsk er hovedspråket, endre til 'no'.
    //       Vurder internasjonalisering (i18n) hvis appen skal støtte flere språk.
    <html lang="en" suppressHydrationWarning>
      {/*
        Kommentaren om suppressHydrationWarning er god. Det er en nødvendig workaround
        når temaet settes på klienten og kan endre `style` på <html> eller `class` på <body>.
        TODO: For en mer avansert løsning (spesielt hvis du vil unngå FOUC - Flash of Unstyled Content),
              vurder å sette en initiell temaklasse på serversiden basert på en cookie,
              og deretter la useThemeManager synkronisere. Dette er mer komplekst.
              For nå er suppressHydrationWarning en akseptabel løsning.
      */}
      <body
        // TODO: 'antialiased' er bra for tekst-rendering.
        //       Vurder å legge til en standard bakgrunnsfarge og tekstfarge her
        //       som en fallback før temaklassene (.light/.dark) lastes av useThemeManager,
        //       for å unngå en kortvarig "hvit skjerm" eller feil farger.
        //       Disse kan settes i globals.css på `body` og vil arves.
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning // Samme begrunnelse som for <html>
      >
        {/*
          TODO: Vurder å wrappe {children} i en global Context Provider hvis du har
                global state som ikke er tema-relatert (f.eks. brukerautentisering, notifikasjoner).
                Tema håndteres nå av useThemeManager som modifiserer DOM direkte,
                men andre globale tilstander kan trenge en Provider her.
        */}
        {/*
          TODO: Vurder å legge til en global "Skip to content" lenke helt øverst (utenfor synlig viewport)
                for bedre tastaturnavigasjon og tilgjengelighet.
        */}
        {children}
        {/*
          TODO: Hvis du planlegger å ha globale elementer som alltid er synlige uavhengig av rute
                (f.eks. en global notifikasjons-banner, cookie-samtykke-banner),
                kan de plasseres her utenfor {children} eller som en del av en layout-komponent
                som wrapper {children}.
        */}
      </body>
    </html>
  );
}
