-- CreateTable
CREATE TABLE "author" (
    "AuthorID" INTEGER NOT NULL,
    "AuthorName" VARCHAR(15) NOT NULL,
    "YearBorn" INTEGER NOT NULL,
    "YearDied" INTEGER,

    CONSTRAINT "author_pkey" PRIMARY KEY ("AuthorID")
);

-- CreateTable
CREATE TABLE "book" (
    "BookID" INTEGER NOT NULL,
    "BookName" VARCHAR(25) NOT NULL,
    "PublicationYear" INTEGER NOT NULL,
    "Pages" INTEGER NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("BookID")
);

-- CreateTable
CREATE TABLE "bought" (
    "BookID" INTEGER NOT NULL,
    "CustomerID" INTEGER NOT NULL,

    CONSTRAINT "bought_pkey" PRIMARY KEY ("CustomerID","BookID")
);

-- CreateTable
CREATE TABLE "customer" (
    "CustomerID" INTEGER NOT NULL,
    "CustomerName" VARCHAR(15) NOT NULL,
    "Street" VARCHAR(25) NOT NULL,
    "City" VARCHAR(10) NOT NULL,
    "State" VARCHAR(10) NOT NULL,
    "Country" VARCHAR(10) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("CustomerID")
);

-- CreateTable
CREATE TABLE "located" (
    "BookID" INTEGER NOT NULL,
    "ShelfID" INTEGER NOT NULL,

    CONSTRAINT "located_pkey" PRIMARY KEY ("ShelfID","BookID")
);

-- CreateTable
CREATE TABLE "published" (
    "PublisherID" INTEGER NOT NULL,
    "BookID" INTEGER NOT NULL,

    CONSTRAINT "published_pkey" PRIMARY KEY ("BookID","PublisherID")
);

-- CreateTable
CREATE TABLE "publisher" (
    "PublisherID" INTEGER NOT NULL,
    "PublisherName" VARCHAR(15) NOT NULL,
    "City" VARCHAR(10) NOT NULL,
    "Country" VARCHAR(10) NOT NULL,
    "Telephone" VARCHAR(10) NOT NULL,
    "YearFounded" INTEGER NOT NULL,

    CONSTRAINT "publisher_pkey" PRIMARY KEY ("PublisherID")
);

-- CreateTable
CREATE TABLE "shelf" (
    "ShelfID" INTEGER NOT NULL,
    "CategoryName" VARCHAR(10) NOT NULL,

    CONSTRAINT "shelf_pkey" PRIMARY KEY ("ShelfID")
);

-- CreateTable
CREATE TABLE "truck" (
    "TruckID" INTEGER NOT NULL,
    "DriverName" VARCHAR(15) NOT NULL,

    CONSTRAINT "truck_pkey" PRIMARY KEY ("TruckID")
);

-- CreateTable
CREATE TABLE "unloaded" (
    "BookID" INTEGER NOT NULL,
    "TruckID" INTEGER NOT NULL,

    CONSTRAINT "unloaded_pkey" PRIMARY KEY ("TruckID","BookID")
);

-- CreateTable
CREATE TABLE "wrote" (
    "BookID" INTEGER NOT NULL,
    "AuthorID" INTEGER NOT NULL,

    CONSTRAINT "wrote_pkey" PRIMARY KEY ("AuthorID","BookID")
);

-- AddForeignKey
ALTER TABLE "bought" ADD CONSTRAINT "BookID" FOREIGN KEY ("BookID") REFERENCES "book"("BookID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bought" ADD CONSTRAINT "CustomerID" FOREIGN KEY ("CustomerID") REFERENCES "customer"("CustomerID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "located" ADD CONSTRAINT "BookID" FOREIGN KEY ("BookID") REFERENCES "book"("BookID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "located" ADD CONSTRAINT "ShelfID" FOREIGN KEY ("ShelfID") REFERENCES "shelf"("ShelfID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "published" ADD CONSTRAINT "BookID" FOREIGN KEY ("BookID") REFERENCES "book"("BookID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "published" ADD CONSTRAINT "PublisherID" FOREIGN KEY ("PublisherID") REFERENCES "publisher"("PublisherID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unloaded" ADD CONSTRAINT "BookID" FOREIGN KEY ("BookID") REFERENCES "book"("BookID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unloaded" ADD CONSTRAINT "TruckID" FOREIGN KEY ("TruckID") REFERENCES "truck"("TruckID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wrote" ADD CONSTRAINT "AuthorID" FOREIGN KEY ("AuthorID") REFERENCES "author"("AuthorID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wrote" ADD CONSTRAINT "BookID" FOREIGN KEY ("BookID") REFERENCES "book"("BookID") ON DELETE NO ACTION ON UPDATE NO ACTION;
