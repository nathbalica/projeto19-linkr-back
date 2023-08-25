--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    post_id integer,
    commenter_id integer,
    content text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    user_id integer,
    post_id integer
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: post_hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_hashtags (
    post_id integer NOT NULL,
    hashtag_id integer NOT NULL
);


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer,
    content text,
    link text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: reposts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reposts (
    id integer NOT NULL,
    user_id integer,
    post_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: reposts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reposts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reposts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reposts_id_seq OWNED BY public.reposts.id;


--
-- Name: user_following; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_following (
    follower_id integer NOT NULL,
    following_id integer NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    profile_image text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: reposts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts ALTER COLUMN id SET DEFAULT nextval('public.reposts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES (1, 22, 2, 'eu amo arroz', '2023-08-23 10:51:15.423341');
INSERT INTO public.comments VALUES (4, 17, 5, 'queria comer arroz', '2023-08-23 17:35:36.08337');
INSERT INTO public.comments VALUES (5, 23, 4, 'tamo junto meu querido', '2023-08-23 17:40:39.854696');


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (1, '#amoarroz');
INSERT INTO public.hashtags VALUES (2, '#amofeijao');
INSERT INTO public.hashtags VALUES (3, '#arroba');
INSERT INTO public.hashtags VALUES (4, '#feijao');
INSERT INTO public.hashtags VALUES (5, '#hashtags');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (10, 2, 7);
INSERT INTO public.likes VALUES (18, 2, 9);
INSERT INTO public.likes VALUES (19, 2, 8);
INSERT INTO public.likes VALUES (28, 5, 20);
INSERT INTO public.likes VALUES (32, 4, 16);
INSERT INTO public.likes VALUES (33, 4, 23);
INSERT INTO public.likes VALUES (36, 4, 24);
INSERT INTO public.likes VALUES (42, 2, 23);
INSERT INTO public.likes VALUES (48, 2, 24);
INSERT INTO public.likes VALUES (52, 5, 24);


--
-- Data for Name: post_hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.post_hashtags VALUES (7, 1);
INSERT INTO public.post_hashtags VALUES (8, 2);
INSERT INTO public.post_hashtags VALUES (18, 3);
INSERT INTO public.post_hashtags VALUES (19, 4);
INSERT INTO public.post_hashtags VALUES (20, 1);
INSERT INTO public.post_hashtags VALUES (24, 5);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (7, 1, 'arrozeiro #amoarroz', 'https://helios-i.mashable.com/imagery/articles/00hKWGwNnLkusk5olK69vY3/hero-image.fill.size_1248x702.v1611613954.jpg', '2023-08-19 17:44:19.46563');
INSERT INTO public.posts VALUES (8, 1, 'e feijao tambem #amofeijao', 'https://helios-i.mashable.com/imagery/articles/00hKWGwNnLkusk5olK69vY3/hero-image.fill.size_1248x702.v1611613954.jpg', '2023-08-19 17:45:38.108304');
INSERT INTO public.posts VALUES (9, 1, 'eu prefiro arroz', 'https://www.npmjs.com/', '2023-08-19 20:41:47.708312');
INSERT INTO public.posts VALUES (10, 3, 'eu prefiro arroz', 'https://www.npmjs.com/', '2023-08-19 20:44:25.792238');
INSERT INTO public.posts VALUES (16, 2, 'eu amo arroz mentira eu odeio arroz mentira denovo amo arroz sim', 'https://trello.com/c/2i5Xe31K/4-como-autor-de-um-post-quero-editar-este-post', '2023-08-21 09:13:51.716246');
INSERT INTO public.posts VALUES (17, 2, 'testes 2', 'https://www.metroworldnews.com.br/ciencia-e-tecnologia/2023/08/19/bill-gates-revela-um-segredo-sobre-a-inteligencia-artificial-que-preocupa-os-professores-do-ensino-medio/', '2023-08-21 13:39:44.170054');
INSERT INTO public.posts VALUES (18, 2, 'arroba #arroba', 'https://www.basketball-reference.com/', '2023-08-21 14:20:26.220839');
INSERT INTO public.posts VALUES (19, 4, 'Eu amo feijao #feijao', 'https://www.montarumnegocio.com/', '2023-08-21 15:48:06.24011');
INSERT INTO public.posts VALUES (20, 5, 'hoje é dia de arroz bebe #amoarroz', 'https://www.basketball-reference.com/', '2023-08-22 19:02:24.969778');
INSERT INTO public.posts VALUES (21, 5, '324r2f3w4fwefwefw', 'https://www.basketball-reference.com/', '2023-08-22 19:02:29.82196');
INSERT INTO public.posts VALUES (22, 5, '3412423fds', 'https://www.basketball-reference.com/', '2023-08-22 19:02:35.478654');
INSERT INTO public.posts VALUES (23, 2, 'eu amo arroz', 'https://www.espn.com/', '2023-08-23 10:55:37.892078');
INSERT INTO public.posts VALUES (24, 4, 'teste com #hashtags talvez', 'https://www.espn.com/', '2023-08-23 17:59:18.055037');


--
-- Data for Name: reposts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.reposts VALUES (2, 2, 7, '2023-08-25 02:26:48.315813');
INSERT INTO public.reposts VALUES (3, 2, 24, '2023-08-25 03:08:28.848032');
INSERT INTO public.reposts VALUES (4, 5, 24, '2023-08-25 03:15:03.660299');
INSERT INTO public.reposts VALUES (5, 5, 7, '2023-08-25 12:32:24.316215');


--
-- Data for Name: user_following; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_following VALUES (5, 2);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Santos', 'santos@gmail.com', '$2b$10$B9nPUdm6WoR4YLs.R4rV3.mTpz/bJrINvVKJidUReUUqGTfK7YVgG', 'https://helios-i.mashable.com/imagery/articles/00hKWGwNnLkusk5olK69vY3/hero-image.fill.size_1248x702.v1611613954.jpg');
INSERT INTO public.users VALUES (2, 'vitor', 'vitor@email.com', '$2b$10$T7E0m/kRB4VbwTikaeF/seYHbmvQtzU5.jlKj45k/6.IVBHa2fYJS', 'https://static.itdg.com.br/images/1200-630/21fd76be3b29c3290859eda5220e0e32/323683-original.jpg');
INSERT INTO public.users VALUES (3, 'arroz', 'arroz@email.com', '$2b$10$gItbP3E.sB1c.7XHFKnl1eDucd07vRWmFBg4.UyI7dvouTYDlZI3O', 'https://static.itdg.com.br/images/1200-630/21fd76be3b29c3290859eda5220e0e32/323683-original.jpg');
INSERT INTO public.users VALUES (4, 'feijaoamo', 'feijao@email.com', '$2b$10$21qQs3OnUKviaT.hjTLXGOg17R6hTp.B61m84LBdAdKXZ2rd/u7PK', 'https://www.montarumnegocio.com/wp-content/uploads/2018/08/Como-fazer-feijoada-no-pote-para-vender.jpg');
INSERT INTO public.users VALUES (5, 'vitorioso', '123456@email.com', '$2b$10$05bzkV9DZSuhRr6QQQ50.ukqEq5fRZqKeHSHPNs8XDKmqYwBw4XKa', 'https://cdn.discordapp.com/attachments/1137108641405739178/1137109074501193818/Ed9anPvU8AAlnyM.png');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 5, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 5, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 52, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 24, true);


--
-- Name: reposts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reposts_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key UNIQUE (name);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: post_hashtags post_hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_hashtags
    ADD CONSTRAINT post_hashtags_pkey PRIMARY KEY (post_id, hashtag_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: reposts reposts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_pkey PRIMARY KEY (id);


--
-- Name: user_following user_following_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_following
    ADD CONSTRAINT user_following_pkey PRIMARY KEY (follower_id, following_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: comments comments_commenter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_commenter_id_fkey FOREIGN KEY (commenter_id) REFERENCES public.users(id);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: post_hashtags post_hashtags_hashtag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_hashtags
    ADD CONSTRAINT post_hashtags_hashtag_id_fkey FOREIGN KEY (hashtag_id) REFERENCES public.hashtags(id);


--
-- Name: post_hashtags post_hashtags_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_hashtags
    ADD CONSTRAINT post_hashtags_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: reposts reposts_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: reposts reposts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_following user_following_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_following
    ADD CONSTRAINT user_following_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.users(id);


--
-- Name: user_following user_following_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_following
    ADD CONSTRAINT user_following_following_id_fkey FOREIGN KEY (following_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

