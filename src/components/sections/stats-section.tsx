
type Stat = {
    value: string;
    label: string;
    description: string;
};

const stats: Stat[] = [
    {
        value: "500+",
        label: "Мэргэшсэн хамт олон",
        description: "Төслүүд бүрт чанарыг эрхэмлэн ажилладаг туршлагатай, үнэнч мэргэжилтнүүд.",
    },
    {
        value: "100+",
        label: "Дууссан төслүүд",
        description: "Орон сууц, худалдааны болон дэд бүтцийн төслүүдээр Монгол даяар амжилттай хэрэгжүүлсэн ажлууд.",
    },
    {
        value: "30+",
        label: "Үйл ажиллагааны жилүүд",
        description: "Барилга, бүтээн байгуулалтын салбарт бат бөх суурьтай, туршлагатай салбарын тэргүүлэгч.",
    },
    {
        value: "20+",
        label: "Хэрэгжиж буй төслүүд",
        description: "Монголын ирээдүйг бүтээх, өсөлт ба тогтвортой байдлыг тусгасан идэвхтэй төслүүд.",
    },
    {
        value: "10+",
        label: "Үйл ажиллагааны чиглэл",
        description: "Барилга, үл хөдлөх хөрөнгө, дэд бүтэц зэрэг салбарт тогтвортой, чанартай үйл ажиллагаа явуулдаг.",
    },
];

export default function StatsSection() {
    return (
        <section id="stats" className="py-20 lg:py-28 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center lg:text-left mb-12">
                    <p className="text-primary font-semibold mb-2 text-sm tracking-widest relative lg:pl-10 after:hidden lg:after:block after:absolute after:w-8 after:h-px after:bg-primary after:left-0 after:top-1/2">
                        Үйл ажиллагааны үзүүлэлтүүд
                    </p>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight uppercase">
                        Тоон үзүүлэлтүүд
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {stats.slice(0, 3).map((stat) => (
                         <div key={stat.label} className="flex items-start space-x-6">
                            <p className="text-5xl md:text-6xl font-extrabold text-primary shrink-0">{stat.value}</p>
                            <div>
                                <h3 className="text-lg font-bold font-headline">{stat.label}</h3>
                                <p className="text-muted-foreground mt-1">{stat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12">
                     <div className="lg:col-start-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                        {stats.slice(3, 5).map((stat) => (
                             <div key={stat.label} className="flex items-start space-x-6">
                                <p className="text-5xl md:text-6xl font-extrabold text-primary shrink-0">{stat.value}</p>
                                <div>
                                    <h3 className="text-lg font-bold font-headline">{stat.label}</h3>
                                    <p className="text-muted-foreground mt-1">{stat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
