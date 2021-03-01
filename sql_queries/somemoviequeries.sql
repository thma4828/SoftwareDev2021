use sakila;

select f2.full_name, f1.title, f1.rating
from film as f1 inner join 
(
select film_actor.film_id, concat(actor.first_name, ' ', actor.last_name) as full_name
from film_actor 
inner join actor on film_actor.actor_id = actor.actor_id 
) as f2 on f1.film_id = f2.film_id
order by f2.full_name, f1.rating;

