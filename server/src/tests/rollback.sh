# run all migrations
npx dbmate --env-file ".env.test" up 

exit_code=0;
rollback_count=0;
total_migrations=$(ls -1 db/migrations | wc -l)

# run all rollbacks
while true; do 
  npx dbmate --env-file ".env.test" rollback 
  exit_code=$?;

  if [[ $exit_code -ne 0 ]]; then 
    break;
  fi
  
  rollback_count=$((rollback_count+1));
done

npx dbmate --env-file ".env.test" drop 

if [[ $rollback_count -eq $total_migrations ]]; then
  echo "Rollback complete..."
  exit_code=0;
else
  echo "Aborting rollback due to error..."
fi 

exit $exit_code;
