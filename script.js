const h = React.createElement;

const cityImage = {
    src: "https://spcdn.shortpixel.ai/spio/ret_img+q_cdnize+to_auto+s_webp:avif/portalhistoryua.com/wp-content/uploads/2024/05/majdan-nezalezhnosti-v-kyyevi-glib-albovskyj-unsplash.jpg",
    alt: "Майдан Незалежності в Києві"
};

const goods = [
    {
        id: 1,
        name: "Яблука",
        price: "35 ₴ / кг",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: 2,
        name: "Полуниця",
        price: "90 ₴ / кг",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: 3,
        name: "Виноград",
        price: "70 ₴ / кг",
        image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: 4,
        name: "Ананас",
        price: "85 ₴ / шт.",
        image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: 5,
        name: "Банани",
        price: "55 ₴ / кг",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: 6,
        name: "Апельсини",
        price: "52 ₴ / кг",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=85"
    }
];

function Header() {
    return h("header", { className: "site-header" },
        h("div", { className: "header-content" },
            h("p", { className: "eyebrow" }, "Портфоліо студента"),
            h("h1", null, "Особиста сторінка"),
            h("p", { className: "header-subtitle" }, "Навчання, захоплення та добірка фруктів")
        )
    );
}

function Image(props) {
    return h("div", { className: "city-image-widget" },
        props.visible
            ? h("a", {
                className: "city-image-link",
                href: "https://kyivcity.gov.ua/",
                "aria-label": "Перейти на сайт Київської міської державної адміністрації"
            }, h("img", {
                className: "city-image",
                src: props.src,
                alt: props.alt,
                style: { width: `${props.scale * 100}%` }
            }))
            : h("p", { className: "image-placeholder" }, "Зображення приховано. Його можна додати знову."),
        h("div", { className: "image-controls", role: "group", "aria-label": "Керування зображенням" },
            h("button", { type: "button", onClick: props.onAdd, disabled: props.visible }, "Додати зображення"),
            h("button", { type: "button", onClick: props.onEnlarge, disabled: !props.visible || props.scale >= 1.8 }, "Збільшити"),
            h("button", { type: "button", onClick: props.onShrink, disabled: !props.visible || props.scale <= 0.6 }, "Зменшити"),
            h("button", { type: "button", onClick: props.onRemove, disabled: !props.visible }, "Видалити зображення")
        )
    );
}

function GoodsCard(props) {
    return h("article", { className: "goods-card" },
        h("img", { className: "goods-image", src: props.image, alt: props.name, loading: "lazy" }),
        h("div", { className: "goods-info" },
            h("h3", null, props.name),
            h("p", { className: "goods-price" }, props.price)
        )
    );
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageVisible: true,
            imageScale: 1,
            movieColors: {}
        };
    }

    changeImageScale(amount) {
        this.setState((state) => ({
            imageScale: Math.min(1.8, Math.max(0.6, Math.round((state.imageScale + amount) * 10) / 10))
        }));
    }

    toggleMovieColor(movieId) {
        this.setState((state) => ({
            movieColors: {
                ...state.movieColors,
                [movieId]: !state.movieColors[movieId]
            }
        }));
    }

    render() {
        const colorStyles = {
            backgroundColor: "#174a73",
            color: "#ffffff"
        };
        const movies = [
            { id: "first", title: "«Бійцівський клуб» (Fight Club, 1999)" },
            { id: "second", title: "«Вовк з Волл-стріт» (The Wolf of Wall Street, 2013)" },
            { id: "third", title: "«Матриця» (The Matrix, 1999)" }
        ];

        return h("main", { className: "page-content" },
            h("section", { className: "intro section-card" },
                h("p", { className: "eyebrow" }, "Знайомство"),
                h("h2", null, "Мельниченко Тарас Олегович"),
                h("p", null, "Я народився 17 квітня 2007 року в місті Коростень."),
                h("p", null, "Навчався у КМЛ № 4, зараз навчаюся в університеті КПІ.")
            ),
            h("div", { className: "details-grid" },
                h("section", { className: "section-card" },
                    h("h2", null, "Мої хобі"),
                    h("ul", null,
                        h("li", null, "Вивчення англійської мови"),
                        h("li", null, "Комп'ютерні ігри"),
                        h("li", null, "Спорт")
                    )
                ),
                h("section", { className: "section-card" },
                    h("h2", null, "Улюблені фільми"),
                    h("ol", { className: "movie-list" },
                        movies.map((movie) => h("li", {
                            key: movie.id,
                            className: "movie-item",
                            title: "Клацніть, щоб змінити кольори",
                            style: this.state.movieColors[movie.id] ? colorStyles : undefined,
                            onClick: () => this.toggleMovieColor(movie.id)
                        }, movie.title))
                    )
                )
            ),
            h("section", { className: "section-card city-section" },
                h("p", { className: "eyebrow" }, "Місто, яке надихає"),
                h("h2", null, "Моє улюблене місто — Київ"),
                h("p", null, "Київ — це велична столиця України, місто з тисячолітньою історією, яке поєднує в собі давню велич пам'яток Київської Русі та сучасний динамічний ритм мегаполіса. Найбільше мене вражають мальовничі схили Дніпра, золоті куполи старовинних храмів, затишні каштанові алеї та величний пам'ятник Засновницям Києва. Особливу атмосферу створює прогулянка історичним центром, Андріївським узвозом із його художніми лавками, а також вечірній вид на підсвічений міст Патона та Печерську Лавру."),
                h(Image, {
                    src: cityImage.src,
                    alt: cityImage.alt,
                    visible: this.state.imageVisible,
                    scale: this.state.imageScale,
                    onAdd: () => this.setState({ imageVisible: true, imageScale: 1 }),
                    onEnlarge: () => this.changeImageScale(0.2),
                    onShrink: () => this.changeImageScale(-0.2),
                    onRemove: () => this.setState({ imageVisible: false, imageScale: 1 })
                })
            ),
            h("section", { className: "goods-section" },
                h("div", { className: "section-heading" },
                    h("p", { className: "eyebrow" }, "Добірка"),
                    h("h2", null, "Свіжі фрукти"),
                    h("p", null, "Смачні фрукти за доступними цінами.")
                ),
                h("div", { className: "goods-grid" },
                    goods.map((good) => h(GoodsCard, {
                        key: good.id,
                        image: good.image,
                        name: good.name,
                        price: good.price
                    }))
                )
            ),
            h("footer", { className: "site-footer" }, "Навчальна робота з React")
        );
    }
}

function App() {
    return h(React.Fragment, null,
        h(Header),
        h(Content)
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(h(App));
