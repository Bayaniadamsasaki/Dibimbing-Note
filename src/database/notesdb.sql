PGDMP      8    
            |            notesdb    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16399    notesdb    DATABASE     ~   CREATE DATABASE notesdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE notesdb;
                postgres    false            �            1259    16401    notes    TABLE     �   CREATE TABLE public.notes (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    body text NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.notes;
       public         heap    postgres    false            �            1259    16400    notes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.notes_id_seq;
       public          postgres    false    216            �           0    0    notes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;
          public          postgres    false    215            P           2604    16404    notes id    DEFAULT     d   ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);
 7   ALTER TABLE public.notes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    16401    notes 
   TABLE DATA           ;   COPY public.notes (id, title, body, createdat) FROM stdin;
    public          postgres    false    216   �
       �           0    0    notes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.notes_id_seq', 16, true);
          public          postgres    false    215            S           2606    16409    notes notes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey;
       public            postgres    false    216            �   �   x�m��j�0���+�"4z8��!PR�i�nTG��lk�~}]�	�Յ��%����ͻ��s������t)�^�|EI��K���֚
FS��)ae���f{���Cj��T�Kad�)������Ɵ#Vi���� �-H��i؎�nl��>|�]�OL)s^d�ц��;�9��K:.?��i�s0[�I
��*?��}!���/����nC��x��ऊLg�3�~ �Z\     