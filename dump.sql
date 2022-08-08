--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)

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

--
-- Name: heroku_ext; Type: SCHEMA; Schema: -; Owner: u6m0lgikohhkah
--

CREATE SCHEMA heroku_ext;


ALTER SCHEMA heroku_ext OWNER TO u6m0lgikohhkah;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: ysldczkescxcxz
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.urls OWNER TO ysldczkescxcxz;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: ysldczkescxcxz
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO ysldczkescxcxz;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ysldczkescxcxz
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ysldczkescxcxz
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(63) NOT NULL,
    email character varying(63) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO ysldczkescxcxz;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ysldczkescxcxz
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO ysldczkescxcxz;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ysldczkescxcxz
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: ysldczkescxcxz
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ysldczkescxcxz
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: ysldczkescxcxz
--

COPY public.urls (id, url, "shortUrl", "visitCount", "userId", "createdAt") FROM stdin;
12	https://wweb.dev/resources/js-object-functions-cheatsheet/	q3vRNYjb_ley	0	7	2022-08-05 16:21:38.191921
14	https://stackoverflow.com/questions/56832737/update-and-delete-together-on-postgresql	27aHe5u3wA1A	0	33	2022-08-05 16:22:19.167821
16	https://www.postgresql.org/docs/13/sql-declare.html	GQJ7w0UHAUWk	0	7	2022-08-05 16:22:38.62484
11	https://wweb.dev/resources/js-object-functions-cheatsheet/	wXum5MHXTrJL	2	33	2022-08-05 16:21:34.988614
52	https://www.youtube.com/watch?v=9e5nhSqhX3s	ugM6-VQqR6KE	4	67	2022-08-08 13:56:25.094803
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ysldczkescxcxz
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	Ademir	ademir@driven.com.br	$2b$10$s8g.F6FEb6P1ri9dBYWfrOjCRBGXmYWvQ3PD5YHih1V/RhtRKhx72	2022-08-02 18:37:45.516911
7	Marygod	mary@god.com.br	$2b$10$vmPUrzSdHBSCfMxp4Jx7oO7Tyfn..WWusUOGoikkaRr8MpThgQufC	2022-08-02 19:03:27.758116
9	João	joao@driven.com.br	$2b$10$.jgSuyCkzaXvmVNK6HUdq.Wj5ChTc5nYdLJ8h2o0NsNWe8.Y8rvSq	2022-08-03 14:41:52.8821
30	Frank	frank@professor.com.br	$2b$10$.EmrdcJtZo/JMihrtbMYnO5xa/A9RqZX3t1AUifhmLwlFiNe2Weyu	2022-08-05 14:01:19.437421
33	Ilha	ilha@xd.com.br	$2b$10$oKTnxsmEWVHRfW7PoJPfTuDE2fNGqsCpfHLqVitdvJhLdrxA8BMaW	2022-08-05 14:13:27.720937
67	Jason	jason@momoa.com.br	$2b$10$dnrVBUOAjSHuqGUNOpzFlutudooNA3ms1t4VdthAK3bob.toTMoNi	2022-08-08 13:42:25.527508
68	Fernando	dinheiro@segue.com.br	$2b$10$RiJCdqiTr5w6DB6J60Yj8uxQ/gnZAphcCSFrbSBGPINw4Zu9Pz4E6	2022-08-08 13:52:20.207694
\.


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ysldczkescxcxz
--

SELECT pg_catalog.setval('public.urls_id_seq', 52, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ysldczkescxcxz
--

SELECT pg_catalog.setval('public.users_id_seq', 70, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: ysldczkescxcxz
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: ysldczkescxcxz
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: ysldczkescxcxz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ysldczkescxcxz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA heroku_ext; Type: ACL; Schema: -; Owner: u6m0lgikohhkah
--

GRANT USAGE ON SCHEMA heroku_ext TO ysldczkescxcxz;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ysldczkescxcxz
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO ysldczkescxcxz;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO ysldczkescxcxz;


--
-- PostgreSQL database dump complete
--

