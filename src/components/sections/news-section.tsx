"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { getNews, NewsArticle } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await getNews();
        setNewsItems(news);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section id="news" className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Компанийн Мэдээ</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Салбарын болон компанийн сүүлийн үеийн мэдээ, мэдээлэлтэй танилцана уу.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <Skeleton className="h-56 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="news" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Компанийн Мэдээ</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Салбарын болон компанийн сүүлийн үеийн мэдээ, мэдээлэлтэй танилцана уу.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.id} className="flex flex-col overflow-hidden group">
              <div className="relative">
                <Image
                  src={item.image || "https://placehold.co/600x400.png"}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={item.hint}
                />
                 {item.featured && <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">Онцлох</Badge>}
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                <p className="text-xs text-muted-foreground pt-1">{new Date(item.date).toLocaleDateString('mn-MN')}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{item.summary}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
